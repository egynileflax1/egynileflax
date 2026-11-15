"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Send,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Mail,
} from "lucide-react";
import { COMPANY } from "@/data/initialData";
import { b2bMailSchema } from "@/lib/b2bMailSchema";
import { buildB2BEmailContent } from "@/lib/b2bMailTemplate";

const PASSCODE_STORAGE_KEY = "egynileflax_b2b_passcode";

interface MailTemplate {
  id: string;
  label: string;
  subject: string;
  message: string;
}

const B2B_TEMPLATES: MailTemplate[] = [
  {
    id: "blank",
    label: "Blank Email",
    subject: "",
    message: "",
  },
  {
    id: "intro",
    label: "Factory Introduction",
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
    id: "quote",
    label: "Quotation & Specs",
    subject: "Quotation & Technical Specifications — Egy Nile Flax",
    message: `Dear Partner,

Thank you for your inquiry regarding our Egyptian flax fibre grades.

Please find our preliminary quotation details below:
• Product / Grade: [Specify Grade]
• Staple Length / Shive %: [Specify Specs]
• Moisture Regain: ≤ 11.5%
• Packing: Hydraulic Pressed Bales (120–200 kg)
• Price Basis: FOB Alexandria / Damietta or CIF [Destination Port]
• Lead Time: [e.g. 14–21 days from order confirmation]

Please let us know your target container volume (20ft / 40ft HC) and destination port so we can finalize a formal proforma invoice or arrange physical fibre samples for your lab testing.

Best regards,`,
  },
  {
    id: "sample",
    label: "Sample Follow-up",
    subject: "Flax Fibre Samples & Lab Evaluation — Egy Nile Flax",
    message: `Dear Partner,

Following up on your interest in Egy Nile Flax, we can dispatch courier samples of our scutched, hackled, or cottonised grades for your spinning mill's evaluation.

Kindly confirm your preferred grades, shipping address, and contact phone number for courier dispatch.

Best regards,`,
  },
];

export default function B2BMailComposer() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [to, setTo] = useState("");
  const [toName, setToName] = useState("");
  const [cc, setCc] = useState("");
  const [replyTo, setReplyTo] = useState(COMPANY.primaryEmail);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [includeSignature, setIncludeSignature] = useState(true);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sentInfo, setSentInfo] = useState<{ to: string; provider: string } | null>(null);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(PASSCODE_STORAGE_KEY);
      if (saved) setPassword(saved);
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    try {
      if (value) {
        window.sessionStorage.setItem(PASSCODE_STORAGE_KEY, value);
      } else {
        window.sessionStorage.removeItem(PASSCODE_STORAGE_KEY);
      }
    } catch {
      // Ignore storage access errors
    }
  };

  const applyTemplate = (tpl: MailTemplate) => {
    setSubject(tpl.subject);
    setMessage(tpl.message);
    setSentInfo(null);
    setErrorMsg(null);
  };

  const preview = useMemo(
    () =>
      buildB2BEmailContent({
        toName: toName || "Valued Buyer",
        subject: subject || "Egy Nile Flax — B2B Inquiry",
        message: message || "Your message preview will appear here...",
        includeSignature,
      }),
    [toName, subject, message, includeSignature]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setErrorMsg(null);
    setSentInfo(null);

    const parsed = b2bMailSchema.safeParse({
      password,
      to,
      toName,
      cc,
      replyTo,
      subject,
      message,
      includeSignature,
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
    } catch {
      setErrorMsg("Network error while sending email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#FAF8F5] text-stone-900">
      {/* Top Bar */}
      <header className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#3F166B] text-[#EDC271] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-extrabold text-[#3F166B] truncate">
                Egy Nile Flax — B2B Mail Sender
              </h1>
              <p className="text-[11px] text-stone-500 truncate">
                Send branded B2B emails from {COMPANY.primaryEmail}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Site</span>
          </Link>
        </div>
      </header>

      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Composer Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-5"
          >
            {/* Access Passcode */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/90 space-y-2">
              <label
                htmlFor="b2b-passcode"
                className="flex items-center gap-1.5 text-xs font-bold text-[#3F166B]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sender Access Passcode *</span>
              </label>
              <div className="relative">
                <input
                  id="b2b-passcode"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter B2B_MAIL_PASSWORD"
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 pe-10 rounded-xl border border-stone-300 bg-white text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide passcode" : "Show passcode"}
                  className="absolute inset-y-0 end-0 px-3 text-stone-400 hover:text-stone-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Protects your domain from unauthorized sending. Saved for this browser tab only.
              </p>
            </div>

            {/* Quick Templates */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                <Sparkles className="w-3.5 h-3.5 text-[#3F166B]" />
                <span>Quick B2B Templates</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {B2B_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => applyTemplate(tpl)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-[#EDC271]/20 hover:border-[#EDC271] text-xs font-semibold text-stone-700 hover:text-[#3F166B] transition-colors"
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
                  To Email *
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
                  Recipient / Company Name
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
                  CC (optional, comma-separated)
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
                  Reply-To Email
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

            {/* Subject */}
            <div>
              <label htmlFor="b2b-subject" className="block text-xs font-bold text-stone-700 mb-1">
                Subject *
              </label>
              <input
                id="b2b-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Egyptian Flax Fibre Quotation — Egy Nile Flax"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="b2b-message" className="block text-xs font-bold text-stone-700 mb-1">
                Message *
              </label>
              <textarea
                id="b2b-message"
                rows={9}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your B2B email message..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs leading-relaxed focus:outline-none focus:border-[#3F166B]"
              />
            </div>

            {/* Signature Toggle */}
            <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeSignature}
                onChange={(e) => setIncludeSignature(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 accent-[#3F166B]"
              />
              <span className="text-xs font-semibold text-stone-700">
                Include Egy Nile Flax Factory Signature (Tanta, ISO 9001:2015, Phone/WhatsApp)
              </span>
            </label>

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
                <span>{showMobilePreview ? "Hide Preview" : "Preview Email"}</span>
              </button>

              <button
                type="submit"
                disabled={isSending}
                className="ms-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#3F166B] hover:bg-[#2F1052] disabled:opacity-60 text-[#EDC271] font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? "Sending..." : "Send B2B Email"}</span>
              </button>
            </div>
          </form>

          {/* Live Branded Email Preview */}
          <div
            className={`lg:col-span-5 ${showMobilePreview ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden sticky top-24">
              <div className="px-4 py-3 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">Live Branded Email Preview</span>
                <span className="text-[11px] text-stone-500">From: {COMPANY.primaryEmail}</span>
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
