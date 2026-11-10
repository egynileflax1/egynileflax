"use client";

import React, { useState } from "react";
import { useFlax } from "@/context/FlaxContext";
import EgyNileLogo from "@/components/EgyNileLogo";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  QrCode,
  MessageSquare,
  X,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function Footer() {
  const { t, company, setActiveView, openPortalWithCode } = useFlax();
  const [wechatModalOpen, setWechatModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [dockMinimized, setDockMinimized] = useState(false);

  return (
    <>
      <footer className="bg-[#0F1C14] text-stone-300 border-t border-white/10 pb-20 md:pb-16">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-white/10">
            {/* Col 1: Brand & Credentials */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <EgyNileLogo className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 drop-shadow-sm" />
                <div>
                  <span className="text-lg font-extrabold text-white block">
                    {company.brandName}™
                  </span>
                  <span className="text-[11px] text-amber-300 font-semibold">
                    SINCE {company.foundedYear} • GAMASA, EGYPT
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t.footer.tagline}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs text-amber-300 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  {company.isoCert} • {company.councilMembership}
                </span>
              </div>
            </div>

            {/* Col 2: Quick Navigation */}
            <div className="lg:col-span-2 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-2 text-stone-400">
                <li>
                  <button
                    onClick={() => setActiveView("showcase")}
                    className="hover:text-amber-300 cursor-pointer"
                  >
                    {t.nav.about}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveView("showcase")}
                    className="hover:text-amber-300 cursor-pointer"
                  >
                    {t.nav.services}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveView("showcase")}
                    className="hover:text-amber-300 cursor-pointer"
                  >
                    {t.nav.products}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPortalWithCode("ENF-2026-8841")}
                    className="hover:text-amber-300 text-amber-200 font-semibold cursor-pointer"
                  >
                    {t.nav.clientPortal}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveView("admin")}
                    className="hover:text-amber-300 cursor-pointer"
                  >
                    {t.nav.adminPanel}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Flax Product Lines */}
            <div className="lg:col-span-3 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">
                Egyptian Flax Lines
              </h4>
              <ul className="space-y-2 text-stone-400">
                <li>Scutched Long Flax (Grades C, D, E, EK)</li>
                <li>Hackled Long Fibres & Sliver Tops</li>
                <li>Machine Tow & Arrous Short Fibres</li>
                <li>Cottonised Flax (32–38mm Ring/OE)</li>
                <li>Plumbing Flax (Jokia Dolls & Spools)</li>
                <li>Flax Twines, Butcher Twine & Ropes</li>
              </ul>
            </div>

            {/* Col 4: Direct Export Desk & WeChat QR */}
            <div className="sm:col-span-2 lg:col-span-3 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">
                Export Desk & WeChat
              </h4>
              <div className="space-y-2 text-stone-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{company.factoryAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span dir="ltr">{company.egyptPhone1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="break-all">{company.primaryEmail}</span>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap gap-2">
                <button
                  onClick={() => setWechatModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-amber-300 border border-white/15 font-bold text-xs cursor-pointer"
                >
                  <QrCode className="w-4 h-4 shrink-0" />
                  <span>WeChat QR</span>
                </button>
                <a
                  href={`https://wa.me/${company.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-400">
            <p>{t.footer.rights}</p>
            <p className="font-mono text-[11px]">
              Damietta Port (EGDAM) • Alexandria Port (EGALY) • ISO 9001:2015
            </p>
          </div>
        </div>
      </footer>

      {/* Multi-Channel Floating Export Dock (WhatsApp + WeChat + Email) on Desktop/Tablet (Smooth Expand/Collapse) */}
      <div className="hidden md:flex fixed bottom-4 end-5 z-40 items-center">
        <div
          className={`relative flex items-center rounded-full bg-[#14231A]/95 backdrop-blur-md shadow-2xl transition-all duration-300 ease-in-out ${
            dockMinimized
              ? "p-0 border border-amber-400/40 hover:bg-[#1B3325]"
              : "p-1.5 border border-white/15"
          }`}
        >
          {/* Minimized "Export Desk" Trigger */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              dockMinimized
                ? "grid-cols-[1fr] opacity-100"
                : "grid-cols-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              <button
                onClick={() => setDockMinimized(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-amber-300 font-bold text-xs whitespace-nowrap cursor-pointer"
                title="Expand Export Desk (WhatsApp, WeChat, Email)"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-amber-300/80 shrink-0 rtl:rotate-180" />
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <QrCode className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Export Desk</span>
              </button>
            </div>
          </div>

          {/* Expanded Multi-Channel Buttons (WhatsApp | WeChat | Email) */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              dockMinimized
                ? "grid-cols-[0fr] opacity-0 pointer-events-none"
                : "grid-cols-[1fr] opacity-100"
            }`}
          >
            <div className="overflow-hidden">
              <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <a
                  href={`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
                    `Hello ${company.brandName}, I am visiting your website and would like to inquire about Egyptian flax export.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                  title="Chat on WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => setWechatModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                  title="Connect on WeChat (QR Code & ID)"
                >
                  <QrCode className="w-3.5 h-3.5 shrink-0" />
                  <span>WeChat</span>
                </button>

                <a
                  href={`mailto:${company.primaryEmail}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 font-semibold text-xs transition-colors"
                  title={`Email ${company.primaryEmail}`}
                >
                  <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Email</span>
                </a>

                <button
                  onClick={() => setDockMinimized(true)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Collapse Export Desk"
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth WeChat QR Code Modal */}
      <div
        aria-hidden={!wechatModalOpen}
        onClick={() => setWechatModalOpen(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${
          wechatModalOpen
            ? "bg-black/75 backdrop-blur-xs opacity-100 pointer-events-auto"
            : "bg-black/0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl transition-all duration-300 ease-out ${
            wechatModalOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              OFFICIAL WECHAT EXPORT DESK
            </span>
            <button
              onClick={() => setWechatModalOpen(false)}
              className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="w-44 h-44 sm:w-48 sm:h-48 mx-auto rounded-2xl bg-stone-100 border-2 border-stone-300 flex flex-col items-center justify-center p-4">
            <QrCode className="w-24 h-24 sm:w-28 sm:h-28 text-[#1B3325]" />
            <span className="text-[11px] font-mono font-bold text-stone-700 mt-2">
              ID: {company.wechatId}
            </span>
          </div>
          <p className="text-xs text-stone-600">
            Scan or add WeChat ID <strong>{company.wechatId}</strong> or{" "}
            <strong dir="ltr">{company.egyptPhone1}</strong> for direct Chinese &
            English mill support.
          </p>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(company.wechatId);
              setCopiedId(true);
              setTimeout(() => setCopiedId(false), 2000);
            }}
            className="w-full py-2.5 rounded-xl bg-[#1B3325] text-amber-300 font-bold text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copiedId ? (
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
      </div>
    </>
  );
}
