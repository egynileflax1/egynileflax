"use client";

import React, { useState } from "react";
import { useFlax } from "@/context/FlaxContext";
import { LanguageCode } from "@/data/initialData";
import EgyNileLogo from "@/components/EgyNileLogo";
import {
  ShieldCheck,
  Globe,
  Phone,
  Mail,
  Settings,
  Menu,
  X,
  ArrowUpRight,
  PackageCheck,
  Package,
  MessageSquare,
  Home,
  QrCode,
  Copy,
  Check,
} from "lucide-react";

const LANGUAGES: { code: LanguageCode; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "العربية", short: "AR" },
  { code: "zh", label: "中文", short: "中文" },
  { code: "fr", label: "Français", short: "FR" },
];

export default function Navbar() {
  const {
    lang,
    setLang,
    t,
    activeView,
    setActiveView,
    company,
    inquiries,
  } = useFlax();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExportSheetOpen, setMobileExportSheetOpen] = useState(false);
  const [copiedWechat, setCopiedWechat] = useState(false);

  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;

  const navigateToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setMobileExportSheetOpen(false);
    if (activeView !== "showcase") {
      setActiveView("showcase");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 shadow-sm w-full">
        {/* Top Industrial Credibility & Language Utility Bar */}
        <div className="bg-[#14231A] text-stone-200 text-[11px] sm:text-xs border-b border-emerald-950/80">
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-1.5 flex items-center justify-between gap-2">
            {/* Left Credibility Info */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <span className="inline-flex items-center gap-1 text-amber-300 font-semibold truncate">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{company.isoCert}</span>
              </span>
              <span className="hidden lg:inline text-stone-500">|</span>
              <span className="hidden lg:inline text-stone-300 truncate">
                {company.councilMembership}
              </span>
            </div>

            {/* Right Contact & Language Switcher */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 ms-auto">
              <a
                href={`mailto:${company.primaryEmail}`}
                className="hidden md:inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{company.primaryEmail}</span>
              </a>
              <a
                href={`tel:${company.egyptPhone1.replace(/\s+/g, "")}`}
                className="hidden xl:inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span dir="ltr">{company.egyptPhone1}</span>
              </a>

              {/* Multi-Language Switcher */}
              <div className="flex items-center gap-0.5 sm:gap-1 bg-black/35 rounded-full px-1.5 sm:px-2 py-0.5 border border-white/10">
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 me-0.5 hidden sm:inline" />
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setLang(item.code)}
                    className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      lang === item.code
                        ? "bg-amber-400 text-stone-950 shadow-xs"
                        : "text-stone-300 hover:text-white"
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

        {/* Main Navigation Bar */}
        <div className="bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80">
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 h-15 sm:h-16 flex items-center justify-between gap-3">
            {/* Brand Logo */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileExportSheetOpen(false);
                setActiveView("showcase");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2.5 sm:gap-3 text-start cursor-pointer min-w-0 shrink-0"
            >
              <EgyNileLogo className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 drop-shadow-xs" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-stone-900 truncate">
                    {company.brandName}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                    EGYPT
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-stone-500 font-medium tracking-wide truncate">
                  FLAX FIBRE & EXPORT • SINCE {company.foundedYear}
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links (lg and up) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-semibold text-stone-700">
              <button
                onClick={() => navigateToSection("about")}
                className="hover:text-[#1B3325] hover:underline underline-offset-8 decoration-amber-500 decoration-2 transition-all cursor-pointer whitespace-nowrap"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => navigateToSection("services")}
                className="hover:text-[#1B3325] hover:underline underline-offset-8 decoration-amber-500 decoration-2 transition-all cursor-pointer whitespace-nowrap"
              >
                {t.nav.services}
              </button>
              <button
                onClick={() => navigateToSection("products")}
                className="hover:text-[#1B3325] hover:underline underline-offset-8 decoration-amber-500 decoration-2 transition-all cursor-pointer whitespace-nowrap"
              >
                {t.nav.products}
              </button>
              <button
                onClick={() => navigateToSection("process")}
                className="hover:text-[#1B3325] hover:underline underline-offset-8 decoration-amber-500 decoration-2 transition-all cursor-pointer whitespace-nowrap"
              >
                {t.nav.process}
              </button>
              <button
                onClick={() => navigateToSection("location")}
                className="hover:text-[#1B3325] hover:underline underline-offset-8 decoration-amber-500 decoration-2 transition-all cursor-pointer whitespace-nowrap"
              >
                {t.nav.location}
              </button>
              <button
                onClick={() => navigateToSection("contact")}
                className="hover:text-[#1B3325] hover:underline underline-offset-8 decoration-amber-500 decoration-2 transition-all cursor-pointer whitespace-nowrap"
              >
                {t.nav.contact}
              </button>
            </nav>

            {/* Action Buttons: Tablet & Desktop (md and up) */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setActiveView("portal");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                  activeView === "portal"
                    ? "bg-amber-400 text-stone-950 border-amber-500 shadow-xs"
                    : "bg-stone-100 hover:bg-amber-50 text-stone-800 border-stone-300"
                }`}
              >
                <PackageCheck className="w-4 h-4 text-[#1B3325] shrink-0" />
                <span>{t.nav.clientPortal}</span>
              </button>

              <button
                onClick={() => {
                  setActiveView("admin");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                  activeView === "admin"
                    ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                    : "bg-white hover:bg-stone-100 text-stone-700 border-stone-300"
                }`}
              >
                <Settings className="w-3.5 h-3.5 shrink-0" />
                <span>{t.nav.adminPanel}</span>
                {newInquiriesCount > 0 && (
                  <span className="ms-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-bold">
                    {newInquiriesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigateToSection("contact")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-[#1B3325] hover:bg-[#14261b] text-amber-200 shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{t.nav.requestQuote}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            {/* Mobile & Tablet Menu Controls (< lg) */}
            <div className="flex lg:hidden items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileExportSheetOpen(false);
                  setActiveView(activeView === "portal" ? "showcase" : "portal");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`md:hidden inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-[11px] font-bold border transition-colors ${
                  activeView === "portal"
                    ? "bg-amber-400 text-stone-950 border-amber-500"
                    : "bg-amber-100/90 text-stone-900 border-amber-300"
                }`}
              >
                <PackageCheck className="w-3.5 h-3.5 text-[#1B3325]" />
                <span>Portal</span>
              </button>

              <button
                onClick={() => {
                  setMobileExportSheetOpen(false);
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Menu"
                className={`relative p-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                  mobileMenuOpen
                    ? "bg-[#1B3325] text-amber-300 border-[#1B3325] shadow-sm"
                    : "text-stone-800 hover:bg-stone-200/70 border-stone-200/80"
                }`}
              >
                <span className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <Menu
                    className={`w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-300 ease-in-out ${
                      mobileMenuOpen
                        ? "opacity-0 rotate-90 scale-50"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    className={`w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-300 ease-in-out ${
                      mobileMenuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-50"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Smooth Slide-Down Drawer */}
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
                className={`px-4 pt-3 pb-6 space-y-4 max-h-[82vh] overflow-y-auto transition-all duration-300 ease-out ${
                  mobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-3 opacity-0"
                }`}
              >
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigateToSection("about")}
                    className="text-start px-3.5 py-2.5 rounded-xl bg-white hover:bg-amber-50 active:scale-[0.98] border border-stone-200/80 text-xs sm:text-sm font-semibold text-stone-800 transition-all"
                  >
                    {t.nav.about}
                  </button>
                  <button
                    onClick={() => navigateToSection("services")}
                    className="text-start px-3.5 py-2.5 rounded-xl bg-white hover:bg-amber-50 active:scale-[0.98] border border-stone-200/80 text-xs sm:text-sm font-semibold text-stone-800 transition-all"
                  >
                    {t.nav.services}
                  </button>
                  <button
                    onClick={() => navigateToSection("products")}
                    className="text-start px-3.5 py-2.5 rounded-xl bg-white hover:bg-amber-50 active:scale-[0.98] border border-stone-200/80 text-xs sm:text-sm font-semibold text-stone-800 transition-all"
                  >
                    {t.nav.products}
                  </button>
                  <button
                    onClick={() => navigateToSection("process")}
                    className="text-start px-3.5 py-2.5 rounded-xl bg-white hover:bg-amber-50 active:scale-[0.98] border border-stone-200/80 text-xs sm:text-sm font-semibold text-stone-800 transition-all"
                  >
                    {t.nav.process}
                  </button>
                  <button
                    onClick={() => navigateToSection("location")}
                    className="text-start px-3.5 py-2.5 rounded-xl bg-white hover:bg-amber-50 active:scale-[0.98] border border-stone-200/80 text-xs sm:text-sm font-semibold text-stone-800 transition-all"
                  >
                    {t.nav.location}
                  </button>
                  <button
                    onClick={() => navigateToSection("contact")}
                    className="text-start px-3.5 py-2.5 rounded-xl bg-white hover:bg-amber-50 active:scale-[0.98] border border-stone-200/80 text-xs sm:text-sm font-semibold text-stone-800 transition-all"
                  >
                    {t.nav.contact}
                  </button>
                </div>

                {/* Portal, Admin & Quote Buttons */}
                <div className="pt-2 border-t border-stone-200 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveView("portal");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-extrabold bg-amber-400 text-stone-950 shadow-xs active:scale-[0.98] transition-transform"
                    >
                      <PackageCheck className="w-4 h-4" />
                      {t.nav.clientPortal}
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveView("admin");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-extrabold bg-stone-900 text-white shadow-xs active:scale-[0.98] transition-transform"
                    >
                      <Settings className="w-4 h-4" />
                      {t.nav.adminPanel}
                      {newInquiriesCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white">
                          {newInquiriesCount}
                        </span>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => navigateToSection("contact")}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-extrabold bg-[#1B3325] text-amber-200 shadow-xs active:scale-[0.99] transition-transform"
                  >
                    <span>{t.nav.requestQuote}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Smooth Backdrop Overlay for Mobile Navigation Drawer */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Smooth Backdrop Overlay for Mobile Export Desk Sheet */}
      <div
        onClick={() => setMobileExportSheetOpen(false)}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${
          mobileExportSheetOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Export Desk Multi-Channel Bottom Sheet (Smooth Expand & Slide-Up on Mobile) */}
      <div
        aria-hidden={!mobileExportSheetOpen}
        className={`md:hidden fixed inset-x-0 bottom-16 z-40 grid transition-all duration-300 ease-in-out ${
          mobileExportSheetOpen
            ? "grid-rows-[1fr] opacity-100 pointer-events-auto"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`w-full bg-white rounded-t-3xl p-5 space-y-4 shadow-2xl border-t border-stone-200 transition-all duration-300 ease-out ${
              mobileExportSheetOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-stone-300 mx-auto -mt-1 mb-1" />
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  DIRECT MILL COMMUNICATION
                </span>
                <h3 className="text-base font-extrabold text-stone-900">
                  {company.brandName} Export Desk
                </h3>
              </div>
              <button
                onClick={() => setMobileExportSheetOpen(false)}
                className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Direct Channels Matching Desktop Dock: WhatsApp, WeChat QR/Copy, Email + Phone */}
            <div className="space-y-2.5 text-xs">
              <a
                href={`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
                  `Hello ${company.brandName}, I am visiting your website and would like to inquire about Egyptian flax export.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold flex items-center justify-between shadow-sm transition-all"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </span>
                <span className="font-mono text-[11px] opacity-90" dir="ltr">
                  {company.egyptPhone1}
                </span>
              </a>

              {/* WeChat QR & Copy Box */}
              <div className="p-3.5 rounded-2xl bg-[#14231A] text-white space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                    <QrCode className="w-11 h-11 text-[#14231A]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                      CHINA & ASIA WECHAT DESK
                    </span>
                    <div className="text-xs font-extrabold truncate">
                      ID:{" "}
                      <span className="font-mono text-amber-300">
                        {company.wechatId}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-300 mt-0.5">
                      Scan QR or copy ID to add us on WeChat
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(company.wechatId);
                    setCopiedWechat(true);
                    setTimeout(() => setCopiedWechat(false), 2000);
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-stone-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedWechat ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>WeChat ID Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy WeChat ID ({company.wechatId})</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`mailto:${company.primaryEmail}`}
                  className="py-3 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 active:scale-[0.98] text-stone-800 font-bold flex items-center justify-center gap-1.5 border border-stone-200 transition-all"
                >
                  <Mail className="w-4 h-4 text-[#1B3325]" />
                  <span>Send Email</span>
                </a>
                <a
                  href={`tel:${company.egyptPhone1.replace(/\s+/g, "")}`}
                  className="py-3 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 active:scale-[0.98] text-stone-800 font-bold flex items-center justify-center gap-1.5 border border-stone-200 transition-all"
                >
                  <Phone className="w-4 h-4 text-[#1B3325]" />
                  <span>Call Mill</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom 4-Tab Bar (Visible only on small screens < md) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#14231A]/95 backdrop-blur-md border-t border-white/15 text-stone-200 grid grid-cols-4 h-16 px-1 shadow-2xl">
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setMobileExportSheetOpen(false);
            setActiveView("showcase");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-all duration-200 cursor-pointer ${
            activeView === "showcase" && !mobileExportSheetOpen
              ? "text-amber-300"
              : "text-stone-300"
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="truncate max-w-[72px]">Home</span>
        </button>

        <button
          onClick={() => navigateToSection("products")}
          className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-stone-300 active:text-amber-300 transition-all duration-200 cursor-pointer"
        >
          <Package className="w-4 h-4" />
          <span className="truncate max-w-[72px]">{t.nav.products}</span>
        </button>

        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setMobileExportSheetOpen(false);
            setActiveView("portal");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-all duration-200 cursor-pointer ${
            activeView === "portal" && !mobileExportSheetOpen
              ? "text-amber-300"
              : "text-stone-300"
          }`}
        >
          <PackageCheck className="w-4 h-4" />
          <span className="truncate max-w-[72px]">{t.nav.clientPortal}</span>
        </button>

        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setMobileExportSheetOpen(!mobileExportSheetOpen);
          }}
          aria-expanded={mobileExportSheetOpen}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-all duration-300 cursor-pointer ${
            mobileExportSheetOpen ? "text-amber-300" : "text-emerald-300"
          }`}
        >
          <div className="relative h-4 w-10 flex items-center justify-center">
            <span
              className={`flex items-center gap-1 absolute transition-all duration-300 ease-in-out ${
                mobileExportSheetOpen
                  ? "opacity-0 scale-50 rotate-45"
                  : "opacity-100 scale-100 rotate-0"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <QrCode className="w-3.5 h-3.5 text-amber-300" />
            </span>
            <X
              className={`w-4 h-4 text-amber-300 absolute transition-all duration-300 ease-in-out ${
                mobileExportSheetOpen
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 -rotate-45"
              }`}
            />
          </div>
          <span className="truncate max-w-[78px]">Export Desk</span>
        </button>
      </nav>
    </>
  );
}
