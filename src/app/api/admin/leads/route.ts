import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSessionUser } from "@/lib/adminAuth";
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
  quoted_price: z.string().trim().max(120).optional().default(""),
  container_volume: z.string().trim().max(120).optional().default(""),
  sample_tracking: z.string().trim().max(200).optional().default(""),
  assigned_to: z.string().trim().max(150).optional().default(""),
  lang: z.string().trim().max(16).optional().default("en"),
  message: z.string().trim().max(4000).optional().default(""),
  source: z.string().trim().max(60).optional().default("manual"),
  status: z.enum(LEAD_STATUSES).optional().default("new"),
  notes: z.string().trim().max(4000).optional().default(""),
  next_follow_up_at: z.string().trim().nullable().optional().default(null),
});

export async function GET(request: Request) {
  const adminUser = await getAdminSessionUser();
  if (!adminUser) {
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
  const adminUser = await getAdminSessionUser();
  if (!adminUser) {
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

  // Bulk CSV import support: { leads: [...] } with upsert by email
  if (raw && typeof raw === "object" && Array.isArray((raw as { leads?: unknown }).leads)) {
    const bulkParsed = z
      .array(createLeadSchema)
      .min(1)
      .max(500)
      .safeParse((raw as { leads: unknown[] }).leads);

    if (!bulkParsed.success) {
      return NextResponse.json(
        { error: bulkParsed.error.issues[0]?.message || "Invalid CSV rows." },
        { status: 400 }
      );
    }

    let insertedCount = 0;
    let updatedCount = 0;
    const processed = [];

    for (const d of bulkParsed.data) {
      const existing = await sql`
        SELECT id FROM crm_leads
        WHERE LOWER(email) = LOWER(${d.email})
        LIMIT 1
      `;

      if (existing.length > 0) {
        const updated = await sql`
          UPDATE crm_leads
          SET
            name = ${d.name},
            company = CASE WHEN ${d.company} <> '' THEN ${d.company} ELSE company END,
            phone = CASE WHEN ${d.phone} <> '' THEN ${d.phone} ELSE phone END,
            country = CASE WHEN ${d.country} <> '' THEN ${d.country} ELSE country END,
            product = CASE WHEN ${d.product} <> '' THEN ${d.product} ELSE product END,
            quantity = CASE WHEN ${d.quantity} <> '' THEN ${d.quantity} ELSE quantity END,
            incoterm = CASE WHEN ${d.incoterm} <> '' THEN ${d.incoterm} ELSE incoterm END,
            quoted_price = CASE WHEN ${d.quoted_price} <> '' THEN ${d.quoted_price} ELSE quoted_price END,
            container_volume = CASE WHEN ${d.container_volume} <> '' THEN ${d.container_volume} ELSE container_volume END,
            sample_tracking = CASE WHEN ${d.sample_tracking} <> '' THEN ${d.sample_tracking} ELSE sample_tracking END,
            notes = CASE WHEN ${d.notes} <> '' THEN ${d.notes} ELSE notes END,
            updated_by = ${adminUser.email},
            updated_at = NOW()
          WHERE id = ${existing[0].id as number}
          RETURNING *
        `;
        if (updated[0]) processed.push(updated[0]);
        updatedCount++;
      } else {
        const ins = await sql`
          INSERT INTO crm_leads (
            name, company, email, phone, country, product, quantity, incoterm,
            quoted_price, container_volume, sample_tracking, assigned_to, updated_by,
            lang, message, source, status, notes, next_follow_up_at
          )
          VALUES (
            ${d.name}, ${d.company}, ${d.email}, ${d.phone}, ${d.country},
            ${d.product}, ${d.quantity}, ${d.incoterm},
            ${d.quoted_price}, ${d.container_volume}, ${d.sample_tracking},
            ${d.assigned_to || adminUser.email}, ${adminUser.email},
            ${d.lang}, ${d.message}, ${d.source}, ${d.status}, ${d.notes},
            ${d.next_follow_up_at || null}
          )
          RETURNING *
        `;
        if (ins[0]) processed.push(ins[0]);
        insertedCount++;
      }
    }

    return NextResponse.json(
      {
        leads: processed,
        count: processed.length,
        insertedCount,
        updatedCount,
      },
      { status: 201 }
    );
  }

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
      quoted_price, container_volume, sample_tracking, assigned_to, updated_by,
      lang, message, source, status, notes, next_follow_up_at
    )
    VALUES (
      ${d.name}, ${d.company}, ${d.email}, ${d.phone}, ${d.country},
      ${d.product}, ${d.quantity}, ${d.incoterm},
      ${d.quoted_price}, ${d.container_volume}, ${d.sample_tracking},
      ${d.assigned_to || adminUser.email}, ${adminUser.email},
      ${d.lang}, ${d.message}, ${d.source}, ${d.status}, ${d.notes},
      ${d.next_follow_up_at || null}
    )
    RETURNING *
  `;

  return NextResponse.json({ lead: inserted[0] }, { status: 201 });
}
