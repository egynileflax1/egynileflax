import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";

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
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Contact webhook is not configured." },
        { status: 500 }
      );
    }

    const fields = [
      { name: "Name", value: name, inline: true },
      { name: "Email", value: email, inline: true },
      ...(company ? [{ name: "Company", value: company, inline: true }] : []),
      ...(phone ? [{ name: "Phone / WhatsApp", value: phone, inline: true }] : []),
      ...(product ? [{ name: "Product of Interest", value: product, inline: false }] : []),
      { name: "Message", value: message, inline: false },
    ];

    const discordRes = await fetch(webhookUrl, {
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
    });

    if (!discordRes.ok) {
      const errorText = await discordRes.text().catch(() => "");
      return NextResponse.json(
        { error: "Failed to deliver inquiry.", details: errorText },
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
