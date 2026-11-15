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

  // Bulk import support: { suppliers: [...] }
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

    const inserted = [];
    for (const d of bulkParsed.data) {
      const rows = await sql`
        INSERT INTO crm_suppliers (
          name, type, contact_person, phone, location, products, workers_shifts, daily_output, price_notes
        )
        VALUES (
          ${d.name}, ${d.type}, ${d.contact_person}, ${d.phone}, ${d.location},
          ${d.products}, ${d.workers_shifts}, ${d.daily_output}, ${d.price_notes}
        )
        RETURNING *
      `;
      if (rows[0]) inserted.push(rows[0]);
    }
    return NextResponse.json({ suppliers: inserted, count: inserted.length }, { status: 201 });
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
      name, type, contact_person, phone, location, products, workers_shifts, daily_output, price_notes
    )
    VALUES (
      ${d.name}, ${d.type}, ${d.contact_person}, ${d.phone}, ${d.location},
      ${d.products}, ${d.workers_shifts}, ${d.daily_output}, ${d.price_notes}
    )
    RETURNING *
  `;

  return NextResponse.json({ supplier: rows[0] }, { status: 201 });
}
