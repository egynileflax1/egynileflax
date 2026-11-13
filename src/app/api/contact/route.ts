import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  product?: string;
  message?: string;
  lang?: string;
}

const cleanField = (value: unknown, maxLength = 1024): string => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = cleanField(body.name, 200);
    const company = cleanField(body.company, 200);
    const email = cleanField(body.email, 200);
    const phone = cleanField(body.phone, 100);
    const product = cleanField(body.product, 250);
    const message = cleanField(body.message, 1900);
    const lang = cleanField(body.lang, 16) || "en";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

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

