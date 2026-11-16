"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Send,
  Lock,
  Eye,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Mail,
  Paperclip,
  FileText,
  Printer,
  Globe,
  X,
} from "lucide-react";
import { COMPANY } from "@/data/initialData";
import { b2bMailSchema, B2BAttachment } from "@/lib/b2bMailSchema";
import { buildB2BEmailContent } from "@/lib/b2bMailTemplate";
import {
  generateQuotationPdfBase64,
  LocalizedMailTemplate,
  MULTILANG_B2B_TEMPLATES,
  openPrintableQuotationWindow,
  TemplateLang,
} from "@/lib/crmHelpers";
import { useFlax } from "@/context/FlaxContext";
import { ADMIN_TRANSLATIONS } from "@/lib/adminI18n";

export default function B2BMailComposer() {
  const { lang, setLang } = useFlax();
  const isAr = lang === "ar";
  const t = ADMIN_TRANSLATIONS[isAr ? "ar" : "en"];
  const toggleAdminLang = () => setLang(isAr ? "en" : "ar");

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [leadId, setLeadId] = useState<number | null>(null);
  const [to, setTo] = useState("");
  const [toName, setToName] = useState("");
  const [cc, setCc] = useState("");
  const [replyTo, setReplyTo] = useState(COMPANY.primaryEmail);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [includeSignature, setIncludeSignature] = useState(true);
  const [layout, setLayout] = useState<"personal" | "branded">("branded");
  const [provider, setProvider] = useState<"auto" | "brevo" | "resend">("auto");
  const [attachments, setAttachments] = useState<B2BAttachment[]>([]);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [templateLangFilter, setTemplateLangFilter] = useState<TemplateLang | "all">("all");

  // Optional quote context passed from CRM drawer
  const [quoteProduct, setQuoteProduct] = useState("");
  const [quoteVolume, setQuoteVolume] = useState("");
  const [quoteIncoterm, setQuoteIncoterm] = useState("FOB Alexandria");
  const [quotePrice, setQuotePrice] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sentInfo, setSentInfo] = useState<{ to: string; provider: string } | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qTo = params.get("to");
      const qName = params.get("name");
      const qLeadId = Number(params.get("leadId"));
      const qProduct = params.get("product");
      const qVolume = params.get("volume");
      const qIncoterm = params.get("incoterm");
      const qPrice = params.get("price");
      const qLang = params.get("lang");
      if (qTo) setTo(qTo);
      if (qName) setToName(qName);
      if (Number.isInteger(qLeadId) && qLeadId > 0) setLeadId(qLeadId);
      if (qProduct) setQuoteProduct(qProduct);
      if (qVolume) setQuoteVolume(qVolume);
      if (qIncoterm) setQuoteIncoterm(qIncoterm);
      if (qPrice) setQuotePrice(qPrice);
      if (qLang === "zh" || qLang === "ar" || qLang === "en") {
        setTemplateLangFilter(qLang);
      }
    } catch {
      // Ignore URL parse errors
    }

    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((data: { authenticated?: boolean; adminEmail?: string }) => {
        setAuthenticated(Boolean(data.authenticated));
        setAdminEmail(data.adminEmail || "");
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setCheckingAuth(false));
  }, []);

  const applyTemplate = (tpl: LocalizedMailTemplate) => {
    setSubject(tpl.subject);
    setMessage(tpl.message);
    setSentInfo(null);
    setErrorMsg(null);
  };

  const handleAttachGeneratedPdfQuote = () => {
    if (attachments.length >= 3) {
      setErrorMsg("Maximum 3 attachments reached. Remove one before generating a PDF quote.");
      return;
    }
    const { filename, base64 } = generateQuotationPdfBase64({
      buyerName: toName || to || "Valued Buyer",
      company: toName,
      email: to,
      product: quoteProduct || "Egyptian Scutched / Hackled Flax Fibre",
      containerVolume: quoteVolume || "1x 40ft HC (~22-24 MT)",
      incoterm: quoteIncoterm || "FOB Alexandria",
      quotedPrice: quotePrice || "As per quotation message",
    });
    setAttachments((prev) => [...prev.filter((a) => a.name !== filename), { name: filename, content: base64 }]);
    setErrorMsg(null);
  };

  const handleOpenPrintableQuote = () => {
    openPrintableQuotationWindow({
      buyerName: toName || to || "Valued Buyer",
      company: toName,
      email: to,
      product: quoteProduct || "Egyptian Scutched / Hackled Flax Fibre",
      containerVolume: quoteVolume || "1x 40ft HC (~22–24 MT)",
      incoterm: quoteIncoterm || "FOB Alexandria",
      quotedPrice: quotePrice || "As per quotation message",
    });
  };

  const visibleTemplates = useMemo(
    () =>
      MULTILANG_B2B_TEMPLATES.filter(
        (t) => templateLangFilter === "all" || t.lang === templateLangFilter
      ),
    [templateLangFilter]
  );

  const preview = useMemo(
    () =>
      buildB2BEmailContent({
        toName: toName || "Valued Buyer",
        subject: subject || "Egy Nile Flax — B2B Inquiry",
        message: message || "Your message preview will appear here...",
        includeSignature,
        layout,
      }),
    [toName, subject, message, includeSignature, layout]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setErrorMsg(null);
    setSentInfo(null);

    const parsed = b2bMailSchema.safeParse({
      leadId,
      to,
      toName,
      cc,
      replyTo,
      subject,
      message,
      includeSignature,
      layout,
      provider,
      attachments,
    });

    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message || "Please check the form fields.");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        provider?: string;
        error?: string;
      };

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to send email.");
        return;
      }

      setSentInfo({ to: parsed.data.to, provider: data.provider || "brevo" });
      setTo("");
      setToName("");
      setCc("");
      setSubject("");
      setMessage("");
      setAttachments([]);
    } catch {
      setErrorMsg("Network error while sending email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  if (checkingAuth) {
    return (
      <div dir={t.dir} className="min-h-dvh bg-[#FAF8F5] flex items-center justify-center text-sm text-stone-500">
        {t.mailLoading}
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div dir={t.dir} className="min-h-dvh bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3F166B] text-[#EDC271] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-[#3F166B]">{t.mailAuthTitle}</h1>
                <p className="text-xs text-stone-500">
                  {t.mailAuthSubtitle}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleAdminLang}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-bold text-[#3F166B] cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.langToggleLabel}</span>
            </button>
          </div>

          <a
            href="/api/admin/google?next=/admin/mail"
            className="w-full py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
              />
            </svg>
            <span>{t.signInGoogle}</span>
          </a>

          <div className="text-center">
            <Link href="/admin" className="text-xs font-semibold text-[#3F166B] hover:underline">
              {t.mailOrViaCrm}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir={t.dir} className="min-h-dvh bg-[#FAF8F5] text-stone-900">
      {/* Top Bar */}
      <header className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#3F166B] text-[#EDC271] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-extrabold text-[#3F166B] truncate">
                {t.mailTitle}
              </h1>
              <p className="text-[11px] text-stone-500 truncate">
                {t.mailSubtitle(COMPANY.primaryEmail)}
                {adminEmail ? ` • ${t.signedInAs} ${adminEmail}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleAdminLang}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-xs font-bold text-[#3F166B] cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.langToggleLabel}</span>
            </button>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-xs font-semibold text-[#3F166B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{t.mailBackToCrm}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Composer Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-5"
          >
            {/* Multi-Language Quick Templates */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                  <Sparkles className="w-3.5 h-3.5 text-[#3F166B]" />
                  <span>{t.mailTemplatesTitle}</span>
                </div>
                <div className="inline-flex p-0.5 rounded-lg bg-stone-100 border border-stone-200">
                  {(
                    [
                      ["all", t.filterAll],
                      ["en", "EN"],
                      ["zh", "中文"],
                      ["ar", "AR"],
                    ] as const
                  ).map(([code, lbl]) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setTemplateLangFilter(code)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer ${
                        templateLangFilter === code
                          ? "bg-[#3F166B] text-[#EDC271]"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubject("");
                    setMessage("");
                  }}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-600 cursor-pointer"
                >
                  {t.mailClearBtn}
                </button>
                {visibleTemplates.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => applyTemplate(tpl)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-[#EDC271]/20 hover:border-[#EDC271] text-xs font-semibold text-stone-700 hover:text-[#3F166B] transition-colors cursor-pointer"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="b2b-to" className="block text-xs font-bold text-stone-700 mb-1">
                  {t.mailToEmail}
                </label>
                <input
                  id="b2b-to"
                  type="email"
                  required
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="buyer@spinningmill.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
                />
              </div>
              <div>
                <label htmlFor="b2b-to-name" className="block text-xs font-bold text-stone-700 mb-1">
                  {t.mailToName}
                </label>
                <input
                  id="b2b-to-name"
                  type="text"
                  value={toName}
                  onChange={(e) => setToName(e.target.value)}
                  placeholder="e.g. Mr. Ahmed / EuroLinen Mill"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
                />
              </div>
            </div>

            {/* CC & Reply-To */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="b2b-cc" className="block text-xs font-bold text-stone-700 mb-1">
                  {t.mailCc}
                </label>
                <input
                  id="b2b-cc"
                  type="text"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="partner@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
                />
              </div>
              <div>
                <label htmlFor="b2b-reply-to" className="block text-xs font-bold text-stone-700 mb-1">
                  {t.mailReplyTo}
                </label>
                <input
                  id="b2b-reply-to"
                  type="email"
                  value={replyTo}
                  onChange={(e) => setReplyTo(e.target.value)}
                  placeholder={COMPANY.primaryEmail}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
                />
              </div>
            </div>

            {/* Official PDF Quote Generator Strip */}
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-[#3F166B]">
                  {t.mailQuoteGenTitle}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleAttachGeneratedPdfQuote}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#3F166B] text-[#EDC271] text-[11px] font-bold cursor-pointer"
                  >
                    <FileText className="w-3 h-3" />
                    <span>{t.mailAttachPdfQuote}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenPrintableQuote}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-stone-300 bg-white text-stone-700 text-[11px] font-semibold cursor-pointer"
                  >
                    <Printer className="w-3 h-3" />
                    <span>{t.mailPrintView}</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <input
                  type="text"
                  value={quoteProduct}
                  onChange={(e) => setQuoteProduct(e.target.value)}
                  placeholder="Grade (e.g. Scutched C1)"
                  className="px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
                />
                <input
                  type="text"
                  value={quoteVolume}
                  onChange={(e) => setQuoteVolume(e.target.value)}
                  placeholder="Volume (e.g. 24 MT)"
                  className="px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
                />
                <input
                  type="text"
                  value={quoteIncoterm}
                  onChange={(e) => setQuoteIncoterm(e.target.value)}
                  placeholder="Incoterm (FOB Alex)"
                  className="px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
                />
                <input
                  type="text"
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(e.target.value)}
                  placeholder="Price (e.g. $2,450/MT)"
                  className="px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="b2b-subject" className="block text-xs font-bold text-stone-700 mb-1">
                {t.mailSubject}
              </label>
              <input
                id="b2b-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t.emailSubjectPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="b2b-message" className="block text-xs font-bold text-stone-700 mb-1">
                {t.mailMessage}
              </label>
              <textarea
                id="b2b-message"
                rows={9}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs leading-relaxed focus:outline-none focus:border-[#3F166B]"
              />
            </div>

            {/* Layout, Provider & Signature */}
            <div className="flex flex-col gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex p-1 rounded-lg bg-stone-100 border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setLayout("branded")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                      layout === "branded"
                        ? "bg-white text-[#3F166B] shadow-2xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {t.mailLayoutBranded}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout("personal")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                      layout === "personal"
                        ? "bg-white text-[#3F166B] shadow-2xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {t.mailLayoutPersonal}
                  </button>
                </div>

                <div className="inline-flex p-1 rounded-lg bg-stone-100 border border-stone-200">
                  {(
                    [
                      ["auto", t.mailProviderAuto],
                      ["brevo", "Brevo"],
                      ["resend", "Resend"],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setProvider(val)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                        provider === val
                          ? "bg-white text-[#3F166B] shadow-2xs"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeSignature}
                  onChange={(e) => setIncludeSignature(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 accent-[#3F166B]"
                />
                <span className="text-xs font-semibold text-stone-700">
                  {t.mailIncludeSignature}
                </span>
              </label>

              <div className="w-full pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-700 cursor-pointer">
                  <Paperclip className="w-3.5 h-3.5 text-[#3F166B]" />
                  <span>{t.mailAttachFile}</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      e.target.value = "";
                      if (!files.length) return;
                      if (attachments.length + files.length > 3) {
                        setErrorMsg("You can attach up to 3 files per email.");
                        return;
                      }
                      const next: B2BAttachment[] = [];
                      for (const file of files) {
                        if (file.size > 4.5 * 1024 * 1024) {
                          setErrorMsg(`"${file.name}" exceeds the 4.5 MB file size limit.`);
                          return;
                        }
                        const content = await new Promise<string>((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onload = () => {
                            const res = String(reader.result || "");
                            resolve(res.includes(",") ? res.split(",")[1] : res);
                          };
                          reader.onerror = () => reject(new Error("Read failed"));
                          reader.readAsDataURL(file);
                        });
                        next.push({ name: file.name, content });
                      }
                      setErrorMsg(null);
                      setAttachments((prev) => [...prev, ...next]);
                    }}
                  />
                </label>

                {attachments.map((att, idx) => (
                  <span
                    key={`${att.name}-${idx}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3F166B]/10 text-[#3F166B] text-[11px] font-semibold"
                  >
                    <span className="max-w-[180px] truncate">{att.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
                      className="hover:text-red-600 cursor-pointer"
                      aria-label={`Remove ${att.name}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Feedback Banners */}
            {errorMsg && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {sentInfo && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Email sent to <strong>{sentInfo.to}</strong> via{" "}
                  <strong className="uppercase">{sentInfo.provider}</strong>.
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowMobilePreview((prev) => !prev)}
                className="lg:hidden inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-stone-700"
              >
                <Eye className="w-4 h-4" />
                <span>{showMobilePreview ? t.mailHidePreviewBtn : t.mailPreviewBtn}</span>
              </button>

              <button
                type="submit"
                disabled={isSending}
                className="ms-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#3F166B] hover:bg-[#2F1052] disabled:opacity-60 text-[#EDC271] font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? t.mailSendingBtn : t.mailSendBtn}</span>
              </button>
            </div>
          </form>

          {/* Live Branded Email Preview */}
          <div
            className={`lg:col-span-5 ${showMobilePreview ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden sticky top-24">
              <div className="px-4 py-3 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">{t.mailPreviewHeader}</span>
                <span className="text-[11px] text-stone-500">{t.mailFromLabel} {COMPANY.primaryEmail}</span>
              </div>
              <iframe
                title="B2B Email Preview"
                srcDoc={preview.html}
                sandbox=""
                className="w-full h-[540px] border-0 bg-[#FAF8F5]"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
