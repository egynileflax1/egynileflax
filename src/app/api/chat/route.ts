import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { COMPANY, PRODUCTS, LanguageCode } from "@/data/initialData";
import { ensureCrmSchema, getSql } from "@/lib/db";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2000),
});

const chatRequestSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("chat"),
    lang: z.enum(["en", "ar", "zh"]).optional().default("en"),
    messages: z.array(messageSchema).min(1).max(20),
  }),
  z.object({
    action: z.literal("lead"),
    lang: z.enum(["en", "ar", "zh"]).optional().default("en"),
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(200),
    company: z.string().trim().max(160).optional().default(""),
    phone: z.string().trim().max(60).optional().default(""),
    country: z.string().trim().max(120).optional().default(""),
    product: z.string().trim().max(250).optional().default(""),
    quantity: z.string().trim().max(120).optional().default(""),
    notes: z.string().trim().max(1500).optional().default(""),
  }),
]);

// Lightweight in-memory rate limiter (20 requests / 60s per IP) to protect free LLM quota
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "anonymous";

  const now = Date.now();
  if (ipHits.size > 500) {
    for (const [k, v] of ipHits.entries()) {
      if (now > v.resetAt) ipHits.delete(k);
    }
  }

  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

/**
 * Reads an env variable from process.env.
 * In development only, falls back to reading .env.local so newly added keys
 * work on Fast Refresh without restarting `npm run dev`.
 */
function getEnvKey(keyName: string): string {
  const fromEnv = process.env[keyName]?.trim();
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV !== "production") {
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf8");
        const regex = new RegExp(`^\\s*${keyName}\\s*=\\s*["']?([^"'\\r\\n]+)["']?`, "m");
        const match = content.match(regex);
        if (match?.[1]?.trim()) {
          return match[1].trim();
        }
      }
    } catch {
      // ignore fs errors
    }
  }
  return "";
}

function buildSystemPrompt(lang: LanguageCode): string {
  const catalogSummary = PRODUCTS.map(
    (p) =>
      `- ID: "${p.id}" | ${p.name.en} (${p.name.ar} / ${p.name.zh})
  Category: ${p.category} | Grades: ${p.grades.join(", ")}
  Specs: Staple Length=${p.specs.stapleLength}, Moisture=${p.specs.moisture}, Shive=${p.specs.shiveContent}, Packing=${p.specs.baleWeight}
  Applications: ${p.applications.en.join("; ")}`
  ).join("\n");

  const langInstruction =
    lang === "ar"
      ? "Default language is Arabic, unless the user writes in another language (always reply in the same language the user used)."
      : lang === "zh"
      ? "Default language is Simplified Chinese, unless the user writes in another language (always reply in the same language the user used)."
      : "Default language is English, unless the user writes in Arabic, Chinese, or another language (always reply in the same language the user used).";

  return `You are the official AI Technical & Export Assistant for ${COMPANY.brandName} (${COMPANY.legalName}), an ${COMPANY.isoCert} Egyptian flax fiber factory in ${COMPANY.factoryAddress} (founded ${COMPANY.foundedYear}).

HOW TO BEHAVE (B2B BEST PRACTICES):
1. **Warm, Natural & Human on Small Talk:**
   - When a visitor says "hi", "how are you", "i love you", "thank you", or makes casual small talk, respond warmly, naturally, and briefly (1–2 sentences) like a friendly human specialist—never dump a robotic list of products unless asked.
2. **Expert on Flax, Textiles, Plumbing & Export:**
   - Answer any question about ${COMPANY.brandName}, flax cultivation/processing, Scutched Flax (Grade A & B), Flax Arrous (1–5 cleaning stages), Hackled Flax, Flax Dolls (2/4/5-head and Jokia shapes for sanitary & chemical industries), Sliver (15–35 gr/m), packaging, shipping, container loading, or Egypt.
3. **Polite Scope Guardrail (Quota Protection):**
   - If someone asks you to do unrelated heavy tasks (e.g., write computer code, school essays, politics, or unrelated trivia), politely and warmly decline in one sentence and offer to help with Egyptian flax fibers, technical specs, or export quotes instead.
4. ${langInstruction}
5. **Formatting for Compact Chat Window:**
   - Keep replies concise and easy to scan in a compact chat window.
   - Use short bullet points (\`- **Label:** Value\`) instead of Markdown pipe tables (\`|...|\`).
6. **Company & Export Facts:**
   - Annual Capacity: ${COMPANY.annualCapacityTons} | ${COMPANY.isoCert} | ${COMPANY.councilMembership}
   - Ports & Incoterms: FOB Alexandria/Damietta, CFR, CIF worldwide (~19–22 MT per 40'HQ container for hydraulic-pressed bales; ~9–11 MT per 20'FCL). DHL/FedEx trial samples available.
   - Contacts: Email ${COMPANY.primaryEmail} | WhatsApp/Phone ${COMPANY.egyptPhone1} & ${COMPANY.egyptPhone2} | WeChat: ${COMPANY.wechatId} | RedNote: ${COMPANY.rednoteId}
   - Never invent dollar prices—explain that pricing depends on grade, quantity, and destination port, and invite them to click "Get Quote" at the top of the chat.

PRODUCT CATALOG REFERENCE (use when relevant):
${catalogSummary}

OPTIONAL UI TAGS (append at the very end ONLY when genuinely relevant to the user's message):
- If the user specifically asks about 1 or 2 products above, append on a new line: [PRODUCTS: prod-id-1, prod-id-2]
- If the user asks for prices, quotes, samples, or how to buy/order, append on a new line: [ACTION: QUOTE]`;
}

function extractTagsAndCleanReply(rawText: string): {
  reply: string;
  suggestedProductIds: string[];
  showLeadForm: boolean;
} {
  let reply = rawText;
  const suggestedProductIds: string[] = [];
  let showLeadForm = false;

  const prodMatch = reply.match(/\[PRODUCTS:\s*([^\]]+)\]/i);
  if (prodMatch) {
    const ids = prodMatch[1]
      .split(",")
      .map((s) => s.trim())
      .filter((id) => PRODUCTS.some((p) => p.id === id));
    suggestedProductIds.push(...ids.slice(0, 2));
    reply = reply.replace(prodMatch[0], "");
  }

  if (/\[ACTION:\s*QUOTE\]/i.test(reply)) {
    showLeadForm = true;
    reply = reply.replace(/\[ACTION:\s*QUOTE\]/gi, "");
  }

  return {
    reply: reply.trim(),
    suggestedProductIds,
    showLeadForm,
  };
}

let cachedGroqModel: string | null = null;

async function callGroq(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  apiKey: string
): Promise<{ text: string | null; error?: string }> {
  const candidateModels = [
    ...(cachedGroqModel ? [cachedGroqModel] : []),
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "meta-llama/llama-4-scout-17b-16e-instruct",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
  ];

  // Deduplicate
  const uniqueModels = Array.from(new Set(candidateModels));
  let lastError = "";

  const tryModel = async (model: string): Promise<string | null> => {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "EgyNileFlax-Assistant/1.0",
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: 600,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
      signal: AbortSignal.timeout(7000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      lastError = `[Groq ${model}] ${res.status}: ${errText.slice(0, 250)}`;
      return null;
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content === "string" && content.trim()) {
      cachedGroqModel = model;
      return content.trim();
    }
    return null;
  };

  for (const model of uniqueModels) {
    try {
      const reply = await tryModel(model);
      if (reply) return { text: reply };
    } catch (e) {
      lastError = `[Groq ${model}] ${String(e)}`;
    }
  }

  // If all hardcoded model IDs failed (e.g. model names updated), dynamically fetch Groq's active models list
  try {
    const modelsRes = await fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "User-Agent": "EgyNileFlax-Assistant/1.0",
      },
      signal: AbortSignal.timeout(4000),
    });
    if (modelsRes.ok) {
      const modelsData = await modelsRes.json();
      const availableIds: string[] = (modelsData?.data || [])
        .map((m: { id?: string }) => m.id || "")
        .filter(
          (id: string) =>
            id &&
            !id.includes("whisper") &&
            !id.includes("tts") &&
            !id.includes("guard") &&
            !id.includes("embed")
        );

      for (const dynamicModel of availableIds.slice(0, 3)) {
        const reply = await tryModel(dynamicModel);
        if (reply) return { text: reply };
      }
    }
  } catch {
    // ignore
  }

  console.warn("[AI Agent Groq Error]", lastError);
  return { text: null, error: lastError };
}

async function callGemini(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  apiKey: string
): Promise<{ text: string | null; error?: string }> {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const payload = {
    systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 600,
    },
  };

  const models = ["gemini-3.8-flash", "gemini-3.8-flash-lite", "gemini-flash-latest"];
  let lastError = "";

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        const errBody = await res.text().catch(() => "");
        lastError = `[Gemini ${model}] ${res.status}: ${errBody.slice(0, 200)}`;
        continue;
      }
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (typeof text === "string" && text.trim()) {
        return { text: text.trim() };
      }
    } catch (e) {
      lastError = `[Gemini ${model}] ${String(e)}`;
    }
  }

  return { text: null, error: lastError };
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const rawBody = await request.json();
    const parsed = chatRequestSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Handle direct in-chat Lead / Quote submission
    if (data.action === "lead") {
      const { name, email, company, phone, country, product, quantity, notes, lang } = data;

      let savedToCrm = false;
      try {
        const sql = getSql();
        if (sql && (await ensureCrmSchema())) {
          await sql`
            INSERT INTO crm_leads (
              name, company, email, phone, country, product, quantity, message, lang, source, status
            )
            VALUES (
              ${name}, ${company}, ${email}, ${phone}, ${country}, ${product}, ${quantity},
              ${notes || "Submitted via Website AI Export Assistant"}, ${lang}, 'ai_agent', 'new'
            )
          `;
          savedToCrm = true;
        }
      } catch (dbErr) {
        console.error("AI Agent CRM lead capture error:", dbErr);
      }

      const webhookUrl = getEnvKey("DISCORD_WEBHOOK_URL");
      const brevoApiKey = getEnvKey("BREVO_API_KEY");
      const resendApiKey = getEnvKey("RESEND_API_KEY");
      const toEmail = getEnvKey("CONTACT_TO_EMAIL") || COMPANY.primaryEmail;
      const subject = `🤖 New AI Agent Inquiry${product ? ` — ${product}` : ""} (${name})`;
      const textContent = [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        phone ? `Phone / WhatsApp / WeChat: ${phone}` : null,
        country ? `Destination Country / Port: ${country}` : null,
        product ? `Product: ${product}` : null,
        quantity ? `Estimated Quantity: ${quantity}` : null,
        `Language: ${lang.toUpperCase()}`,
        "",
        "Chat Context / Notes:",
        notes || "Submitted via Website AI Export Assistant",
      ]
        .filter(Boolean)
        .join("\n");

      if (brevoApiKey) {
        const brevoSenderEmail = getEnvKey("BREVO_SENDER_EMAIL") || COMPANY.primaryEmail;
        fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": brevoApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: `${COMPANY.brandName} AI Agent`, email: brevoSenderEmail },
            to: [{ email: toEmail }],
            replyTo: { email, name },
            subject,
            textContent,
          }),
        }).catch(() => {});
      } else if (resendApiKey) {
        const fromEmail = getEnvKey("RESEND_FROM_EMAIL") || "Egy Nile Flax <onboarding@resend.dev>";
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
            text: textContent,
          }),
        }).catch(() => {});
      }

      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Egy Nile Flax AI Agent",
            embeds: [
              {
                title: "🤖 New AI Agent Export Lead",
                color: 0x3f166b,
                fields: [
                  { name: "Name", value: name, inline: true },
                  { name: "Email", value: email, inline: true },
                  ...(company ? [{ name: "Company", value: company, inline: true }] : []),
                  ...(phone ? [{ name: "Phone / WhatsApp / WeChat", value: phone, inline: true }] : []),
                  ...(country ? [{ name: "Country / Port", value: country, inline: true }] : []),
                  ...(product ? [{ name: "Product", value: product, inline: true }] : []),
                  ...(quantity ? [{ name: "Quantity", value: quantity, inline: true }] : []),
                  ...(notes ? [{ name: "Notes", value: notes, inline: false }] : []),
                ],
                footer: { text: `Source: AI Agent • Lang: ${lang.toUpperCase()}` },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        }).catch(() => {});
      }

      return NextResponse.json({
        ok: true,
        savedToCrm,
      });
    }

    // Handle AI Chat message
    const { lang, messages } = data;
    const systemPrompt = buildSystemPrompt(lang);

    const groqKey = getEnvKey("GROQ_API_KEY");
    const geminiKey = getEnvKey("GEMINI_API_KEY");

    let rawAiReply: string | null = null;
    let provider: "groq" | "gemini" = "groq";
    let debugErrors: string[] = [];

    // 1. Primary: Groq (ultra-fast LPU)
    if (groqKey) {
      const groqRes = await callGroq(systemPrompt, messages, groqKey);
      if (groqRes.text) {
        rawAiReply = groqRes.text;
        provider = "groq";
      } else if (groqRes.error) {
        debugErrors.push(groqRes.error);
      }
    }

    // 2. Secondary: Google Gemini
    if (!rawAiReply && geminiKey) {
      const geminiRes = await callGemini(systemPrompt, messages, geminiKey);
      if (geminiRes.text) {
        rawAiReply = geminiRes.text;
        provider = "gemini";
      } else if (geminiRes.error) {
        debugErrors.push(geminiRes.error);
      }
    }

    if (rawAiReply) {
      const extracted = extractTagsAndCleanReply(rawAiReply);
      return NextResponse.json({
        reply: extracted.reply,
        suggestedProducts: extracted.suggestedProductIds,
        showLeadForm: extracted.showLeadForm,
        provider,
      });
    }

    return NextResponse.json(
      {
        error: "AI service temporarily busy.",
        debugErrors,
      },
      { status: 503 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to process AI Agent request.", details: String(err) },
      { status: 500 }
    );
  }
}
