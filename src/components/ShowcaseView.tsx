"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFlax } from "@/context/FlaxContext";
import { ProductItem } from "@/data/initialData";
import FlaxScrollPlant from "@/components/FlaxScrollPlant";
import {
  ShieldCheck,
  ArrowRight,
  Factory,
  Award,
  FileCheck2,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Layers,
  Cog,
  Sprout,
  SlidersHorizontal,
  X,
  Scale,
  Droplets,
  Ruler,
  QrCode,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";

export default function ShowcaseView() {
  const { lang, t, products, company } = useFlax();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Subtle above-the-fold Hero entrance
      gsap.from(".hero-anim", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });

      gsap.from(".hero-media", {
        scale: 0.97,
        opacity: 0,
        duration: 0.75,
        delay: 0.12,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });

      // Gentle parallax on the flax hero photo while scrolling
      gsap.to(".hero-img", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Section headers
      gsap.utils.toArray<HTMLElement>(".anim-reveal").forEach((el) => {
        gsap.from(el, {
          y: 16,
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 94%",
            once: true,
          },
        });
      });

      // Staggered card grids (pillars, products, process steps)
      gsap.set(".anim-card", { y: 18, opacity: 0 });
      ScrollTrigger.batch(".anim-card", {
        start: "top 96%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: "power2.out",
            overwrite: true,
            clearProps: "transform,opacity",
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);
  const [contactWechatOpen, setContactWechatOpen] = useState(false);
  const [copiedWechat, setCopiedWechat] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!productDropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(e.target as Node)) {
        setProductDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProductDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [productDropdownOpen]);

  const handleInquireProduct = (product: ProductItem) => {
    setContactForm((prev) => ({ ...prev, product: product.name[lang] || product.name.en }));
    setFormSubmitted(false);
    setActiveProductModal(null);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setFormSubmitted(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contactForm, lang }),
      });

      if (!res.ok) {
        throw new Error("Failed to send inquiry");
      }

      setFormSubmitted(true);
      setContactForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        product: "",
        message: "",
      });
    } catch {
      setSubmitError(t.contact.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyWechatId = () => {
    navigator.clipboard?.writeText(company.wechatId);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  };

  return (
    <div ref={rootRef} className="relative bg-[#FAF8F5] text-stone-900 w-full overflow-x-hidden">
      <FlaxScrollPlant containerRef={rootRef} />
      {/* =========================================================
          1. HERO (Minimal Light Canvas)
      ========================================================= */}
      <section className="hero-section relative bg-[#FAF8F5] border-b border-stone-200/80 lg:min-h-[calc(100dvh-6.25rem)] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-6 sm:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
              <div className="hero-anim inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#EDC271]/25 border border-[#EDC271]/70 text-[#3F166B] text-[10px] sm:text-xs font-semibold tracking-wide max-w-full">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">{t.hero.badge}</span>
              </div>

              <h1 className="hero-anim text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl font-extrabold tracking-tight leading-[1.15] text-stone-900">
                <span className="block">{t.hero.titleLine1}</span>
                <span className="block mt-1 sm:mt-1.5 text-[#3F166B]">{t.hero.titleHighlight}</span>
              </h1>

              <p className="hero-anim text-xs sm:text-base text-stone-600 max-w-2xl leading-relaxed">
                {t.hero.subtitle}
              </p>

              <div className="hero-anim grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] font-bold text-xs sm:text-sm shadow-xs transition-all whitespace-nowrap"
                >
                  <span className="truncate">{t.hero.ctaProducts}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 rtl:rotate-180" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-xs sm:text-sm transition-all whitespace-nowrap"
                >
                  <span className="truncate">{t.hero.ctaContact}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="hero-media relative aspect-[16/10] lg:aspect-[4/3] max-h-[240px] sm:max-h-[340px] lg:max-h-[360px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
                <img
                  src="/IMG_9066.webp"
                  alt="Egy Nile Flax Factory"
                  className="hero-img w-full h-[112%] -mt-[4%] object-cover will-change-transform"
                />
              </div>
            </div>
          </div>

          {/* Key figures */}
          <div className="hero-anim mt-6 sm:mt-8 lg:mt-10 pt-5 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 border-t border-stone-200/80">
            {[
              [t.hero.stat1Value, t.hero.stat1Label],
              [t.hero.stat2Value, t.hero.stat2Label],
              [t.hero.stat3Value, t.hero.stat3Label],
              [t.hero.stat4Value, t.hero.stat4Label],
            ].map(([value, label], i) => (
              <div
                key={i}
                className="bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border border-stone-200/80 sm:border-0"
              >
                <div className="text-base sm:text-2xl font-extrabold text-[#3F166B] whitespace-nowrap">
                  {value}
                </div>
                <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          2. ABOUT
      ========================================================= */}
      <section id="about" className="scroll-mt-24 py-12 sm:py-16 lg:py-20 border-b border-stone-200/80">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="anim-reveal lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDC271]/25 text-[#3F166B] border border-[#EDC271]/60 text-xs font-bold uppercase tracking-wider">
                <Factory className="w-3.5 h-3.5 shrink-0" />
                <span>{t.about.eyebrow}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {t.about.title}
              </h2>

              <p className="text-sm sm:text-base font-semibold text-[#3F166B] leading-relaxed">
                {t.about.lead}
              </p>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{t.about.p1}</p>

              {/* Credentials */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#3F166B] text-[#EDC271] flex items-center justify-center font-bold text-xs shrink-0">
                    ISO
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-900">{t.about.isoQuality}</div>
                    <div className="text-[11px] text-stone-500">{t.brand.isoCert}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#EDC271]/25 text-[#3F166B] flex items-center justify-center font-bold text-xs border border-[#EDC271] shrink-0">
                    TEC
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-900">{t.about.councilName}</div>
                    <div className="text-[11px] text-stone-500">{t.brand.councilMembership}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Pillars */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                { icon: Layers, tone: "gold", title: t.about.pillar1Title, desc: t.about.pillar1Desc },
                { icon: Award, tone: "purple", title: t.about.pillar2Title, desc: t.about.pillar2Desc },
                { icon: Cog, tone: "gold", title: t.about.pillar3Title, desc: t.about.pillar3Desc },
                { icon: Sprout, tone: "purple", title: t.about.pillar4Title, desc: t.about.pillar4Desc },
              ].map(({ icon: Icon, tone, title, desc }, i) => (
                <div
                  key={i}
                  className="anim-card bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow space-y-2.5 sm:space-y-3"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tone === "gold" ? "bg-[#EDC271]/25 text-[#3F166B]" : "bg-[#3F166B]/10 text-[#3F166B]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900">{title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. PRODUCTS
      ========================================================= */}
      <section id="products" className="scroll-mt-24 py-12 sm:py-16 lg:py-20 bg-[#F3EFE6] border-b border-stone-200/80">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 space-y-8 sm:space-y-10">
          <div className="anim-reveal space-y-2.5 sm:space-y-3 max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3F166B] bg-[#EDC271]/25 border border-[#EDC271]/60 px-3 py-1 rounded-full">
              {t.products.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900">
              {t.products.title}
            </h2>
            <p className="text-xs sm:text-base text-stone-600">{t.products.subtitle}</p>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {products.map((product) => {
              const title = product.name[lang] || product.name.en;
              const sub = product.subtitle[lang] || product.subtitle.en;
              const desc = product.description[lang] || product.description.en;

              return (
                <div
                  key={product.id}
                  className="anim-card bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 bg-stone-200 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      {product.badge && (
                        <span className="absolute top-3 start-3 px-2.5 py-1 rounded-md bg-[#EDC271] text-[#260C42] text-[11px] font-extrabold shadow-xs">
                          {product.badge}
                        </span>
                      )}
                      <div className="absolute bottom-3 start-3 end-3">
                        <span className="text-[11px] text-[#EDC271] font-semibold block truncate">{sub}</span>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{title}</h3>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-4">
                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">{desc}</p>

                      <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/70 space-y-1.5 text-xs">
                        {[
                          [t.products.stapleLength, product.specs.stapleLength],
                          [t.products.shiveContent, product.specs.shiveContent],
                          [t.products.moisture, product.specs.moisture],
                        ].map(([label, value]) => (
                          <div key={label} className="flex justify-between gap-2">
                            <span className="text-stone-500 shrink-0">{label}:</span>
                            <span className="font-semibold text-stone-800 text-end">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {product.grades.map((grade) => (
                          <span
                            key={grade}
                            className="px-2 py-0.5 rounded bg-[#EDC271]/20 text-[#3F166B] border border-[#EDC271]/60 text-[11px] font-semibold"
                          >
                            {grade}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setActiveProductModal(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 hover:border-[#3F166B] text-stone-800 hover:text-[#3F166B] font-bold text-xs transition-all cursor-pointer whitespace-nowrap"
                    >
                      {t.products.viewSpecs}
                    </button>
                    <button
                      onClick={() => handleInquireProduct(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] font-bold text-xs text-center transition-all cursor-pointer whitespace-nowrap"
                    >
                      {t.products.inquire}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. PRODUCTION & QUALITY PROCESS
      ========================================================= */}
      <section id="process" className="scroll-mt-24 py-12 sm:py-16 lg:py-20 bg-white border-b border-stone-200/80">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 space-y-8 sm:space-y-12">
          <div className="anim-reveal text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3F166B] bg-[#EDC271]/25 border border-[#EDC271]/60 px-3 py-1 rounded-full">
              {t.process.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900">{t.process.title}</h2>
            <p className="text-xs sm:text-base text-stone-600">{t.process.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {t.process.steps.map((step) => (
              <div
                key={step.num}
                className="anim-card bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-3 hover:border-[#3F166B]/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl font-black text-[#3F166B] font-mono">{step.num}</span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EDC271]/25 text-[#3F166B] border border-[#EDC271]/60">
                    {step.metric}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">{step.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. CONTACT
      ========================================================= */}
      <section id="contact" className="scroll-mt-24 py-12 sm:py-16 lg:py-20 bg-[#FAF8F5]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Factory info & direct channels */}
            <div className="anim-reveal lg:col-span-5 space-y-5">
              <div className="space-y-3">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3F166B] bg-[#EDC271]/30 border border-[#EDC271]/60 px-3 py-1 rounded-full">
                  {t.contact.eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">{t.contact.title}</h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{t.contact.subtitle}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#3F166B] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-stone-900">{t.contact.addressLabel}</div>
                    <div className="text-xs text-stone-600 mt-0.5">{t.brand.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#3F166B] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-stone-900">{t.contact.phoneLabel}</div>
                    <div className="text-xs text-stone-600 mt-0.5 flex flex-wrap gap-x-3" dir="ltr">
                      <a href={`tel:${company.egyptPhone1.replace(/\s+/g, "")}`} className="hover:text-[#3F166B]">
                        {company.egyptPhone1}
                      </a>
                      <a href={`tel:${company.egyptPhone2.replace(/\s+/g, "")}`} className="hover:text-[#3F166B]">
                        {company.egyptPhone2}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#3F166B] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-900">{t.contact.emailLabel}</div>
                    <div className="text-xs text-stone-600 mt-0.5 flex flex-wrap gap-x-3 break-all">
                      <a href={`mailto:${company.primaryEmail}`} className="hover:text-[#3F166B]">
                        {company.primaryEmail}
                      </a>
                      <a href={`mailto:${company.secondaryEmail}`} className="hover:text-[#3F166B]">
                        {company.secondaryEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
                    `Hello ${company.brandName}, I found your website and would like to get in touch.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>{t.contact.whatsapp}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setContactWechatOpen(!contactWechatOpen)}
                  aria-expanded={contactWechatOpen}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-stone-100 text-[#3F166B] border border-stone-300 font-bold text-xs shadow-xs transition-all cursor-pointer min-w-0"
                >
                  <QrCode className="w-4 h-4 shrink-0" />
                  <span className="truncate">{t.contact.wechat} ({company.wechatId})</span>
                </button>
              </div>

              {/* WeChat details */}
              <div
                aria-hidden={!contactWechatOpen}
                className={`grid transition-all duration-300 ease-in-out ${
                  contactWechatOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-4 rounded-2xl bg-white border border-stone-300 shadow-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0">
                        <QrCode className="w-8 h-8 text-[#3F166B]" />
                      </div>
                      <div className="text-xs">
                        <div className="font-bold text-stone-900">
                          WeChat ID: <span className="font-mono">{company.wechatId}</span>
                        </div>
                        <button
                          type="button"
                          onClick={copyWechatId}
                          className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#3F166B] hover:underline cursor-pointer"
                        >
                          {copiedWechat ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.contact.copied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{t.contact.copyWechatId}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setContactWechatOpen(false)}
                      className="p-1 text-stone-400 hover:text-stone-800 self-start cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Minimal Contact Form */}
            <div className="anim-reveal lg:col-span-7">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-200 shadow-xs">
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 mb-5">{t.contact.formTitle}</h3>

                {submitError && (
                  <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {submitError}
                  </div>
                )}

                {formSubmitted && (
                  <div className="mb-6 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm text-emerald-900">{t.contact.sentTitle}</strong>
                        <p className="text-xs text-emerald-800/80 mt-0.5">{t.contact.sentDesc}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="text-emerald-700/60 hover:text-emerald-900 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.nameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.companyLabel}
                      </label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.emailFieldLabel} *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.phoneFieldLabel}
                      </label>
                      <input
                        type="text"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.contact.productLabel}
                    </label>
                    <div ref={productDropdownRef} className="relative">
                      <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={productDropdownOpen}
                        onClick={() => setProductDropdownOpen((prev) => !prev)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs bg-white flex items-center justify-between gap-2 text-start transition-colors cursor-pointer ${
                          productDropdownOpen
                            ? "border-[#3F166B] ring-2 ring-[#3F166B]/10"
                            : "border-stone-300 hover:border-stone-400"
                        }`}
                      >
                        <span className={`truncate ${contactForm.product ? "text-stone-900" : "text-stone-400"}`}>
                          {contactForm.product || "—"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                            productDropdownOpen ? "rotate-180 text-[#3F166B]" : ""
                          }`}
                        />
                      </button>

                      <div
                        role="listbox"
                        aria-hidden={!productDropdownOpen}
                        className={`absolute z-30 mt-1.5 w-full rounded-2xl bg-white border border-stone-200 shadow-xl py-1.5 max-h-60 overflow-y-auto custom-scrollbar origin-top transition-all duration-200 ${
                          productDropdownOpen
                            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                        }`}
                      >
                        <button
                          type="button"
                          role="option"
                          aria-selected={contactForm.product === ""}
                          onClick={() => {
                            setContactForm({ ...contactForm, product: "" });
                            setProductDropdownOpen(false);
                          }}
                          className={`w-full px-3.5 py-2 text-start text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            contactForm.product === ""
                              ? "bg-[#EDC271]/20 text-[#3F166B] font-semibold"
                              : "text-stone-500 hover:bg-stone-100"
                          }`}
                        >
                          <span>—</span>
                          {contactForm.product === "" && <Check className="w-3.5 h-3.5 text-[#3F166B] shrink-0" />}
                        </button>
                        {products.map((p) => {
                          const label = p.name[lang] || p.name.en;
                          const isSelected = contactForm.product === label;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setContactForm({ ...contactForm, product: label });
                                setProductDropdownOpen(false);
                              }}
                              className={`w-full px-3.5 py-2.5 text-start text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-[#EDC271]/20 text-[#3F166B] font-semibold"
                                  : "text-stone-700 hover:bg-stone-100"
                              }`}
                            >
                              <span className="truncate">{label}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#3F166B] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.contact.messageLabel} *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-xl bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] font-extrabold text-sm shadow-xs transition-all ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {isSubmitting ? t.contact.sending : t.contact.submitBtn}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRODUCT SPECIFICATION MODAL
      ========================================================= */}
      {activeProductModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-backdrop"
          onClick={() => setActiveProductModal(null)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-44 sm:h-56 bg-stone-900 shrink-0">
              <img
                src={activeProductModal.imageUrl}
                alt={activeProductModal.name[lang] || activeProductModal.name.en}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                onClick={() => setActiveProductModal(null)}
                className="absolute top-3.5 end-3.5 w-9 h-9 rounded-full bg-black/65 text-white flex items-center justify-center hover:bg-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3.5 start-5 end-5">
                <span className="text-[11px] sm:text-xs font-bold text-[#EDC271] uppercase tracking-wider block truncate">
                  {activeProductModal.subtitle[lang] || activeProductModal.subtitle.en}
                </span>
                <h3 className="text-lg sm:text-2xl font-extrabold text-white mt-0.5 leading-snug">
                  {activeProductModal.name[lang] || activeProductModal.name.en}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto custom-scrollbar">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activeProductModal.description[lang] || activeProductModal.description.en}
              </p>

              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-500 mb-3">
                  {t.products.specsTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                  {[
                    { icon: Ruler, label: t.products.stapleLength, value: activeProductModal.specs.stapleLength },
                    { icon: Droplets, label: t.products.moisture, value: activeProductModal.specs.moisture },
                    { icon: SlidersHorizontal, label: t.products.shiveContent, value: activeProductModal.specs.shiveContent },
                    { icon: Scale, label: t.products.baleWeight, value: activeProductModal.specs.baleWeight },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5"
                    >
                      <Icon className="w-4 h-4 text-[#3F166B] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-stone-500 block">{label}</span>
                        <strong className="text-stone-900">{value}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-bold text-stone-700 mb-2">{t.products.availableGrades}</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProductModal.grades.map((g) => (
                      <span key={g} className="px-2.5 py-1 rounded-lg bg-[#EDC271]/25 text-[#3F166B] border border-[#EDC271]/60 text-xs font-bold">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-700 mb-2">{t.products.applications}</h5>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {(activeProductModal.applications[lang] || activeProductModal.applications.en).map((app) => (
                      <li key={app} className="flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5 text-[#3F166B] shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
                <button
                  onClick={() => setActiveProductModal(null)}
                  className="px-4 py-3 sm:py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  {t.products.close}
                </button>
                <button
                  onClick={() => handleInquireProduct(activeProductModal)}
                  className="px-6 py-3 sm:py-2.5 rounded-xl bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] text-xs font-extrabold text-center cursor-pointer"
                >
                  {t.products.inquireProduct}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
