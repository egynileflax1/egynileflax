"use client";

import React, { useRef, useState } from "react";
import { useFlax } from "@/context/FlaxContext";
import { LanguageCode } from "@/data/initialData";
import EgyNileLogo from "@/components/EgyNileLogo";
import {
  ShieldCheck,
  Globe,
  Phone,
  Mail,
  Menu,
  X,
  ArrowUpRight,
  MessageSquare,
  QrCode,
  Copy,
  Check,
} from "lucide-react";

const LANGUAGES: { code: LanguageCode; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "العربية", short: "AR" },
  { code: "zh", label: "中文", short: "中文" },
];

export default function Navbar() {
  const { lang, setLang, t, company } = useFlax();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileContactSheetOpen, setMobileContactSheetOpen] = useState(false);
  const [copiedWechat, setCopiedWechat] = useState(false);
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

  const handleSheetPointerEnd = () => {
    if (dragStartYRef.current === null) return;
    if (sheetDragY > 70) {
      setMobileContactSheetOpen(false);
    }
    dragStartYRef.current = null;
    setIsDraggingSheet(false);
    setSheetDragY(0);
  };

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "products", label: t.nav.products },
    { id: "process", label: t.nav.process },
    { id: "contact", label: t.nav.contact },
  ];

  const closeOverlays = () => {
    setMobileMenuOpen(false);
    setMobileContactSheetOpen(false);
  };

  const navigateToSection = (sectionId: string) => {
    closeOverlays();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    closeOverlays();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 w-full border-t-2 border-[#3F166B]">
        {/* Top credentials & language bar */}
        <div className="bg-[#F4F0EA] text-stone-600 text-[11px] sm:text-xs border-b border-stone-200/80">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-1.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <span className="inline-flex items-center gap-1 text-[#3F166B] font-semibold truncate">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t.brand.isoCert}</span>
              </span>
              <span className="hidden lg:inline text-stone-300">|</span>
              <span className="hidden lg:inline text-stone-500 truncate">{t.brand.councilMembership}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0 ms-auto">
              <a
                href={`mailto:${company.primaryEmail}`}
                className="hidden md:inline-flex items-center gap-1.5 hover:text-[#3F166B] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#3F166B] shrink-0" />
                <span>{company.primaryEmail}</span>
              </a>
              <a
                href={`tel:${company.egyptPhone1.replace(/\s+/g, "")}`}
                className="hidden xl:inline-flex items-center gap-1.5 hover:text-[#3F166B] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#3F166B] shrink-0" />
                <span dir="ltr">{company.egyptPhone1}</span>
              </a>

              <div className="flex items-center gap-0.5 sm:gap-1 bg-white rounded-full px-1.5 sm:px-2 py-0.5 border border-stone-200">
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#3F166B] me-0.5 hidden sm:inline" />
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setLang(item.code)}
                    className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      lang === item.code ? "bg-[#3F166B] text-[#EDC271]" : "text-stone-600 hover:text-[#3F166B]"
                    }`}
                    title={item.label}
                  >
                    {item.short}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="bg-white/90 backdrop-blur-md border-b border-stone-200/80">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 sm:gap-3 text-start cursor-pointer min-w-0 shrink-0"
            >
              <EgyNileLogo className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 drop-shadow-xs" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-stone-900 truncate">
                    {company.brandName}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#EDC271]/25 text-[#3F166B] border border-[#EDC271] shrink-0">
                    {t.brand.country}
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-stone-500 font-medium tracking-wide truncate">
                  {t.brand.subtitle}
                </p>
              </div>
            </button>

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-semibold text-stone-700">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateToSection(link.id)}
                  className="hover:text-[#3F166B] hover:underline underline-offset-8 decoration-[#EDC271] decoration-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <button
              onClick={() => navigateToSection("contact")}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{t.hero.ctaContact}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0 rtl:-scale-x-100" />
            </button>

            {/* Mobile / tablet menu toggle */}
            <button
              onClick={() => {
                setMobileContactSheetOpen(false);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Menu"
              className={`lg:hidden relative p-2 rounded-xl border transition-all duration-300 cursor-pointer shrink-0 ${
                mobileMenuOpen
                  ? "bg-[#3F166B] text-[#EDC271] border-[#3F166B] shadow-sm"
                  : "text-stone-800 hover:bg-stone-200/70 border-stone-200/80"
              }`}
            >
              <span className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                <Menu
                  className={`w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                  }`}
                />
              </span>
            </button>
          </div>

          {/* Mobile / tablet slide-down drawer */}
          <div
            aria-hidden={!mobileMenuOpen}
            className={`lg:hidden grid transition-all duration-300 ease-in-out bg-[#FAF7F2] ${
              mobileMenuOpen
                ? "grid-rows-[1fr] opacity-100 border-t border-stone-200 shadow-2xl"
                : "grid-rows-[0fr] opacity-0 pointer-events-none border-t border-transparent"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`px-4 pt-3 pb-6 space-y-3 transition-all duration-300 ease-out ${
                  mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
                }`}
              >
                <div className="grid grid-cols-2 gap-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => navigateToSection(link.id)}
                      className="text-start px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#EDC271]/15 active:scale-[0.98] border border-stone-200/80 text-xs sm:text-sm font-semibold text-stone-800 transition-all"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => navigateToSection("contact")}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-extrabold bg-[#3F166B] text-[#EDC271] shadow-xs active:scale-[0.99] transition-transform"
                >
                  <span>{t.hero.ctaContact}</span>
                  <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[5.625rem] sm:h-[6.25rem]" aria-hidden="true" />

      {/* Backdrop for mobile drawer */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Backdrop for mobile contact sheet */}
      <div
        onClick={() => setMobileContactSheetOpen(false)}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${
          mobileContactSheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile contact bottom sheet */}
      <div
        aria-hidden={!mobileContactSheetOpen}
        style={isDraggingSheet ? { transform: `translateY(${sheetDragY}px)` } : undefined}
        className={`md:hidden fixed inset-x-0 bottom-0 z-50 ${
          isDraggingSheet
            ? "transition-none"
            : "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        } ${
          mobileContactSheetOpen
            ? "translate-y-0 pointer-events-auto"
            : "translate-y-full pointer-events-none"
        }`}
      >
        <div
          className="w-full bg-white rounded-t-3xl p-5 space-y-4 shadow-2xl border-t border-stone-200"
          onClick={(e) => e.stopPropagation()}
        >
            <div
              onPointerDown={handleSheetPointerDown}
              onPointerMove={handleSheetPointerMove}
              onPointerUp={handleSheetPointerEnd}
              onPointerCancel={handleSheetPointerEnd}
              className="py-2.5 -mt-3 -mb-1 flex justify-center touch-none cursor-grab active:cursor-grabbing select-none"
              aria-label="Drag down to close"
            >
              <div className="w-10 h-1 rounded-full bg-stone-300" />
            </div>
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-extrabold text-stone-900">
                {t.nav.contact} — {company.brandName}
              </h3>
              <button
                onClick={() => setMobileContactSheetOpen(false)}
                className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <a
                href={`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
                  `Hello ${company.brandName}, I found your website and would like to get in touch.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold flex items-center justify-between shadow-sm transition-all"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.contact.whatsapp}</span>
                </span>
                <span className="font-mono text-[11px] opacity-90" dir="ltr">
                  {company.egyptPhone1}
                </span>
              </a>

              <div className="p-3.5 rounded-2xl bg-[#3F166B] text-white flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                    <QrCode className="w-8 h-8 text-[#3F166B]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#EDC271] font-bold uppercase tracking-wider block">
                      {t.contact.wechat}
                    </span>
                    <span className="font-mono text-[#EDC271] text-xs font-extrabold truncate block">
                      {company.wechatId}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(company.wechatId);
                    setCopiedWechat(true);
                    setTimeout(() => setCopiedWechat(false), 2000);
                  }}
                  className="px-3 py-2 rounded-xl bg-[#EDC271] hover:bg-[#F5D693] text-[#260C42] font-extrabold text-xs inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copiedWechat ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedWechat ? t.contact.copied : t.contact.copyId}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`mailto:${company.primaryEmail}`}
                  className="py-3 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 active:scale-[0.98] text-stone-800 font-bold flex items-center justify-center gap-1.5 border border-stone-200 transition-all"
                >
                  <Mail className="w-4 h-4 text-[#3F166B]" />
                  <span>{t.contact.emailLabel}</span>
                </a>
                <a
                  href={`tel:${company.egyptPhone1.replace(/\s+/g, "")}`}
                  className="py-3 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 active:scale-[0.98] text-stone-800 font-bold flex items-center justify-center gap-1.5 border border-stone-200 transition-all"
                >
                  <Phone className="w-4 h-4 text-[#3F166B]" />
                  <span dir="ltr">{company.egyptPhone1}</span>
                </a>
              </div>
            </div>
        </div>
      </div>

      {/* Mobile floating contact button (< md) */}
      <button
        onClick={() => {
          setMobileMenuOpen(false);
          setMobileContactSheetOpen(true);
        }}
        aria-expanded={mobileContactSheetOpen}
        aria-label={t.nav.contact}
        className={`md:hidden fixed bottom-4 end-4 z-40 inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-300 text-[#3F166B] font-bold text-xs shadow-lg hover:bg-stone-50 active:scale-95 transition-all duration-300 cursor-pointer ${
          mobileContactSheetOpen ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        <MessageSquare className="w-4 h-4 text-[#3F166B] shrink-0" />
        <span>{t.nav.contact}</span>
      </button>
    </>
  );
}
