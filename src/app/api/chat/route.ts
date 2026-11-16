import { NextResponse } from "next/server";
import { z } from "zod";
import { COMPANY, PRODUCTS, LanguageCode, ProductItem } from "@/data/initialData";
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

function buildSystemPrompt(lang: LanguageCode): string {
  const catalogSummary = PRODUCTS.map(
    (p) =>
      `- ID: "${p.id}" | Name (EN): ${p.name.en} | Name (AR): ${p.name.ar} | Name (ZH): ${p.name.zh}
  Category: ${p.category} | Grades: ${p.grades.join(", ")}
  Specs: Staple Length=${p.specs.stapleLength}, Moisture=${p.specs.moisture}, Shive Content=${p.specs.shiveContent}, Packing=${p.specs.baleWeight}
  Applications: ${p.applications.en.join("; ")}
  Summary: ${p.description.en}`
  ).join("\n\n");

  const langInstruction =
    lang === "ar"
      ? "Respond primarily in clear, natural, professional Arabic (unless the user writes in another language, then match the user's language)."
      : lang === "zh"
      ? "Respond primarily in natural, professional Simplified Chinese (unless the user writes in another language, then match the user's language)."
      : "Respond primarily in concise, natural, professional B2B English (unless the user writes in Arabic or Chinese, then match their language).";

  return `You are the official AI Export & Technical Assistant for ${COMPANY.brandName} (${COMPANY.legalName}), an ${COMPANY.isoCert} Egyptian flax fiber factory located in ${COMPANY.factoryAddress}, founded in ${COMPANY.foundedYear}.

COMPANY FACTS:
- Annual Production Capacity: ${COMPANY.annualCapacityTons}
- Certifications & Memberships: ${COMPANY.isoCert}, ${COMPANY.councilMembership}
- Export Ports: Alexandria Port & Damietta Port, Egypt (shipping worldwide to China, Europe, Turkey, India, Middle East, Americas)
- Incoterms Supported: FOB Alexandria/Damietta, CFR, CIF
- Container Loading Guidelines (Typical):
  * 40ft High Cube (40'HQ): ~19 to 22 MT for Hydraulic Pressed Scutched/Tow/Cottonised Bales; ~14 to 18 MT for Hackled/Sliver/Plumbing Cartons or Pallets
  * 20ft FCL: ~9 to 11 MT depending on bale density
- Payment & Samples: Lab quality certificates, phytosanitary & Certificate of Origin provided. Physical trial samples (DHL/FedEx/TNT) are available for spinning mills and wholesale buyers.
- Direct Contacts:
  * Email: ${COMPANY.primaryEmail}
  * WhatsApp / Phone: ${COMPANY.egyptPhone1} / ${COMPANY.egyptPhone2}
  * WeChat ID: ${COMPANY.wechatId}
  * RedNote (Xiaohongshu) ID: ${COMPANY.rednoteId}

COMPLETE 10-PRODUCT CATALOG:
${catalogSummary}

BEHAVIOR & FORMATTING RULES:
1. ${langInstruction}
2. Be conversational and directly answer what the user asks. Never repeat previous responses.
3. Use short bullet points for technical specifications (Staple Length, Moisture, Shive %, Grades, Bale Weight) when discussing products.
4. Pricing varies by grade, crop season, order volume (MT / FCL), and Incoterm (FOB vs CIF destination port). Never invent fake dollar prices—instead, explain the grade options and invite the buyer to click "Request Quote / Sample" in the chat or share their destination port and quantity.
5. At the very end of your message, ONLY if 1 or 2 specific products are directly relevant to this specific turn, append a hidden tag on a new line in this exact format:
[PRODUCTS: prod-id-1, prod-id-2]
And if the user is asking for pricing, a quote, samples, or how to order/buy, also append:
[ACTION: QUOTE]`;
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
      temperature: 0.45,
      maxOutputTokens: 700,
    },
  };

  const isVertexKey = apiKey.startsWith("AQ.");
  const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
  let lastError = "";

  const endpointsForModel = (model: string) =>
    isVertexKey
      ? [
          `https://aiplatform.googleapis.com/v1/publishers/google/models/${model}:generateContent?key=${encodeURIComponent(
            apiKey
          )}`,
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
            apiKey
          )}`,
        ]
      : [
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
            apiKey
          )}`,
          `https://aiplatform.googleapis.com/v1/publishers/google/models/${model}:generateContent?key=${encodeURIComponent(
            apiKey
          )}`,
        ];

  for (const model of models) {
    for (const url of endpointsForModel(model)) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errBody = await res.text().catch(() => "");
          lastError = `${res.status}: ${errBody.slice(0, 300)}`;
          console.warn("[AI Agent Gemini Error]", url.split("?")[0], lastError);
          continue;
        }
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (typeof text === "string" && text.trim()) {
          return { text: text.trim() };
        }
      } catch (e) {
        lastError = String(e);
      }
    }
  }
  return { text: null, error: lastError };
}

async function callGroq(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  apiKey: string
): Promise<string | null> {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.45,
        max_tokens: 700,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    return typeof text === "string" && text.trim() ? text.trim() : null;
  } catch {
    return null;
  }
}

/**
 * Rich, context-aware conversational expert engine so every user message
 * gets a tailored, specific response and NEVER repeats a previous message.
 */
function generateBuiltInExpertReply(
  messages: { role: "user" | "assistant"; content: string }[],
  lang: LanguageCode
): {
  reply: string;
  suggestedProductIds: string[];
  showLeadForm: boolean;
} {
  const lastUserMsg =
    [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const q = lastUserMsg.toLowerCase().trim();
  const prevAssistantReplies = new Set(
    messages.filter((m) => m.role === "assistant").map((m) => m.content.trim())
  );

  const effectiveLang: LanguageCode = /[\u0600-\u06FF]/.test(lastUserMsg)
    ? "ar"
    : /[\u4E00-\u9FFF]/.test(lastUserMsg)
    ? "zh"
    : lang;

  // 1. Identity / "who are you" / "what can you do"
  if (
    /who are you|what are you|your name|are you a bot|are you ai|what can you do|how can you help|من أنت|من انت|ما هي وظيفتك|你是谁|你是什么/.test(
      q
    )
  ) {
    if (effectiveLang === "ar") {
      return {
        reply: `أنا **المساعد الفني والتصديري الذكي لمصنع ${COMPANY.brandName}** في طنطا، مصر (${COMPANY.isoCert}).\n\nمهمتي مساعدتك فوراً في:\n1. **ترشيح درجة الكتان المناسبة** لخطوط الغزل أو السباكة أو الدوبار لديك.\n2. **عرض المواصفات المعملية** (طول التيلة، نسبة الساس، الرطوبة، وأوزان البالات).\n3. **تسجيل طلبات عروض الأسعار والعينات (FOB / CIF)** مباشرة لدى إدارة التصدير.\n\nما هو المنتج أو الاستخدام الذي تبحث عنه؟`,
        suggestedProductIds: [],
        showLeadForm: false,
      };
    }
    if (effectiveLang === "zh") {
      return {
        reply: `我是 **${COMPANY.brandName}**（埃及坦塔亚麻工厂，${COMPANY.isoCert}认证）的 **AI 技术与出口助手**。\n\n我可以帮您：\n1. **匹配亚麻等级：** 根据您的纺纱支数 (Nm) 或用途推荐打成长麻、精梳麻、二粗或棉型亚麻。\n2. **查询技术指标：** 提供纤维长度、回潮率、含杂率及打包装柜数据。\n3. **快速对接出口部：** 在线登记您的 FOB/CIF 询价与 DHL 寄样需求。\n\n请问贵司目前主要采购哪类亚麻原料？`,
        suggestedProductIds: [],
        showLeadForm: false,
      };
    }
    return {
      reply: `I am the **AI Technical & Export Assistant for ${COMPANY.brandName}** (${COMPANY.legalName}), an **${COMPANY.isoCert}** flax processing mill in Tanta, Egypt (founded in ${COMPANY.foundedYear}).\n\nI’m here to help you:\n1. **Match the right flax grade** to your spinning frame, blending line, or wholesale trade.\n2. **Check lab specifications** (staple length, shive %, moisture regain, and bale density).\n3. **Log instant FOB/CIF quotes & DHL sample requests** directly with our export desk.\n\nAre you looking for **spinning fibers**, **plumbing flax**, or **twines & seeds**?`,
      suggestedProductIds: [],
      showLeadForm: false,
    };
  }

  // 2. Greetings / "hi" / "hello" / "i want to ask a question"
  if (
    /^(hi|hello|hey|good morning|good evening|good afternoon|greetings|hola|bonjour)\b/.test(q) ||
    /want to ask|have a question|can i ask|need help|help me|مرحبا|اهلا|أهلا|السلام عليكم|عندي سؤال|你好|您好|请问/.test(
      q
    )
  ) {
    if (effectiveLang === "ar") {
      return {
        reply: `أهلاً وسهلاً بك! تفضل بطرح سؤالك.\n\nيمكنك سؤالي عن أي من منتجاتنا (مثل **الكتان الطويل المخدوم**، **الكتان الممشط**، **الكتان المقطن**، **كتان السباكة جوكيا**، أو **الدوبار والبذور**)، أو عن **الأسعار والشحن والعينات**.`,
        suggestedProductIds: [],
        showLeadForm: false,
      };
    }
    if (effectiveLang === "zh") {
      return {
        reply: `您好！很高兴为您服务。请直接输入您的问题——无论是关于**打成长麻、精梳长麻、棉型亚麻、水暖密封麻**的规格参数，还是**FOB/CIF 价格与寄样**，我都可以为您解答！`,
        suggestedProductIds: [],
        showLeadForm: false,
      };
    }
    return {
      reply: `Hello! Glad to help. Go ahead and type your question—you can ask me about any of our **10 Egyptian flax products**, **mill specifications (Grades C, D, E, EK, Nm counts, shive %)**, **container loading**, or **FOB/CIF export quotes & samples**.`,
      suggestedProductIds: [],
      showLeadForm: false,
    };
  }

  // 3. Compare Scutched vs Hackled
  if (
    (q.includes("compare") || q.includes("difference") || q.includes("vs") || q.includes("الفرق") || q.includes("مقارنة") || q.includes("对比") || q.includes("区别")) &&
    (q.includes("scutch") || q.includes("hackl") || q.includes("مخدوم") || q.includes("ممشط") || q.includes("打成") || q.includes("精梳"))
  ) {
    if (effectiveLang === "ar") {
      return {
        reply: `الفرق الأساسي بين **الكتان الطويل المخدوم (Scutched)** و**الكتان الطويل الممشط (Hackled)**:\n\n1. **الكتان الطويل المخدوم (Scutched Long Flax):**\n   • **المرحلة:** ألياف طويلة خام مفصولة عن الساق الخشبية (الساس < 1.2%، طول 650–950 مم).\n   • **الدرجات:** C, D, E, EK, Super Selection.\n   • **الاستخدام:** يغذي خطوط التمشيط في مصانع الغزل الكبرى.\n\n2. **الكتان الطويل الممشط (Hackled Long Flax):**\n   • **المرحلة:** تم تمشيطه بالكامل عبر ماكينات الإبر لإزالة الشعيرات القصيرة والشوائب (نسبة الساس < 0.15%).\n   • **الدرجات:** جاهز للغزل الرفيع Nm 24–36 مباشرة.\n   • **الاستخدام:** مصانع الغزل الرطب للخيوط الكتانية الفاخرة وخيوط الحياكة الصناعية.`,
        suggestedProductIds: ["prod-scutched-long", "prod-hackled-long"],
        showLeadForm: false,
      };
    }
    if (effectiveLang === "zh") {
      return {
        reply: `**打成亚麻长麻 (Scutched)** 与 **精梳亚麻长麻 (Hackled)** 的核心区别如下：\n\n1. **打成亚麻长麻 (Scutched Long Flax):**\n   • **工艺阶段:** 原茎经沤麻与机械打成去屑后的原麻长纤（含杂率 < 1.2%，长度 650–950 mm）。\n   • **等级:** Grade C, D, E, EK, Super Selection。\n   • **用途:** 适合具备前道梳麻机设备的亚麻纺纱厂。\n\n2. **精梳亚麻长麻 (Hackled Long Flax):**\n   • **工艺阶段:** 经多道针排精梳机梳理平行，几乎无麻屑（含杂率 < 0.15%，长度 600–880 mm）。\n   • **等级:** Nm 24–36 高支纺纱专用级。\n   • **用途:** 可直接用于高支湿纺纯亚麻纱及高强工业缝纫线。`,
        suggestedProductIds: ["prod-scutched-long", "prod-hackled-long"],
        showLeadForm: false,
      };
    }
    return {
      reply: `Here is the key difference between **Scutched Long Flax** and **Hackled Long Flax**:\n\n1. **Scutched Long Flax Fibers:**\n   • **Process Stage:** Raw long-line fibers mechanically separated from the woody shive (< 1.2% shive, 650–950 mm length).\n   • **Grades:** C, D, E, EK, Super Selection.\n   • **Best For:** Spinning mills that run their own in-house hackling frames.\n\n2. **Hackled Long Flax Fibers:**\n   • **Process Stage:** Drawn through progressive pinned hackling machines to remove short tow and naps (< 0.15% shive, parallel silky ribbons).\n   • **Grades:** Nm 24–36 Spinning Grade & Fine Combed.\n   • **Best For:** Direct high-count wet linen spinning and technical thread production.`,
      suggestedProductIds: ["prod-scutched-long", "prod-hackled-long"],
      showLeadForm: false,
    };
  }

  // 4. Factory location, history, capacity, ISO certifications, contact info
  if (
    /where|location|address|tanta|egypt|factory|capacity|iso|certif|founded|history|about|contact|phone|whatsapp|wechat|email|أين|مكان|عنوان|طنطا|شهادة|طاقة|قدرة|تأسس|عن الشركة|تواصل|رقم|哪里|地址|工厂|产能|认证|历史|联系|微信|电话/.test(
      q
    ) &&
    !/price|quote|سعر|报价/.test(q)
  ) {
    if (effectiveLang === "ar") {
      return {
        reply: `**معلومات مصنع ${COMPANY.brandName} والتواصل المباشر:**\n• **الموقع:** ${COMPANY.factoryAddress} — مصر.\n• **التأسيس والاعتماد:** تأسس عام ${COMPANY.foundedYear} وحاصل على شهادة **${COMPANY.isoCert}** وعضوية **${COMPANY.councilMembership}**.\n• **الطاقة الإنتاجية:** ${COMPANY.annualCapacityTons} سنوياً.\n• **واتساب / هاتف:** \`${COMPANY.egyptPhone1}\` / \`${COMPANY.egyptPhone2}\`\n• **البريد الإلكتروني:** \`${COMPANY.primaryEmail}\`\n• **WeChat ID:** \`${COMPANY.wechatId}\``,
        suggestedProductIds: [],
        showLeadForm: false,
      };
    }
    if (effectiveLang === "zh") {
      return {
        reply: `**${COMPANY.brandName} 工厂资质与联系方式：**\n• **工厂地址:** 埃及坦塔 (${COMPANY.factoryAddress})，成立于 ${COMPANY.foundedYear} 年。\n• **权威认证:** **${COMPANY.isoCert}** 认证 | ${COMPANY.councilMembership}。\n• **年均产能:** **${COMPANY.annualCapacityTons}**。\n• **官方微信 (WeChat):** \`${COMPANY.wechatId}\`\n• **小红书 (RedNote):** \`${COMPANY.rednoteId}\`\n• **WhatsApp / 电话:** \`${COMPANY.egyptPhone1}\`\n• **出口部邮箱:** \`${COMPANY.primaryEmail}\``,
        suggestedProductIds: [],
        showLeadForm: false,
      };
    }
    return {
      reply: `**${COMPANY.brandName} — Factory & Direct Contacts:**\n• **Mill Address:** ${COMPANY.factoryAddress} (Founded ${COMPANY.foundedYear}).\n• **Credentials:** **${COMPANY.isoCert}** • **${COMPANY.councilMembership}**.\n• **Annual Capacity:** **${COMPANY.annualCapacityTons}** across 10 specialized flax product lines.\n• **WhatsApp / Phone:** \`${COMPANY.egyptPhone1}\` | \`${COMPANY.egyptPhone2}\`\n• **WeChat ID:** \`${COMPANY.wechatId}\` | **RedNote:** \`${COMPANY.rednoteId}\`\n• **Export Email:** \`${COMPANY.primaryEmail}\``,
      suggestedProductIds: [],
      showLeadForm: false,
    };
  }

  // 5. Shipping, Ports, Container Loading, MOQ, Payment, Samples
  const isQuoteOrLogistics =
    /price|quote|cost|how much|fob|cif|cfr|moq|minimum|order|buy|sample|dhl|fedex|container|40hq|20ft|port|ship|payment|lc|tt|ton|سعر|اسعار|أسعار|عرض سعر|بكم|عينات|عينة|شراء|كمية|طن|حاوية|شحن|ميناء|دفع|价格|报价|多少钱|样品|起订量|集装箱|采购|装柜|港口|付款/.test(
      q
    );

  // 6. Product-specific matching
  const keywordMap: { id: string; terms: RegExp }[] = [
    {
      id: "prod-scutched-long",
      terms: /scutch|long flax|long fiber|grade c|grade d|grade e|grade ek|طويل|مخدوم|مقشور|شعر طويل|打成|长麻|原麻/,
    },
    {
      id: "prod-short-arrous",
      terms: /arrous|short fiber|short flax|paper|composite|automotive|insulation|عروس|قصير|ورق|سيارات|عزل|短纤|落麻|造纸|复合材料/,
    },
    {
      id: "prod-hackled-long",
      terms: /hackl|combed|wet spin|nm 24|nm 36|fine linen|ممشط|هاكلد|غزل رفيع|精梳|梳成/,
    },
    {
      id: "prod-hackled-sliver",
      terms: /sliver|tops|ribbon|drawing frame|g\/m|سليفر|شريط|توبس|麻条|精梳条/,
    },
    {
      id: "prod-machine-tow",
      terms: /\btow\b|machine tow|hackling tow|coarse yarn|مشاقة|تو الماكينات|غزل التو|二粗|精梳落麻/,
    },
    {
      id: "prod-cottonised-flax",
      terms: /cotton|open-end|ring spun|32.?38|blend|كوتونايزد|مقطن|قطن|棉型|混纺|气流纺/,
    },
    {
      id: "prod-jokia-dolls",
      terms: /plumb|jokia|sanitary|pipe|thread seal|heating|سباكة|جوكيا|مواسير|عرائس|水暖|密封|管螺纹/,
    },
    {
      id: "prod-flax-spools",
      terms: /spool|dispenser|oem|plastic box|barcode|ديسبنسر|علبة|بكر سباكة|塑料盒|抽线盒|贴牌/,
    },
    {
      id: "prod-puppets",
      terms: /puppet|two-head|four-head|bundle|دمى|رأسين|أربعة رؤوس|双头|四头|麻把/,
    },
    {
      id: "prod-flax-twine",
      terms: /twine|cone|bobbin|ball|upholstery|spring|دوبار|خيط|خيوط|كون|تنجيد|亚麻线|麻绳球|包装线/,
    },
    {
      id: "prod-butcher-twine",
      terms: /butcher|food|culinary|meat|roast|oven|sausage|جزار|غذائ|لحوم|طهي|食品级|捆肉|香肠/,
    },
    {
      id: "prod-flax-ropes-seeds",
      terms: /rope|seed|linseed|oil|sowing|حبل|حبال|بذور|بذرة|زيت|麻绳|亚麻籽|榨油/,
    },
  ];

  const matchedIds = keywordMap
    .filter((entry) => entry.terms.test(q))
    .map((entry) => entry.id);

  if (matchedIds.length === 0) {
    if (/spin|yarn|mill|textile|غزل|نسيج|مصنع|纺纱|纱厂|纺织/.test(q)) {
      matchedIds.push("prod-scutched-long", "prod-hackled-long");
    } else if (/seal|water|fit|سباك|صحية|管道|五金/.test(q)) {
      matchedIds.push("prod-jokia-dolls", "prod-flax-spools");
    }
  }

  const matchedProducts: ProductItem[] = matchedIds
    .slice(0, 2)
    .map((id) => PRODUCTS.find((p) => p.id === id)!)
    .filter(Boolean);

  if (matchedProducts.length > 0) {
    const p = matchedProducts[0];
    if (effectiveLang === "ar") {
      const specsLines = matchedProducts
        .map(
          (item) =>
            `• **${item.name.ar}**\n  - الدرجات: ${item.grades.join(" ، ")}\n  - طول التيلة: ${item.specs.stapleLength} | الرطوبة: ${item.specs.moisture} | نسبة الساس: ${item.specs.shiveContent}\n  - التعبئة: ${item.specs.baleWeight}`
        )
        .join("\n\n");

      return {
        reply: `إليك المواصفات الفنية من مصنع **${COMPANY.brandName}**:\n\n${specsLines}\n\n${
          isQuoteOrLogistics
            ? "نصدر بنظام FOB الإسكندرية/دمياط أو CIF (الحاوية 40 قدم HQ تتسع لنحو 19–22 طن). يمكنك تعبئة النموذج السريع أدناه لطلب عرض سعر أو عينة:"
            : "هل تود طلب عرض سعر رسمي (FOB/CIF) أو عينات تجربة لهذا المنتج؟"
        }`,
        suggestedProductIds: matchedProducts.map((m) => m.id),
        showLeadForm: isQuoteOrLogistics,
      };
    }

    if (effectiveLang === "zh") {
      const specsLines = matchedProducts
        .map(
          (item) =>
            `• **${item.name.zh}**\n  - 等级: ${item.grades.join(", ")}\n  - 纤维长度: ${item.specs.stapleLength} | 回潮率: ${item.specs.moisture} | 含杂率(麻屑): ${item.specs.shiveContent}\n  - 包装规格: ${item.specs.baleWeight}`
        )
        .join("\n\n");

      return {
        reply: `以下是 **${COMPANY.brandName}** 的技术参数：\n\n${specsLines}\n\n${
          isQuoteOrLogistics
            ? "支持亚历山大港 FOB 或中国主要港口 CIF/CFR（40尺高柜可装约19–22吨）。请在下方填写您的采购需求或加微信 **" +
              COMPANY.wechatId +
              "** 获取报价单与寄样！"
            : `需要为您安排 **${p.name.zh}** 的 DHL 样品或最新 FOB/CIF 报价单吗？`
        }`,
        suggestedProductIds: matchedProducts.map((m) => m.id),
        showLeadForm: isQuoteOrLogistics,
      };
    }

    const specsLines = matchedProducts
      .map(
        (item) =>
          `• **${item.name.en}**\n  - **Grades:** ${item.grades.join(", ")}\n  - **Specs:** Length: ${item.specs.stapleLength} | Moisture: ${item.specs.moisture} | Shive: ${item.specs.shiveContent}\n  - **Packing:** ${item.specs.baleWeight}`
      )
      .join("\n\n");

    return {
      reply: `Here are the technical specifications for your inquiry:\n\n${specsLines}\n\n${
        isQuoteOrLogistics
          ? "We ship worldwide from Alexandria & Damietta under **FOB, CFR, and CIF** terms (~19–22 MT per 40'HQ container). Fill out the quick form below to get our current export price & trial samples."
          : `Would you like a **FOB/CIF quote** or **DHL physical samples** for **${p.name.en}**?`
      }`,
      suggestedProductIds: matchedProducts.map((m) => m.id),
      showLeadForm: isQuoteOrLogistics,
    };
  }

  // 7. Quote / shipping / MOQ general question
  if (isQuoteOrLogistics) {
    if (effectiveLang === "ar") {
      return {
        reply: `**تفاصيل التصدير والأسعار والشحن في ${COMPANY.brandName}:**\n• **شروط الشحن:** FOB (الإسكندرية / دمياط) أو CFR / CIF إلى ميناء الوصول.\n• **سعة الحاويات:** حاوية 40 قدم HQ تحمّل 19–22 طن متري (بالات مكبوسة هيدروليكياً)، وحاوية 20 قدم تحمّل 9–11 طن.\n• **العينات:** نرسل عينات فعلية عبر DHL/FedEx للمصانع والمستوردين لاعتماد الجودة.\n\nأدخل اسمك وبريدك والمنتج المطلوب في النموذج أدناه لنرسل لك عرض السعر اليوم:`,
        suggestedProductIds: [],
        showLeadForm: true,
      };
    }
    if (effectiveLang === "zh") {
      return {
        reply: `**${COMPANY.brandName} 出口贸易与装柜说明：**\n• **贸易条款:** FOB 亚历山大港/达米埃塔港，或 CIF/CFR 目的港。\n• **整柜装载量:** 40'HQ 高柜约装 19–22 吨（液压高密打包）；20'GP 约装 9–11 吨。\n• **免费寄样:** 可通过 DHL/FedEx 寄送大货标准样供贵厂实验室检测。\n\n请在下方卡片填写您的邮箱与需求，或添加微信 **${COMPANY.wechatId}** 获取今日报价：`,
        suggestedProductIds: [],
        showLeadForm: true,
      };
    }
    return {
      reply: `**Export Pricing, Container Loads & Samples (${COMPANY.brandName}):**\n• **Incoterms:** FOB Alexandria/Damietta, CFR, or CIF to your destination port.\n• **Container Capacity:** ~19–22 MT per **40'HQ** (hydraulic-pressed bales) or ~9–11 MT per **20'FCL**.\n• **Quality & Docs:** ${COMPANY.isoCert} lab test report, Certificate of Origin, and Phytosanitary Certificate.\n• **Samples:** Physical trial samples shipped via DHL/FedEx.\n\nShare your required product and destination below for a fast proforma quote:`,
      suggestedProductIds: [],
      showLeadForm: true,
    };
  }

  // 8. Guaranteed non-repeating fallback pool
  const fallbackPoolEn = [
    `I can help with technical specs, grades, or export pricing for **${COMPANY.brandName}**. Which of our 4 product categories are you interested in?\n1. **Scutched Raw Flax** (Long-Line Grades C, D, E, EK, Super & Short Arrous)\n2. **Hackled & Spinning Flax** (Hackled Long, Sliver Tops, Machine Tow & 32–38mm Cottonised Flax)\n3. **Plumbing & Sanitary Flax** (Jokia Dolls, Pocket Dispensers & Puppets)\n4. **Natural Twines, Ropes & 99.5% Flax Seeds**`,
    `Could you share a bit more detail about what you need regarding **"${lastUserMsg.slice(0, 60)}"**?\n• If you're a **spinning mill**, tell me your target yarn count (Nm) or spinning system (wet, dry, or cotton ring/OE).\n• If you're a **wholesaler/importer**, let me know your destination port and volume so we can prepare a **FOB/CIF quote**.`,
    `For specific custom requirements on **"${lastUserMsg.slice(0, 60)}"**, our export engineers in Tanta can assist directly:\n• Click **Request Quote / Sample** below to leave your email\n• Or message us on **WhatsApp (${COMPANY.egyptPhone1})** / **WeChat (${COMPANY.wechatId})**`,
  ];

  const fallbackPoolAr = [
    `يمكنني تزويدك بالمواصفات الفنية أو الأسعار التصديرية من مصنع **${COMPANY.brandName}**. أي قسم يهمك؟\n1. **الكتان الخام المخدوم** (الطويل درجات C/D/E/EK والقصير عروس)\n2. **الكتان الممشط والغزل** (الهاكلد، السليفر، التو، والكتان المقطن 32–38 مم)\n3. **كتان السباكة** (عرائس جوكيا، علب ديسبنسر، ودمى السباكة)\n4. **الدوبار وخيوط الجزارة والحبال وبذور الكتان**`,
    `بخصوص استفسارك عن **"${lastUserMsg.slice(0, 60)}"**، هل يمكنك تحديد الدرجة أو الكمية المطلوبة أو ميناء الوصول؟ يمكنك أيضاً الضغط على **طلب عرض سعر / عينة** بالأسفل للتواصل المباشر مع إدارة التصدير.`,
  ];

  const fallbackPoolZh = [
    `关于您提到的 **"${lastUserMsg.slice(0, 60)}"**，请问您需要了解我们四大系列中的哪一款？\n1. **打成原麻系列：** 打成长麻 (C/D/E/EK级) 与原麻短纤 (Arrous)\n2. **精梳与纺纱系列：** 精梳长麻、精梳麻条 (Sliver)、二粗落麻 (Tow) 及棉型亚麻 (32–38mm)\n3. **水暖密封麻系列：** Jokia麻束、塑料抽线盒、双头/四头麻把\n4. **亚麻线/麻绳/亚麻籽：** 1–6股亚麻线、食品级捆肉线及99.5%高净度亚麻籽`,
    `如果您有特定的纺纱支数 (Nm)、定制包装 (OEM) 或目的港报价需求，请点击下方 **索取报价 / 免费寄样** 或直接添加微信 **${COMPANY.wechatId}** 与工厂出口部联系！`,
  ];

  const pool =
    effectiveLang === "ar"
      ? fallbackPoolAr
      : effectiveLang === "zh"
      ? fallbackPoolZh
      : fallbackPoolEn;

  const chosen = pool.find((candidate) => !prevAssistantReplies.has(candidate.trim())) || pool[pool.length - 1];

  return {
    reply: chosen,
    suggestedProductIds: [],
    showLeadForm: false,
  };
}

export async function POST(request: Request) {
  try {
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

      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
      const brevoApiKey = process.env.BREVO_API_KEY;
      const resendApiKey = process.env.RESEND_API_KEY;
      const toEmail = process.env.CONTACT_TO_EMAIL || COMPANY.primaryEmail;
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
        const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL || COMPANY.primaryEmail;
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
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Egy Nile Flax <onboarding@resend.dev>";
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

    const geminiKey = process.env.GEMINI_API_KEY?.trim();
    const groqKey = process.env.GROQ_API_KEY?.trim();

    let rawAiReply: string | null = null;
    let provider: "gemini" | "groq" | "local" = "local";
    let providerDebugError: string | undefined;

    if (geminiKey) {
      const geminiRes = await callGemini(systemPrompt, messages, geminiKey);
      rawAiReply = geminiRes.text;
      if (rawAiReply) {
        provider = "gemini";
      } else {
        providerDebugError = geminiRes.error;
      }
    }

    if (!rawAiReply && groqKey) {
      rawAiReply = await callGroq(systemPrompt, messages, groqKey);
      if (rawAiReply) provider = "groq";
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

    // Built-in zero-cost domain expert fallback
    const localResult = generateBuiltInExpertReply(messages, lang);
    return NextResponse.json({
      reply: localResult.reply,
      suggestedProducts: localResult.suggestedProductIds,
      showLeadForm: localResult.showLeadForm,
      provider: "local",
      ...(process.env.NODE_ENV !== "production" && providerDebugError
        ? { debugError: providerDebugError }
        : {}),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process AI Agent request." },
      { status: 500 }
    );
  }
}
