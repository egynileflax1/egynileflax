import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { ensureCrmSchema, getSql, LEAD_STATUSES } from "@/lib/db";

const createLeadSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(120),
  company: z.string().trim().max(150).optional().default(""),
  email: z.string().trim().email("Valid email is required."),
  phone: z.string().trim().max(40).optional().default(""),
  country: z.string().trim().max(120).optional().default(""),
  product: z.string().trim().max(250).optional().default(""),
  quantity: z.string().trim().max(120).optional().default(""),
  incoterm: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(4000).optional().default(""),
  source: z.string().trim().max(60).optional().default("manual"),
  status: z.enum(LEAD_STATUSES).optional().default("new"),
  notes: z.string().trim().max(4000).optional().default(""),
  next_follow_up_at: z.string().trim().nullable().optional().default(null),
});

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured." },
      { status: 503 }
    );
  }

  await ensureCrmSchema();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status")?.trim() || "";
  const q = searchParams.get("q")?.trim().toLowerCase() || "";

  const rows = await sql`
    SELECT * FROM crm_leads
    ORDER BY updated_at DESC, created_at DESC
    LIMIT 500
  `;

  const filtered = rows.filter((row) => {
    if (status && status !== "all" && row.status !== status) return false;
    if (q) {
      const hay = `${row.name} ${row.company} ${row.email} ${row.country} ${row.product}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return NextResponse.json({ leads: filtered });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured." },
      { status: 503 }
    );
  }

  await ensureCrmSchema();

  const raw = await request.json().catch(() => ({}));
  const parsed = createLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed." },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const inserted = await sql`
    INSERT INTO crm_leads (
      name, company, email, phone, country, product, quantity, incoterm,
      message, source, status, notes, next_follow_up_at
    )
    VALUES (
      ${d.name}, ${d.company}, ${d.email}, ${d.phone}, ${d.country},
      ${d.product}, ${d.quantity}, ${d.incoterm}, ${d.message},
      ${d.source}, ${d.status}, ${d.notes}, ${d.next_follow_up_at || null}
    )
    RETURNING *
  `;

  return NextResponse.json({ lead: inserted[0] }, { status: 201 });
}
