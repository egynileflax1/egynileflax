"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFlax } from "@/context/FlaxContext";
import { ProductItem } from "@/data/initialData";
import FlaxScrollPlant from "@/components/FlaxScrollPlant";
import { LOADER_DONE_EVENT } from "@/components/PageLoader";
import { contactSchema, ContactFieldErrorKey } from "@/lib/contactSchema";
import { WhatsAppIcon, WeChatIcon, RedNoteIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/BrandIcons";
import {
  ShieldCheck,
  ArrowRight,
  Factory,
  Award,
  FileCheck2,
  MapPin,
  Phone,
  Mail,
  Layers,
  Cog,
  Sprout,
  SlidersHorizontal,
  X,
  Scale,
  Droplets,
  Ruler,
  Copy,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Images,
  Printer,
} from "lucide-react";

function pushDataLayer(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

export default function ShowcaseView() {
  const { lang, t, products, company } = useFlax();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    let heroTl: gsap.core.Timeline | undefined;
    let fallbackTimer: number | undefined;

    const ctx = gsap.context(() => {
      // Subtle above-the-fold Hero entrance (held until PageLoader finishes)
      heroTl = gsap.timeline({ paused: true });
      heroTl
        .from(".hero-anim", {
          y: 18,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity",
        })
        .from(
          ".hero-media",
          {
            scale: 0.97,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          0.12
        );

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

    const playHero = () => {
      heroTl?.play();
      window.clearTimeout(fallbackTimer);
      window.removeEventListener(LOADER_DONE_EVENT, playHero);
    };

    if (window.__egyNileLoaderDone) {
      playHero();
    } else {
      window.addEventListener(LOADER_DONE_EVENT, playHero, { once: true });
      fallbackTimer = window.setTimeout(playHero, 1400);
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener(LOADER_DONE_EVENT, playHero);
      ctx.revert();
    };
  }, []);

  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const modalCloseTimerRef = useRef<number | undefined>(undefined);

  const modalImages = activeProductModal
    ? activeProductModal.images?.length
      ? activeProductModal.images
      : [activeProductModal.imageUrl]
    : [];

  const openProductModal = (product: ProductItem, initialImageIdx = 0) => {
    window.clearTimeout(modalCloseTimerRef.current);
    setActiveProductModal(product);
    setActiveImageIdx(initialImageIdx);
    setLightboxOpen(false);
    pushDataLayer("product_spec_view", {
      product_id: product.id,
      product_name: product.name.en,
      lang,
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalVisible(true));
    });
  };

  const closeProductModal = () => {
    setLightboxOpen(false);
    setModalVisible(false);
    window.clearTimeout(modalCloseTimerRef.current);
    modalCloseTimerRef.current = window.setTimeout(() => {
      setActiveProductModal(null);
    }, 300);
  };

  useEffect(() => {
    if (!activeProductModal) return;
    const totalImgs = activeProductModal.images?.length || 1;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          closeProductModal();
        }
      } else if (e.key === "ArrowRight" && totalImgs > 1) {
        setActiveImageIdx((prev) => (prev + 1) % totalImgs);
      } else if (e.key === "ArrowLeft" && totalImgs > 1) {
        setActiveImageIdx((prev) => (prev - 1 + totalImgs) % totalImgs);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProductModal, lightboxOpen]);

  useEffect(() => {
    return () => window.clearTimeout(modalCloseTimerRef.current);
  }, []);
  const [contactQrType, setContactQrType] = useState<"wechat" | "rednote" | null>(null);
  const [lastQrType, setLastQrType] = useState<"wechat" | "rednote">("wechat");
  const [copiedQrId, setCopiedQrId] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    destination: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"name" | "email" | "phone" | "message", string>>
  >({});

  const updateContactField = (field: keyof typeof contactForm, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
    if (field === "name" || field === "email" || field === "phone" || field === "message") {
      setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    }
  };

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
    closeProductModal();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);
    setFormSubmitted(false);

    const parsed = contactSchema.safeParse({ ...contactForm, lang });
    if (!parsed.success) {
      const nextErrors: Partial<Record<"name" | "email" | "phone" | "message", string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "name" || field === "email" || field === "phone" || field === "message") {
          if (!nextErrors[field]) {
            const key = issue.message as ContactFieldErrorKey;
            nextErrors[field] = t.contact.validation[key] || issue.message;
          }
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        throw new Error("Failed to send inquiry");
      }

      pushDataLayer("contact_form_submit", {
        lang,
        product: parsed.data.product || "general",
        has_quantity: Boolean(parsed.data.quantity),
        has_destination: Boolean(parsed.data.destination),
      });

      setFormSubmitted(true);
      requestAnimationFrame(() => {
        contactCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      setContactForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        product: "",
        quantity: "",
        destination: "",
        message: "",
      });
    } catch {
      setSubmitError(t.contact.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleContactQr = (type: "wechat" | "rednote") => {
    setCopiedQrId(false);
    if (contactQrType === type) {
      setContactQrType(null);
    } else {
      setLastQrType(type);
      setContactQrType(type);
    }
  };

  const activeQr =
    lastQrType === "rednote"
      ? {
          title: t.contact.rednote,
          id: company.rednoteId,
          src: "/rednote qrcode.webp",
          copyLabel: t.contact.copyRednoteId,
        }
      : {
          title: t.contact.wechat,
          id: company.wechatId,
          src: "/wechat qrcode.webp",
          copyLabel: t.contact.copyWechatId,
        };

  const copyQrId = () => {
    navigator.clipboard?.writeText(activeQr.id);
    setCopiedQrId(true);
    setTimeout(() => setCopiedQrId(false), 2000);
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
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="hero-anim inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#EDC271]/25 border border-[#EDC271]/70 text-[#3F166B] text-[10px] sm:text-xs font-semibold tracking-wide max-w-full">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">{t.hero.badge}</span>
              </div>

              <h1 className="hero-anim text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl font-extrabold tracking-tight leading-[1.18] rtl:leading-[1.28] text-stone-900">
                <span className="block">{t.hero.titleLine1}</span>
                <span className="block mt-1 sm:mt-1.5 text-[#3F166B]">{t.hero.titleHighlight}</span>
              </h1>

              <p className="hero-anim text-xs sm:text-base text-stone-600 max-w-2xl leading-relaxed line-clamp-2 sm:line-clamp-none">
                {t.hero.subtitle}
              </p>

              <div className="hero-anim grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#3F166B] hover:bg-[#2F1052] text-[#EDC271] font-bold text-xs sm:text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap"
                >
                  <span className="truncate">{t.hero.ctaProducts}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 rtl:rotate-180" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-xs sm:text-sm hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap"
                >
                  <span className="truncate">{t.hero.ctaContact}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[#EDC271]/20 blur-2xl opacity-70"
              />
              <div className="hero-media relative aspect-[16/10] lg:aspect-square max-h-[210px] sm:max-h-[340px] lg:max-h-[430px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/90 ring-1 ring-[#3F166B]/10 shadow-md bg-stone-100">
                <img
                  src="/Scutched flax.webp"
                  alt="Egy Nile Flax Factory"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="hero-img w-full h-[112%] -mt-[4%] object-cover will-change-transform"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 start-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#EDC271] shrink-0" />
                  <span>{t.brand.locationLine}</span>
                </div>
                <div className="hidden sm:block absolute bottom-3 end-3 w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-2 border-[#FAF8F5] shadow-lg bg-stone-200">
                  <img
                    src="/Hackled flax.webp"
                    alt="Egyptian Flax Fibre Detail"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Key figures */}
          <div className="hero-anim mt-6 sm:mt-8 lg:mt-10 pt-5 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 sm:divide-x sm:divide-stone-200/80 rtl:sm:divide-x-reverse border-t border-stone-200/80">
            {[
              [t.hero.stat1Value, t.hero.stat1Label],
              [t.hero.stat2Value, t.hero.stat2Label],
              [t.hero.stat3Value, t.hero.stat3Label],
              [t.hero.stat4Value, t.hero.stat4Label],
            ].map(([value, label], i) => (
              <div
                key={i}
                className="bg-white sm:bg-transparent p-3 sm:p-0 sm:px-6 first:sm:ps-0 last:sm:pe-0 rounded-xl border border-stone-200/80 sm:border-0"
              >
                <div className="text-base sm:text-2xl font-extrabold text-[#3F166B] tabular-nums whitespace-nowrap">
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
      <section id="about" className="scroll-mt-24 py-10 sm:py-16 lg:py-20 border-b border-stone-200/80">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="anim-reveal lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDC271]/25 text-[#3F166B] border border-[#EDC271]/60 text-xs font-bold uppercase tracking-wider">
                <Factory className="w-3.5 h-3.5 shrink-0" />
                <span>{t.about.eyebrow}</span>
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {t.about.title}
              </h2>

              <p className="text-xs sm:text-base font-semibold text-[#3F166B] leading-relaxed">
                {t.about.lead}
              </p>

              <p className="hidden sm:block text-xs sm:text-sm text-stone-600 leading-relaxed">{t.about.p1}</p>

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
            <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-5">
              {[
                { icon: Layers, tone: "gold", title: t.about.pillar1Title, desc: t.about.pillar1Desc },
                { icon: Award, tone: "purple", title: t.about.pillar2Title, desc: t.about.pillar2Desc },
                { icon: Cog, tone: "gold", title: t.about.pillar3Title, desc: t.about.pillar3Desc },
                { icon: Sprout, tone: "purple", title: t.about.pillar4Title, desc: t.about.pillar4Desc },
              ].map(({ icon: Icon, tone, title, desc }, i) => (
                <div
                  key={i}
                  className="anim-card bg-white p-3.5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow space-y-2 sm:space-y-3"
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${
                      tone === "gold" ? "bg-[#EDC271]/25 text-[#3F166B]" : "bg-[#3F166B]/10 text-[#3F166B]"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-stone-900 leading-snug">{title}</h3>
                  <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed line-clamp-2 sm:line-clamp-none">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mill Processing Video (commented out for now)
          <div className="mt-8 sm:mt-12 rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 p-5 sm:p-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3F166B]/10 text-[#3F166B] text-[11px] font-bold uppercase tracking-wider">
                <Factory className="w-3.5 h-3.5" />
                {lang === "ar" ? "خط الإنتاج — طنطا" : lang === "zh" ? "坦塔工厂实拍" : "Tanta Mill Operations"}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                {lang === "ar"
                  ? "لقطات حية من مصنع وتجهيز ألياف الكتان"
                  : lang === "zh"
                    ? "埃及坦塔亚麻加工与打包现场"
                    : "Inside Our Tanta Scutching & Baling Line"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === "ar"
                  ? "متابعة مباشرة لمراحل الفرز والتجهيز وضغط البالات المخصصة للتصدير وفق معايير الجودة العالمية ISO 9001:2015."
                  : lang === "zh"
                    ? "实拍亚麻打成、清杂分级与出口打包全流程，严格遵循 ISO 9001:2015 质量体系。"
                    : "Direct look at our fiber grading, scutching, and export baling operations in Gharbia Governorate under ISO 9001:2015 quality control."}
              </p>
            </div>
            <div className="lg:col-span-7 bg-stone-950 aspect-video max-h-[360px] w-full">
              <video
                src="/IMG_0027.MP4"
                poster="/Flax Arrous.webp"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          */}
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
          <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
            {products.map((product) => {
              const title = product.name[lang] || product.name.en;
              const sub = product.subtitle[lang] || product.subtitle.en;
              const desc = product.description[lang] || product.description.en;

              return (
                <div
                  key={product.id}
                  className="anim-card w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    <div
                      onClick={() => openProductModal(product)}
                      className="relative h-48 bg-stone-200 overflow-hidden cursor-pointer"
                    >
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
                      {product.images?.length > 1 && (
                        <span className="absolute top-3 end-3 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/55 backdrop-blur-xs text-white text-[10px] font-bold">
                          <Images className="w-3 h-3 text-[#EDC271]" />
                          <span>{product.images.length}</span>
                        </span>
                      )}
                      <div className="absolute bottom-3 start-3 end-3">
                        <span className="text-[11px] text-[#EDC271] font-semibold block truncate">{sub}</span>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{title}</h3>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
                      <p className="hidden sm:line-clamp-3 text-xs text-stone-600 leading-relaxed">{desc}</p>

                      <div className="bg-stone-50 rounded-xl p-2.5 sm:p-3 border border-stone-200/70 space-y-1.5 text-xs">
                        {[
                          [t.products.baleWeight, product.specs.baleWeight],
                          [t.products.stapleLength, product.specs.stapleLength],
                          [t.products.shiveContent, product.specs.shiveContent],
                        ].map(([label, value]) => (
                          <div key={label} className="flex justify-between gap-2">
                            <span className="text-stone-500 shrink-0">{label}:</span>
                            <span className="font-semibold text-stone-800 text-end">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="hidden sm:flex flex-wrap gap-1.5">
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
                      onClick={() => openProductModal(product)}
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
      <section id="process" className="scroll-mt-24 py-10 sm:py-16 lg:py-20 bg-white border-b border-stone-200/80">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 space-y-6 sm:space-y-12">
          <div className="anim-reveal text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3F166B] bg-[#EDC271]/25 border border-[#EDC271]/60 px-3 py-1 rounded-full">
              {t.process.eyebrow}
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900">{t.process.title}</h2>
            <p className="hidden sm:block text-xs sm:text-base text-stone-600">{t.process.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {t.process.steps.map((step) => (
              <div
                key={step.num}
                className="anim-card bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3 hover:border-[#3F166B]/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xl sm:text-2xl font-black text-[#3F166B] font-mono">{step.num}</span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EDC271]/25 text-[#3F166B] border border-[#EDC271]/60">
                    {step.metric}
                  </span>
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-stone-900">{step.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 sm:line-clamp-none">{step.desc}</p>
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
                <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900">{t.contact.title}</h2>
                <p className="hidden sm:block text-xs sm:text-sm text-stone-600 leading-relaxed">{t.contact.subtitle}</p>
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
                    `Hello ${company.brandName}, I found your website and would like to get in touch.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.whatsapp}
                  title={t.contact.whatsapp}
                  className="w-11 h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white inline-flex items-center justify-center shadow-xs transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
                <button
                  type="button"
                  onClick={() => toggleContactQr("wechat")}
                  aria-expanded={contactQrType === "wechat"}
                  aria-label={t.contact.wechat}
                  title={`${t.contact.wechat} (${company.wechatId})`}
                  className="w-11 h-11 rounded-xl bg-white hover:bg-stone-100 text-[#07C160] border border-stone-300 inline-flex items-center justify-center shadow-xs transition-all cursor-pointer"
                >
                  <WeChatIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleContactQr("rednote")}
                  aria-expanded={contactQrType === "rednote"}
                  aria-label={t.contact.rednote}
                  title={`${t.contact.rednote} (${company.rednoteId})`}
                  className="w-11 h-11 rounded-xl bg-white hover:bg-stone-100 text-[#FF2442] border border-stone-300 inline-flex items-center justify-center shadow-xs transition-all cursor-pointer"
                >
                  <RedNoteIcon className="w-5 h-5" />
                </button>
                <a
                  href={`https://www.facebook.com/${company.facebookId}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.facebook}
                  title={t.contact.facebook}
                  className="w-11 h-11 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white inline-flex items-center justify-center shadow-xs transition-all"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.instagram.com/${company.instagramId}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.instagram}
                  title={t.contact.instagram}
                  className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#F77737] via-[#FD1D1D] to-[#833AB4] hover:opacity-90 text-white inline-flex items-center justify-center shadow-xs transition-all"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/company/${company.linkedinId}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.contact.linkedin}
                  title={t.contact.linkedin}
                  className="w-11 h-11 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white inline-flex items-center justify-center shadow-xs transition-all"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
              </div>

              {/* WeChat & RedNote QR details */}
              <div
                aria-hidden={!contactQrType}
                className={`grid transition-all duration-300 ease-in-out ${
                  contactQrType ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-4 rounded-2xl bg-white border border-stone-300 shadow-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded-xl bg-white border border-stone-200 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={activeQr.src}
                          alt={`${activeQr.title} QR Code — ${activeQr.id}`}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <div className="text-xs">
                        <div className="font-bold text-stone-900">
                          {activeQr.title} ID: <span className="font-mono">{activeQr.id}</span>
                        </div>
                        <button
                          type="button"
                          onClick={copyQrId}
                          className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#3F166B] hover:underline cursor-pointer"
                        >
                          {copiedQrId ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.contact.copied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{activeQr.copyLabel}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setContactQrType(null)}
                      className="p-1 text-stone-400 hover:text-stone-800 self-start cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Minimal Contact Form */}
            <div className="anim-reveal lg:col-span-7 min-w-0">
              <div
                ref={contactCardRef}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-200 shadow-xs transition-all duration-300 ease-in-out min-w-0"
              >
                {/* Confirmation state */}
                <div
                  aria-hidden={!formSubmitted}
                  className={`grid transition-all duration-300 ease-in-out ${
                    formSubmitted
                      ? "grid-rows-[1fr] opacity-100 scale-100"
                      : "grid-rows-[0fr] opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="py-8 sm:py-12 px-4 text-center space-y-4">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Check className="w-7 h-7 stroke-[2.5]" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                          {t.contact.sentTitle}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                          {t.contact.sentDesc}
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-stone-300 hover:border-[#3F166B] text-stone-800 hover:text-[#3F166B] font-bold text-xs transition-colors cursor-pointer"
                        >
                          {t.contact.sendAnother}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form state */}
                <div
                  aria-hidden={formSubmitted}
                  inert={formSubmitted ? true : undefined}
                  className={`grid transition-all duration-300 ease-in-out ${
                    formSubmitted
                      ? "grid-rows-[0fr] opacity-0 pointer-events-none"
                      : "grid-rows-[1fr] opacity-100"
                  }`}
                >
                  <div className={`min-w-0 ${formSubmitted ? "overflow-hidden" : "overflow-visible"}`}>
                    <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 mb-5">{t.contact.formTitle}</h3>

                    {submitError && (
                      <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                        {submitError}
                      </div>
                    )}

                    <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.nameLabel} *
                      </label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => updateContactField("name", e.target.value)}
                        aria-invalid={Boolean(fieldErrors.name)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs focus:outline-none ${
                          fieldErrors.name
                            ? "border-red-400 focus:border-red-500"
                            : "border-stone-300 focus:border-[#3F166B]"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="mt-1 text-[11px] font-medium text-red-600">{fieldErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.companyLabel}
                      </label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => updateContactField("company", e.target.value)}
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
                        value={contactForm.email}
                        onChange={(e) => updateContactField("email", e.target.value)}
                        aria-invalid={Boolean(fieldErrors.email)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs focus:outline-none ${
                          fieldErrors.email
                            ? "border-red-400 focus:border-red-500"
                            : "border-stone-300 focus:border-[#3F166B]"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 text-[11px] font-medium text-red-600">{fieldErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.phoneFieldLabel}
                      </label>
                      <input
                        type="text"
                        value={contactForm.phone}
                        onChange={(e) => updateContactField("phone", e.target.value)}
                        aria-invalid={Boolean(fieldErrors.phone)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs focus:outline-none ${
                          fieldErrors.phone
                            ? "border-red-400 focus:border-red-500"
                            : "border-stone-300 focus:border-[#3F166B]"
                        }`}
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1 text-[11px] font-medium text-red-600">{fieldErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.contact.productLabel}
                    </label>
                    <div ref={productDropdownRef} className="relative min-w-0">
                      <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={productDropdownOpen}
                        onClick={() => setProductDropdownOpen((prev) => !prev)}
                        className={`w-full min-w-0 px-3.5 py-2.5 rounded-xl border text-base sm:text-xs bg-white flex items-center justify-between gap-2 text-start transition-colors cursor-pointer ${
                          productDropdownOpen
                            ? "border-[#3F166B] ring-2 ring-[#3F166B]/10"
                            : "border-stone-300 hover:border-stone-400"
                        }`}
                      >
                        <span className={`min-w-0 flex-1 truncate ${contactForm.product ? "text-stone-900" : "text-stone-400"}`}>
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
                        inert={!productDropdownOpen ? true : undefined}
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
                          onClick={(e) => {
                            e.currentTarget.blur();
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
                              onClick={(e) => {
                                e.currentTarget.blur();
                                setContactForm({ ...contactForm, product: label });
                                setProductDropdownOpen(false);
                              }}
                              className={`w-full px-3.5 py-2.5 text-start text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-[#EDC271]/20 text-[#3F166B] font-semibold"
                                  : "text-stone-700 hover:bg-stone-100"
                              }`}
                            >
                              <span className="min-w-0 flex-1 truncate">{label}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#3F166B] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-quantity" className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.quantityLabel}
                      </label>
                      <input id="inquiry-quantity" type="text" value={contactForm.quantity}
                        onChange={(e) => updateContactField("quantity", e.target.value)}
                        placeholder={t.contact.quantityPlaceholder} autoComplete="off"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]" />
                    </div>
                    <div>
                      <label htmlFor="inquiry-destination" className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.destinationLabel}
                      </label>
                      <input id="inquiry-destination" type="text" value={contactForm.destination}
                        onChange={(e) => updateContactField("destination", e.target.value)}
                        placeholder={t.contact.destinationPlaceholder} autoComplete="country-name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#3F166B]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.contact.messageLabel} *
                    </label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => updateContactField("message", e.target.value)}
                      placeholder={t.contact.messagePlaceholder}
                      aria-invalid={Boolean(fieldErrors.message)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-xs focus:outline-none ${
                        fieldErrors.message
                          ? "border-red-400 focus:border-red-500"
                          : "border-stone-300 focus:border-[#3F166B]"
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="mt-1 text-[11px] font-medium text-red-600">{fieldErrors.message}</p>
                    )}
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
          </div>
        </div>
      </section>

      {/* =========================================================
          PRODUCT SPECIFICATION MODAL
      ========================================================= */}
      {activeProductModal && (
        <div
          aria-hidden={!modalVisible}
          className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300 ease-out ${
            modalVisible
              ? "bg-black/75 backdrop-blur-xs opacity-100 pointer-events-auto"
              : "bg-black/0 opacity-0 pointer-events-none"
          }`}
          onClick={closeProductModal}
        >
          <div
            className={`bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ease-out ${
              modalVisible
                ? "opacity-100 translate-y-0 sm:scale-100"
                : "opacity-0 translate-y-12 sm:translate-y-4 sm:scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-52 sm:h-64 bg-stone-900 shrink-0 group/img">
              <img
                src={modalImages[activeImageIdx] || activeProductModal.imageUrl}
                alt={activeProductModal.name[lang] || activeProductModal.name.en}
                onClick={() => setLightboxOpen(true)}
                className="w-full h-full object-cover opacity-90 cursor-zoom-in transition-transform duration-300"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Top Controls: Zoom + Counter + Close */}
              <div className="absolute top-3.5 start-3.5 end-3.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    aria-label="View full size image"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white text-[11px] font-bold backdrop-blur-xs cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#EDC271]" />
                    <span>{lang === "ar" ? "تكبير الصورة" : lang === "zh" ? "查看大图" : "View Full"}</span>
                  </button>
                  {modalImages.length > 1 && (
                    <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-bold tabular-nums backdrop-blur-xs">
                      {activeImageIdx + 1} / {modalImages.length}
                    </span>
                  )}
                </div>

                <button
                  onClick={closeProductModal}
                  aria-label={t.products.close}
                  className="w-9 h-9 rounded-full bg-black/65 text-white flex items-center justify-center hover:bg-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Left/Right Gallery Arrows */}
              {modalImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx((prev) => (prev - 1 + modalImages.length) % modalImages.length);
                    }}
                    aria-label="Previous image"
                    className="absolute start-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx((prev) => (prev + 1) % modalImages.length);
                    }}
                    aria-label="Next image"
                    className="absolute end-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </>
              )}

              <div className="pointer-events-none absolute bottom-3.5 start-5 end-5">
                <span className="text-[11px] sm:text-xs font-bold text-[#EDC271] uppercase tracking-wider block truncate">
                  {activeProductModal.subtitle[lang] || activeProductModal.subtitle.en}
                </span>
                <h3 className="text-lg sm:text-2xl font-extrabold text-white mt-0.5 leading-snug">
                  {activeProductModal.name[lang] || activeProductModal.name.en}
                </h3>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {modalImages.length > 1 && (
              <div className="px-5 sm:px-8 pt-3 pb-1 flex items-center gap-2 overflow-x-auto no-scrollbar bg-stone-50/80 border-b border-stone-200/70 shrink-0">
                {modalImages.map((imgSrc, idx) => (
                  <button
                    key={`${imgSrc}-${idx}`}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIdx === idx
                        ? "border-[#3F166B] ring-2 ring-[#EDC271]/60 scale-102"
                        : "border-transparent opacity-65 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`${activeProductModal.name[lang] || activeProductModal.name.en} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

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

              <div className="pt-4 border-t border-stone-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const p = activeProductModal;
                    const title = p.name[lang] || p.name.en;
                    const sub = p.subtitle[lang] || p.subtitle.en;
                    const desc = p.description[lang] || p.description.en;
                    const apps = (p.applications[lang] || p.applications.en)
                      .map((a) => `<li>${a}</li>`)
                      .join("");
                    const grades = p.grades.map((g) => `<span class="badge">${g}</span>`).join(" ");
                    const win = window.open("", "_blank", "width=840,height=920");
                    if (!win) {
                      window.print();
                      return;
                    }
                    win.document.write(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title} — Technical Spec Sheet | Egy Nile Flax</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; color: #1c1917; margin: 36px; line-height: 1.5; }
    .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #3F166B; padding-bottom: 14px; margin-bottom: 22px; }
    .brand { font-size: 20px; font-weight: 800; color: #3F166B; }
    .sub { font-size: 12px; color: #57534e; }
    h1 { margin: 0 0 4px; font-size: 24px; color: #1c1917; }
    .eyebrow { color: #3F166B; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
    table { width: 100%; border-collapse: collapse; margin: 18px 0; }
    th, td { border: 1px solid #d6d3d1; padding: 10px 12px; text-align: left; font-size: 13px; }
    th { background: #FAF8F5; color: #3F166B; width: 34%; }
    .badge { display: inline-block; background: #FAF8F5; border: 1px solid #EDC271; color: #3F166B; font-weight: 700; font-size: 12px; padding: 3px 9px; border-radius: 999px; margin: 2px 4px 2px 0; }
    .ftr { margin-top: 28px; padding-top: 12px; border-top: 1px solid #e7e5e4; font-size: 12px; color: #57534e; }
  </style>
</head>
<body>
  <div class="hdr">
    <div>
      <div class="brand">EGY NILE FLAX</div>
      <div class="sub">ISO 9001:2015 Certified Mill &bull; Tanta, Gharbia, Egypt</div>
    </div>
    <div class="sub">Technical Data Sheet</div>
  </div>
  <div class="eyebrow">${sub}</div>
  <h1>${title}</h1>
  <p>${desc}</p>
  <table>
    <tr><th>${t.products.stapleLength}</th><td>${p.specs.stapleLength}</td></tr>
    <tr><th>${t.products.moisture}</th><td>${p.specs.moisture}</td></tr>
    <tr><th>${t.products.shiveContent}</th><td>${p.specs.shiveContent}</td></tr>
    <tr><th>${t.products.baleWeight}</th><td>${p.specs.baleWeight}</td></tr>
  </table>
  <p><strong>${t.products.availableGrades}:</strong><br/>${grades}</p>
  <p><strong>${t.products.applications}:</strong></p>
  <ul>${apps}</ul>
  <div class="ftr">
    Export Desk: ${company.primaryEmail} &bull; ${company.egyptPhone1} &bull; https://egynileflax.com
  </div>
  <script>window.onload = function () { window.print(); };</script>
</body>
</html>`);
                    win.document.close();
                    pushDataLayer("product_spec_print", { product_id: p.id, lang });
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 rounded-xl border border-[#3F166B]/25 bg-[#FAF8F5] text-xs font-bold text-[#3F166B] hover:bg-[#3F166B]/5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === "ar" ? "طباعة / PDF المواصفات" : lang === "zh" ? "打印 / 导出 PDF 规格书" : "Print / Save PDF Spec"}</span>
                </button>
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={closeProductModal}
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
        </div>
      )}

      {/* =========================================================
          FULL-SCREEN IMAGE LIGHTBOX VIEWER
      ========================================================= */}
      {activeProductModal && lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-between p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex items-center justify-between text-white"
          >
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#EDC271] truncate">
                {activeProductModal.name[lang] || activeProductModal.name.en}
              </div>
              {modalImages.length > 1 && (
                <div className="text-[11px] text-stone-300 tabular-nums">
                  {activeImageIdx + 1} / {modalImages.length}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label={t.products.close}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl flex-1 min-h-0 flex items-center justify-center my-3"
          >
            <img
              src={modalImages[activeImageIdx] || activeProductModal.imageUrl}
              alt={activeProductModal.name[lang] || activeProductModal.name.en}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl select-none"
            />
            {modalImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIdx((prev) => (prev - 1 + modalImages.length) % modalImages.length)
                  }
                  aria-label="Previous image"
                  className="absolute start-2 sm:start-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIdx((prev) => (prev + 1) % modalImages.length)}
                  aria-label="Next image"
                  className="absolute end-2 sm:end-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                </button>
              </>
            )}
          </div>

          {modalImages.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 overflow-x-auto max-w-full pb-1"
            >
              {modalImages.map((imgSrc, idx) => (
                <button
                  key={`lb-${imgSrc}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIdx === idx
                      ? "border-[#EDC271] opacity-100"
                      : "border-transparent opacity-55 hover:opacity-100"
                  }`}
                >
                  <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
