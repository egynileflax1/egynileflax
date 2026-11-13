import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";
import { COMPANY } from "@/data/initialData";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parsed = contactSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, company, email, phone, product, message, lang } = parsed.data;
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const brevoApiKey = process.env.BREVO_API_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!webhookUrl && !brevoApiKey && !resendApiKey) {
      return NextResponse.json(
        { error: "No contact delivery channel is configured." },
        { status: 500 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || COMPANY.primaryEmail;
    const subject = `New Factory Inquiry${product ? ` — ${product}` : ""} (${name})`;

    const textBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      phone ? `Phone / WhatsApp: ${phone}` : null,
      product ? `Product of Interest: ${product}` : null,
      `Language: ${lang.toUpperCase()}`,
      "",
      "Message:",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const htmlBody = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;color:#1a181d;">
        <h2 style="color:#3F166B;margin-bottom:16px;">New Factory Contact Inquiry</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#666;width:150px;"><strong>Name</strong></td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 0;color:#666;"><strong>Email</strong></td><td style="padding:6px 0;">${escapeHtml(email)}</td></tr>
          ${company ? `<tr><td style="padding:6px 0;color:#666;"><strong>Company</strong></td><td style="padding:6px 0;">${escapeHtml(company)}</td></tr>` : ""}
          ${phone ? `<tr><td style="padding:6px 0;color:#666;"><strong>Phone / WhatsApp</strong></td><td style="padding:6px 0;">${escapeHtml(phone)}</td></tr>` : ""}
          ${product ? `<tr><td style="padding:6px 0;color:#666;"><strong>Product</strong></td><td style="padding:6px 0;">${escapeHtml(product)}</td></tr>` : ""}
          <tr><td style="padding:6px 0;color:#666;"><strong>Language</strong></td><td style="padding:6px 0;">${escapeHtml(lang.toUpperCase())}</td></tr>
        </table>
        <div style="margin-top:16px;padding:14px;background:#FAF8F5;border:1px solid #e7e5e4;border-radius:10px;white-space:pre-wrap;font-size:14px;">${escapeHtml(message)}</div>
      </div>
    `;

    const deliveries: Promise<void>[] = [];

    if (webhookUrl) {
      const fields = [
        { name: "Name", value: name, inline: true },
        { name: "Email", value: email, inline: true },
        ...(company ? [{ name: "Company", value: company, inline: true }] : []),
        ...(phone ? [{ name: "Phone / WhatsApp", value: phone, inline: true }] : []),
        ...(product ? [{ name: "Product of Interest", value: product, inline: false }] : []),
        { name: "Message", value: message, inline: false },
      ];

      deliveries.push(
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Egy Nile Flax Inquiry",
            embeds: [
              {
                title: "New Factory Contact Inquiry",
                color: 0x3f166b,
                fields,
                footer: { text: `Egy Nile Flax • Language: ${lang.toUpperCase()}` },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error(`Discord error ${res.status}: ${await res.text().catch(() => "")}`);
          }
        })
      );
    }

    if (brevoApiKey) {
      const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL || COMPANY.primaryEmail;

      deliveries.push(
        fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": brevoApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: COMPANY.brandName, email: brevoSenderEmail },
            to: [{ email: toEmail }],
            replyTo: { email, name },
            subject,
            textContent: textBody,
            htmlContent: htmlBody,
          }),
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error(`Brevo error ${res.status}: ${await res.text().catch(() => "")}`);
          }
        })
      );
    }

    if (resendApiKey) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Egy Nile Flax <onboarding@resend.dev>";

      deliveries.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            reply_to: email,
            subject,
            text: textBody,
            html: htmlBody,
          }),
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error(`Resend error ${res.status}: ${await res.text().catch(() => "")}`);
          }
        })
      );
    }

    const results = await Promise.allSettled(deliveries);
    const anySucceeded = results.some((r) => r.status === "fulfilled");

    if (!anySucceeded) {
      return NextResponse.json(
        { error: "Failed to deliver inquiry." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
