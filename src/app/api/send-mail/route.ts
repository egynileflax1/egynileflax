import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { COMPANY } from "@/data/initialData";
import { b2bMailSchema, parseCcList } from "@/lib/b2bMailSchema";
import { buildB2BEmailContent } from "@/lib/b2bMailTemplate";

function verifyPasscode(provided: string, expected: string): boolean {
  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  try {
    const expectedPassword = process.env.B2B_MAIL_PASSWORD;
    if (!expectedPassword) {
      return NextResponse.json(
        { error: "B2B_MAIL_PASSWORD is not configured on the server." },
        { status: 503 }
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

    const { password, to, toName, cc, replyTo, subject, message, includeSignature } = parsed.data;

    if (!verifyPasscode(password, expectedPassword)) {
      return NextResponse.json({ error: "Invalid access passcode." }, { status: 401 });
    }

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

    return NextResponse.json({ ok: true, provider: "resend" });
  } catch (error) {
    console.error("B2B mail send error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send email." },
      { status: 500 }
    );
  }
}
