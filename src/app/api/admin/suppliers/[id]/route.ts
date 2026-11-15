import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { ensureCrmSchema, getSql, SUPPLIER_TYPES } from "@/lib/db";

const updateSupplierSchema = z.object({
  name: z.string().trim().min(1).max(200).optional(),
  type: z.enum(SUPPLIER_TYPES).optional(),
  contact_person: z.string().trim().max(300).optional(),
  phone: z.string().trim().max(120).optional(),
  location: z.string().trim().max(400).optional(),
  products: z.string().trim().max(500).optional(),
  workers_shifts: z.string().trim().max(300).optional(),
  daily_output: z.string().trim().max(300).optional(),
  price_notes: z.string().trim().max(2000).optional(),
});

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  }
  await ensureCrmSchema();

  const { id: rawId } = await context.params;
  const id = parseId(rawId);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const raw = await request.json().catch(() => ({}));
  const parsed = updateSupplierSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed." },
      { status: 400 }
    );
  }

  const existing = await sql`SELECT * FROM crm_suppliers WHERE id = ${id} LIMIT 1`;
  if (!existing.length) {
    return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
  }
  const cur = existing[0];
  const d = parsed.data;

  const updated = await sql`
    UPDATE crm_suppliers
    SET
      name = ${d.name ?? cur.name},
      type = ${d.type ?? cur.type},
      contact_person = ${d.contact_person ?? cur.contact_person},
      phone = ${d.phone ?? cur.phone},
      location = ${d.location ?? cur.location},
      products = ${d.products ?? cur.products},
      workers_shifts = ${d.workers_shifts ?? cur.workers_shifts},
      daily_output = ${d.daily_output ?? cur.daily_output},
      price_notes = ${d.price_notes ?? cur.price_notes},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return NextResponse.json({ supplier: updated[0] });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  }
  await ensureCrmSchema();

  const { id: rawId } = await context.params;
  const id = parseId(rawId);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await sql`DELETE FROM crm_suppliers WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
