import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { ensureCrmSchema, getSql, SUPPLIER_TYPES } from "@/lib/db";

const supplierSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(200),
  type: z.enum(SUPPLIER_TYPES).optional().default("factory"),
  contact_person: z.string().trim().max(300).optional().default(""),
  phone: z.string().trim().max(120).optional().default(""),
  location: z.string().trim().max(400).optional().default(""),
  products: z.string().trim().max(500).optional().default(""),
  workers_shifts: z.string().trim().max(300).optional().default(""),
  daily_output: z.string().trim().max(300).optional().default(""),
  stock_tons: z.string().trim().max(120).optional().default(""),
  price_per_ton: z.string().trim().max(120).optional().default(""),
  quality_rating: z.number().int().min(1).max(5).optional().default(5),
  price_notes: z.string().trim().max(2000).optional().default(""),
});

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  }
  await ensureCrmSchema();

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type")?.trim() || "";
  const q = searchParams.get("q")?.trim().toLowerCase() || "";

  const rows = await sql`
    SELECT * FROM crm_suppliers
    ORDER BY id ASC
    LIMIT 1000
  `;

  const filtered = rows.filter((row) => {
    if (type && type !== "all" && row.type !== type) return false;
    if (q) {
      const hay = `${row.name} ${row.contact_person} ${row.phone} ${row.products} ${row.price_notes}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return NextResponse.json({ suppliers: filtered });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  }
  await ensureCrmSchema();

  const raw = await request.json().catch(() => ({}));

  // Bulk import support: { suppliers: [...] } with deduplication/upsert by name
  if (raw && typeof raw === "object" && Array.isArray((raw as { suppliers?: unknown }).suppliers)) {
    const bulkParsed = z.array(supplierSchema).min(1).max(500).safeParse(
      (raw as { suppliers: unknown[] }).suppliers
    );
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
        SELECT id FROM crm_suppliers
        WHERE LOWER(name) = LOWER(${d.name})
        LIMIT 1
      `;

      if (existing.length > 0) {
        const rows = await sql`
          UPDATE crm_suppliers
          SET
            type = ${d.type},
            contact_person = CASE WHEN ${d.contact_person} <> '' THEN ${d.contact_person} ELSE contact_person END,
            phone = CASE WHEN ${d.phone} <> '' THEN ${d.phone} ELSE phone END,
            location = CASE WHEN ${d.location} <> '' THEN ${d.location} ELSE location END,
            products = CASE WHEN ${d.products} <> '' THEN ${d.products} ELSE products END,
            workers_shifts = CASE WHEN ${d.workers_shifts} <> '' THEN ${d.workers_shifts} ELSE workers_shifts END,
            daily_output = CASE WHEN ${d.daily_output} <> '' THEN ${d.daily_output} ELSE daily_output END,
            stock_tons = CASE WHEN ${d.stock_tons} <> '' THEN ${d.stock_tons} ELSE stock_tons END,
            price_per_ton = CASE WHEN ${d.price_per_ton} <> '' THEN ${d.price_per_ton} ELSE price_per_ton END,
            price_notes = CASE WHEN ${d.price_notes} <> '' THEN ${d.price_notes} ELSE price_notes END,
            updated_at = NOW()
          WHERE id = ${existing[0].id as number}
          RETURNING *
        `;
        if (rows[0]) processed.push(rows[0]);
        updatedCount++;
      } else {
        const rows = await sql`
          INSERT INTO crm_suppliers (
            name, type, contact_person, phone, location, products, workers_shifts,
            daily_output, stock_tons, price_per_ton, quality_rating, price_notes
          )
          VALUES (
            ${d.name}, ${d.type}, ${d.contact_person}, ${d.phone}, ${d.location},
            ${d.products}, ${d.workers_shifts}, ${d.daily_output},
            ${d.stock_tons}, ${d.price_per_ton}, ${d.quality_rating}, ${d.price_notes}
          )
          RETURNING *
        `;
        if (rows[0]) processed.push(rows[0]);
        insertedCount++;
      }
    }

    return NextResponse.json(
      {
        suppliers: processed,
        count: processed.length,
        insertedCount,
        updatedCount,
      },
      { status: 201 }
    );
  }

  const parsed = supplierSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed." },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const rows = await sql`
    INSERT INTO crm_suppliers (
      name, type, contact_person, phone, location, products, workers_shifts,
      daily_output, stock_tons, price_per_ton, quality_rating, price_notes
    )
    VALUES (
      ${d.name}, ${d.type}, ${d.contact_person}, ${d.phone}, ${d.location},
      ${d.products}, ${d.workers_shifts}, ${d.daily_output},
      ${d.stock_tons}, ${d.price_per_ton}, ${d.quality_rating}, ${d.price_notes}
    )
    RETURNING *
  `;

  return NextResponse.json({ supplier: rows[0] }, { status: 201 });
}
