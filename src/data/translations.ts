import { LanguageCode } from "./initialData";

export interface UITranslations {
  dir: "ltr" | "rtl";
  langLabel: string;
  brand: {
    country: string;
    subtitle: string;
    locationLine: string;
    isoCert: string;
    councilMembership: string;
    address: string;
  };
  nav: {
    about: string;
    products: string;
    process: string;
    contact: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    ctaProducts: string;
    ctaContact: string;
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
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    isoQuality: string;
    councilName: string;
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
    availableGrades: string;
    applications: string;
    inquire: string;
    inquireProduct: string;
    viewSpecs: string;
    close: string;
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
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    whatsapp: string;
    email: string;
    wechat: string;
    rednote: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    formTitle: string;
    nameLabel: string;
    companyLabel: string;
    emailFieldLabel: string;
    phoneFieldLabel: string;
    productLabel: string;
    quantityLabel: string;
    quantityPlaceholder: string;
    destinationLabel: string;
    destinationPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    sending: string;
    submitError: string;
    sentTitle: string;
    sentDesc: string;
    sendAnother: string;
    sendViaWhatsapp: string;
    sendViaEmail: string;
    copyId: string;
    copyWechatId: string;
    copyRednoteId: string;
    copied: string;
    wechatCopied: string;
    rednoteCopied: string;
    collapse: string;
    validation: {
      nameMin: string;
      emailRequired: string;
      emailInvalid: string;
      phoneInvalid: string;
      messageMin: string;
    };
  };
  footer: {
    rights: string;
    tagline: string;
    navigation: string;
    productLines: string;
    contactTitle: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, UITranslations> = {
  en: {
    dir: "ltr",
    langLabel: "English",
    brand: {
      country: "EGYPT",
      subtitle: "FLAX FIBRE PROCESSING • SINCE 2008",
      locationLine: "SINCE 2008 • TANTA, EGYPT",
      isoCert: "ISO 9001:2015 Certified",
      councilMembership: "Member of Textile Export Council of Egypt (TEC)",
      address: "Tanta, Gharbia, Egypt",
    },
    nav: {
      about: "About",
      products: "Products",
      process: "Quality & Process",
      contact: "Contact",
    },
    hero: {
      badge: "ISO 9001:2015 Certified • Since 2008 • Tanta, Egypt",
      titleLine1: "Premium Egyptian Flax Fibre",
      titleHighlight: "From Nile Delta Fields to Global Spinning Mills",
      subtitle:
        "Our Tanta mill processes Scutched Long Flax, Hackled Fibres, Slivers, Machine Tow, Cottonised Flax, Plumbing Flax and Natural Twines for spinning mills and industrial buyers in 23+ countries.",
      ctaProducts: "Explore Our Products",
      ctaContact: "Contact the Factory",
      stat1Value: "Since 2008",
      stat1Label: "Egyptian Flax Processing Heritage",
      stat2Value: "23+ Countries",
      stat2Label: "Spinning Mills & Industrial Buyers",
      stat3Value: "ISO 9001:2015",
      stat3Label: "Certified Quality & Lab Grading",
      stat4Value: "14,500+ MT",
      stat4Label: "Annual Processing Capacity",
    },
    about: {
      eyebrow: "About Egy Nile Flax",
      title: "From the Nile Delta Field to Finished Fibre — All Under One Roof",
      lead: "Evolving from an established Egyptian family flax trading house into a dedicated processor and global exporter based in Tanta, Gharbia.",
      p1: "Egy Nile Flax manages every link of the natural linen supply chain in-house: selecting fertile Nile Delta flax straw crops, supervising biological retting, executing mechanical scutching and progressive hackling, and conducting laboratory moisture and shive grading before hydraulic bale pressing.",
      pillar1Title: "Field-to-Fibre Integration",
      pillar1Desc: "Direct sourcing, scutching, hackling, cottonising and grading — with no middlemen.",
      pillar2Title: "ISO 9001:2015 Lab Grading",
      pillar2Desc: "Strict control over staple length, tensile strength, moisture regain (≤11.5%), and shive content.",
      pillar3Title: "Complete Processing Lines",
      pillar3Desc: "Scutching, hackling, cottonising and twine-making lines operating inside one facility.",
      pillar4Title: "Family Heritage Since 2008",
      pillar4Desc: "Generations of experience in Egyptian flax, now run as a modern certified mill.",
      isoQuality: "ISO 9001:2015 Quality Management",
      councilName: "Textile Export Council of Egypt",
    },
    products: {
      eyebrow: "Egyptian Flax Product Catalog",
      title: "Graded & Custom-Packed Natural Flax Products",
      subtitle: "Explore our natural flax products, technical specifications, available grades, and industrial applications.",
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
      availableGrades: "Available Grades",
      applications: "Industrial Applications",
      inquire: "Inquire",
      inquireProduct: "Ask About This Product",
      viewSpecs: "Technical Specs",
      close: "Close",
    },
    process: {
      eyebrow: "Inside the Mill",
      title: "6-Stage ISO 9001:2015 Production & Quality Workflow",
      subtitle: "Every lot we produce passes through six documented stages of agricultural, mechanical, and laboratory control.",
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
          title: "Final Inspection & Packing",
          desc: "Each lot is re-checked against its grade sample, then packed and labelled in the format the customer requests — bales, cartons, spools, or balls.",
          metric: "100% Lot Traceability",
        },
      ],
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Visit or Contact the Factory",
      subtitle: "Have a question about our flax products or want to visit the mill? Send us a message or reach us directly.",
      addressLabel: "Factory Address",
      phoneLabel: "Phone & WhatsApp",
      emailLabel: "Email",
      whatsapp: "Chat on WhatsApp",
      email: "Send an Email",
      wechat: "WeChat",
      rednote: "RedNote",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      formTitle: "Send a Message",
      nameLabel: "Your Name",
      companyLabel: "Company / Mill (Optional)",
      emailFieldLabel: "Email Address",
      phoneFieldLabel: "Phone / WhatsApp",
      productLabel: "Product of Interest",
      quantityLabel: "Estimated quantity (optional)",
      quantityPlaceholder: "e.g. 5 tonnes or 20 bales",
      destinationLabel: "Destination country (optional)",
      destinationPlaceholder: "e.g. Germany",
      messageLabel: "Message",
      messagePlaceholder: "Tell us about the flax grade, specification, or question you have...",
      submitBtn: "Send Message",
      sending: "Sending...",
      submitError: "Could not send automatically. Please use WhatsApp or Email.",
      sentTitle: "Message sent!",
      sentDesc: "Thank you — our factory team has received your inquiry and will reply shortly.",
      sendAnother: "Send Another Message",
      sendViaWhatsapp: "Send via WhatsApp",
      sendViaEmail: "Send via Email App",
      copyId: "Copy ID",
      copyWechatId: "Copy WeChat ID",
      copyRednoteId: "Copy RedNote ID",
      copied: "Copied!",
      wechatCopied: "WeChat ID Copied!",
      rednoteCopied: "RedNote ID Copied!",
      collapse: "Collapse",
      validation: {
        nameMin: "Please enter your name (at least 2 characters).",
        emailRequired: "Please enter your email address.",
        emailInvalid: "Please enter a valid email address.",
        phoneInvalid: "Please enter a valid phone or WhatsApp number.",
        messageMin: "Please enter a message (at least 10 characters).",
      },
    },
    footer: {
      rights: "© 2026 Egy Nile Flax™ Overseas Co. All rights reserved. Operating Since 2008.",
      tagline: "ISO 9001:2015 Certified Processor of Premium Egyptian Flax Fibre — Tanta, Gharbia, Egypt.",
      navigation: "Navigation",
      productLines: "Product Lines",
      contactTitle: "Contact",
    },
  },
  ar: {
    dir: "rtl",
    langLabel: "العربية",
    brand: {
      country: "مصر",
      subtitle: "تصنيع ألياف الكتان • منذ ٢٠٠٨",
      locationLine: "منذ ٢٠٠٨ • طنطا، مصر",
      isoCert: "حاصلون على شهادة ISO 9001:2015",
      councilMembership: "عضو المجلس التصديري للغزل والمنسوجات (TEC)",
      address: "طنطا، محافظة الغربية، مصر",
    },
    nav: {
      about: "عن المصنع",
      products: "المنتجات",
      process: "مراحل الإنتاج والجودة",
      contact: "اتصل بنا",
    },
    hero: {
      badge: "معتمد بشهادة ISO 9001:2015 • منذ ٢٠٠٨ • طنطا، مصر",
      titleLine1: "أجود ألياف الكتان المصري الطبيعي",
      titleHighlight: "من حقول دلتا النيل إلى مصانع الغزل العالمية",
      subtitle:
        "يقوم مصنعنا بطنطا بتصنيع الكتان الطويل المقشور، والكتان الممشط (الهاكلد)، وشريط السليفر، والمشاقة، والكتان المقطن، وكتان السباكة، والدوبار الطبيعي لمصانع الغزل والشركات الصناعية في أكثر من ٢٣ دولة.",
      ctaProducts: "تصفح منتجاتنا",
      ctaContact: "تواصل مع المصنع",
      stat1Value: "منذ ٢٠٠٨",
      stat1Label: "خبرة عريقة في تصنيع الكتان",
      stat2Value: "+٢٣ دولة",
      stat2Label: "عملاء من مصانع الغزل والشركات الصناعية",
      stat3Value: "ISO 9001:2015",
      stat3Label: "رقابة جودة معملية وتصنيف قياسي",
      stat4Value: "+١٤٬٥٠٠ طن",
      stat4Label: "الطاقة الإنتاجية السنوية",
    },
    about: {
      eyebrow: "عن إيجي نايل فلاكس (Egy Nile Flax)",
      title: "من حقول دلتا النيل إلى الألياف الجاهزة — كل المراحل تحت سقف واحد",
      lead: "تطورت الشركة من بيت تجاري عائلي عريق في تجارة الكتان المصري إلى مصنع متكامل ومُصدّر دولي بطنطا – الغربية.",
      p1: "تدير إيجي نايل فلاكس كافة مراحل سلسلة الإمداد داخلياً: بدءاً من اختيار محاصيل قش الكتان في دلتا النيل، ومراقبة التعطين الحيوي، والتقشير الميكانيكي والتمشيط التدريجي، وصولاً إلى الفحص المعملي للرطوبة ونسبة الساس قبل الكبس الهيدروليكي للبالات.",
      pillar1Title: "تكامل كامل من الحقل إلى الألياف",
      pillar1Desc: "شراء وتقشير وتمشيط وتقطين وفرز مباشر بدون وسطاء.",
      pillar2Title: "تصنيف معملي ISO 9001:2015",
      pillar2Desc: "رقابة صارمة على طول التيلة والمتانة ونسبة الرطوبة (≤11.5%) ونقاء الألياف.",
      pillar3Title: "خطوط تصنيع متكاملة",
      pillar3Desc: "خطوط التقشير والتمشيط والتقطين وصناعة الدوبار تعمل داخل منشأة واحدة.",
      pillar4Title: "خبرة عائلية منذ ٢٠٠٨",
      pillar4Desc: "خبرة متوارثة في الكتان المصري تُدار اليوم كمصنع حديث معتمد.",
      isoQuality: "إدارة الجودة ISO 9001:2015",
      councilName: "المجلس التصديري للغزل والمنسوجات",
    },
    products: {
      eyebrow: "كتالوج منتجات الكتان المصري",
      title: "منتجات كتان طبيعي مفروزة ومعبأة حسب مواصفات العميل",
      subtitle: "استعرض منتجاتنا من الكتان الطبيعي ومواصفاتها الفنية والدرجات المتاحة والتطبيقات الصناعية.",
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
      availableGrades: "الدرجات المتاحة",
      applications: "التطبيقات الصناعية",
      inquire: "استفسر",
      inquireProduct: "استفسر عن هذا المنتج",
      viewSpecs: "المواصفات الفنية",
      close: "إغلاق",
    },
    process: {
      eyebrow: "داخل المصنع",
      title: "مراحل الإنتاج والرقابة وفق معيار ISO 9001:2015",
      subtitle: "يمر كل لوت ننتجه بست مراحل موثقة من الرقابة الزراعية والميكانيكية والمعملية.",
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
          title: "الفحص النهائي والتعبئة",
          desc: "يُعاد فحص كل لوت ومطابقته مع عينة الدرجة، ثم يُعبأ ويُرقّم بالشكل الذي يطلبه العميل — بالات أو كراتين أو بكر أو كُرات.",
          metric: "تتبع كامل لكل لوت",
        },
      ],
    },
    contact: {
      eyebrow: "تواصل معنا",
      title: "زوروا المصنع أو تواصلوا معنا",
      subtitle: "لديك استفسار عن منتجاتنا أو ترغب في زيارة المصنع؟ أرسل لنا رسالة أو تواصل معنا مباشرة.",
      addressLabel: "عنوان المصنع",
      phoneLabel: "الهاتف وواتساب",
      emailLabel: "البريد الإلكتروني",
      whatsapp: "تحدث معنا عبر واتساب",
      email: "أرسل بريداً إلكترونياً",
      wechat: "وي تشات",
      rednote: "ريد نوت",
      facebook: "فيسبوك",
      instagram: "إنستغرام",
      linkedin: "لينكدإن",
      formTitle: "أرسل رسالة",
      nameLabel: "الاسم",
      companyLabel: "اسم الشركة / المصنع (اختياري)",
      emailFieldLabel: "البريد الإلكتروني",
      phoneFieldLabel: "الهاتف / واتساب",
      productLabel: "المنتج المطلوب",
      quantityLabel: "الكمية التقديرية (اختياري)",
      quantityPlaceholder: "مثال: ٥ أطنان أو ٢٠ بالة",
      destinationLabel: "بلد الوصول (اختياري)",
      destinationPlaceholder: "مثال: ألمانيا",
      messageLabel: "الرسالة",
      messagePlaceholder: "اكتب استفسارك عن الدرجة أو المواصفات المطلوبة...",
      submitBtn: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      submitError: "تعذر الإرسال التلقائي. يرجى التواصل عبر واتساب أو البريد الإلكتروني.",
      sentTitle: "تم إرسال رسالتك بنجاح!",
      sentDesc: "شكراً لتواصلك معنا — استلم فريق المصنع رسالتك وسيتواصل معك قريباً.",
      sendAnother: "إرسال رسالة أخرى",
      sendViaWhatsapp: "إرسال عبر واتساب",
      sendViaEmail: "إرسال عبر البريد الإلكتروني",
      copyId: "نسخ المعرّف",
      copyWechatId: "نسخ معرّف وي شات",
      copyRednoteId: "نسخ معرّف ريد نوت",
      copied: "تم النسخ!",
      wechatCopied: "تم نسخ معرّف وي شات!",
      rednoteCopied: "تم نسخ معرّف ريد نوت!",
      collapse: "طي",
      validation: {
        nameMin: "يرجى إدخال اسمك (حرفان على الأقل).",
        emailRequired: "يرجى إدخال البريد الإلكتروني.",
        emailInvalid: "يرجى إدخال بريد إلكتروني صحيح.",
        phoneInvalid: "يرجى إدخال رقم هاتف أو واتساب صحيح.",
        messageMin: "يرجى كتابة رسالتك (١٠ أحرف على الأقل).",
      },
    },
    footer: {
      rights: "© ٢٠٢٦ شركة إيجي نايل فلاكس (Egy Nile Flax™ Overseas Co.). جميع الحقوق محفوظة. نعمل منذ ٢٠٠٨.",
      tagline: "مصنع معتمد بشهادة ISO 9001:2015 لأجود ألياف الكتان المصري — طنطا، الغربية، مصر.",
      navigation: "روابط سريعة",
      productLines: "خطوط المنتجات",
      contactTitle: "تواصل معنا",
    },
  },
  zh: {
    dir: "ltr",
    langLabel: "中文",
    brand: {
      country: "埃及",
      subtitle: "亚麻纤维加工 • 始于 2008 年",
      locationLine: "始于 2008 年 • 埃及坦塔",
      isoCert: "ISO 9001:2015 质量体系认证",
      councilMembership: "埃及纺织品出口委员会 (TEC) 成员",
      address: "埃及西部省坦塔",
    },
    nav: {
      about: "关于我们",
      products: "产品目录",
      process: "工艺与品控",
      contact: "联系我们",
    },
    hero: {
      badge: "ISO 9001:2015 认证 • 始于 2008 年 • 埃及坦塔 (Tanta)",
      titleLine1: "优质埃及天然亚麻纤维",
      titleHighlight: "从尼罗河三角洲直达全球亚麻纺纱厂",
      subtitle:
        "我们位于坦塔的工厂专业加工打成亚麻长麻、精梳长麻、精梳麻条、精梳落麻(二粗)、棉型亚麻、水暖密封麻及天然亚麻线，服务全球 23+ 个国家的纺纱厂与工业客户。",
      ctaProducts: "浏览产品",
      ctaContact: "联系工厂",
      stat1Value: "始于 2008",
      stat1Label: "埃及亚麻加工经验",
      stat2Value: "23+ 国家",
      stat2Label: "服务全球亚麻纱厂与工业买家",
      stat3Value: "ISO 9001:2015",
      stat3Label: "国际质量体系与实验室分级",
      stat4Value: "14,500+ 吨",
      stat4Label: "年加工产能",
    },
    about: {
      eyebrow: "关于 Egy Nile Flax",
      title: "从尼罗河三角洲田间到成品纤维 — 全流程一厂完成",
      lead: "源自埃及世代传承的亚麻贸易世家，现已发展为扎根西部省坦塔（Tanta）的现代化亚麻加工与国际出口企业。",
      p1: "Egy Nile Flax 在厂内自主完成天然亚麻供应链的每一个环节：精选肥沃尼罗河三角洲的原麻作物、监控生物沤麻、执行机械打成与多道针排精梳，并在液压打包前进行严格的实验室回潮率与含杂率检测。",
      pillar1Title: "田间到纤维一体化",
      pillar1Desc: "原麻收购、打成、精梳、棉型化加工及分级全部自营，无中间商。",
      pillar2Title: "ISO 9001 实验室分级",
      pillar2Desc: "严格控制纤维长度、断裂强力、标准回潮率（≤11.5%）与麻屑含量。",
      pillar3Title: "完整加工生产线",
      pillar3Desc: "打成、精梳、棉型化及制线生产线集中于同一厂区运行。",
      pillar4Title: "始于 2008 年的家族传承",
      pillar4Desc: "传承多年的埃及亚麻经验，如今以现代化认证工厂运营。",
      isoQuality: "ISO 9001:2015 质量管理体系",
      councilName: "埃及纺织品出口委员会",
    },
    products: {
      eyebrow: "埃及亚麻产品目录",
      title: "严格分级与定制包装的天然亚麻产品",
      subtitle: "浏览我们的天然亚麻产品、技术指标、可选等级及工业用途。",
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
      availableGrades: "可选等级规格",
      applications: "主要工业应用",
      inquire: "咨询",
      inquireProduct: "咨询此产品",
      viewSpecs: "技术指标",
      close: "关闭",
    },
    process: {
      eyebrow: "走进工厂",
      title: "ISO 9001:2015 六步加工与品控流程",
      subtitle: "我们生产的每一批产品均经过六个阶段的农业、机械与实验室严格把关。",
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
          title: "最终检验与包装",
          desc: "每批产品均与等级标样再次比对检验，并按客户要求的形式包装与标识 — 麻包、纸箱、线轴或线球。",
          metric: "每批次全程可追溯",
        },
      ],
    },
    contact: {
      eyebrow: "联系我们",
      title: "欢迎参观或联系工厂",
      subtitle: "对我们的亚麻产品有疑问或希望参观工厂？请给我们留言或直接联系。",
      addressLabel: "工厂地址",
      phoneLabel: "电话与 WhatsApp",
      emailLabel: "电子邮箱",
      whatsapp: "通过 WhatsApp 沟通",
      email: "发送邮件",
      wechat: "微信",
      rednote: "小红书",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      formTitle: "发送留言",
      nameLabel: "您的姓名",
      companyLabel: "公司 / 纱厂名称（选填）",
      emailFieldLabel: "电子邮箱",
      phoneFieldLabel: "电话 / WhatsApp",
      productLabel: "意向产品",
      quantityLabel: "预计采购量（选填）",
      quantityPlaceholder: "例如：5吨或20包",
      destinationLabel: "目的国家（选填）",
      destinationPlaceholder: "例如：德国",
      messageLabel: "留言内容",
      messagePlaceholder: "请简述您关注的亚麻等级、规格或咨询内容...",
      submitBtn: "发送留言",
      sending: "发送中...",
      submitError: "无法自动发送，请通过 WhatsApp 或电子邮件联系我们。",
      sentTitle: "留言已发送！",
      sentDesc: "感谢您的联系——我们的工厂团队已收到您的询盘，将尽快回复。",
      sendAnother: "再发送一条留言",
      sendViaWhatsapp: "通过 WhatsApp 发送",
      sendViaEmail: "通过邮箱客户端发送",
      copyId: "复制 ID",
      copyWechatId: "复制微信号",
      copyRednoteId: "复制小红书号",
      copied: "已复制！",
      wechatCopied: "微信号已复制！",
      rednoteCopied: "小红书号已复制！",
      collapse: "收起",
      validation: {
        nameMin: "请输入您的姓名（至少 2 个字符）。",
        emailRequired: "请输入您的电子邮箱。",
        emailInvalid: "请输入有效的电子邮箱地址。",
        phoneInvalid: "请输入有效的电话或 WhatsApp 号码。",
        messageMin: "请输入留言内容（至少 10 个字符）。",
      },
    },
    footer: {
      rights: "© 2026 Egy Nile Flax™ Overseas Co. 版权所有 • 始于 2008 年",
      tagline: "ISO 9001:2015 认证埃及优质亚麻纤维加工厂 — 埃及西部省坦塔",
      navigation: "快速导航",
      productLines: "产品系列",
      contactTitle: "联系方式",
    },
  },
};
