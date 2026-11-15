import { NextResponse } from "next/server";
import { ensureCrmSchema, getSql } from "@/lib/db";

const STATUS_PRIORITY: Record<string, number> = {
  sent: 1,
  delivered: 2,
  opened: 3,
  clicked: 4,
  bounced: 5,
  complained: 5,
};

function mapBrevoEvent(eventRaw: string): string | null {
  const ev = eventRaw.toLowerCase();
  if (ev === "delivered") return "delivered";
  if (ev === "opened" || ev === "unique_opened") return "opened";
  if (ev === "click") return "clicked";
  if (ev === "hard_bounce" || ev === "soft_bounce" || ev === "blocked" || ev === "invalid_email") {
    return "bounced";
  }
  if (ev === "spam") return "complained";
  return null;
}

function mapResendEvent(typeRaw: string): string | null {
  const t = typeRaw.toLowerCase();
  if (t === "email.delivered") return "delivered";
  if (t === "email.opened") return "opened";
  if (t === "email.clicked") return "clicked";
  if (t === "email.bounced" || t === "email.delivery_delayed") return "bounced";
  if (t === "email.complained") return "complained";
  return null;
}

export async function POST(req: Request) {
  try {
    const secret = process.env.MAIL_WEBHOOK_SECRET;
    if (secret) {
      const url = new URL(req.url);
      const headerToken = req.headers.get("x-webhook-secret");
      if (url.searchParams.get("secret") !== secret && headerToken !== secret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const payload = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!payload) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    let nextStatus: string | null = null;
    let messageId = "";
    let recipientEmail = "";

    // Brevo transactional webhook format
    if (typeof payload.event === "string") {
      nextStatus = mapBrevoEvent(payload.event);
      messageId = typeof payload["message-id"] === "string" ? payload["message-id"] : "";
      recipientEmail = typeof payload.email === "string" ? payload.email : "";
    }
    // Resend webhook format
    else if (typeof payload.type === "string" && payload.data && typeof payload.data === "object") {
      const data = payload.data as Record<string, unknown>;
      nextStatus = mapResendEvent(payload.type);
      messageId = typeof data.email_id === "string" ? data.email_id : "";
      const toList = Array.isArray(data.to) ? data.to : [];
      recipientEmail = typeof toList[0] === "string" ? toList[0] : "";
    }

    if (!nextStatus || (!messageId && !recipientEmail)) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const sql = getSql();
    if (!sql || !(await ensureCrmSchema())) {
      return NextResponse.json({ ok: true, db: false });
    }

    const nextPriority = STATUS_PRIORITY[nextStatus] ?? 1;

    if (messageId) {
      const existing = await sql`
        SELECT id, delivery_status FROM crm_email_logs
        WHERE message_id = ${messageId}
        ORDER BY sent_at DESC
        LIMIT 1
      `;
      if (existing.length) {
        const curPriority = STATUS_PRIORITY[String(existing[0].delivery_status || "sent")] ?? 1;
        if (nextPriority >= curPriority) {
          await sql`
            UPDATE crm_email_logs
            SET delivery_status = ${nextStatus}, last_event_at = NOW()
            WHERE id = ${existing[0].id as number}
          `;
        }
        return NextResponse.json({ ok: true, updated: existing[0].id, status: nextStatus });
      }
    }

    if (recipientEmail) {
      const existingByEmail = await sql`
        SELECT id, delivery_status FROM crm_email_logs
        WHERE LOWER(to_email) = LOWER(${recipientEmail})
        ORDER BY sent_at DESC
        LIMIT 1
      `;
      if (existingByEmail.length) {
        const curPriority = STATUS_PRIORITY[String(existingByEmail[0].delivery_status || "sent")] ?? 1;
        if (nextPriority >= curPriority) {
          await sql`
            UPDATE crm_email_logs
            SET delivery_status = ${nextStatus}, last_event_at = NOW()
            WHERE id = ${existingByEmail[0].id as number}
          `;
        }
        return NextResponse.json({ ok: true, updated: existingByEmail[0].id, status: nextStatus });
      }
    }

    return NextResponse.json({ ok: true, matched: false });
  } catch (err) {
    console.error("Mail webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
