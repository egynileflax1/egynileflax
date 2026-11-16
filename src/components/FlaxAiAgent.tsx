"use client";

import React, { useState, useRef, useEffect } from "react";
import { useFlax } from "@/context/FlaxContext";
import { LanguageCode, ProductItem } from "@/data/initialData";
import {
  Sparkles,
  X,
  Send,
  FileText,
  Check,
  ChevronRight,
  RotateCcw,
  Ruler,
  Droplets,
  Package,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedProducts?: string[];
  showLeadForm?: boolean;
}

interface AgentTranslations {
  badge: string;
  title: string;
  statusLine: string;
  welcome: string;
  placeholder: string;
  send: string;
  thinking: string;
  requestQuoteBtn: string;
  resetChat: string;
  quickPrompts: string[];
  leadFormTitle: string;
  leadFormSubtitle: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  companyPlaceholder: string;
  phonePlaceholder: string;
  countryPlaceholder: string;
  quantityPlaceholder: string;
  submitLeadBtn: string;
  submittingLead: string;
  leadSuccessTitle: string;
  leadSuccessDesc: string;
  selectProductPlaceholder: string;
  inquireThisProduct: string;
}

const AGENT_UI: Record<LanguageCode, AgentTranslations> = {
  en: {
    badge: "Ask AI",
    title: "Flax Technical Assistant",
    statusLine: "Instant specs, grades & export quotes",
    welcome:
      "Hi! How can I help you today? Ask about our **flax grades**, **technical specs**, or request a **FOB/CIF quote**.",
    placeholder: "Ask a question...",
    send: "Send",
    thinking: "Thinking...",
    requestQuoteBtn: "Get Quote",
    resetChat: "Clear chat",
    quickPrompts: [
      "Scutched vs Hackled specs",
      "Flax grades for spinning",
      "FOB/CIF quote & samples",
    ],
    leadFormTitle: "Quick Quote / Sample Request",
    leadFormSubtitle: "Sent directly to our export team — reply within 24h.",
    namePlaceholder: "Your Name *",
    emailPlaceholder: "Business Email *",
    companyPlaceholder: "Company / Mill Name",
    phonePlaceholder: "WhatsApp / WeChat / Phone",
    countryPlaceholder: "Destination Country / Port",
    quantityPlaceholder: "Quantity (e.g. 1x 40'HQ / Sample)",
    submitLeadBtn: "Send Request",
    submittingLead: "Sending...",
    leadSuccessTitle: "Request Sent!",
    leadSuccessDesc:
      "Our export desk has received your details and will reply shortly.",
    selectProductPlaceholder: "Select Product (Optional)",
    inquireThisProduct: "Get Quote / Sample",
  },
  ar: {
    badge: "المساعد الذكي",
    title: "مساعد المبيعات والمواصفات",
    statusLine: "مواصفات الكتان والدرجات وعروض الأسعار",
    welcome:
      "مرحباً بك! كيف يمكنني مساعدتك اليوم؟ اسألني عن **درجات الكتان**، **المواصفات الفنية**، أو اطلب **عرض سعر وعينات**.",
    placeholder: "اكتب سؤالك هنا...",
    send: "إرسال",
    thinking: "جاري الكتابة...",
    requestQuoteBtn: "طلب سعر",
    resetChat: "مسح المحادثة",
    quickPrompts: [
      "الفرق بين المخدوم والممشط",
      "درجات الكتان لمصانع الغزل",
      "طلب عرض سعر FOB/CIF وعينات",
    ],
    leadFormTitle: "طلب عرض سعر أو عينة سريعة",
    leadFormSubtitle: "يصل مباشرة لقسم التصدير للرد خلال 24 ساعة.",
    namePlaceholder: "الاسم الكامل *",
    emailPlaceholder: "البريد الإلكتروني *",
    companyPlaceholder: "اسم الشركة / المصنع",
    phonePlaceholder: "واتساب / الهاتف",
    countryPlaceholder: "الدولة / الميناء",
    quantityPlaceholder: "الكمية (مثال: حاوية 40 قدم / عينة)",
    submitLeadBtn: "إرسال الطلب",
    submittingLead: "جاري الإرسال...",
    leadSuccessTitle: "تم استلام طلبك!",
    leadSuccessDesc:
      "سيتواصل معك فريق التصدير بعرض السعر والمواصفات في أقرب وقت.",
    selectProductPlaceholder: "اختر المنتج (اختياري)",
    inquireThisProduct: "اطلب سعر / عينة",
  },
  zh: {
    badge: "AI 助手",
    title: "亚麻技术与出口助手",
    statusLine: "规格参数 • 等级选型 • FOB/CIF 报价",
    welcome:
      "您好！请问有什么可以帮您？您可以咨询**亚麻等级**、**技术参数**，或直接索取 **FOB/CIF 报价单与样品**。",
    placeholder: "输入您的问题...",
    send: "发送",
    thinking: "正在思考...",
    requestQuoteBtn: "索取报价",
    resetChat: "清空对话",
    quickPrompts: [
      "打成长麻与精梳麻对比",
      "纺纱用亚麻等级推荐",
      "索取 FOB/CIF 报价与寄样",
    ],
    leadFormTitle: "快速索取报价单与样品",
    leadFormSubtitle: "直达工厂出口部，24小时内回复。",
    namePlaceholder: "您的姓名 *",
    emailPlaceholder: "企业邮箱 *",
    companyPlaceholder: "公司 / 纱厂名称",
    phonePlaceholder: "微信号 (WeChat) / 电话",
    countryPlaceholder: "目的港 / 国家",
    quantityPlaceholder: "采购量 (如: 1x40'HQ / 寄样)",
    submitLeadBtn: "提交需求",
    submittingLead: "提交中...",
    leadSuccessTitle: "已提交成功！",
    leadSuccessDesc:
      "我们的出口团队已收到您的需求，将尽快为您发送报价单（或加微信 hazem_1111）。",
    selectProductPlaceholder: "选择产品 (可选)",
    inquireThisProduct: "索取该产品报价",
  },
};

function renderInlineFormatting(rawText: string) {
  // Ensure pipe characters have spaces around them so browser word-wrapping never overflows
  const text = rawText.replace(/([^\s|])\|([^\s|])/g, "$1 | $2");
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-stone-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="px-1 py-0.5 rounded bg-stone-100 text-[#3F166B] font-mono text-[11px]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function renderFormattedText(text: string) {
  const lines = text.split("\n");
  return lines.map((rawLine, lineIdx) => {
    const line = rawLine.trim();

    // Empty line spacer
    if (!line) {
      return <span key={lineIdx} className="block h-1.5" />;
    }

    // Skip markdown table separator rows like |---|---|
    if (/^\|?[\s:-]+\|[\s|:-]+\|?$/.test(line) || /^-{3,}$/.test(line)) {
      return null;
    }

    // Markdown headings (###, ##, #)
    const headingMatch = line.match(/^#{1,4}\s+(.+)$/);
    if (headingMatch) {
      return (
        <span
          key={lineIdx}
          className="block font-extrabold text-[#3F166B] text-xs pt-2 pb-0.5"
        >
          {renderInlineFormatting(headingMatch[1].replace(/\*\*/g, ""))}
        </span>
      );
    }

    // Markdown pipe table row: | Key | Value | -> clean key/value line
    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cells.length === 0) return null;
      return (
        <span
          key={lineIdx}
          className="block py-1 px-2 my-0.5 rounded-lg bg-stone-50 border border-stone-200/70 text-[11px]"
        >
          {cells.map((cell, cIdx) => (
            <React.Fragment key={cIdx}>
              {cIdx > 0 && <span className="text-stone-400 mx-1.5">•</span>}
              <span className={cIdx === 0 ? "font-semibold text-stone-800" : ""}>
                {renderInlineFormatting(cell)}
              </span>
            </React.Fragment>
          ))}
        </span>
      );
    }

    // Bullet points (- , * , • )
    const bulletMatch = line.match(/^[-*•]\s+(.+)$/);
    if (bulletMatch) {
      return (
        <span key={lineIdx} className="flex items-start gap-1.5 py-0.5 min-w-0">
          <span className="text-[#3F166B] font-bold select-none shrink-0">•</span>
          <span className="flex-1 min-w-0 break-words">
            {renderInlineFormatting(bulletMatch[1])}
          </span>
        </span>
      );
    }

    return (
      <span key={lineIdx} className="block py-0.5 break-words">
        {renderInlineFormatting(rawLine)}
      </span>
    );
  });
}

export default function FlaxAiAgent() {
  const { lang, products, company } = useFlax();
  const ui = AGENT_UI[lang] || AGENT_UI.en;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadDrawer, setShowLeadDrawer] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [sheetDragY, setSheetDragY] = useState(0);
  const [isDraggingSheet, setIsDraggingSheet] = useState(false);
  const dragStartYRef = useRef<number | null>(null);

  const handleSheetPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartYRef.current = e.clientY;
    setIsDraggingSheet(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleSheetPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) return;
    const deltaY = Math.max(0, e.clientY - dragStartYRef.current);
    setSheetDragY(deltaY);
  };

  const closeAiSheet = () => {
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsOpen(false);
  };

  const handleSheetPointerEnd = () => {
    if (dragStartYRef.current === null) return;
    if (sheetDragY > 70) {
      closeAiSheet();
    }
    dragStartYRef.current = null;
    setIsDraggingSheet(false);
    setSheetDragY(0);
  };

  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    product: "",
    quantity: "",
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleCloseAi = () => closeAiSheet();
    const handleOpenAi = () => setIsOpen(true);
    window.addEventListener("egynileflax:close-ai", handleCloseAi);
    window.addEventListener("egynileflax:open-ai", handleOpenAi);
    return () => {
      window.removeEventListener("egynileflax:close-ai", handleCloseAi);
      window.removeEventListener("egynileflax:open-ai", handleOpenAi);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, showLeadDrawer, isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent("egynileflax:close-nav"));
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const trimmed = (textToSend ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          lang,
          messages: nextMessages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: AbortSignal.timeout(9000),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: data.reply,
          suggestedProducts: Array.isArray(data.suggestedProducts)
            ? data.suggestedProducts
            : [],
          showLeadForm: Boolean(data.showLeadForm),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        if (data.showLeadForm && !leadSubmitted) {
          setShowLeadDrawer(true);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            content:
              lang === "ar"
                ? `يمكنك التواصل مباشرة عبر واتساب ${company.egyptPhone1} أو البريد ${company.primaryEmail}.`
                : lang === "zh"
                ? `请直接通过微信 (${company.wechatId}) 或邮箱 (${company.primaryEmail}) 联系我们。`
                : `You can reach us directly on WhatsApp (${company.egyptPhone1}) or email (${company.primaryEmail}).`,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            lang === "ar"
              ? `حدث خطأ في الاتصال. واتساب: ${company.egyptPhone1}`
              : lang === "zh"
              ? `网络异常，请添加微信: ${company.wechatId}`
              : `Connection interrupted. WhatsApp: ${company.egyptPhone1}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenQuoteForProduct = (prod: ProductItem) => {
    const prodLabel = prod.name[lang] || prod.name.en;
    setLeadForm((prev) => ({ ...prev, product: prodLabel }));
    setLeadSubmitted(false);
    setShowLeadDrawer(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError("");

    if (leadForm.name.trim().length < 2 || !leadForm.email.includes("@")) {
      setLeadError(
        lang === "ar"
          ? "يرجى إدخال الاسم والبريد الإلكتروني الصحيح."
          : lang === "zh"
          ? "请填写您的姓名和有效的电子邮箱。"
          : "Please enter your name and a valid email address."
      );
      return;
    }

    setLeadSubmitting(true);
    try {
      const chatContextSummary = messages
        .slice(-4)
        .map((m) => `${m.role === "user" ? "Buyer" : "AI"}: ${m.content.slice(0, 180)}`)
        .join(" | ");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "lead",
          lang,
          ...leadForm,
          notes: chatContextSummary
            ? `[AI Agent Chat] ${chatContextSummary}`
            : "Submitted via AI Export Assistant",
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setLeadSubmitted(true);
    } catch {
      setLeadError(
        lang === "ar"
          ? "تعذر الإرسال، يرجى المحاولة مرة أخرى."
          : lang === "zh"
          ? "提交失败，请重试或联系微信 hazem_1111。"
          : "Could not submit right now. Please try again."
      );
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <>
      {/* Mobile Dimmed Backdrop (z-[55] dims the top navbar so there are never two competing headers) */}
      <div
        aria-hidden={!isOpen}
        onClick={closeAiSheet}
        className={`sm:hidden fixed inset-0 z-[55] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Clean Minimalist Chat Sheet / Card */}
      <div
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        dir={lang === "ar" ? "rtl" : "ltr"}
        style={isDraggingSheet ? { transform: `translateY(${sheetDragY}px)` } : undefined}
        className={`fixed bottom-0 inset-x-0 sm:inset-x-auto sm:bottom-4 sm:end-5 z-[60] w-full sm:w-[380px] max-h-[76dvh] sm:max-h-[560px] flex flex-col bg-white rounded-t-3xl sm:rounded-3xl border border-stone-200 shadow-2xl overflow-hidden origin-bottom sm:origin-bottom-right ${
          isDraggingSheet
            ? "transition-none"
            : "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        } ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-full sm:translate-y-6 sm:scale-95 pointer-events-none"
        }`}
      >
        {/* Mobile Drag Pill Indicator — Pull down to close */}
        <div
          onPointerDown={handleSheetPointerDown}
          onPointerMove={handleSheetPointerMove}
          onPointerUp={handleSheetPointerEnd}
          onPointerCancel={handleSheetPointerEnd}
          aria-label="Drag down to close"
          className="sm:hidden pt-3 pb-2 flex justify-center bg-white touch-none cursor-grab active:cursor-grabbing select-none"
        >
          <div className="w-10 h-1 rounded-full bg-stone-300" />
        </div>

        {/* Light, Minimal Header (No duplicate logo or heavy dark bar) */}
        <div className="bg-white px-4 py-3 flex items-center justify-between gap-2 shrink-0 border-b border-stone-200/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#3F166B]/10 text-[#3F166B] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 truncate">
                  {ui.title}
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              </div>
              <p className="text-[10px] text-stone-500 truncate">{ui.statusLine}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                setLeadSubmitted(false);
                setShowLeadDrawer((prev) => !prev);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer ${
                showLeadDrawer
                  ? "bg-[#3F166B] text-[#EDC271]"
                  : "bg-[#FAF8F5] hover:bg-stone-100 text-[#3F166B] border border-stone-200"
              }`}
            >
              <FileText className="w-3 h-3 shrink-0" />
              <span>{ui.requestQuoteBtn}</span>
            </button>

            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setShowLeadDrawer(false);
                  setLeadSubmitted(false);
                }}
                title={ui.resetChat}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={closeAiSheet}
              aria-label="Close"
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Chat Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 bg-[#FAF8F5] custom-scrollbar">
          {/* Concise Welcome Bubble */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-3.5 text-xs text-stone-700 leading-relaxed shadow-2xs">
            {renderFormattedText(ui.welcome)}
          </div>

          {/* 3 Compact Starter Chips */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {ui.quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="text-start px-3 py-1.5 rounded-full bg-white hover:bg-[#3F166B] text-stone-700 hover:text-[#EDC271] border border-stone-200/90 hover:border-[#3F166B] text-[11px] font-semibold transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Conversation Messages */}
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            const matchedProds = (msg.suggestedProducts || [])
              .map((id) => products.find((p) => p.id === id))
              .filter((p): p is ProductItem => Boolean(p));

            return (
              <div key={msg.id} className="space-y-2 min-w-0">
                <div className={`flex min-w-0 ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[88%] min-w-0 break-words overflow-hidden rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      isUser
                        ? "bg-[#3F166B] text-white rounded-br-xs font-medium"
                        : "bg-white border border-stone-200/90 text-stone-700 rounded-bl-xs shadow-2xs space-y-1"
                    }`}
                  >
                    {isUser ? msg.content : renderFormattedText(msg.content)}
                  </div>
                </div>

                {/* Suggested Product Mini-Cards */}
                {!isUser && matchedProds.length > 0 && (
                  <div className="space-y-1.5">
                    {matchedProds.map((prod) => {
                      const prodTitle = prod.name[lang] || prod.name.en;
                      return (
                        <div
                          key={prod.id}
                          className="bg-white rounded-xl border border-stone-200/90 p-2.5 shadow-2xs flex items-center gap-2.5"
                        >
                          <img
                            src={prod.imageUrl}
                            alt={prodTitle}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200"
                          />
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="text-xs font-bold text-stone-900 truncate">
                              {prodTitle}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-500">
                              <span className="inline-flex items-center gap-0.5">
                                <Ruler className="w-3 h-3 text-[#3F166B]" />
                                {prod.specs.stapleLength}
                              </span>
                              <span className="inline-flex items-center gap-0.5">
                                <Droplets className="w-3 h-3 text-[#3F166B]" />
                                {prod.specs.shiveContent}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleOpenQuoteForProduct(prod)}
                              className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#3F166B] hover:underline cursor-pointer"
                            >
                              <span>{ui.inquireThisProduct}</span>
                              <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 rounded-2xl px-3.5 py-2 text-xs text-stone-500 font-medium inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F166B] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F166B] animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F166B] animate-bounce [animation-delay:300ms]" />
                <span className="ms-1">{ui.thinking}</span>
              </div>
            </div>
          )}

          {/* Inline Lead / Quote Capture Card */}
          {showLeadDrawer && (
            <div className="bg-white rounded-2xl border border-stone-300 p-3.5 shadow-sm space-y-2.5">
              {leadSubmitted ? (
                <div className="text-center py-2 space-y-1.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="text-xs font-extrabold text-stone-900">
                    {ui.leadSuccessTitle}
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {ui.leadSuccessDesc}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-[#3F166B] shrink-0" />
                        <span>{ui.leadFormTitle}</span>
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        {ui.leadFormSubtitle}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowLeadDrawer(false)}
                      className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {leadError && (
                    <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-700 font-medium">
                      {leadError}
                    </div>
                  )}

                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder={ui.namePlaceholder}
                        value={leadForm.name}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, name: e.target.value })
                        }
                        className="w-full px-2.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#3F166B]"
                      />
                      <input
                        type="email"
                        required
                        placeholder={ui.emailPlaceholder}
                        value={leadForm.email}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, email: e.target.value })
                        }
                        className="w-full px-2.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#3F166B]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder={ui.companyPlaceholder}
                        value={leadForm.company}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, company: e.target.value })
                        }
                        className="w-full px-2.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#3F166B]"
                      />
                      <input
                        type="text"
                        placeholder={ui.phonePlaceholder}
                        value={leadForm.phone}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, phone: e.target.value })
                        }
                        className="w-full px-2.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#3F166B]"
                      />
                    </div>

                    <select
                      value={leadForm.product}
                      onChange={(e) =>
                        setLeadForm({ ...leadForm, product: e.target.value })
                      }
                      className="w-full px-2.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-[#3F166B]"
                    >
                      <option value="">{ui.selectProductPlaceholder}</option>
                      {products.map((p) => {
                        const label = p.name[lang] || p.name.en;
                        return (
                          <option key={p.id} value={label}>
                            {label}
                          </option>
                        );
                      })}
                    </select>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder={ui.countryPlaceholder}
                        value={leadForm.country}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, country: e.target.value })
                        }
                        className="w-full px-2.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#3F166B]"
                      />
                      <input
                        type="text"
                        placeholder={ui.quantityPlaceholder}
                        value={leadForm.quantity}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, quantity: e.target.value })
                        }
                        className="w-full px-2.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#3F166B]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full py-2 rounded-xl bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] font-extrabold text-xs transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {leadSubmitting ? ui.submittingLead : ui.submitLeadBtn}
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Clean Single-Row Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-3 bg-white border-t border-stone-200/80 flex items-center gap-2 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={ui.placeholder}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-base sm:text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#3F166B]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label={ui.send}
            className="w-10 h-10 rounded-xl bg-[#3F166B] hover:bg-[#2F1052] disabled:opacity-40 text-[#EDC271] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-4 h-4 rtl:-scale-x-100" />
          </button>
        </form>
      </div>
    </>
  );
}
