"use client";

import React, { useState, useEffect } from "react";
import { useFlax } from "@/context/FlaxContext";
import { ProductCategory, ProductItem } from "@/data/initialData";
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Ship,
  Factory,
  Award,
  FileCheck2,
  Camera,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Layers,
  SlidersHorizontal,
  Sparkles,
  ExternalLink,
  Search,
  Package,
  X,
  Globe2,
  Scale,
  Droplets,
  Ruler,
  Hash,
  QrCode,
  Copy,
  Check,
} from "lucide-react";

const EXPORT_COUNTRIES = [
  "China (Qingdao, Shanghai, Ningbo)",
  "Italy (Genoa, Bergamo, Prato)",
  "Belgium (Antwerp, Courtrai)",
  "France (Normandy, Lille)",
  "Lithuania (Klaipėda, Kaunas)",
  "Poland (Gdańsk, Łódź)",
  "Germany (Hamburg, Bremen)",
  "Turkey (Mersin, Istanbul, Bursa)",
  "India (Mundra, Nhava Sheva)",
  "Portugal (Porto)",
  "Spain (Valencia, Barcelona)",
  "United Kingdom",
  "Russia",
  "United Arab Emirates",
  "Lebanon",
  "Syria",
  "Albania",
  "Morocco",
  "Tunisia",
  "Brazil",
  "United States",
  "Japan",
  "South Korea",
];

export default function ShowcaseView() {
  const {
    lang,
    t,
    products,
    orders,
    company,
    openPortalWithCode,
    addInquiry,
    preselectedProductForQuote,
    setPreselectedProductForQuote,
  } = useFlax();

  const [selectedCategory, setSelectedCategory] = useState<"all" | ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);
  const [quickTrackInput, setQuickTrackInput] = useState("ENF-2026-8841");
  const [contactWechatOpen, setContactWechatOpen] = useState(false);
  const [copiedWechat, setCopiedWechat] = useState(false);

  // Quote Form State
  const [formState, setFormState] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    productInterest: "",
    quantityTons: "22 MT (1 × 40'HQ)",
    incoterm: "CIF Destination Port",
    message: "",
  });
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedProductForQuote) {
      setFormState((prev) => ({
        ...prev,
        productInterest: preselectedProductForQuote,
      }));
    }
  }, [preselectedProductForQuote]);

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const localizedName = (item.name[lang] || item.name.en).toLowerCase();
    const localizedSub = (item.subtitle[lang] || item.subtitle.en).toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      localizedName.includes(searchQuery.toLowerCase()) ||
      localizedSub.includes(searchQuery.toLowerCase()) ||
      item.grades.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSelectProductForQuote = (product: ProductItem) => {
    const prodTitle = `${product.name[lang] || product.name.en} (${product.grades[0] || "Standard"})`;
    setPreselectedProductForQuote(prodTitle);
    setFormState((prev) => ({ ...prev, productInterest: prodTitle }));
    setActiveProductModal(null);
    const contactEl = document.getElementById("contact");
    if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addInquiry({
      companyName: formState.companyName,
      contactPerson: formState.contactPerson,
      email: formState.email,
      phone: formState.phone,
      country: formState.country,
      productInterest:
        formState.productInterest ||
        (products[0]?.name[lang] ?? "Scutched Long Flax Fibers"),
      quantityTons: formState.quantityTons,
      incoterm: formState.incoterm,
      message: formState.message,
    });
    setSubmittedInquiryId(created.id);
    setFormState({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      country: "",
      productInterest: "",
      quantityTons: "22 MT (1 × 40'HQ)",
      incoterm: "CIF Destination Port",
      message: "",
    });
  };

  return (
    <div className="bg-[#FAF7F2] text-stone-900 w-full overflow-x-hidden">
      {/* =========================================================
          1. HERO SECTION (Fits 100% Above-the-Fold on Desktop & Responsive on Mobile)
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#14231A] text-white lg:min-h-[calc(100dvh-6rem)] flex items-center">
        {/* Background Image & Industrial Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#0F1C14] via-[#14231A]/90 to-[#14231A]/80" />

        <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-10 xl:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Hero Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-semibold tracking-wide max-w-full">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.hero.badge}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl 2xl:text-[3.35rem] font-extrabold tracking-tight leading-[1.12]">
                <span className="block text-stone-100">{t.hero.titleLine1}</span>
                <span className="block mt-1.5 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p className="text-xs sm:text-sm xl:text-base text-stone-300 max-w-2xl leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* CTA Buttons (Full-width stack on mobile, single non-wrapping row on desktop) */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-stretch sm:items-center gap-2.5 pt-1">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-4 xl:px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs xl:text-sm shadow-lg shadow-amber-500/10 transition-all whitespace-nowrap"
                >
                  <span>{t.hero.ctaProducts}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-4 xl:px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs xl:text-sm backdrop-blur-xs transition-all whitespace-nowrap"
                >
                  <span>{t.hero.ctaQuote}</span>
                </a>
                <button
                  onClick={() => openPortalWithCode("ENF-2026-8841")}
                  className="inline-flex items-center justify-center gap-2 px-4 xl:px-5 py-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/70 text-amber-200 border border-amber-400/30 font-semibold text-xs xl:text-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  <Ship className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{t.hero.ctaPortal}</span>
                </button>
              </div>

              {/* 4 Key Metrics Strip (Non-wrapping stat headings so "23+ Countries" and "ISO 9001:2015" never break across lines) */}
              <div className="pt-5 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-white/15">
                <div className="bg-black/20 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-white/10 sm:border-0">
                  <div className="text-base sm:text-lg xl:text-xl font-extrabold text-amber-300 whitespace-nowrap">
                    {t.hero.stat1Value}
                  </div>
                  <div className="text-[11px] text-stone-300 mt-0.5 leading-snug">
                    {t.hero.stat1Label}
                  </div>
                </div>
                <div className="bg-black/20 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-white/10 sm:border-0">
                  <div className="text-base sm:text-lg xl:text-xl font-extrabold text-amber-300 whitespace-nowrap">
                    {t.hero.stat2Value}
                  </div>
                  <div className="text-[11px] text-stone-300 mt-0.5 leading-snug">
                    {t.hero.stat2Label}
                  </div>
                </div>
                <div className="bg-black/20 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-white/10 sm:border-0">
                  <div className="text-base sm:text-lg xl:text-xl font-extrabold text-amber-300 whitespace-nowrap">
                    {t.hero.stat3Value}
                  </div>
                  <div className="text-[11px] text-stone-300 mt-0.5 leading-snug">
                    {t.hero.stat3Label}
                  </div>
                </div>
                <div className="bg-black/20 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-white/10 sm:border-0">
                  <div className="text-base sm:text-lg xl:text-xl font-extrabold text-amber-300 whitespace-nowrap">
                    {t.hero.stat4Value}
                  </div>
                  <div className="text-[11px] text-stone-300 mt-0.5 leading-snug">
                    {t.hero.stat4Label}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Client Portal & Shipment Quick-Tracker Card (5 cols) */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-[#1B2F23]/95 backdrop-blur-md border border-amber-400/30 rounded-2xl p-4 sm:p-5 xl:p-6 shadow-2xl space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                      <Ship className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                        LIVE CLIENT PORTAL
                      </span>
                      <h2 className="text-sm sm:text-base font-bold text-white truncate">
                        Container & Loading Photo Tracker
                      </h2>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  Track your contracted flax shipments from our Gamasa scutching & hackling mill to your destination port, complete with bale moisture reports and container loading photos.
                </p>

                {/* Quick Search Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-200 block">
                    Enter Order / Container Tracking Code:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={quickTrackInput}
                      onChange={(e) => setQuickTrackInput(e.target.value)}
                      placeholder="e.g. ENF-2026-8841"
                      className="flex-1 bg-black/30 border border-white/20 rounded-xl px-3.5 py-2 text-base sm:text-xs xl:text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <button
                      onClick={() => openPortalWithCode(quickTrackInput.trim())}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shrink-0 transition-all cursor-pointer"
                    >
                      Track Order
                    </button>
                  </div>
                </div>

                {/* Instant Demo Shipment Pills */}
                <div className="space-y-2 pt-0.5">
                  <span className="text-[11px] text-stone-400 font-medium block">
                    Click any active shipment to inspect live loading photos:
                  </span>
                  <div className="space-y-1.5">
                    {orders.slice(0, 3).map((ord) => (
                      <button
                        key={ord.id}
                        onClick={() => openPortalWithCode(ord.trackingCode)}
                        className="w-full text-start p-2.5 sm:p-3 rounded-xl bg-black/25 hover:bg-black/40 border border-white/10 hover:border-amber-400/50 transition-all flex items-center justify-between gap-2 group cursor-pointer"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs font-bold text-amber-300 font-mono">
                              {ord.trackingCode}
                            </span>
                            <span className="text-[11px] text-stone-300 font-medium">
                              → {ord.destinationCountry} ({ord.quantityMT} MT)
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 truncate mt-0.5">
                            {ord.productSummary}
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold text-amber-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 shrink-0">
                          <Camera className="w-3.5 h-3.5" />
                          <span>{ord.loadingPhotos.length}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. ABOUT SECTION (Field-to-Container & Credentials)
      ========================================================= */}
      <section
        id="about"
        className="scroll-mt-24 py-12 sm:py-16 lg:py-20 border-b border-stone-200/80"
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <Factory className="w-3.5 h-3.5 shrink-0" />
                <span>{t.about.eyebrow}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {t.about.title}
              </h2>

              <p className="text-sm sm:text-base font-semibold text-[#1B3325] leading-relaxed">
                {t.about.lead}
              </p>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t.about.p1}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t.about.p2}
              </p>

              {/* Credentials Banner */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1B3325] text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                    ISO
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-900">
                      ISO 9001:2015 Quality Management
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Certified Flax Processing, Grading & Export
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs border border-amber-300 shrink-0">
                    TEC
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-900">
                      Textile Export Council of Egypt
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Official Registered Natural Fiber Exporter
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow space-y-2.5 sm:space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  {t.about.pillar1Title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t.about.pillar1Desc}
                </p>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow space-y-2.5 sm:space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  {t.about.pillar2Title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t.about.pillar2Desc}
                </p>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow space-y-2.5 sm:space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Ship className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  {t.about.pillar3Title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t.about.pillar3Desc}
                </p>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow space-y-2.5 sm:space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  {t.about.pillar4Title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t.about.pillar4Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. SERVICES SECTION
      ========================================================= */}
      <section
        id="services"
        className="scroll-mt-24 py-12 sm:py-16 lg:py-20 bg-[#F3EFE6] border-b border-stone-200/80"
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1B3325] bg-amber-200/70 px-3 py-1 rounded-full">
              {t.services.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900">
              {t.services.title}
            </h2>
            <p className="text-xs sm:text-base text-stone-600">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
            {t.services.items.map((srv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 sm:space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#1B3325] text-amber-300">
                      {srv.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-stone-400">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <ul className="space-y-2 pt-3 border-t border-stone-100">
                  {srv.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2 text-xs text-stone-700 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. PRODUCTS CATALOG SECTION
      ========================================================= */}
      <section
        id="products"
        className="scroll-mt-24 py-12 sm:py-16 lg:py-20 border-b border-stone-200/80"
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                {t.products.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900">
                {t.products.title}
              </h2>
              <p className="text-xs sm:text-base text-stone-600">
                {t.products.subtitle}
              </p>
            </div>

            {/* Search Filter */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search grade, fiber, HS code..."
                className="w-full ps-9 pe-4 py-2.5 bg-white border border-stone-300 rounded-xl text-base sm:text-xs focus:outline-none focus:border-[#1B3325]"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 border-b border-stone-200 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
            {(
              [
                { id: "all", label: t.products.catAll },
                { id: "scutched", label: t.products.catScutched },
                { id: "hackled", label: t.products.catHackled },
                { id: "plumbing", label: t.products.catPlumbing },
                { id: "twine", label: t.products.catTwine },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? "bg-[#1B3325] text-amber-300 shadow-xs"
                    : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Grid (1 col mobile, 2 cols tablet, 3 cols laptop, 4 cols widescreen desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => {
              const title = product.name[lang] || product.name.en;
              const sub = product.subtitle[lang] || product.subtitle.en;
              const desc = product.description[lang] || product.description.en;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Product Image Header */}
                    <div className="relative h-48 bg-stone-200 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {product.badge && (
                        <span className="absolute top-3 start-3 px-2.5 py-1 rounded-md bg-amber-400 text-stone-950 text-[11px] font-extrabold shadow-xs">
                          {product.badge}
                        </span>
                      )}

                      <span className="absolute top-3 end-3 px-2.5 py-1 rounded-md bg-black/60 text-white text-[10px] font-mono backdrop-blur-xs">
                        HS {product.specs.hsCode}
                      </span>

                      <div className="absolute bottom-3 start-3 end-3">
                        <span className="text-[11px] text-amber-300 font-semibold block truncate">
                          {sub}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {title}
                        </h3>
                      </div>
                    </div>

                    {/* Product Body */}
                    <div className="p-4 sm:p-5 space-y-4">
                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                        {desc}
                      </p>

                      {/* Key Specs Table Snippet */}
                      <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/70 space-y-1.5 text-xs">
                        <div className="flex justify-between gap-2">
                          <span className="text-stone-500 shrink-0">
                            {t.products.stapleLength}:
                          </span>
                          <span className="font-semibold text-stone-800 text-end">
                            {product.specs.stapleLength}
                          </span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-stone-500 shrink-0">
                            {t.products.shiveContent}:
                          </span>
                          <span className="font-semibold text-stone-800 text-end">
                            {product.specs.shiveContent}
                          </span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-stone-500 shrink-0">
                            {t.products.containerLoad}:
                          </span>
                          <span className="font-semibold text-[#1B3325] text-end">
                            {product.specs.container40HQ}
                          </span>
                        </div>
                      </div>

                      {/* Grades Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {product.grades.map((grade, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-semibold"
                          >
                            {grade}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Buttons */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setActiveProductModal(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 hover:border-stone-800 text-stone-800 font-bold text-xs transition-all cursor-pointer"
                    >
                      {t.products.viewSpecs}
                    </button>
                    <button
                      onClick={() => handleSelectProductForQuote(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#1B3325] hover:bg-[#14261b] text-amber-200 font-bold text-xs transition-all cursor-pointer"
                    >
                      {t.nav.requestQuote}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. 6-STAGE PRODUCTION & QUALITY PROCESS SECTION
      ========================================================= */}
      <section
        id="process"
        className="scroll-mt-24 py-12 sm:py-16 lg:py-20 bg-[#14231A] text-white"
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full">
              {t.process.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              {t.process.title}
            </h2>
            <p className="text-xs sm:text-base text-stone-300">
              {t.process.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {t.process.steps.map((step) => (
              <div
                key={step.num}
                className="bg-[#1B2F23] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-amber-400/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {step.num}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/30 text-amber-200 border border-amber-400/20">
                      {step.metric}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. INTERACTIVE CLIENT PORTAL TEASER SECTION
      ========================================================= */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-amber-50 via-[#FAF7F2] to-emerald-50/40 border-b border-stone-200">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="bg-[#1B3325] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-xl border border-amber-400/30 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 px-3 py-1 rounded-full border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{t.portalTeaser.eyebrow}</span>
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                {t.portalTeaser.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {t.portalTeaser.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                {[
                  t.portalTeaser.feature1,
                  t.portalTeaser.feature2,
                  t.portalTeaser.feature3,
                  t.portalTeaser.feature4,
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-amber-100">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 sm:pt-3">
                <button
                  onClick={() => openPortalWithCode("ENF-2026-8841")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>{t.portalTeaser.openPortalBtn}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-black/25 rounded-2xl p-4 sm:p-6 border border-white/15 space-y-3 sm:space-y-4">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {t.portalTeaser.tryDemoLabel}
              </div>
              <div className="space-y-2.5">
                {orders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => openPortalWithCode(ord.trackingCode)}
                    className="w-full text-start p-3 sm:p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 transition-all flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white font-mono truncate">
                        {ord.trackingCode}{" "}
                        <span className="text-amber-300 font-sans">
                          • {ord.companyName}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-300 mt-0.5 truncate">
                        {ord.originPort} → {ord.destinationPort}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-300 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. LOCATIONS & 23+ EXPORT DESTINATIONS SECTION
      ========================================================= */}
      <section
        id="location"
        className="scroll-mt-24 py-12 sm:py-16 lg:py-20 border-b border-stone-200/80"
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1B3325] bg-amber-100 px-3 py-1 rounded-full">
              {t.location.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900">
              {t.location.title}
            </h2>
            <p className="text-xs sm:text-base text-stone-600">
              {t.location.subtitle}
            </p>
          </div>

          {/* Regional Offices Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {company.regionalOffices.map((office, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900">
                    {office.country}
                  </h3>
                  <p className="text-xs font-semibold text-[#1B3325]">
                    {office.city}
                  </p>
                  <p className="text-xs text-stone-600">{office.role}</p>
                </div>
                <div className="pt-3 border-t border-stone-100">
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, "")}`}
                    dir="ltr"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-800 hover:text-amber-700"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-800" />
                    {office.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Port Advantage & 23+ Countries List */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
                <Globe2 className="w-4 h-4 shrink-0" />
                <span>{company.portProximity}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                {t.location.portAdvantageTitle}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t.location.portAdvantageDesc}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {t.location.exportDestinationsTitle}
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {EXPORT_COUNTRIES.map((country, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 text-[11px] sm:text-xs font-medium"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          8. CONTACT & REQUEST A QUOTE (RFQ) SECTION
      ========================================================= */}
      <section
        id="contact"
        className="scroll-mt-24 py-12 sm:py-16 lg:py-20 bg-[#F3EFE6]"
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-200/70 px-3 py-1 rounded-full">
                {t.contact.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {t.contact.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t.contact.subtitle}
              </p>

              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 space-y-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1B3325] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      Factory & Export Headquarters
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5">
                      {company.factoryAddress}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1B3325] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      Direct Export Telephones & WhatsApp
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5" dir="ltr">
                      {company.egyptPhone1} / {company.egyptPhone2}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#1B3325] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-900">
                      Official Export Desk Emails
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5 break-all">
                      {company.primaryEmail} • {company.secondaryEmail}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp + WeChat Side-by-Side Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
                    `Hello ${company.brandName} Export Team, I would like to request a flax quotation.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>{t.contact.directWhatsapp}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setContactWechatOpen(!contactWechatOpen)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#1B3325] hover:bg-[#14261b] text-amber-300 border border-amber-400/30 font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4 shrink-0" />
                  <span>WeChat QR ({company.wechatId})</span>
                </button>
              </div>

              <div
                aria-hidden={!contactWechatOpen}
                className={`grid transition-all duration-300 ease-in-out ${
                  contactWechatOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-4 rounded-2xl bg-white border-2 border-[#1B3325] shadow-md flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-stone-100 border border-stone-300 flex items-center justify-center shrink-0">
                        <QrCode className="w-10 h-10 text-[#1B3325]" />
                      </div>
                      <div className="text-xs">
                        <div className="font-extrabold text-stone-900">
                          WeChat ID: <span className="font-mono">{company.wechatId}</span>
                        </div>
                        <p className="text-stone-500 text-[11px] mt-0.5">
                          Add our China & Asia Export Desk on WeChat or copy ID.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(company.wechatId);
                            setCopiedWechat(true);
                            setTimeout(() => setCopiedWechat(false), 2000);
                          }}
                          className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:underline cursor-pointer"
                        >
                          {copiedWechat ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied WeChat ID!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy WeChat ID</span>
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

            {/* Right RFQ Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-9 border border-stone-200 shadow-md">
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 mb-5 sm:mb-6">
                  {t.contact.formTitle}
                </h3>

                {submittedInquiryId && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-start justify-between gap-3">
                    <div>
                      <strong className="block text-sm">
                        {t.contact.successMsg} {submittedInquiryId}
                      </strong>
                      <span>
                        You can view and manage this inquiry right now inside the{" "}
                        <strong>Admin CMS</strong> tab in the navigation bar.
                      </span>
                    </div>
                    <button
                      onClick={() => setSubmittedInquiryId(null)}
                      className="text-emerald-800 hover:text-emerald-950 p-1 shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.companyName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.companyName}
                        onChange={(e) =>
                          setFormState({ ...formState, companyName: e.target.value })
                        }
                        placeholder="e.g. Linificio Spinning Mill S.p.A."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#1B3325]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.contactPerson} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.contactPerson}
                        onChange={(e) =>
                          setFormState({ ...formState, contactPerson: e.target.value })
                        }
                        placeholder="Full Name & Role"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#1B3325]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="buyer@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#1B3325]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.phone} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        placeholder="+39 / +86 / WhatsApp"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#1B3325]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.country} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.country}
                        onChange={(e) =>
                          setFormState({ ...formState, country: e.target.value })
                        }
                        placeholder="e.g. China (Qingdao Port)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#1B3325]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.productInterest} *
                      </label>
                      <select
                        value={formState.productInterest}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            productInterest: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs bg-white focus:outline-none focus:border-[#1B3325]"
                      >
                        <option value="">-- Select Product --</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.name[lang] || p.name.en}>
                            {p.name[lang] || p.name.en}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.quantityTons}
                      </label>
                      <select
                        value={formState.quantityTons}
                        onChange={(e) =>
                          setFormState({ ...formState, quantityTons: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs bg-white focus:outline-none focus:border-[#1B3325]"
                      >
                        <option value="22 MT (1 × 40'HQ)">22 MT (1 × 40&apos;HQ)</option>
                        <option value="44 MT (2 × 40'HQ)">44 MT (2 × 40&apos;HQ)</option>
                        <option value="66 MT (3 × 40'HQ)">66 MT (3 × 40&apos;HQ)</option>
                        <option value="100+ MT Annual Contract">
                          100+ MT Annual Mill Contract
                        </option>
                        <option value="Trial Lot / DHL Sample First">
                          Trial Lot / DHL Sample Box First
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {t.contact.incoterm}
                      </label>
                      <select
                        value={formState.incoterm}
                        onChange={(e) =>
                          setFormState({ ...formState, incoterm: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs bg-white focus:outline-none focus:border-[#1B3325]"
                      >
                        <option value="CIF Destination Port">CIF Destination Port</option>
                        <option value="CFR Destination Port">CFR Destination Port</option>
                        <option value="FOB Damietta / Alexandria">
                          FOB Damietta / Alexandria
                        </option>
                        <option value="EXW Gamasa Factory">EXW Gamasa Factory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.contact.message}
                    </label>
                    <textarea
                      rows={3}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Specify required grade (C, D, E, EK), staple length, maximum shive %, target yarn count (Nm/Ne), or private label packaging details..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-xs focus:outline-none focus:border-[#1B3325]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#1B3325] hover:bg-[#14261b] text-amber-300 font-extrabold text-sm shadow-md transition-all cursor-pointer"
                  >
                    {t.contact.submitBtn}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRODUCT TECHNICAL SPECIFICATION MODAL
      ========================================================= */}
      {activeProductModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-backdrop"
          onClick={() => setActiveProductModal(null)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-stone-200 animate-modal"
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
                <span className="text-[11px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider block truncate">
                  {activeProductModal.subtitle[lang] || activeProductModal.subtitle.en}
                </span>
                <h3 className="text-lg sm:text-2xl font-extrabold text-white mt-0.5 leading-snug">
                  {activeProductModal.name[lang] || activeProductModal.name.en}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activeProductModal.description[lang] ||
                  activeProductModal.description.en}
              </p>

              {/* Technical Data Sheet Grid */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-500 mb-3">
                  {t.products.specsTitle} (ISO 9001:2015 Standard)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                    <Ruler className="w-4 h-4 text-[#1B3325] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 block">
                        {t.products.stapleLength}
                      </span>
                      <strong className="text-stone-900">
                        {activeProductModal.specs.stapleLength}
                      </strong>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                    <Droplets className="w-4 h-4 text-[#1B3325] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 block">
                        {t.products.moisture}
                      </span>
                      <strong className="text-stone-900">
                        {activeProductModal.specs.moisture}
                      </strong>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                    <SlidersHorizontal className="w-4 h-4 text-[#1B3325] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 block">
                        {t.products.shiveContent}
                      </span>
                      <strong className="text-stone-900">
                        {activeProductModal.specs.shiveContent}
                      </strong>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                    <Scale className="w-4 h-4 text-[#1B3325] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 block">
                        {t.products.baleWeight}
                      </span>
                      <strong className="text-stone-900">
                        {activeProductModal.specs.baleWeight}
                      </strong>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                    <Package className="w-4 h-4 text-[#1B3325] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 block">
                        {t.products.containerLoad}
                      </span>
                      <strong className="text-stone-900">
                        {activeProductModal.specs.container40HQ}
                      </strong>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                    <Hash className="w-4 h-4 text-[#1B3325] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-stone-500 block">{t.products.hsCode}</span>
                      <strong className="text-stone-900 font-mono">
                        {activeProductModal.specs.hsCode}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grades & Applications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-bold text-stone-700 mb-2">
                    {t.products.availableGrades}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProductModal.grades.map((g, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 text-xs font-bold"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-700 mb-2">
                    {t.products.applications}
                  </h5>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {(
                      activeProductModal.applications[lang] ||
                      activeProductModal.applications.en
                    ).map((app, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
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
                  Close
                </button>
                <button
                  onClick={() => handleSelectProductForQuote(activeProductModal)}
                  className="px-6 py-3 sm:py-2.5 rounded-xl bg-[#1B3325] hover:bg-[#14261b] text-amber-300 text-xs font-extrabold cursor-pointer"
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
