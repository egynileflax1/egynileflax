import { neon, NeonQueryFunction } from "@neondatabase/serverless";

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "sample_sent",
  "quoted",
  "won",
  "lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface CrmLead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  quantity: string;
  incoterm: string;
  message: string;
  lang: string;
  source: string;
  status: LeadStatus;
  notes: string;
  next_follow_up_at: string | null;
  created_at: string;
  updated_at: string;
}

export const SUPPLIER_TYPES = ["factory", "farmer", "trader"] as const;
export type SupplierType = (typeof SUPPLIER_TYPES)[number];

export interface CrmSupplier {
  id: number;
  name: string;
  type: SupplierType;
  contact_person: string;
  phone: string;
  location: string;
  products: string;
  workers_shifts: string;
  daily_output: string;
  price_notes: string;
  created_at: string;
  updated_at: string;
}

export interface CrmEmailLog {
  id: number;
  lead_id: number | null;
  to_email: string;
  subject: string;
  body: string;
  provider: string;
  message_id?: string;
  delivery_status?: string;
  last_event_at?: string | null;
  sent_at: string;
}

let cachedSql: NeonQueryFunction<false, false> | null = null;
let schemaReadyPromise: Promise<void> | null = null;

export function getSql(): NeonQueryFunction<false, false> | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!cachedSql) {
    cachedSql = neon(url);
  }
  return cachedSql;
}

export async function ensureCrmSchema(): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;

  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS crm_leads (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          company TEXT NOT NULL DEFAULT '',
          email TEXT NOT NULL,
          phone TEXT NOT NULL DEFAULT '',
          country TEXT NOT NULL DEFAULT '',
          product TEXT NOT NULL DEFAULT '',
          quantity TEXT NOT NULL DEFAULT '',
          incoterm TEXT NOT NULL DEFAULT '',
          message TEXT NOT NULL DEFAULT '',
          lang TEXT NOT NULL DEFAULT 'en',
          source TEXT NOT NULL DEFAULT 'website_form',
          status TEXT NOT NULL DEFAULT 'new',
          notes TEXT NOT NULL DEFAULT '',
          next_follow_up_at TIMESTAMPTZ NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS crm_email_logs (
          id SERIAL PRIMARY KEY,
          lead_id INTEGER REFERENCES crm_leads(id) ON DELETE SET NULL,
          to_email TEXT NOT NULL,
          subject TEXT NOT NULL,
          body TEXT NOT NULL,
          provider TEXT NOT NULL,
          message_id TEXT NOT NULL DEFAULT '',
          delivery_status TEXT NOT NULL DEFAULT 'sent',
          last_event_at TIMESTAMPTZ NULL,
          sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`ALTER TABLE crm_email_logs ADD COLUMN IF NOT EXISTS message_id TEXT NOT NULL DEFAULT ''`;
      await sql`ALTER TABLE crm_email_logs ADD COLUMN IF NOT EXISTS delivery_status TEXT NOT NULL DEFAULT 'sent'`;
      await sql`ALTER TABLE crm_email_logs ADD COLUMN IF NOT EXISTS last_event_at TIMESTAMPTZ NULL`;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_crm_leads_status_updated
        ON crm_leads (status, updated_at DESC)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_crm_email_logs_lead_id
        ON crm_email_logs (lead_id, sent_at DESC)
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS crm_suppliers (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          type TEXT NOT NULL DEFAULT 'factory',
          contact_person TEXT NOT NULL DEFAULT '',
          phone TEXT NOT NULL DEFAULT '',
          location TEXT NOT NULL DEFAULT '',
          products TEXT NOT NULL DEFAULT '',
          workers_shifts TEXT NOT NULL DEFAULT '',
          daily_output TEXT NOT NULL DEFAULT '',
          price_notes TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_crm_suppliers_type_updated
        ON crm_suppliers (type, updated_at DESC)
      `;
    })().catch((err) => {
      schemaReadyPromise = null;
      throw err;
    });
  }

  await schemaReadyPromise;
  return true;
}
