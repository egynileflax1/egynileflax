import { NextResponse } from "next/server";
import { COMPANY } from "@/data/initialData";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { b2bMailSchema, parseCcList } from "@/lib/b2bMailSchema";
import { buildB2BEmailContent } from "@/lib/b2bMailTemplate";
import { ensureCrmSchema, getSql } from "@/lib/db";

async function logCrmEmail(params: {
  leadId?: number | null;
  to: string;
  subject: string;
  message: string;
  provider: string;
}) {
  try {
    const sql = getSql();
    if (!sql || !(await ensureCrmSchema())) return;

    let resolvedLeadId = params.leadId ?? null;
    if (!resolvedLeadId) {
      const matched = await sql`
        SELECT id FROM crm_leads
        WHERE LOWER(email) = LOWER(${params.to})
        ORDER BY updated_at DESC
        LIMIT 1
      `;
      if (matched.length) resolvedLeadId = matched[0].id as number;
    }

    await sql`
      INSERT INTO crm_email_logs (lead_id, to_email, subject, body, provider)
      VALUES (${resolvedLeadId}, ${params.to}, ${params.subject}, ${params.message}, ${params.provider})
    `;

    if (resolvedLeadId) {
      await sql`
        UPDATE crm_leads
        SET
          status = CASE WHEN status = 'new' THEN 'contacted' ELSE status END,
          updated_at = NOW()
        WHERE id = ${resolvedLeadId}
      `;
    }
  } catch (err) {
    console.error("CRM email log error:", err);
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { error: "Please sign in with Google to send B2B emails." },
        { status: 401 }
      );
    }

    const rawBody = await request.json();
    const parsed = b2bMailSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || "Validation failed.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { leadId, to, toName, cc, replyTo, subject, message, includeSignature, layout } =
      parsed.data;

    const brevoApiKey = process.env.BREVO_API_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!brevoApiKey && !resendApiKey) {
      return NextResponse.json(
        { error: "No email provider (BREVO_API_KEY or RESEND_API_KEY) is configured." },
        { status: 500 }
      );
    }

    const { html, text } = buildB2BEmailContent({
      toName,
      subject,
      message,
      includeSignature,
      layout,
    });

    const ccEmails = parseCcList(cc);
    const replyToAddress = replyTo || COMPANY.primaryEmail;

    if (brevoApiKey) {
      const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL || COMPANY.primaryEmail;
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: COMPANY.brandName, email: brevoSenderEmail },
          to: [{ email: to, ...(toName ? { name: toName } : {}) }],
          ...(ccEmails.length > 0 ? { cc: ccEmails.map((email) => ({ email })) } : {}),
          replyTo: { email: replyToAddress, name: COMPANY.brandName },
          subject,
          textContent: text,
          htmlContent: html,
        }),
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`Brevo error ${res.status}: ${detail}`);
      }

      await logCrmEmail({ leadId, to, subject, message, provider: "brevo" });
      return NextResponse.json({ ok: true, provider: "brevo" });
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL || `${COMPANY.brandName} <${COMPANY.primaryEmail}>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        ...(ccEmails.length > 0 ? { cc: ccEmails } : {}),
        reply_to: replyToAddress,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend error ${res.status}: ${detail}`);
    }

    await logCrmEmail({ leadId, to, subject, message, provider: "resend" });
    return NextResponse.json({ ok: true, provider: "resend" });
  } catch (error) {
    console.error("B2B mail send error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send email." },
      { status: 500 }
    );
  }
}
