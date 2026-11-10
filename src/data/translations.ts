import { LanguageCode } from "./initialData";

export interface UITranslations {
  dir: "ltr" | "rtl";
  langLabel: string;
  nav: {
    about: string;
    services: string;
    products: string;
    process: string;
    location: string;
    contact: string;
    clientPortal: string;
    adminPanel: string;
    requestQuote: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    ctaProducts: string;
    ctaQuote: string;
    ctaPortal: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    p1: string;
    p2: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      tag: string;
      desc: string;
      bullets: string[];
    }[];
  };
  products: {
    eyebrow: string;
    title: string;
    subtitle: string;
    catAll: string;
    catScutched: string;
    catHackled: string;
    catPlumbing: string;
    catTwine: string;
    specsTitle: string;
    stapleLength: string;
    moisture: string;
    shiveContent: string;
    baleWeight: string;
    containerLoad: string;
    hsCode: string;
    availableGrades: string;
    applications: string;
    inquireProduct: string;
    viewSpecs: string;
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: {
      num: string;
      title: string;
      desc: string;
      metric: string;
    }[];
  };
  portalTeaser: {
    eyebrow: string;
    title: string;
    subtitle: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    openPortalBtn: string;
    tryDemoLabel: string;
  };
  location: {
    eyebrow: string;
    title: string;
    subtitle: string;
    exportDestinationsTitle: string;
    portAdvantageTitle: string;
    portAdvantageDesc: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    formTitle: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    country: string;
    productInterest: string;
    quantityTons: string;
    incoterm: string;
    message: string;
    submitBtn: string;
    successMsg: string;
    directWhatsapp: string;
  };
  footer: {
    rights: string;
    tagline: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, UITranslations> = {
  en: {
    dir: "ltr",
    langLabel: "English",
    nav: {
      about: "About",
      services: "Services",
      products: "Products",
      process: "Quality & Process",
      location: "Locations",
      contact: "Contact",
      clientPortal: "Client Portal",
      adminPanel: "Admin CMS",
      requestQuote: "Request a Quote",
    },
    hero: {
      badge: "ISO 9001:2015 Certified Exporter • Since 2008 • Gamasa, Egypt",
      titleLine1: "Premium Egyptian Flax Fibre",
      titleHighlight: "From Nile Delta Fields to Global Spinning Mills",
      subtitle:
        "Processor and international exporter of Scutched Long Flax, Hackled Fibres, Slivers, Machine Tow, Cottonised Flax, Plumbing Flax, and Natural Twines — delivering container-level traceability across 23+ countries.",
      ctaProducts: "Explore Product Catalog",
      ctaQuote: "Request Export Quote",
      ctaPortal: "Client Portal & Live Tracking",
      stat1Value: "Since 2008",
      stat1Label: "Egyptian Flax Processing Heritage",
      stat2Value: "23+ Countries",
      stat2Label: "Spinning Mills & Industrial Buyers",
      stat3Value: "ISO 9001:2015",
      stat3Label: "Certified Quality & Lab Grading",
      stat4Value: "100% Digital",
      stat4Label: "Client Portal & Loading Photos",
    },
    about: {
      eyebrow: "About EgyNile Flax",
      title: "Integrated Control from the Nile Delta Field to Your Mill Container",
      lead: "Evolving from an established Egyptian family flax trading house into a dedicated processor and global exporter based in Gamasa, Dakahlia.",
      p1: "EgyNile Flax manages every link of the natural linen supply chain in-house: selecting fertile Nile Delta flax straw crops, supervising biological retting, executing mechanical scutching and progressive hackling, and conducting laboratory moisture and shive grading before hydraulic bale pressing.",
      p2: "As an active member of the Textile Export Council of Egypt (TEC) and an ISO 9001:2015 certified facility, we keep quality inspection, bale coding, container stuffing, and customs clearance strictly under our direct supervision to guarantee zero border delays and consistent spinning performance.",
      pillar1Title: "Field-to-Container Integration",
      pillar1Desc: "Direct sourcing, scutching, hackling, cottonising, grading, and container stuffing without middlemen.",
      pillar2Title: "ISO 9001:2015 Lab Grading",
      pillar2Desc: "Strict control over staple length, tensile strength, moisture regain (≤11.5%), and shive content.",
      pillar3Title: "In-House Customs & Logistics",
      pillar3Desc: "25 km from Damietta Port & direct corridor to Alexandria Port for rapid FCL/LCL shipping.",
      pillar4Title: "Transparent Client Portal",
      pillar4Desc: "Real-time order tracking, bale-by-bale packing lists, and high-res container loading photos.",
    },
    services: {
      eyebrow: "End-to-End Capabilities",
      title: "Flax Processing, Export, Import & Logistics Services",
      subtitle: "Covering every industrial requirement between the agricultural field and your spinning mill floor.",
      items: [
        {
          title: "Flax Processing & Global Export",
          tag: "Core Export",
          desc: "Processing and exporting all grades of Egyptian flax fibres and derivative products tailored to international mill specifications.",
          bullets: [
            "Wet & Dry Spinning Mills (Scutched, Hackled, Sliver, Tow, Cottonised)",
            "Sanitary & Plumbing Trade (Jokia Dolls, Dispenser Spools, Puppets)",
            "Paper Pulp, Automotive Bio-Composites & Acoustic Insulation Sheets",
          ],
        },
        {
          title: "Pre-Shipment Inspection, Coding & Baling",
          tag: "Quality Assurance",
          desc: "Rigorous lot-by-lot inspection and standardized hydraulic baling prior to container stuffing.",
          bullets: [
            "Bale patching, lot coding, and moisture/strength laboratory sampling",
            "DHL air-courier reference samples for buyer approval before loading",
            "Kraft paper container lining & moisture desiccant protection",
          ],
        },
        {
          title: "Freight Forwarding & In-House Clearance",
          tag: "Global Logistics",
          desc: "Integrated Sea, Land, and Air logistics with in-house customs clearance at Damietta and Alexandria ports.",
          bullets: [
            "Full Container Load (FCL 40'HQ / 20'GP) & LCL consolidation",
            "EUR.1 Movement Certificates, Certificate of Origin & Phytosanitary docs",
            "Zero-delay port handoffs and direct vessel schedules to 23+ countries",
          ],
        },
        {
          title: "Import & Production Line Solutions",
          tag: "Industrial Supply",
          desc: "Supporting Egypt's linen ecosystem by importing certified sowing seeds, auxiliaries, and processing machinery.",
          bullets: [
            "Certified European agricultural flax seeds for Nile Delta cultivation",
            "Specialized retting auxiliaries and fine linen yarns",
            "Complete scutching, hackling, and cottonising production lines",
          ],
        },
      ],
    },
    products: {
      eyebrow: "Egyptian Flax Product Catalog",
      title: "Graded & Custom-Packed Natural Flax Products",
      subtitle: "Select a category to inspect technical specifications, available mill grades, 40'HQ container loadability, and applications.",
      catAll: "All Products (12)",
      catScutched: "Scutched (Raw Flax)",
      catHackled: "Hackled & Spinning Flax",
      catPlumbing: "Plumbing & Sanitary Flax",
      catTwine: "Twines, Ropes & Seeds",
      specsTitle: "Technical Specifications",
      stapleLength: "Staple Length / Format",
      moisture: "Moisture Regain",
      shiveContent: "Shive / Impurity",
      baleWeight: "Packing & Bale Weight",
      containerLoad: "40'HQ Loadability",
      hsCode: "HS Tariff Code",
      availableGrades: "Available Grades",
      applications: "Industrial Applications",
      inquireProduct: "Request Quote for This Product",
      viewSpecs: "Full Technical Specs",
    },
    process: {
      eyebrow: "From Nile Delta to Vessel",
      title: "6-Stage ISO 9001:2015 Production & Quality Workflow",
      subtitle: "Every container exported by EgyNile Flax undergoes six documented stages of biological, mechanical, and laboratory control.",
      steps: [
        {
          num: "01",
          title: "Nile Delta Cultivation & Pulling",
          desc: "Grown in mineral-rich alluvial soils of the Nile Delta and harvested by mechanical root pulling (never cutting) to preserve maximum fiber length.",
          metric: "850–1000 mm Stem Length",
        },
        {
          num: "02",
          title: "Controlled Retting & Sun Drying",
          desc: "Carefully monitored natural enzymatic retting dissolves pectins binding the bast fiber to the woody core without weakening cellulose tenacity.",
          metric: "Optimal Pectin Breakdown",
        },
        {
          num: "03",
          title: "Mechanical Scutching",
          desc: "Fluted breaking rollers and turbine scutching blades beat away dried shives, separating clean Scutched Long Fibers and primary Arrous short fibers.",
          metric: "< 1.2% Shive on Long Line",
        },
        {
          num: "04",
          title: "Progressive Hackling & Cottonising",
          desc: "Long fibers are combed through fine-pinned hackling frames into parallel Hackled Flax and Slivers, or refined into 32–38mm Cottonised Flax.",
          metric: "Zero-Impurity Combing",
        },
        {
          num: "05",
          title: "Lab Grading & Hydraulic Baling",
          desc: "Master graders classify lots by color, fineness, and strength (Grades C, D, E, EK). Bales are hydraulically pressed and coded with full traceability.",
          metric: "120–200 kg High-Density Bales",
        },
        {
          num: "06",
          title: "Container Stuffing & Live Portal Upload",
          desc: "Stuffed at our Gamasa loading bays with moisture desiccants. Step-by-step loading photos and documents are published instantly to the Client Portal.",
          metric: "22–25 MT per 40'HQ",
        },
      ],
    },
    portalTeaser: {
      eyebrow: "Digital Supply Chain Transparency",
      title: "Interactive Client Portal — Track Your Containers in Real Time",
      subtitle: "Like cp.makoverseas.net, our built-in Client Portal gives buyers 24/7 access to order execution stages, bale-by-bale packing lists, certificates, and high-resolution container loading photos.",
      feature1: "6-Stage Real-Time Order & Vessel Execution Tracker",
      feature2: "Time-Stamped Container Loading & Seal Photo Gallery",
      feature3: "Instant Access to Contracts, Invoices, EUR.1 & Phytosanitary Docs",
      feature4: "Direct Lot & Bale Moisture Verification Reports",
      openPortalBtn: "Launch Client Portal Now",
      tryDemoLabel: "Instant Demo Tracking Codes Available:",
    },
    location: {
      eyebrow: "Global Presence & Factory Base",
      title: "Strategically Located in Egypt's Flax Heartland",
      subtitle: "Headquartered in Gamasa Industrial Zone with regional trade offices across the UAE, Lebanon, and Europe.",
      exportDestinationsTitle: "Serving Spinning Mills Across 23+ Export Destinations",
      portAdvantageTitle: "Direct Mediterranean & Red Sea Port Access",
      portAdvantageDesc: "Situated just 25 km from Damietta Port and connected via international highway to Alexandria and Port Said, enabling rapid transit times to Europe (5–8 days), Asia (18–25 days), and the Americas.",
    },
    contact: {
      eyebrow: "Direct Mill Quotation",
      title: "Request an Export Quote or Fiber Sample",
      subtitle: "Submit your required flax grade, quantity, and destination port. Our export desk responds within 4 business hours with current FOB/CIF pricing and DHL sample availability.",
      formTitle: "B2B Export Inquiry Form",
      companyName: "Company / Spinning Mill Name",
      contactPerson: "Contact Person & Title",
      email: "Business Email",
      phone: "Phone / WhatsApp / WeChat",
      country: "Destination Country & Port",
      productInterest: "Product & Grade Required",
      quantityTons: "Estimated Quantity (MT / Containers)",
      incoterm: "Preferred Incoterm (FOB / CIF / CFR)",
      message: "Technical Specifications (Staple Length, Shive %, Target Yarn Count, Packaging)",
      submitBtn: "Send Official Quote Request",
      successMsg: "Your inquiry has been logged in our Export Desk & Admin Portal! Reference ID:",
      directWhatsapp: "Chat Immediately on WhatsApp",
    },
    footer: {
      rights: "© 2026 EgyNile Flax™ Overseas Co. All rights reserved. Operating Since 2008.",
      tagline: "ISO 9001:2015 Certified Processor & Exporter of Premium Egyptian Flax Fibre — Gamasa, Dakahlia, Egypt.",
    },
  },
  ar: {
    dir: "rtl",
    langLabel: "العربية",
    nav: {
      about: "عن المصنع",
      services: "خدماتنا",
      products: "المنتجات",
      process: "مراحل الإنتاج والجودة",
      location: "المواقع والفروع",
      contact: "اتصل بنا",
      clientPortal: "بوابة العملاء",
      adminPanel: "لوحة التحكم",
      requestQuote: "اطلب عرض سعر",
    },
    hero: {
      badge: "مُصدّر معتمد بشهادة ISO 9001:2015 • منذ ٢٠٠٨ • جمصة، مصر",
      titleLine1: "أجود ألياف الكتان المصري الطبيعي",
      titleHighlight: "من حقول دلتا النيل إلى مصانع الغزل العالمية",
      subtitle:
        "تصنيع وتصدير الكتان الطويل المقشور، والكتان الممشط (الهاكلد)، وشريط السليفر، والمشاقة، والكتان المقطن، وكتان السباكة، والدوبار الطبيعي إلى أكثر من ٢٣ دولة مع تتبع لحظي للحاويات.",
      ctaProducts: "تصفح كتالوج المنتجات",
      ctaQuote: "اطلب عرض سعر للتصدير",
      ctaPortal: "بوابة العملاء وتتبع الشحنات",
      stat1Value: "منذ ٢٠٠٨",
      stat1Label: "خبرة عريقة في تصنيع وتصدير الكتان",
      stat2Value: "+٢٣ دولة",
      stat2Label: "تصدير لمصانع الغزل والشركات الصناعية",
      stat3Value: "ISO 9001:2015",
      stat3Label: "رقابة جودة معملية وتصنيف قياسي",
      stat4Value: "١٠٠٪ رقمي",
      stat4Label: "بوابة عملاء وصور تحميل الحاويات",
    },
    about: {
      eyebrow: "عن إيجي نايل فلاكس (EgyNile Flax)",
      title: "تحكم متكامل من حقول دلتا النيل وحتى حاوية الشحن لمصنعك",
      lead: "تطورت الشركة من بيت تجاري عائلي عريق في تجارة الكتان المصري إلى مصنع متكامل ومُصدّر دولي بالمنطقة الصناعية بجمصة – الدقهلية.",
      p1: "تدير إيجي نايل فلاكس كافة مراحل سلسلة الإمداد داخلياً: بدءاً من اختيار محاصيل قش الكتان في دلتا النيل، ومراقبة التعطين الحيوي، والتقشير الميكانيكي والتمشيط التدريجي، وصولاً إلى الفحص المعملي للرطوبة ونسبة الساس قبل الكبس الهيدروليكي للبالات.",
      p2: "بصفتنا عضواً فاعلاً في المجلس التصديري للغزل والمنسوجات (TEC) وحاصلين على شهادة الأيزو 9001:2015، تتم جميع عمليات الفحص والترقيم وتحميل الحاويات والتخليص الجمركي تحت إشرافنا المباشر لضمان سرعة الشحن وثبات الجودة.",
      pillar1Title: "تكامل كامل من الحقل للحاوية",
      pillar1Desc: "شراء وتقشير وتمشيط وتقطين وفرز وكبس وتحميل مباشر بدون وسطاء.",
      pillar2Title: "تصنيف معملي ISO 9001:2015",
      pillar2Desc: "رقابة صارمة على طول التيلة والمتانة ونسبة الرطوبة (≤11.5%) ونقاء الألياف.",
      pillar3Title: "تخليص جمركي وشحن داخلي",
      pillar3Desc: "موقع استراتيجي على بُعد ٢٥ كم من ميناء دمياط وربط مباشر بميناء الإسكندرية.",
      pillar4Title: "بوابة عملاء رقمية شفافة",
      pillar4Desc: "تتبع فوري لمراحل تنفيذ الطلبية وقوائم التعبئة وصور تحميل وتشميع الحاويات.",
    },
    services: {
      eyebrow: "قدرات تصنيعية ولوجستية شاملة",
      title: "خدمات تصنيع وتصدير واستيراد وشحن الكتان",
      subtitle: "نغطي كافة الاحتياجات الصناعية بين الحقل الزراعي وخطوط الغزل في مصنعك.",
      items: [
        {
          title: "تصنيع وتصدير جميع درجات الكتان",
          tag: "التصدير الأساسي",
          desc: "تجهيز وتصدير كافة درجات ألياف الكتان المصري ومشتقاته وفق المواصفات الفنية لكل مصنع.",
          bullets: [
            "مصانع الغزل الرطب والجاف (كتان طويل، ممشط، سليفر، تو، ومقطن)",
            "قطاع السباكة والأدوات الصحية (عرائس جوكيا، بكر الديسبنسر، ودمى الكتان)",
            "صناعات الورق الفاخر، وألواح السيارات المركبة، والعزل الحراري والصوتي",
          ],
        },
        {
          title: "الفحص قبل الشحن والترقيم والكبس",
          tag: "ضمان الجودة",
          desc: "فحص دقيق لكل لوت وكبس هيدروليكي قياسي للبالات قبل التحميل.",
          bullets: [
            "ترقيم البالات وأخذ عينات معملية لقياس الرطوبة والمتانة",
            "إرسال عينات مرجعية بالبريد السريع (DHL) لاعتماد العميل قبل الشحن",
            "تبطين الحاويات بورق الكرافت وتزويدها بمجففات الرطوبة",
          ],
        },
        {
          title: "الشحن الدولي والتخليص الجمركي",
          tag: "لوجستيات عالمية",
          desc: "حلول شحن بحري وبري وجوي متكاملة مع تخليص جمركي داخلي بميناءي دمياط والإسكندرية.",
          bullets: [
            "شحن حاويات كاملة (40'HQ / 20'GP) وتجميع شحنات",
            "إصدار شهادات المنشأ و EUR.1 والشهادات الصحية الزراعية (Phytosanitary)",
            "خطوط ملاحية مباشرة لأكثر من ٢٣ دولة بدون تأخير",
          ],
        },
        {
          title: "خدمات الاستيراد وخطوط الإنتاج",
          tag: "إمداد صناعي",
          desc: "دعم صناعة الكتان عبر استيراد التقاوي المعتمدة ومستلزمات التشغيل وخطوط الماكينات.",
          bullets: [
            "استيراد بذور الكتان الأوروبية المعتمدة للزراعة في دلتا النيل",
            "استيراد خيوط الكتان الرفيعة وإضافات التعطين المتخصصة",
            "توريد خطوط التقشير والتمشيط والتقطين الكاملة",
          ],
        },
      ],
    },
    products: {
      eyebrow: "كتالوج منتجات الكتان المصري",
      title: "منتجات كتان طبيعي مفروزة ومعبأة حسب مواصفات العميل",
      subtitle: "اختر الفئة لاستعراض المواصفات الفنية والدرجات المتاحة وسعة حاوية 40 قدم عالية (40'HQ) والتطبيقات الصناعية.",
      catAll: "جميع المنتجات (12)",
      catScutched: "الكتان المقشور (الخام)",
      catHackled: "الكتان الممشط والغزل",
      catPlumbing: "كتان السباكة والأدوات الصحية",
      catTwine: "الدوبار والحبال والبذور",
      specsTitle: "المواصفات الفنية القياسية",
      stapleLength: "طول التيلة / الشكل",
      moisture: "نسبة الرطوبة",
      shiveContent: "نسبة الساس / الشوائب",
      baleWeight: "التعبئة ووزن البالة",
      containerLoad: "سعة حاوية 40'HQ",
      hsCode: "البند الجمركي (HS Code)",
      availableGrades: "الدرجات المتاحة",
      applications: "التطبيقات الصناعية",
      inquireProduct: "اطلب عرض سعر لهذا المنتج",
      viewSpecs: "المواصفات الفنية الكاملة",
    },
    process: {
      eyebrow: "من دلتا النيل إلى الباخرة",
      title: "مراحل الإنتاج والرقابة وفق معيار ISO 9001:2015",
      subtitle: "تمر كل شحنة في إيجي نايل فلاكس بست مراحل موثقة من الرقابة الزراعية والميكانيكية والمعمليّة.",
      steps: [
        {
          num: "01",
          title: "الزراعة في دلتا النيل والتقليع",
          desc: "زراعة الكتان في تربة الدلتا الخصبة وحصاده بالتقليع من الجذور (وليس القص) للحفاظ على أقصى طول طبيعي للألياف.",
          metric: "طول الساق 850–1000 مم",
        },
        {
          num: "02",
          title: "التعطين المحكوم والتجفيف الشمسي",
          desc: "تعطين حيوي دقيق لتفكيك مادة البكتين الرابطة بين الألياف والساق الخشبية مع الحفاظ التام على متانة السليلوز.",
          metric: "تفكيك مثالي للبكتين",
        },
        {
          num: "03",
          title: "التقشير الميكانيكي (Scutching)",
          desc: "فصل الساق الخشبية (الساس) عبر درافيل التكسير وتوربينات التقشير لاستخلاص الكتان الطويل المقشور وعروس الكتان.",
          metric: "أقل من 1.2% ساس للكتان الطويل",
        },
        {
          num: "04",
          title: "التمشيط التدريجي والتقطين",
          desc: "تمشيط الألياف الطويلة لإنتاج الهاكلد وشريط السليفر المتوازي، أو معالجتها وقصها بطول ٣٢–٣٨ مم لإنتاج الكتان المقطن.",
          metric: "تمشيط خالٍ تماماً من الشوائب",
        },
        {
          num: "05",
          title: "الفرز المعملي والكبس الهيدروليكي",
          desc: "تصنيف اللوتات حسب اللون والنعومة والمتانة (C, D, E, EK) وكبسها هيدروليكياً مع ترقيم كامل لكل بالة.",
          metric: "بالات مضغوطة 120–200 كجم",
        },
        {
          num: "06",
          title: "تحميل الحاويات والرفع الفوري للبوابة",
          desc: "تستيف الحاويات داخل مصنعنا بجمصة مع عوازل ومجففات الرطوبة ورفع صور التحميل والمستندات فوراً لبوابة العميل.",
          metric: "22–25 طن لكل حاوية 40'HQ",
        },
      ],
    },
    portalTeaser: {
      eyebrow: "شفافية رقمية كاملة لسلسلة الإمداد",
      title: "بوابة العملاء التفاعلية — تتبع شحناتك وصور التحميل لحظياً",
      subtitle: "على غرار بوابة cp.makoverseas.net، تمنحك بوابتنا الرقمية إمكانية متابعة مراحل تنفيذ الطلبية، وقوائم التعبئة، والشهادات، وصور تحميل وتشميع الحاويات على مدار الساعة.",
      feature1: "تتبع تنفيذ الطلبية وحركة الباخرة في 6 مراحل واضحة",
      feature2: "معرض صور موثق بالوقت لتحميل الحاوية ورقم السيل الجمركي",
      feature3: "تحميل العقود والفواتير وشهادات المنشأ و EUR.1 والشهادة الصحية",
      feature4: "تقارير الفحص المعملي للرطوبة وطول التيلة لكل لوت",
      openPortalBtn: "افتح بوابة العملاء الآن",
      tryDemoLabel: "أكواد تتبع تجريبية جاهزة للمعاينة الفورية:",
    },
    location: {
      eyebrow: "التواجد العالمي ومقر المصنع",
      title: "موقع استراتيجي في قلب منطقة إنتاج الكتان بمصر",
      subtitle: "المقر الرئيسي والمصنع بالمنطقة الصناعية بجمصة، مع مكاتب تمثيل تجاري في الإمارات ولبنان وأوروبا.",
      exportDestinationsTitle: "نخدم مصانع الغزل في أكثر من ٢٣ دولة حول العالم",
      portAdvantageTitle: "قرب مباشر من موانئ البحر المتوسط والبحر الأحمر",
      portAdvantageDesc: "يقع المصنع على بُعد ٢٥ كم فقط من ميناء دمياط ويرتبط بطريق دولي مباشر بميناءي الإسكندرية وبورسعيد، مما يضمن أسرع زمن إبحار إلى أوروبا (٥–٨ أيام) وآسيا (١٨–٢٥ يوماً).",
    },
    contact: {
      eyebrow: "تواصل مباشر مع إدارة التصدير",
      title: "اطلب عرض سعر رسمي أو عينة ألياف",
      subtitle: "أرسل الدرجة المطلوبة والكمية وميناء الوصول، وسيقوم فريق التصدير بالرد خلال ٤ ساعات عمل بأسعار FOB/CIF وإمكانية إرسال عينات DHL.",
      formTitle: "نموذج طلب عرض سعر للتصدير (B2B)",
      companyName: "اسم الشركة / مصنع الغزل",
      contactPerson: "اسم المسؤول والمسمى الوظيفي",
      email: "البريد الإلكتروني الرسمي",
      phone: "رقم الهاتف / واتساب / وي تشات",
      country: "دولة وميناء الوصول",
      productInterest: "المنتج والدرجة المطلوبة",
      quantityTons: "الكمية المطلوبة (طن / عدد الحاويات)",
      incoterm: "شروط التسليم المفضلة (FOB / CIF / CFR)",
      message: "المواصفات الفنية الإضافية (طول التيلة، نسبة الساس، نمرة الخيط، طريقة التعبئة)",
      submitBtn: "إرسال طلب عرض السعر",
      successMsg: "تم تسجيل طلبكم بنجاح في مكتب التصدير ولوحة التحكم! رقم المرجع:",
      directWhatsapp: "تحدث معنا فوراً عبر واتساب",
    },
    footer: {
      rights: "© ٢٠٢٦ شركة إيجي نايل فلاكس (EgyNile Flax™ Overseas Co.). جميع الحقوق محفوظة. نعمل منذ ٢٠٠٨.",
      tagline: "مُصنّع ومُصدّر معتمد بشهادة ISO 9001:2015 لأجود ألياف الكتان المصري — جمصة، الدقهلية، مصر.",
    },
  },
  zh: {
    dir: "ltr",
    langLabel: "中文",
    nav: {
      about: "关于我们",
      services: "核心服务",
      products: "产品目录",
      process: "工艺与品控",
      location: "全球布局",
      contact: "联系报价",
      clientPortal: "客户门户",
      adminPanel: "管理后台",
      requestQuote: "在线询价",
    },
    hero: {
      badge: "ISO 9001:2015 认证出口商 • 始于 2008 年 • 埃及加马萨 (Gamasa)",
      titleLine1: "优质埃及天然亚麻纤维",
      titleHighlight: "从尼罗河三角洲直达全球亚麻纺纱厂",
      subtitle:
        "专业加工与出口埃及打成亚麻长麻、精梳长麻、精梳麻条、精梳落麻(二粗)、棉型亚麻、水暖密封麻及天然亚麻线，出口全球 23+ 个国家并提供全程集装箱可视化追踪。",
      ctaProducts: "浏览产品目录",
      ctaQuote: "获取出口报价",
      ctaPortal: "客户门户与装柜追踪",
      stat1Value: "始于 2008",
      stat1Label: "埃及亚麻加工与出口经验",
      stat2Value: "23+ 国家",
      stat2Label: "服务全球亚麻纱厂与工业买家",
      stat3Value: "ISO 9001:2015",
      stat3Label: "国际质量体系与实验室分级",
      stat4Value: "100% 数字化",
      stat4Label: "实时客户门户与装柜实拍照片",
    },
    about: {
      eyebrow: "关于 EgyNile Flax",
      title: "从尼罗河三角洲田间到纱厂集装箱的全产业链把控",
      lead: "源自埃及世代传承的亚麻贸易世家，现已发展为扎根达卡利亚省加马萨工业区（Gamasa）的现代化亚麻加工与国际出口企业。",
      p1: "EgyNile Flax 在厂内自主完成天然亚麻供应链的每一个环节：精选肥沃尼罗河三角洲的原麻作物、监控生物沤麻、执行机械打成与多道针排精梳，并在液压打包前进行严格的实验室回潮率与含杂率检测。",
      p2: "作为埃及纺织品出口委员会（TEC）正式成员及 ISO 9001:2015 认证工厂，我们将品质检验、麻包编码、集装箱装柜及报关清关全部纳入内部直管，确保零港口延误与稳定的纺纱质量。",
      pillar1Title: "田间到货柜一体化",
      pillar1Desc: "原麻收购、打成、精梳、棉型化加工、分级打包及装柜全部自营，无中间商。",
      pillar2Title: "ISO 9001 实验室分级",
      pillar2Desc: "严格控制纤维长度、断裂强力、标准回潮率（≤11.5%）与麻屑含量。",
      pillar3Title: "自有报关与港口物流",
      pillar3Desc: "距达米埃塔港仅 25 公里，直通亚历山大港，快速发运中国及全球主要港口。",
      pillar4Title: "透明化数字客户门户",
      pillar4Desc: "实时查看订单执行进度、逐包码单、原产地证及高清集装箱装柜照片。",
    },
    services: {
      eyebrow: "全流程服务体系",
      title: "亚麻深加工、出口、进口及国际物流服务",
      subtitle: "全面满足从农业原麻到纺纱车间之间的各项工业与贸易需求。",
      items: [
        {
          title: "亚麻纤维加工与全球出口",
          tag: "核心出口",
          desc: "加工并出口全系列埃及亚麻纤维及衍生制品，按全球纱厂指标定制分级。",
          bullets: [
            "湿纺及干纺纱厂原料（打成长麻、精梳长麻、精梳麻条、二粗落麻、棉型麻）",
            "水暖五金行业（Jokia 水暖麻束、塑料盒装生料麻卷、双头/四头麻把）",
            "特种造纸纸浆、汽车内饰复合材料及建筑隔音隔热麻毡",
          ],
        },
        {
          title: "装船前检验、批次编码与液压打包",
          tag: "品质保障",
          desc: "装柜前执行严格的逐批检验与高密度标准液压打包。",
          bullets: [
            "麻包刷唛、批次编码及实验室回潮率/强力抽样检测",
            "装船前通过 DHL 寄送大货船样供买家确认",
            "集装箱牛皮纸防潮内衬铺设及高效防潮棒悬挂",
          ],
        },
        {
          title: "国际货运代理与自有清关",
          tag: "全球物流",
          desc: "提供海运、陆运与空运综合方案，在达米埃塔港与亚历山大港拥有自营报关团队。",
          bullets: [
            "40尺高柜 (40'HQ) / 20尺普柜整箱及拼箱发运",
            "快速签发原产地证 (CO)、植物检疫证书 (Phytosanitary) 及 EUR.1",
            "直达青岛、上海、宁波、欧洲及土耳其等 23+ 个国家港口",
          ],
        },
        {
          title: "亚麻种子与生产线进口服务",
          tag: "产业配套",
          desc: "为埃及亚麻产业引进优质认证亚麻良种、沤麻助剂及成套加工设备。",
          bullets: [
            "引进欧洲认证高产纤维亚麻种子用于尼罗河三角洲种植",
            "进口高支亚麻纱线及专用生物沤麻助剂",
            "引进全套自动化打成麻、精梳机及棉型麻开松生产线",
          ],
        },
      ],
    },
    products: {
      eyebrow: "埃及亚麻产品目录",
      title: "严格分级与定制包装的天然亚麻产品",
      subtitle: "点击分类查看详细技术指标、纱厂等级、40尺高柜装箱量及工业用途。",
      catAll: "全部产品 (12)",
      catScutched: "打成麻 (原麻系列)",
      catHackled: "精梳麻与纺纱麻",
      catPlumbing: "水暖密封亚麻",
      catTwine: "亚麻线、绳索与麻籽",
      specsTitle: "核心技术指标",
      stapleLength: "纤维长度 / 规格",
      moisture: "标准回潮率",
      shiveContent: "含杂 / 麻屑率",
      baleWeight: "包装与单包重量",
      containerLoad: "40'HQ 装箱量",
      hsCode: "海关编码 (HS Code)",
      availableGrades: "可选等级规格",
      applications: "主要工业应用",
      inquireProduct: "针对此产品询价",
      viewSpecs: "查看完整指标",
    },
    process: {
      eyebrow: "从尼罗河三角洲到远洋货轮",
      title: "ISO 9001:2015 六步加工与品控流程",
      subtitle: "EgyNile Flax 出口的每一个集装箱均经过六个阶段的生物、机械与实验室严格把关。",
      steps: [
        {
          num: "01",
          title: "尼罗河三角洲种植与连根拔麻",
          desc: "生长于肥沃的尼罗河三角洲冲积土壤，采用机械连根拔取（非切割）收割，最大限度保留长纤维长度。",
          metric: "茎长 850–1000 mm",
        },
        {
          num: "02",
          title: "受控沤麻与自然晾晒",
          desc: "精准控制天然生物酶沤麻过程，分解果胶使韧皮纤维与木质芯分离，同时完好保持纤维强力。",
          metric: "精准果胶脱胶控制",
        },
        {
          num: "03",
          title: "机械碎茎与打成 (Scutching)",
          desc: "通过压碎辊与涡轮打麻刀彻底剥离干燥麻屑，分离出洁净的打成长麻（Scutched Long）与初级短麻。",
          metric: "长麻含杂率 < 1.2%",
        },
        {
          num: "04",
          title: "多道针排精梳与棉型化加工",
          desc: "打成长麻经精梳机梳理为平行精梳麻束与连续麻条，或经精细开松定长切断为 32–38mm 棉型亚麻。",
          metric: "零杂质平行精梳",
        },
        {
          num: "05",
          title: "实验室分级与高密度液压打包",
          desc: "资深检验师按色泽、细度与强力严格分级（C、D、E、EK），采用液压打包机高密度压包并赋唯一追溯码。",
          metric: "120–200 kg 高密度麻包",
        },
        {
          num: "06",
          title: "工厂装柜与客户门户实时上传",
          desc: "在加马萨工厂月台装柜并配置防潮棒，全套装柜照片、铅封号及单据即时同步至线上客户门户。",
          metric: "每40尺高柜装载 22–25 吨",
        },
      ],
    },
    portalTeaser: {
      eyebrow: "数字化供应链透明管理",
      title: "交互式客户门户 — 实时追踪您的订单与装柜照片",
      subtitle: "如同 cp.makoverseas.net，我们的内置客户门户让全球买家 24 小时随时查阅订单执行阶段、逐包码单、植物检疫证及高清集装箱装柜实拍。",
      feature1: "6阶段实时订单执行与船期追踪进度条",
      feature2: "带时间戳的空柜检查、装柜分层及铅封锁闭照片库",
      feature3: "在线预览与下载合同、商业发票、箱单、原产地证与植检证",
      feature4: "每批次实验室回潮率与含杂率检验报告",
      openPortalBtn: "立即进入客户门户",
      tryDemoLabel: "可直接点击体验的演示追踪码：",
    },
    location: {
      eyebrow: "全球网络与工厂基地",
      title: "坐落于埃及核心亚麻产区的战略枢纽",
      subtitle: "总部及加工厂位于埃及加马萨工业区（Gamasa），并在阿联酋、黎巴嫩及欧洲设有区域贸易代表处。",
      exportDestinationsTitle: "稳定供应全球 23+ 个国家的亚麻纺纱厂",
      portAdvantageTitle: "直通地中海与红海核心枢纽港口",
      portAdvantageDesc: "工厂距离达米埃塔港（Damietta）仅 25 公里，高速直通亚历山大港与塞得港，海运直达中国主要港口（青岛、上海、宁波 18–25 天）及欧洲（5–8 天）。",
    },
    contact: {
      eyebrow: "工厂直供询盘",
      title: "申请出口报价或免费寄送大货纤维样品",
      subtitle: "请填写您所需的亚麻品种、等级、数量及目的港。我们的出口部将在 4 个工作小时内回复最新 FOB/CIF 报价及 DHL 寄样安排。",
      formTitle: "B2B 国际买家询价表",
      companyName: "公司 / 纺纱厂名称",
      contactPerson: "联系人姓名与职位",
      email: "企业电子邮箱",
      phone: "电话 / WhatsApp / 微信 (WeChat)",
      country: "目的国家与目的港 (如: 中国青岛港)",
      productInterest: "所需产品与等级",
      quantityTons: "预计采购数量 (吨 / 集装箱数)",
      incoterm: "贸易条款 (FOB / CIF / CFR)",
      message: "具体指标要求 (纤维长度、含杂率、纺纱支数、包装规格)",
      submitBtn: "提交正式询价单",
      successMsg: "您的询价已成功录入出口部及管理后台！查询编号：",
      directWhatsapp: "通过 WhatsApp 即时沟通",
    },
    footer: {
      rights: "© 2026 EgyNile Flax™ Overseas Co. 版权所有 • 始于 2008 年",
      tagline: "ISO 9001:2015 认证埃及优质亚麻纤维加工与出口商 — 埃及达卡利亚省加马萨工业区",
    },
  },
  fr: {
    dir: "ltr",
    langLabel: "Français",
    nav: {
      about: "À Propos",
      services: "Services",
      products: "Produits",
      process: "Qualité & Processus",
      location: "Implantations",
      contact: "Contact",
      clientPortal: "Portail Client",
      adminPanel: "Admin CMS",
      requestQuote: "Demander un Devis",
    },
    hero: {
      badge: "Exportateur Certifié ISO 9001:2015 • Depuis 2008 • Gamasa, Égypte",
      titleLine1: "Fibre de Lin Égyptien Premium",
      titleHighlight: "Des Champs du Delta du Nil aux Filatures Mondiales",
      subtitle:
        "Transformateur et exportateur international de lin teillé long, lin peigné, rubans (slivers), étoupes, lin cotonnisé, filasse de plomberie et ficelles naturelles vers plus de 23 pays.",
      ctaProducts: "Explorer le Catalogue",
      ctaQuote: "Demander un Devis Export",
      ctaPortal: "Portail Client & Suivi Live",
      stat1Value: "Depuis 2008",
      stat1Label: "Savoir-faire Linier Égyptien",
      stat2Value: "23+ Pays",
      stat2Label: "Filatures & Acheteurs Industriels",
      stat3Value: "ISO 9001:2015",
      stat3Label: "Qualité Certifiée & Classement Labo",
      stat4Value: "100% Digital",
      stat4Label: "Portail Client & Photos d'Empotage",
    },
    about: {
      eyebrow: "À Propos d'EgyNile Flax",
      title: "Maîtrise Intégrale du Champ du Delta du Nil Jusqu'à Votre Conteneur",
      lead: "Issu d'une maison familiale égyptienne de négoce de lin, EgyNile Flax est aujourd'hui un transformateur industriel et exportateur mondial basé à Gamasa.",
      p1: "EgyNile Flax contrôle chaque étape de la filière en interne : sélection des pailles de lin du Delta du Nil, rouissage contrôlé, teillage mécanique, peignage progressif et contrôle laboratoire avant pressage hydraulique des balles.",
      p2: "Membre actif du Textile Export Council of Egypt (TEC) et certifié ISO 9001:2015, nous assurons l'inspection, le codage des lots, l'empotage des conteneurs et le dédouanement en interne pour garantir des expéditions fluides.",
      pillar1Title: "Intégration du Champ au Conteneur",
      pillar1Desc: "Approvisionnement direct, teillage, peignage, cotonnisation et empotage sans intermédiaires.",
      pillar2Title: "Classement Labo ISO 9001:2015",
      pillar2Desc: "Contrôle strict de la longueur de fibre, de la ténacité, de l'humidité (≤11,5%) et du taux d'anas.",
      pillar3Title: "Douane & Logistique Intégrées",
      pillar3Desc: "À 25 km du port de Damiette et liaison directe avec Alexandrie pour des expéditions rapides.",
      pillar4Title: "Portail Client Transparent",
      pillar4Desc: "Suivi de commande en temps réel, listes de colisage et photos d'empotage haute résolution.",
    },
    services: {
      eyebrow: "Compétences de Bout en Bout",
      title: "Transformation du Lin, Export, Import & Logistique",
      subtitle: "Couvrant tous les besoins industriels entre la parcelle agricole et votre filature.",
      items: [
        {
          title: "Transformation & Exportation Mondiale",
          tag: "Export Principal",
          desc: "Transformation et exportation de tous les grades de fibres de lin égyptien selon le cahier des charges des filatures.",
          bullets: [
            "Filatures au mouillé et au sec (Teillé long, Peigné, Ruban, Étoupe, Cotonnisé)",
            "Négoce sanitaire et plomberie (Poupées Jokia, Bobines dévidoirs, Poupées 2/4 têtes)",
            "Pâte à papier spéciale, biocomposites automobiles et isolation thermique",
          ],
        },
        {
          title: "Inspection Avant Expédition, Codage & Pressage",
          tag: "Assurance Qualité",
          desc: "Inspection rigoureuse lot par lot et pressage hydraulique haute densité avant chargement.",
          bullets: [
            "Marquage des balles, codage des lots et échantillonnage laboratoire",
            "Envoi d'échantillons de référence par DHL pour validation client",
            "Habillage kraft du conteneur et installation de absorbeurs d'humidité",
          ],
        },
        {
          title: "Transit International & Dédouanement Interne",
          tag: "Logistique Globale",
          desc: "Solutions maritimes, terrestres et aériennes avec dédouanement intégré à Damiette et Alexandrie.",
          bullets: [
            "Conteneurs complets (FCL 40'HQ / 20'GP) et groupage LCL",
            "Certificats EUR.1, Certificats d'Origine et Phytosanitaires",
            "Liaisons directes vers plus de 23 pays sans retard portuaire",
          ],
        },
        {
          title: "Services d'Importation & Lignes de Production",
          tag: "Approvisionnement",
          desc: "Importation de semences certifiées, d'auxiliaires de rouissage et de machines linières.",
          bullets: [
            "Semences de lin certifiées d'origine européenne pour le Delta du Nil",
            "Fils de lin fins et auxiliaires de rouissage spécialisés",
            "Lignes complètes de teillage, peignage et cotonnisation",
          ],
        },
      ],
    },
    products: {
      eyebrow: "Catalogue de Lin Égyptien",
      title: "Produits en Lin Naturel Classés & Conditionnés sur Mesure",
      subtitle: "Sélectionnez une catégorie pour consulter les fiches techniques, grades disponibles et capacités par conteneur 40'HQ.",
      catAll: "Tous les Produits (12)",
      catScutched: "Lin Teillé (Brut)",
      catHackled: "Lin Peigné & Filature",
      catPlumbing: "Lin de Plomberie & Sanitaire",
      catTwine: "Ficelles, Cordages & Graines",
      specsTitle: "Spécifications Techniques",
      stapleLength: "Longueur de Fibre / Format",
      moisture: "Taux d'Humidité",
      shiveContent: "Taux d'Anas / Impuretés",
      baleWeight: "Conditionnement & Poids Balle",
      containerLoad: "Chargement 40'HQ",
      hsCode: "Code Douanier SH",
      availableGrades: "Grades Disponibles",
      applications: "Applications Industrielles",
      inquireProduct: "Demander un Devis pour ce Produit",
      viewSpecs: "Fiche Technique Complète",
    },
    process: {
      eyebrow: "Du Delta du Nil au Navire",
      title: "Processus de Production & Qualité ISO 9001:2015 en 6 Étapes",
      subtitle: "Chaque conteneur exporté par EgyNile Flax suit six étapes documentées de contrôle agronomique, mécanique et laboratoire.",
      steps: [
        {
          num: "01",
          title: "Culture dans le Delta du Nil & Arrachage",
          desc: "Cultivé dans les sols alluviaux fertiles du Nil et récolté par arrachage mécanique complet pour préserver toute la longueur de la fibre.",
          metric: "Longueur de tige 850–1000 mm",
        },
        {
          num: "02",
          title: "Rouissage Contrôlé & Séchage Solaire",
          desc: "Rouissage enzymatique naturel dissolvant les pectines qui lient la fibre au bois central sans altérer la ténacité.",
          metric: "Dissolution optimale des pectines",
        },
        {
          num: "03",
          title: "Teillage Mécanique (Scutching)",
          desc: "Les cylindres broyeurs et turbines de teillage éliminent la chènevotte pour extraire le lin teillé long et les fibres courtes (Arrous).",
          metric: "< 1,2% d'anas sur lin long",
        },
        {
          num: "04",
          title: "Peignage Progressif & Cotonnisation",
          desc: "Les fibres longues sont peignées en faisceaux parallèles et rubans continus, ou affinées en lin cotonnisé de 32–38 mm.",
          metric: "Peignage zéro impureté",
        },
        {
          num: "05",
          title: "Classement Labo & Pressage Hydraulique",
          desc: "Classement expert par couleur, finesse et résistance (Grades C, D, E, EK) et pressage hydraulique haute densité avec traçabilité par lot.",
          metric: "Balles pressées 120–200 kg",
        },
        {
          num: "06",
          title: "Empotage Usine & Publication Portail Client",
          desc: "Chargement sur nos quais de Gamasa avec dessiccants. Les photos d'empotage et documents d'export sont publiés en direct sur le Portail Client.",
          metric: "22–25 MT par 40'HQ",
        },
      ],
    },
    portalTeaser: {
      eyebrow: "Transparence Digitale de la Supply Chain",
      title: "Portail Client Interactif — Suivez Vos Conteneurs en Temps Réel",
      subtitle: "Inspiré de cp.makoverseas.net, notre Portail Client intégré offre un accès 24/7 aux étapes d'exécution, listes de colisage, certificats et photos d'empotage haute résolution.",
      feature1: "Suivi d'exécution de commande et navire en 6 étapes",
      feature2: "Galerie photos horodatée de l'empotage et du scellé conteneur",
      feature3: "Accès direct aux Contrats, Factures, EUR.1 & Certificats Phytosanitaires",
      feature4: "Rapports laboratoire d'humidité et de classement par lot",
      openPortalBtn: "Ouvrir le Portail Client",
      tryDemoLabel: "Codes de suivi démo disponibles en un clic :",
    },
    location: {
      eyebrow: "Présence Mondiale & Siège Industriel",
      title: "Implanté au Cœur de la Région Linière d'Égypte",
      subtitle: "Usine et siège social dans la zone industrielle de Gamasa, avec des bureaux régionaux aux Émirats, au Liban et en Europe.",
      exportDestinationsTitle: "Au Service des Filatures dans Plus de 23 Pays",
      portAdvantageTitle: "Accès Direct aux Ports de Méditerranée et Mer Rouge",
      portAdvantageDesc: "Situé à seulement 25 km du port de Damiette et relié par autoroute à Alexandrie et Port-Saïd, offrant des délais de transit courts vers l'Europe (5–8 jours) et l'Asie (18–25 jours).",
    },
    contact: {
      eyebrow: "Devis Direct Usine",
      title: "Demander une Cotation Export ou des Échantillons",
      subtitle: "Indiquez le grade souhaité, la quantité et le port de destination. Notre bureau export vous répond sous 4 heures ouvrées avec nos tarifs FOB/CIF et l'envoi d'échantillons DHL.",
      formTitle: "Formulaire de Demande de Devis B2B",
      companyName: "Nom de la Société / Filature",
      contactPerson: "Personne de Contact & Fonction",
      email: "Email Professionnel",
      phone: "Téléphone / WhatsApp / WeChat",
      country: "Pays & Port de Destination",
      productInterest: "Produit & Grade Souhaités",
      quantityTons: "Quantité Estimée (Tonnes / Conteneurs)",
      incoterm: "Incoterm Préféré (FOB / CIF / CFR)",
      message: "Spécifications Techniques (Longueur de fibre, % d'anas, Titre Nm, Conditionnement)",
      submitBtn: "Envoyer la Demande de Devis",
      successMsg: "Votre demande a été enregistrée dans notre Bureau Export & Portail Admin ! Référence :",
      directWhatsapp: "Discuter sur WhatsApp",
    },
    footer: {
      rights: "© 2026 EgyNile Flax™ Overseas Co. Tous droits réservés. Depuis 2008.",
      tagline: "Transformateur et Exportateur Certifié ISO 9001:2015 de Fibre de Lin Égyptien — Gamasa, Dakahlia, Égypte.",
    },
  },
};

