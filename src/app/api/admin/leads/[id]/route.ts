import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSessionUser } from "@/lib/adminAuth";
import { ensureCrmSchema, getSql, LEAD_STATUSES } from "@/lib/db";

const updateLeadSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  email: z.string().trim().email().optional(),
  status: z.enum(LEAD_STATUSES).optional(),
  notes: z.string().max(4000).optional(),
  incoterm: z.string().trim().max(60).optional(),
  quoted_price: z.string().trim().max(120).optional(),
  container_volume: z.string().trim().max(120).optional(),
  sample_tracking: z.string().trim().max(200).optional(),
  assigned_to: z.string().trim().max(150).optional(),
  lang: z.string().trim().max(16).optional(),
  product: z.string().trim().max(250).optional(),
  quantity: z.string().trim().max(120).optional(),
  country: z.string().trim().max(120).optional(),
  company: z.string().trim().max(150).optional(),
  phone: z.string().trim().max(40).optional(),
  next_follow_up_at: z.string().nullable().optional(),
});

function parseLeadId(rawId: string): number | null {
  const id = Number(rawId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const adminUser = await getAdminSessionUser();
  if (!adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  }
  await ensureCrmSchema();

  const { id: rawId } = await context.params;
  const id = parseLeadId(rawId);
  if (!id) return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });

  const leads = await sql`SELECT * FROM crm_leads WHERE id = ${id} LIMIT 1`;
  if (!leads.length) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  const emails = await sql`
    SELECT * FROM crm_email_logs
    WHERE lead_id = ${id} OR LOWER(to_email) = LOWER(${leads[0].email})
    ORDER BY sent_at DESC
    LIMIT 50
  `;

  return NextResponse.json({ lead: leads[0], emails });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const adminUser = await getAdminSessionUser();
  if (!adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  }
  await ensureCrmSchema();

  const { id: rawId } = await context.params;
  const id = parseLeadId(rawId);
  if (!id) return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });

  const raw = await request.json().catch(() => ({}));
  const parsed = updateLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed." },
      { status: 400 }
    );
  }

  const existingRows = await sql`SELECT * FROM crm_leads WHERE id = ${id} LIMIT 1`;
  if (!existingRows.length) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  const cur = existingRows[0];
  const d = parsed.data;

  const nextFollowUp =
    d.next_follow_up_at !== undefined
      ? d.next_follow_up_at || null
      : cur.next_follow_up_at;

  const updated = await sql`
    UPDATE crm_leads
    SET
      name = ${d.name ?? cur.name},
      email = ${d.email ?? cur.email},
      status = ${d.status ?? cur.status},
      notes = ${d.notes ?? cur.notes},
      incoterm = ${d.incoterm ?? cur.incoterm},
      quoted_price = ${d.quoted_price ?? cur.quoted_price ?? ""},
      container_volume = ${d.container_volume ?? cur.container_volume ?? ""},
      sample_tracking = ${d.sample_tracking ?? cur.sample_tracking ?? ""},
      assigned_to = ${d.assigned_to ?? cur.assigned_to ?? ""},
      lang = ${d.lang ?? cur.lang ?? "en"},
      product = ${d.product ?? cur.product},
      quantity = ${d.quantity ?? cur.quantity},
      country = ${d.country ?? cur.country},
      company = ${d.company ?? cur.company},
      phone = ${d.phone ?? cur.phone},
      next_follow_up_at = ${nextFollowUp},
      updated_by = ${adminUser.email || cur.updated_by || ""},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return NextResponse.json({ lead: updated[0] });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const adminUser = await getAdminSessionUser();
  if (!adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  }
  await ensureCrmSchema();

  const { id: rawId } = await context.params;
  const id = parseLeadId(rawId);
  if (!id) return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });

  await sql`DELETE FROM crm_leads WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
