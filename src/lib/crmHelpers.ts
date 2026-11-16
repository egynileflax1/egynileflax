import { COMPANY } from "@/data/initialData";

export type TemplateLang = "en" | "ar" | "zh";

export interface LocalizedMailTemplate {
  id: string;
  label: string;
  lang: TemplateLang;
  subject: string;
  message: string;
}

export const MULTILANG_B2B_TEMPLATES: LocalizedMailTemplate[] = [
  // ENGLISH
  {
    id: "en_intro",
    label: "Factory Intro (EN)",
    lang: "en",
    subject: "Egyptian Flax Fibre Supply — Egy Nile Flax (ISO 9001:2015 Mill, Tanta)",
    message: `Dear Partner,

We are Egy Nile Flax Overseas Co., an ISO 9001:2015 certified flax fibre processor and exporter based in Tanta, Gharbia, Egypt, serving spinning mills and industrial buyers in 23+ countries since 2008.

With an annual processing capacity of 14,500+ MT, we supply:
• Scutched Long Flax & Short Flax (Arrous)
• Hackled Long Flax, Slivers & Machine Tow
• Cottonised Flax Fibre
• Plumbing Flax & Natural Flax Twines

If you are currently sourcing Egyptian flax for upcoming production runs, we would be glad to share our latest grade specifications, laboratory test reports (moisture & shive %), and FOB/CIF quotations.

Best regards,`,
  },
  {
    id: "en_quote",
    label: "Quotation & Specs (EN)",
    lang: "en",
    subject: "Quotation & Technical Specifications — Egy Nile Flax",
    message: `Dear Partner,

Thank you for your inquiry regarding our Egyptian flax fibre grades.

Please find our preliminary quotation details below:
• Product / Grade: [Specify Grade]
• Staple Length / Shive %: [Specify Specs]
• Moisture Regain: ≤ 11.5%
• Packing: Hydraulic Pressed Bales (120–200 kg)
• Price Basis: FOB Alexandria / Damietta or CIF [Destination Port]
• Lead Time: 14–21 days from order confirmation

Please let us know your target container volume (20ft / 40ft HC) and destination port so we can finalize a formal proforma invoice or arrange physical fibre samples for your lab testing.

Best regards,`,
  },
  {
    id: "en_sample",
    label: "Sample Follow-up (EN)",
    lang: "en",
    subject: "Flax Fibre Samples & Lab Evaluation — Egy Nile Flax",
    message: `Dear Partner,

Following up on your interest in Egy Nile Flax, we can dispatch courier samples of our scutched, hackled, or cottonised grades for your spinning mill's evaluation.

Kindly confirm your preferred grades, shipping address, and contact phone number for courier dispatch.

Best regards,`,
  },

  // CHINESE (中文)
  {
    id: "zh_intro",
    label: "工厂介绍 (中文)",
    lang: "zh",
    subject: "埃及亚麻原料直供 — Egy Nile Flax (ISO 9001:2015 认证埃及坦塔工厂)",
    message: `尊敬的合作伙伴，您好：

我们是埃及尼罗亚麻公司 (Egy Nile Flax Overseas Co.)，位于埃及坦塔 (Tanta) 核心亚麻产区，是通过 ISO 9001:2015 认证的亚麻纤维加工与出口工厂，年加工能力超过 14,500 吨，长期稳定向中国及全球纺纱厂供货。

我厂主要供应品种包括：
• 打成亚麻长麻 (Scutched Long Flax C1–C4) 及短麻/二粗 (Short Flax / Arrous)
• 梳成亚麻 (Hackled Flax)、亚麻条 (Slivers) 及机梳落麻 (Machine Tow)
• 棉化亚麻纤维 (Cottonised Flax Fibre) 及亚麻籽

如贵司近期有埃及亚麻原料采购计划，我们非常乐意为您提供最新批次指标（长度、含杂率、回潮率）、样品寄送及亚历山大港 FOB / 中国主要港口 CIF 报价。

顺祝商祺！`,
  },
  {
    id: "zh_quote",
    label: "报价与技术指标 (中文)",
    lang: "zh",
    subject: "埃及亚麻报价单与技术指标 — Egy Nile Flax",
    message: `尊敬的合作伙伴，您好：

感谢贵司对 Egy Nile Flax 埃及亚麻纤维的询盘。以下为我厂初步报价与技术参数：

• 产品等级：[填写品名与等级]
• 纤维长度 / 含杂率：[填写指标]
• 回潮率：≤ 11.5%
• 包装规格：高密度液压打包（120–200 kg/包，40尺高柜可装约 22–24 吨）
• 价格条款：FOB 亚历山大港 / 达米埃塔港 或 CIF 中国主要港口
• 交货期：确认订单后 14–21 天装船

请告知贵司目标采购柜量（20GP / 40HQ）及目的港，以便我们为您出具正式形式发票（PI）或安排国际快递寄送大货样供贵司实验室检测。

顺祝商祺！`,
  },
  {
    id: "zh_sample",
    label: "寄样跟进 (中文)",
    lang: "zh",
    subject: "埃及亚麻样品寄送确认 — Egy Nile Flax",
    message: `尊敬的合作伙伴，您好：

跟进贵司此前对埃及亚麻原料的采购需求，我厂可随时通过 DHL / FedEx 寄送最新批次打成麻、二粗或梳成麻样品供贵司试纺检测。

请确认您需要的具体等级、收件地址及联系电话，我们将第一时间安排寄出并提供运单号。

顺祝商祺！`,
  },

  // ARABIC (العربية)
  {
    id: "ar_intro",
    label: "تعريف بالمصنع (AR)",
    lang: "ar",
    subject: "توريد ألياف الكتان المصري — شركة إيجي نايل فلاكس (طنطا - معتمد ISO 9001)",
    message: `السادة الأفاضل، تحية طيبة وبعد،

نحن شركة إيجي نايل فلاكس (Egy Nile Flax Overseas Co.) لتصنيع وتصدير ألياف الكتان المصري بمدينة طنطا - محافظة الغربية، حاصلون على شهادة الأيزو ISO 9001:2015 بطاقة إنتاجية تتجاوز 14,500 طن سنوياً.

نقوم بتوريد وتصدير كافة درجات الكتان المصري:
• كتان طويل مدمك (Scutched Long Flax) وكتان قصير / عروس (Arrous)
• كتان ممشط (Hackled) وشرائط كتان ومشاقة (Tow)
• كتان مقطن للغزل وحبال ودوبارة وبذور كتان

يسعدنا تزويدكم بأحدث المواصفات الفنية ونتائج الفحص المعملي وعروض الأسعار (تسليم المصنع أو FOB الإسكندرية / دمياط).

وتفضلوا بقبول فائق الاحترام،`,
  },
  {
    id: "ar_quote",
    label: "عرض سعر ومواصفات (AR)",
    lang: "ar",
    subject: "عرض سعر ومواصفات فنية لألياف الكتان — Egy Nile Flax",
    message: `السادة الأفاضل، تحية طيبة وبعد،

نشكر تواصلكم مع شركة إيجي نايل فلاكس. مرفق لسيادتكم تفاصيل عرض السعر المبدئي:

• الصنف والدرجة: [تحديد الصنف]
• نسبة الرطوبة: ≤ 11.5%
• التعبئة: بالات مكبوسة هيدروليكياً (120–200 كجم)
• شروط التسليم: FOB الإسكندرية / دمياط أو CIF ميناء الوصول
• مدة التجهيز والشحن: 14–21 يوماً من تأكيد الطلب

برجاء إفادتنا بالكمية المطلوبة وميناء الوصول لإصدار الفاتورة المبدئية (Proforma Invoice) أو إرسال عينات للفحص.

وتفضلوا بقبول فائق الاحترام،`,
  },
];

export function buildLeadQuickReply(
  lead: {
    name: string;
    company?: string;
    product?: string;
    quantity?: string;
    incoterm?: string;
    quoted_price?: string;
    container_volume?: string;
    sample_tracking?: string;
    lang?: string;
  },
  lang: TemplateLang,
  kind: "quote" | "sample" | "followup" = "quote"
): { subject: string; message: string } {
  const productLabel = lead.product || (lang === "zh" ? "埃及亚麻纤维" : lang === "ar" ? "ألياف الكتان المصري" : "Egyptian flax fibre");
  const priceLine = lead.quoted_price || (lang === "zh" ? "[待确认 USD/MT]" : "[Specify USD/MT]");
  const incotermLine = lead.incoterm || "FOB Alexandria";
  const volumeLine = lead.container_volume || lead.quantity || "1x 40ft HC (~22–24 MT)";

  if (lang === "zh") {
    if (kind === "sample") {
      return {
        subject: `样品寄送与物流跟踪 (${productLabel}) — Egy Nile Flax`,
        message: `尊敬的 ${lead.name}，您好：\n\n感谢贵司${lead.company ? ` (${lead.company})` : ""}对 Egy Nile Flax 埃及亚麻原料的关注。\n\n关于您询盘的 ${productLabel}，${
          lead.sample_tracking
            ? `我们已为您安排寄出样品，国际快递单号为：${lead.sample_tracking}。`
            : "我们可随时为您安排寄送最新批次大货样品供贵司实验室检测。"
        }\n\n收到样品或有任何指标问题，请随时与我们联系。\n\n顺祝商祺！`,
      };
    }
    return {
      subject: `回复：${productLabel} 报价与指标 — Egy Nile Flax`,
      message: `尊敬的 ${lead.name}，您好：\n\n感谢贵司${lead.company ? ` (${lead.company})` : ""}联系 Egy Nile Flax 询购 ${productLabel}。\n\n以下为我厂针对贵司需求整理的报价参数：\n• 产品等级：${productLabel}\n• 数量 / 柜量：${volumeLine}\n• 贸易条款：${incotermLine}\n• 参考单价：${priceLine}\n• 回潮率：≤ 11.5%（高密度液压打包 120–200 kg/包）\n\n请问贵司是否需要我们先寄送大货样检测，或出具正式形式发票 (Proforma Invoice)？\n\n顺祝商祺！`,
    };
  }

  if (lang === "ar") {
    if (kind === "sample") {
      return {
        subject: `متابعة عينات الكتان المصري (${productLabel}) — Egy Nile Flax`,
        message: `الأستاذ / ${lead.name} المحترم،\n\nتحية طيبة من شركة إيجي نايل فلاكس.\n\nبخصوص استفساركم عن ${productLabel}، ${
          lead.sample_tracking
            ? `تم إرسال العينات ورقم تتبع الشحنة هو: ${lead.sample_tracking}.`
            : "يسعدنا إرسال عينات من أحدث الإنتاج لفحصها لديكم."
        }\n\nنسعد بتواصلكم لتأكيد استلام العينات ومناقشة الكميات المطلوبة.\n\nوتفضلوا بقبول فائق الاحترام،`,
      };
    }
    return {
      subject: `عرض سعر: ${productLabel} — إيجي نايل فلاكس`,
      message: `الأستاذ / ${lead.name} المحترم،\n\nشكراً لتواصلكم مع شركة إيجي نايل فلاكس بخصوص ${productLabel}.\n\nتفاصيل العرض المبدئي:\n• الصنف: ${productLabel}\n• الكمية / الحاوية: ${volumeLine}\n• شروط التسليم: ${incotermLine}\n• السعر: ${priceLine}\n• نسبة الرطوبة: ≤ 11.5% (بالات مكبوسة 120–200 كجم)\n\nيرجى إبلاغنا في حال رغبتكم في إصدار فاتورة مبدئية أو إرسال عينات.\n\nوتفضلوا بقبول فائق الاحترام،`,
    };
  }

  // Default English
  if (kind === "sample") {
    return {
      subject: `Flax Fibre Samples (${productLabel}) — Egy Nile Flax`,
      message: `Dear ${lead.name},\n\nThank you for your interest in Egy Nile Flax regarding ${productLabel}.\n\n${
        lead.sample_tracking
          ? `Your physical flax fibre samples have been dispatched. Courier Tracking: ${lead.sample_tracking}.`
          : "We have prepared representative fibre samples from our current Tanta mill lot and can dispatch them immediately via courier."
      }\n\nPlease let us know once your laboratory team reviews the staple length and shive content so we can finalize your shipment schedule.\n\nBest regards,`,
    };
  }

  return {
    subject: `Re: ${productLabel} Quotation — Egy Nile Flax`,
    message: `Dear ${lead.name},\n\nThank you for contacting Egy Nile Flax regarding ${productLabel}.\n\nBased on your inquiry, please find our mill quotation summary:\n• Product / Grade: ${productLabel}\n• Volume / Packing: ${volumeLine} (Hydraulic Pressed Bales, 120–200 kg)\n• Incoterm: ${incotermLine}\n• Quoted Price: ${priceLine}\n• Quality Standard: ISO 9001:2015 • Moisture ≤ 11.5%\n\nWould you like us to issue a formal Proforma Invoice or dispatch physical samples for your spinning trial?\n\nBest regards,`,
  };
}

export function cleanPhoneDigits(raw: string): string {
  const firstPart = raw.split(/[/,;]/)[0]?.trim() || "";
  let digits = firstPart.replace(/[^\d+]/g, "");
  if (digits.startsWith("00")) {
    digits = "+" + digits.slice(2);
  } else if (digits.startsWith("01") && digits.length === 11) {
    // Egyptian local mobile number e.g. 010...
    digits = "+20" + digits.slice(1);
  }
  return digits;
}

export function toTelHref(raw: string): string | null {
  const cleaned = cleanPhoneDigits(raw);
  return cleaned.length >= 7 ? `tel:${cleaned}` : null;
}

export function toWhatsAppHref(raw: string, text?: string): string | null {
  const cleaned = cleanPhoneDigits(raw).replace(/^\+/, "");
  if (cleaned.length < 8) return null;
  const base = `https://wa.me/${cleaned}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function toTrackingHref(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const lower = trimmed.toLowerCase();
  const code = trimmed.replace(/^(dhl|fedex|ups|aramex|ems)[\s:#-]*/i, "").trim();
  if (!code) return null;

  if (lower.includes("dhl")) {
    return `https://www.dhl.com/en/express/tracking.html?AWB=${encodeURIComponent(code)}`;
  }
  if (lower.includes("fedex")) {
    return `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(code)}`;
  }
  if (lower.includes("ups")) {
    return `https://www.ups.com/track?tracknum=${encodeURIComponent(code)}`;
  }
  if (lower.includes("aramex")) {
    return `https://www.aramex.com/us/en/track/shipments?ShipmentNumber=${encodeURIComponent(code)}`;
  }
  return `https://t.17track.net/en#nums=${encodeURIComponent(code)}`;
}

export interface QuotationDocumentInput {
  quoteNumber?: string;
  buyerName: string;
  company?: string;
  email?: string;
  phone?: string;
  country?: string;
  product: string;
  quantity?: string;
  containerVolume?: string;
  incoterm?: string;
  quotedPrice?: string;
  sampleTracking?: string;
  notes?: string;
}

function toAsciiSafe(input: string): string {
  return input
    .replace(/[—–]/g, "-")
    .replace(/[•·]/g, "*")
    .replace(/≤/g, "<=")
    .replace(/≥/g, ">=")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pdfEscape(input: string): string {
  return toAsciiSafe(input)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

/**
 * Generates a valid single-page PDF-1.4 document in base64 format
 * ready to attach to Brevo / Resend emails without external libraries.
 */
export function generateQuotationPdfBase64(input: QuotationDocumentInput): {
  filename: string;
  base64: string;
} {
  const dateStr = new Date().toISOString().slice(0, 10);
  const quoteNo = input.quoteNumber || `ENF-${dateStr.replace(/-/g, "")}-${Math.floor(100 + Math.random() * 900)}`;

  const lines: Array<{ y: number; size: number; bold?: boolean; text: string }> = [
    { y: 785, size: 16, bold: true, text: "EGY NILE FLAX OVERSEAS CO." },
    { y: 767, size: 9, text: "Tanta, Gharbia, Egypt | ISO 9001:2015 Certified | Textile Export Council (TEC)" },
    { y: 753, size: 9, text: `Email: ${COMPANY.primaryEmail} | Tel/WhatsApp: ${COMPANY.egyptPhone1} | Web: egynileflax.com` },
    { y: 722, size: 13, bold: true, text: `OFFICIAL B2B QUOTATION & SPECIFICATION SHEET (${quoteNo})` },
    { y: 704, size: 10, text: `Issue Date: ${dateStr}      Validity: 14 Calendar Days` },

    { y: 674, size: 11, bold: true, text: "1. BUYER / CONSIGNEE DETAILS" },
    { y: 656, size: 10, text: `Attention: ${input.buyerName || "Valued Buyer"}` },
    { y: 640, size: 10, text: `Company:   ${input.company || "-"}` },
    { y: 624, size: 10, text: `Email:     ${input.email || "-"}      Phone: ${input.phone || "-"}` },
    { y: 608, size: 10, text: `Country:   ${input.country || "-"}` },

    { y: 576, size: 11, bold: true, text: "2. COMMERCIAL & TECHNICAL OFFER" },
    { y: 556, size: 10, bold: true, text: `Flax Grade / Product:  ${input.product || "Egyptian Scutched / Hackled Flax Fibre"}` },
    { y: 538, size: 10, text: `Target Volume / Qty:   ${input.containerVolume || input.quantity || "1x 40ft HC (~22-24 MT)"}` },
    { y: 520, size: 10, text: `Incoterm (2020):       ${input.incoterm || "FOB Alexandria / Damietta, Egypt"}` },
    { y: 502, size: 10, bold: true, text: `Quoted Unit Price:     ${input.quotedPrice || "Upon Final Grade & Volume Confirmation"}` },

    { y: 470, size: 11, bold: true, text: "3. STANDARD MILL SPECIFICATIONS & EXPORT PACKING" },
    { y: 452, size: 10, text: "* Origin:          100% Nile Delta Crop, Tanta Mill, Arab Republic of Egypt" },
    { y: 436, size: 10, text: "* Moisture Regain: <= 11.5% (ISO 9001:2015 Lab Certified prior to loading)" },
    { y: 420, size: 10, text: "* Packing:         High-Density Hydraulic Pressed Bales (120-200 kg/bale, polypropylene strapped)" },
    { y: 404, size: 10, text: "* Container Load:  20ft FCL (~9-11 MT) | 40ft High Cube (~22-24 MT)" },
    { y: 388, size: 10, text: "* Export Docs:     Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Cert, B/L" },
    { y: 372, size: 10, text: "* Lead Time:       14-21 days from confirmed order / L/C or T/T deposit" },
  ];

  if (input.sampleTracking) {
    lines.push({
      y: 344,
      size: 10,
      bold: true,
      text: `Sample Courier Tracking: ${input.sampleTracking}`,
    });
  }

  if (input.notes) {
    const cleanNote = toAsciiSafe(input.notes).slice(0, 180);
    if (cleanNote) {
      lines.push({ y: 318, size: 10, bold: true, text: "Additional Remarks:" });
      lines.push({ y: 302, size: 9, text: cleanNote });
    }
  }

  lines.push({
    y: 240,
    size: 9,
    bold: true,
    text: "Authorized by: Egy Nile Flax Export Desk (Tanta, Gharbia, Egypt)",
  });

  const streamOps: string[] = [
    "0.247 0.086 0.420 rg",
    "48 742 516 2 re f",
    "0.11 0.10 0.12 rg",
  ];

  for (const item of lines) {
    const font = item.bold ? "/F2" : "/F1";
    streamOps.push(`BT ${font} ${item.size} Tf 50 ${item.y} Td (${pdfEscape(item.text)}) Tj ET`);
  }

  const streamContent = streamOps.join("\n");

  const objects: string[] = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
    `6 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const safeSlug = (input.company || input.buyerName || "Buyer")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);

  const base64 = typeof window !== "undefined" ? window.btoa(pdf) : Buffer.from(pdf, "binary").toString("base64");
  return {
    filename: `EgyNileFlax-Quotation-${safeSlug || "Offer"}.pdf`,
    base64,
  };
}

/**
 * Opens a styled, printable Official Proforma Quotation in a new browser tab
 * and triggers the browser Print / Save-as-PDF dialog.
 */
export function openPrintableQuotationWindow(input: QuotationDocumentInput): void {
  if (typeof window === "undefined") return;
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const quoteNo = `ENF-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;

  const esc = (s?: string) =>
    String(s || "—")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Egy Nile Flax Quotation — ${esc(input.company || input.buyerName)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1c1917;
      background: #FAF8F5;
      margin: 0;
      padding: 28px;
    }
    .sheet {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e7e5e4;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0,0,0,0.06);
    }
    .header {
      background: #3F166B;
      color: #ffffff;
      padding: 24px 30px;
      border-bottom: 4px solid #EDC271;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
    }
    .brand {
      font-size: 20px;
      font-weight: 800;
      color: #EDC271;
      letter-spacing: 0.02em;
    }
    .sub {
      font-size: 12px;
      color: #f5f5f4;
      margin-top: 4px;
      line-height: 1.5;
    }
    .meta {
      text-align: right;
      font-size: 12px;
      line-height: 1.6;
    }
    .body {
      padding: 28px 30px;
    }
    h2 {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #3F166B;
      border-bottom: 1px solid #e7e5e4;
      padding-bottom: 6px;
      margin: 22px 0 12px 0;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 24px;
      font-size: 13px;
    }
    .row strong {
      color: #57534e;
      display: inline-block;
      width: 135px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 13px;
    }
    th, td {
      border: 1px solid #e7e5e4;
      padding: 10px 12px;
      text-align: left;
    }
    th {
      background: #FAF8F5;
      color: #3F166B;
      font-weight: 700;
    }
    .specs {
      background: #FAF8F5;
      border: 1px solid #e7e5e4;
      border-radius: 10px;
      padding: 14px 18px;
      font-size: 12.5px;
      line-height: 1.7;
    }
    .footer {
      margin-top: 28px;
      padding-top: 16px;
      border-top: 1px solid #e7e5e4;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #57534e;
    }
    .print-bar {
      max-width: 800px;
      margin: 0 auto 14px auto;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    .btn {
      background: #3F166B;
      color: #EDC271;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 12px;
      cursor: pointer;
    }
    @media (max-width: 640px) {
      body { padding: 12px; }
      .header { flex-direction: column; padding: 18px; }
      .meta { text-align: left; }
      .body { padding: 18px; }
      .grid { grid-template-columns: 1fr; }
      table { display: block; overflow-x: auto; white-space: nowrap; }
      .footer { flex-direction: column; gap: 10px; }
      .footer div { text-align: left !important; }
    }
    @media print {
      body { background: #fff; padding: 0; }
      .sheet { border: none; box-shadow: none; }
      .print-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <button class="btn" onclick="window.print()">Print / Save as PDF</button>
  </div>
  <div class="sheet">
    <div class="header">
      <div>
        <div class="brand">EGY NILE FLAX OVERSEAS CO.</div>
        <div class="sub">
          Tanta, Gharbia Governorate, Egypt &bull; ISO 9001:2015 Certified Mill<br/>
          Member of Textile Export Council of Egypt (TEC) &bull; Est. 2008
        </div>
      </div>
      <div class="meta">
        <strong>PROFORMA QUOTATION</strong><br/>
        Ref: ${esc(quoteNo)}<br/>
        Date: ${esc(dateStr)}<br/>
        Validity: 14 Days
      </div>
    </div>
    <div class="body">
      <h2>1. Buyer / Consignee Information</h2>
      <div class="grid">
        <div class="row"><strong>Contact Person:</strong> ${esc(input.buyerName)}</div>
        <div class="row"><strong>Company / Mill:</strong> ${esc(input.company)}</div>
        <div class="row"><strong>Email:</strong> ${esc(input.email)}</div>
        <div class="row"><strong>Phone / WhatsApp:</strong> ${esc(input.phone)}</div>
        <div class="row"><strong>Destination:</strong> ${esc(input.country)}</div>
        <div class="row"><strong>Incoterm (2020):</strong> ${esc(input.incoterm || "FOB Alexandria / Damietta")}</div>
      </div>

      <h2>2. Commercial Offer &amp; Grade Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Egyptian Flax Product / Grade</th>
            <th>Volume / Container Load</th>
            <th>Incoterm</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>${esc(input.product || "Egyptian Flax Fibre")}</strong></td>
            <td>${esc(input.containerVolume || input.quantity || "1x 40ft HC (~22–24 MT)")}</td>
            <td>${esc(input.incoterm || "FOB Alexandria")}</td>
            <td><strong>${esc(input.quotedPrice || "To Be Confirmed")}</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>3. Technical Quality &amp; Export Packing Specifications</h2>
      <div class="specs">
        &bull; <strong>Origin:</strong> 100% Nile Delta Flax Crop — Processed at Tanta Mill, Egypt<br/>
        &bull; <strong>Moisture Regain:</strong> &le; 11.5% (ISO 9001:2015 laboratory tested prior to container stuffing)<br/>
        &bull; <strong>Export Packing:</strong> High-density hydraulic pressed bales (120–200 kg per bale, PP woven wrap &amp; straps)<br/>
        &bull; <strong>Standard Container Capacity:</strong> 20ft FCL (~9–11 MT) &bull; 40ft High Cube (~22–24 MT)<br/>
        &bull; <strong>Export Documentation:</strong> Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Certificate, Fumigation Certificate, Bill of Lading<br/>
        ${input.sampleTracking ? `&bull; <strong>Sample Courier Tracking:</strong> ${esc(input.sampleTracking)}<br/>` : ""}
        ${input.notes ? `&bull; <strong>Remarks:</strong> ${esc(input.notes)}` : ""}
      </div>

      <div class="footer">
        <div>
          <strong>Egy Nile Flax Overseas Co.</strong><br/>
          Email: ${esc(COMPANY.primaryEmail)} &bull; Tel/WhatsApp: ${esc(COMPANY.egyptPhone1)}
        </div>
        <div style="text-align:right;">
          Authorized Export Desk Signature<br/>
          <em>Tanta Mill, Arab Republic of Egypt</em>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=800");
  if (w) {
    w.document.open();
    w.document.write(html);
    w.document.close();
  }
}
