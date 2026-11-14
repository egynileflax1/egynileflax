"use client";

import React, { useState } from "react";
import { useFlax } from "@/context/FlaxContext";
import EgyNileLogo from "@/components/EgyNileLogo";
import { WhatsAppIcon, WeChatIcon, RedNoteIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/BrandIcons";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  MessageSquare,
  X,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function Footer() {
  const { t, company } = useFlax();
  const [qrModal, setQrModal] = useState<"wechat" | "rednote" | null>(null);
  const [activeQrType, setActiveQrType] = useState<"wechat" | "rednote">("wechat");
  const [copiedId, setCopiedId] = useState(false);
  const [dockMinimized, setDockMinimized] = useState(true);

  const openQrModal = (type: "wechat" | "rednote") => {
    setActiveQrType(type);
    setCopiedId(false);
    setQrModal(type);
  };

  const activeQr =
    activeQrType === "rednote"
      ? {
          title: t.contact.rednote,
          id: company.rednoteId,
          src: "/rednote qrcode.webp",
          copyLabel: t.contact.copyRednoteId,
          copiedLabel: t.contact.rednoteCopied,
          icon: <RedNoteIcon className="w-4 h-4 shrink-0 text-[#FF2442]" />,
        }
      : {
          title: t.contact.wechat,
          id: company.wechatId,
          src: "/wechat qrcode.webp",
          copyLabel: t.contact.copyWechatId,
          copiedLabel: t.contact.wechatCopied,
          icon: <WeChatIcon className="w-4 h-4 shrink-0 text-[#07C160]" />,
        };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const whatsappHref = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${company.brandName}, I found your website and would like to get in touch.`
  )}`;

  return (
    <>
      <footer className="bg-[#F4F0EA] text-stone-700 border-t border-stone-200 pb-20 md:pb-16">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-stone-200">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <EgyNileLogo className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 drop-shadow-xs" />
                <div>
                  <span className="text-lg font-extrabold text-stone-900 block">{company.brandName}™</span>
                  <span className="text-[11px] text-[#3F166B] font-semibold">
                    {t.brand.locationLine}
                  </span>
                </div>
              </div>
              <p className="hidden sm:block text-xs text-stone-600 leading-relaxed">{t.footer.tagline}</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-[11px] sm:text-xs text-[#3F166B] font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  {t.brand.isoCert} • {t.brand.councilMembership}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden sm:block lg:col-span-2 space-y-3 text-xs">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider">{t.footer.navigation}</h4>
              <ul className="space-y-2 text-stone-600">
                {(
                  [
                    ["about", t.nav.about],
                    ["products", t.nav.products],
                    ["process", t.nav.process],
                    ["contact", t.nav.contact],
                  ] as const
                ).map(([id, label]) => (
                  <li key={id}>
                    <button onClick={() => scrollTo(id)} className="hover:text-[#3F166B] cursor-pointer">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product lines */}
            <div className="hidden sm:block lg:col-span-3 space-y-3 text-xs">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider">{t.footer.productLines}</h4>
              <ul className="space-y-2 text-stone-600">
                <li>{t.products.catScutched}</li>
                <li>{t.products.catHackled}</li>
                <li>{t.products.catPlumbing}</li>
                <li>{t.products.catTwine}</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="sm:col-span-2 lg:col-span-3 space-y-3 text-xs">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider">{t.footer.contactTitle}</h4>
              <div className="space-y-2 text-stone-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#3F166B] shrink-0 mt-0.5" />
                  <span>{company.factoryAddress}</span>
                </div>
                <a
                  href={`tel:${company.egyptPhone1.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:text-[#3F166B]"
                >
                  <Phone className="w-4 h-4 text-[#3F166B] shrink-0" />
                  <span dir="ltr">{company.egyptPhone1}</span>
                </a>
                <a href={`mailto:${company.primaryEmail}`} className="flex items-center gap-2 hover:text-[#3F166B]">
                  <Mail className="w-4 h-4 text-[#3F166B] shrink-0" />
                  <span className="break-all">{company.primaryEmail}</span>
                </a>
              </div>

              <div className="pt-1 flex items-center gap-2.5">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.whatsapp}
                  title={t.contact.whatsapp}
                  className="w-10 h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white inline-flex items-center justify-center transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
                <button
                  onClick={() => openQrModal("wechat")}
                  aria-label={t.contact.wechat}
                  title={t.contact.wechat}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-stone-50 text-[#07C160] border border-stone-300 inline-flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                >
                  <WeChatIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => openQrModal("rednote")}
                  aria-label={t.contact.rednote}
                  title={t.contact.rednote}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-stone-50 text-[#FF2442] border border-stone-300 inline-flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                >
                  <RedNoteIcon className="w-5 h-5" />
                </button>
                <a
                  href={`https://www.facebook.com/${company.facebookId}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.facebook}
                  title={t.contact.facebook}
                  className="w-10 h-10 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white inline-flex items-center justify-center transition-colors shadow-xs"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.instagram.com/${company.instagramId}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.instagram}
                  title={t.contact.instagram}
                  className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F77737] via-[#FD1D1D] to-[#833AB4] hover:opacity-90 text-white inline-flex items-center justify-center transition-opacity shadow-xs"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/company/${company.linkedinId}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.linkedin}
                  title={t.contact.linkedin}
                  className="w-10 h-10 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white inline-flex items-center justify-center transition-colors shadow-xs"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 text-xs text-stone-500">
            <p>{t.footer.rights}</p>
          </div>
        </div>
      </footer>

      {/* Floating contact dock (tablet & desktop) */}
      <div className="hidden md:flex fixed bottom-4 end-5 z-40 items-center">
        <div
          className={`relative flex items-center rounded-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out ${
            dockMinimized ? "p-0 border border-stone-300 hover:bg-stone-50" : "p-1.5 border border-stone-200"
          }`}
        >
          {/* Minimized trigger */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              dockMinimized ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              <button
                onClick={() => setDockMinimized(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-[#3F166B] font-bold text-xs whitespace-nowrap cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-stone-400 shrink-0 rtl:rotate-180" />
                <MessageSquare className="w-4 h-4 text-[#3F166B] shrink-0" />
                <span>{t.nav.contact}</span>
              </button>
            </div>
          </div>

          {/* Expanded buttons */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              dockMinimized ? "grid-cols-[0fr] opacity-0 pointer-events-none" : "grid-cols-[1fr] opacity-100"
            }`}
          >
            <div className="overflow-hidden">
              <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.whatsapp}
                  title={t.contact.whatsapp}
                  className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white inline-flex items-center justify-center transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <button
                  onClick={() => openQrModal("wechat")}
                  aria-label={t.contact.wechat}
                  title={t.contact.wechat}
                  className="w-9 h-9 rounded-full bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] inline-flex items-center justify-center transition-colors cursor-pointer"
                >
                  <WeChatIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openQrModal("rednote")}
                  aria-label={t.contact.rednote}
                  title={t.contact.rednote}
                  className="w-9 h-9 rounded-full bg-[#FF2442] hover:bg-[#E01E3B] text-white inline-flex items-center justify-center transition-colors cursor-pointer"
                >
                  <RedNoteIcon className="w-4 h-4" />
                </button>
                <a
                  href={`https://www.facebook.com/${company.facebookId}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.facebook}
                  title={t.contact.facebook}
                  className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white inline-flex items-center justify-center transition-colors"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.instagram.com/${company.instagramId}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.instagram}
                  title={t.contact.instagram}
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F77737] via-[#FD1D1D] to-[#833AB4] hover:opacity-90 text-white inline-flex items-center justify-center transition-opacity"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/company/${company.linkedinId}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.linkedin}
                  title={t.contact.linkedin}
                  className="w-9 h-9 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white inline-flex items-center justify-center transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${company.primaryEmail}`}
                  aria-label={t.contact.emailLabel}
                  title={t.contact.emailLabel}
                  className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-[#3F166B] inline-flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setDockMinimized(true)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                  title={t.contact.collapse}
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WeChat & RedNote QR modal */}
      <div
        aria-hidden={!qrModal}
        onClick={() => setQrModal(null)}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${
          qrModal
            ? "bg-black/75 backdrop-blur-xs opacity-100 pointer-events-auto"
            : "bg-black/0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl transition-all duration-300 ease-out ${
            qrModal ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3F166B]">
              {activeQr.icon}
              <span>{activeQr.title}</span>
            </span>
            <button
              onClick={() => setQrModal(null)}
              className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mx-auto rounded-2xl bg-stone-50 border border-stone-200 p-3 inline-flex flex-col items-center">
            <img
              src={activeQr.src}
              alt={`${activeQr.title} QR Code — ${activeQr.id}`}
              className="w-44 h-44 sm:w-48 sm:h-48 rounded-xl object-contain bg-white"
            />
            <span className="text-[11px] font-mono font-bold text-stone-700 mt-2">ID: {activeQr.id}</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(activeQr.id);
              setCopiedId(true);
              setTimeout(() => setCopiedId(false), 2000);
            }}
            className="w-full py-2.5 rounded-xl bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] font-bold text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copiedId ? (
              <>
                <Check className="w-4 h-4" />
                <span>{activeQr.copiedLabel}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{activeQr.copyLabel} ({activeQr.id})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
