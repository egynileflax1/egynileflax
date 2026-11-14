export type LanguageCode = "en" | "ar" | "zh";

export type ProductCategory =
  | "scutched"
  | "hackled"
  | "plumbing"
  | "twine";

export interface ProductItem {
  id: string;
  slug: string;
  category: ProductCategory;
  name: Record<LanguageCode, string>;
  subtitle: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  grades: string[];
  specs: {
    stapleLength: string;
    moisture: string;
    shiveContent: string;
    baleWeight: string;
  };
  applications: Record<LanguageCode, string[]>;
  badge?: string;
  imageUrl: string;
  featured: boolean;
}

export interface CompanyInfo {
  brandName: string;
  legalName: string;
  foundedYear: number;
  isoCert: string;
  councilMembership: string;
  annualCapacityTons: string;
  primaryEmail: string;
  egyptPhone1: string;
  egyptPhone2: string;
  whatsappNumber: string;
  wechatId: string;
  facebookId: string;
  instagramId: string;
  linkedinId: string;
  factoryAddress: string;
}

export const COMPANY: CompanyInfo = {
  brandName: "Egy Nile Flax",
  legalName: "Egy Nile Flax Overseas Co. for Natural Fibres & Export",
  foundedYear: 2008,
  isoCert: "ISO 9001:2015 Certified",
  councilMembership: "Member of Textile Export Council of Egypt (TEC)",
  annualCapacityTons: "14,500+ MT",
  primaryEmail: "flax@egynileflax.com",
  egyptPhone1: "+20 10 17316801",
  egyptPhone2: "+20 10 50505673",
  whatsappNumber: "201017316801",
  wechatId: "hazem_1111",
  facebookId: "egynileflax",
  instagramId: "egynileflax",
  linkedinId: "egy-nile-flax",
  factoryAddress: "Tanta, Gharbia, Egypt",
};

export const PRODUCTS: ProductItem[] = [
  {
    id: "prod-scutched-long",
    slug: "scutched-long-fibers",
    category: "scutched",
    name: {
      en: "Scutched Long Flax Fibers",
      ar: "ألياف الكتان الطويلة المخدومة (المقشورة)",
      zh: "打成亚麻长麻 (Scutched Long Flax)",
    },
    subtitle: {
      en: "Raw Long-Line Nile Delta Flax • Grades C, D, E, EK, Super",
      ar: "ألياف كتان دلتا النيل الطويلة • درجات التصدير القياسية للمصانع",
      zh: "尼罗河三角洲原麻长纤 • C / D / E / EK 特级标准",
    },
    description: {
      en: "Long-line flax fibers cleanly separated from the woody core (shive) through controlled dew/water retting and precision mechanical scutching. Graded strictly by length, fineness, tensile strength, and natural golden-grey luster according to spinning mill requirements.",
      ar: "ألياف كتان طويلة مفصولة بدقة عن الساق الخشبية (الساس) بعد عمليات التعطين والتقشير الميكانيكي، ومصنفة حسب الطول والمتانة والنعومة واللون لتناسب مصانع الغزل العالمية.",
      zh: "经过严格沤麻与机械打成工艺，将亚麻长纤维与麻屑彻底分离。按长度、强力、细度及色泽严格分级，直接供应全球亚麻湿纺及干纺纱厂。",
    },
    grades: ["Grade C", "Grade D", "Grade E", "Grade EK", "Super Selection"],
    specs: {
      stapleLength: "650 mm – 950 mm",
      moisture: "≤ 11.5% (Standard Regain)",
      shiveContent: "< 1.2%",
      baleWeight: "120 kg – 200 kg Hydraulic Pressed Bales",
    },
    applications: {
      en: ["Wet & Dry Linen Spinning Mills", "Fine Apparel & Home Textiles", "High-Tenacity Hackling Feedstock"],
      ar: ["مصانع غزل الكتان الرطب والجاف", "المنسوجات الفاخرة والمفروشات", "تغذية خطوط التمشيط الدقيقة"],
      zh: ["湿纺及干纺亚麻纱厂", "高端亚麻服装与家纺面料", "梳成麻深加工原料"],
    },
    badge: "Flagship Product",
    imageUrl: "/IMG_9066.webp",
    featured: true,
  },
  {
    id: "prod-short-arrous",
    slug: "short-fibers-arrous",
    category: "scutched",
    name: {
      en: "Short Flax Fibers (Arrous)",
      ar: "ألياف الكتان القصيرة (عروس الكتان)",
      zh: "亚麻短纤 / 原麻落麻 (Arrous)",
    },
    subtitle: {
      en: "Primary Scutched Short Fiber • High Cellulose Purity",
      ar: "ألياف قصيرة أولية عالية النقاء لصناعات الغزل والورق والمركبات",
      zh: "打成工序初级短纤维 • 适用于粗支纱、造纸及复合材料",
    },
    description: {
      en: "Shorter raw flax fibers separated during primary scutching operations. Thoroughly shaken and cleaned to reduce shive percentage, offering an economical natural fiber source for coarse spinning, specialty paper pulp, automotive bio-composites, and thermal insulation.",
      ar: "ألياف كتان قصيرة ناتجة عن مراحل التقشير الأولية، يتم تنظيفها وتنفيضها لتقليل نسبة الشوائب الخشبية، وتستخدم في الغزل السميك وعجينة الورق الفاخر والعزل الحراري وصناعة السيارات.",
      zh: "打成加工过程中分离出的初级短麻纤维，经除杂震动筛分处理，广泛用于粗支麻纱、特种造纸纸浆、汽车内饰复合材料及隔音隔热板。",
    },
    grades: ["Arrous No. 1 (Clean)", "Arrous No. 2 (Standard)", "Paper & Composite Grade"],
    specs: {
      stapleLength: "120 mm – 320 mm",
      moisture: "≤ 12.0%",
      shiveContent: "3.5% – 7.0% (By Grade)",
      baleWeight: "150 kg – 220 kg High-Density Bales",
    },
    applications: {
      en: ["Automotive Door Panels & Bio-Composites", "Specialty & Banknote Paper Pulp", "Acoustic & Thermal Insulation Mats"],
      ar: ["ألواح السيارات والمواد المركبة", "عجينة الورق الخاص والفاخر", "ألواح العزل الحراري والصوتي"],
      zh: ["汽车内饰板与生物基复合材料", "特种纸浆与卷烟纸", "建筑保温与隔音材料"],
    },
    imageUrl: "/IMG_9314.JPG.webp",
    featured: false,
  },
  {
    id: "prod-hackled-long",
    slug: "hackled-long-fibers",
    category: "hackled",
    name: {
      en: "Hackled Long Flax Fibers",
      ar: "ألياف الكتان الطويلة الممشطة (الهاكلد)",
      zh: "梳成亚麻长麻 (Hackled Long Flax)",
    },
    subtitle: {
      en: "Combed & Parallelized Spinning Grade • Zero-Impurity Finish",
      ar: "ألياف ممشطة ومتوازية فائقة النعومة لمصانع الغزل الرفيع",
      zh: "精梳平行长麻束 • 高支亚麻纺纱专用",
    },
    description: {
      en: "Produced by drawing selected scutched long fibers through progressive pinning hackling machines. All short fibers, naps, and residual shives are removed, resulting in silky, parallelized ribbons ready for high-count linen spinning and technical thread manufacture.",
      ar: "تُنتج بتمرير ألياف الكتان الطويلة المختارة عبر ماكينات التمشيط التدريجية لإزالة الشعيرات القصيرة والشوائب بالكامل، مما يمنح خصلات حريرية متوازية جاهزة للغزل الرفيع.",
      zh: "精选优质打成长麻，经多道针排精梳机梳理平行，彻底去除短绒与麻屑。纤维顺直、光泽如丝，直接用于高支纯亚麻纱线纺制。",
    },
    grades: ["Nm 24–36 Spinning Grade", "Fine Combed Selection", "Technical Thread Grade"],
    specs: {
      stapleLength: "600 mm – 880 mm",
      moisture: "≤ 11.0%",
      shiveContent: "< 0.15% (Virtually Shive-Free)",
      baleWeight: "100 kg – 150 kg Wrapped Bales",
    },
    applications: {
      en: ["High-Count Wet Spun Linen Yarn", "Luxury Damask & Apparel Linen", "Industrial Sewing & Shoe Threads"],
      ar: ["غزل الكتان الرفيع عالي النمرة", "الأقمشة الكتانية الفاخرة والملابس", "خيوط الحياكة الصناعية والأحذية"],
      zh: ["高支湿纺纯亚麻纱", "高档亚麻时装与提花面料", "高强工业缝纫线与鞋线"],
    },
    badge: "Mill Favorite",
    imageUrl: "/IMG_9317.JPG.webp",
    featured: true,
  },
  {
    id: "prod-hackled-sliver",
    slug: "hackled-flax-sliver",
    category: "hackled",
    name: {
      en: "Hackled Flax Sliver (Tops)",
      ar: "شريط الكتان الممشط (سليفر الغزل)",
      zh: "精梳亚麻条 (Hackled Flax Sliver)",
    },
    subtitle: {
      en: "Continuous Uniform Ribbon • Direct Drawing Frame Feed",
      ar: "شريط كتان متصل ومتجانس جاهز مباشرة لماكينات السحب والغزل",
      zh: "均匀连续麻条 • 可直接上并条与细纱机",
    },
    description: {
      en: "Uniform, continuous untwisted strands of parallelized hackled flax fibers formed directly at the spreader/hackling delivery head. Engineered with consistent linear density (g/m) so spinning mills can bypass primary preparation and feed directly into drawing frames.",
      ar: "أشرطة متصلة ومتجانسة من ألياف الكتان الممشطة المتوازية بكثافة طولية دقيقة (جرام/متر)، تتيح لمصانع الغزل التغذية المباشرة على ماكينات السحب دون الحاجة لمراحل التحضير الأولية.",
      zh: "由精梳机联匹成条的连续均匀无捻亚麻条，克重偏差极小（CV%低），纱厂无需前道梳麻设备即可直接进入并条、粗纱及细纱工序。",
    },
    grades: ["20–25 g/m Standard Sliver", "30 g/m Heavy Sliver", "Bleached / Natural Tops"],
    specs: {
      stapleLength: "580 mm – 820 mm",
      moisture: "≤ 11.0%",
      shiveContent: "0.0% – 0.1%",
      baleWeight: "Bump / Coiled Bales in PE Wrap (100–140 kg)",
    },
    applications: {
      en: ["Direct Wet/Dry Ring Spinning", "Linen-Silk & Linen-Wool Long Staple Blends", "High-Uniformity Technical Yarns"],
      ar: ["التغذية المباشرة لماكينات الغزل الحلقي", "الخلط مع الصوف والحرير طويل التيلة", "الخيوط الصناعية عالية الانتظام"],
      zh: ["长麻湿纺直接并条纺纱", "亚麻/羊毛、亚麻/真丝长纤混纺", "高均匀度特种技术纱线"],
    },
    imageUrl: "/IMG_9321.webp",
    featured: true,
  },
  {
    id: "prod-machine-tow",
    slug: "hackled-machine-tow",
    category: "hackled",
    name: {
      en: "Machine Tow (Hackling Tow)",
      ar: "مشاقة الكتان الميكانيكية (تو الماكينات)",
      zh: "精梳机落麻 / 二粗 (Machine Tow)",
    },
    subtitle: {
      en: "Clean Combed Shorter Fibers • Tow Yarn & Twine Grade",
      ar: "ألياف ناعمة مفروزة أثناء التمشيط مثالية لغزل التو والدوبار",
      zh: "精梳过程梳理下的洁净短麻 • 亚麻二粗纺纱核心原料",
    },
    description: {
      en: "Combed shorter fibers extracted by the pins during the hackling of long-line flax. Superior in fineness and cleanliness compared to scutching tow, making it the preferred raw material for dry/wet tow spinning, upholstery fabrics, canvas, and twine production.",
      ar: "ألياف مستخلصة أثناء عملية تمشيط الكتان الطويل، تتميز بنعومة ونظافة أعلى بكثير من المشاقة العادية، وتعد الخامة الأساسية لغزل التو وأقمشة المفروشات والكانفاس والدوبار.",
      zh: "在精梳长麻过程中由针排梳理下来的优质短麻（二粗），比普通打成落麻更细洁，是干纺/湿纺亚麻二粗纱、帆布及包装麻线的理想原料。",
    },
    grades: ["Hackling Tow Grade 1", "Hackling Tow Grade 2", "Carded Tow Selection"],
    specs: {
      stapleLength: "180 mm – 400 mm",
      moisture: "≤ 11.5%",
      shiveContent: "< 1.8%",
      baleWeight: "140 kg – 180 kg Pressed Bales",
    },
    applications: {
      en: ["Tow Linen Yarn (Nm 6 – Nm 16)", "Heavy Drapery, Canvas & Upholstery", "Polished & Unpolished Twines"],
      ar: ["خيوط غزل التو (نمرة 6 إلى 16)", "الأقمشة الثقيلة والستائر والكانفاس", "صناعة الدوبار والخيوط المبرومة"],
      zh: ["亚麻二粗纱 (Nm 6–16)", "厚重亚麻家纺、沙发布与画布", "制绳与高强包装麻线"],
    },
    imageUrl: "/IMG_9324.webp",
    featured: false,
  },
  {
    id: "prod-cottonised-flax",
    slug: "cottonised-flax-fiber",
    category: "hackled",
    name: {
      en: "Cottonised Flax Fiber",
      ar: "ألياف الكتان المقطن (كوتونايزد)",
      zh: "棉型亚麻纤维 (Cottonised Flax)",
    },
    subtitle: {
      en: "32–38 mm Staple Length • Ready for Cotton Ring & Open-End Spinning",
      ar: "طول تيلة ٣٢–٣٨ مم • جاهز للخلط مع القطن والفسكوز على ماكينات الغزل القطني",
      zh: "32–38 mm 棉型切断与开松 • 适配棉纺环锭纺与气流纺设备",
    },
    description: {
      en: "Mechanically opened, carded, and precision-cut flax fiber engineered to match the staple length and linear density of cotton. Enables conventional cotton spinning mills to spin 100% linen-look blended yarns with cotton, Tencel, viscose, or polyester without specialized wet-linen machinery.",
      ar: "ألياف كتان معالجة ومفتحة ومقصوصة بدقة لتطابق طول تيلة القطن ونعومته، مما يسمح لمصانع الغزل القطني بإنتاج خيوط مخلوطة (كتان/قطن أو كتان/فسكوز) على ماكينات الغزل الحلقي والـ Open-End مباشرة.",
      zh: "经过精细开松、梳理与定长切断处理，使其长度与细度完全匹配棉纺工艺。传统棉纺厂无需改造设备即可在环锭纺或气流纺上与棉、粘胶、天丝混纺。",
    },
    grades: ["Ring Spun Grade (36–38 mm)", "Open-End OE Grade (32–34 mm)", "Bleached / Natural Cottonised"],
    specs: {
      stapleLength: "32 mm – 38 mm (Custom 42 mm available)",
      moisture: "≤ 11.0%",
      shiveContent: "< 0.25%",
      baleWeight: "160 kg – 200 kg Strapped Bales",
    },
    applications: {
      en: ["Cotton/Flax & Viscose/Flax Blended Yarns", "Knitted Linen Jersey & Denim", "Breathable Summer Casualwear"],
      ar: ["خيوط الكتان المخلوط مع القطن والفسكوز", "أقمشة التريكو والجينز الكتاني", "ملابس الصيف الكاجوال المريحة"],
      zh: ["棉麻、粘麻、天丝亚麻混纺纱", "针织亚麻汗布与亚麻牛仔布", "春夏透气休闲服饰面料"],
    },
    badge: "High Demand",
    imageUrl: "/IMG_9325.webp",
    featured: true,
  },
  {
    id: "prod-jokia-dolls",
    slug: "plumbing-jokia-flax-dolls",
    category: "plumbing",
    name: {
      en: "Plumbing Flax — Jokia Dolls",
      ar: "كتان السباكة الفاخر (عرائس جوكيا)",
      zh: "水暖密封亚麻束 (Jokia Plumbing Flax)",
    },
    subtitle: {
      en: "Fine Combed Thread-Sealing Flax • Sanitary & Heating Grade",
      ar: "كتان ممشط فائق النعومة لعزل وتأمين وصلات المواسير والتدفئة",
      zh: "高纯度精梳水暖管螺纹密封麻 • 耐高温高压防渗漏",
    },
    description: {
      en: "Traditional high-purity combed long-fiber flax formatted into neat 'Jokia' dolls/braids for professional plumbers and sanitary engineers. When combined with jointing compound, the natural flax fibers swell slightly upon contact with water, guaranteeing leak-proof threaded metal pipe joints up to 130°C.",
      ar: "ألياف كتان طويلة ممشطة فائقة النقاء ومجدولة على هيئة 'عرائس جوكيا' المخصصة لأعمال السباكة الاحترافية وشبكات المياه والتدفئة، توفر إحكاماً تاماً ضد التسريب في الوصلات المعدنية الملولبة.",
      zh: "采用精选埃及精梳长麻编结成标准“Jokia”麻束，专用于水暖、燃气及供热金属管螺纹密封。遇水微胀特性确保连接处耐温耐压、绝不渗漏。",
    },
    grades: ["Super Extra Combed Jokia", "Standard Sanitary Jokia", "Private Label Retail Packs"],
    specs: {
      stapleLength: "650 mm – 850 mm Combed",
      moisture: "≤ 10.5%",
      shiveContent: "0.0% (100% Dust & Shive Free)",
      baleWeight: "80 g / 100 g / 200 g Dolls in 10–25 kg Master Cartons or Bales",
    },
    applications: {
      en: ["Potable Water & Heating Pipe Threads", "Steam & Gas Fitting Sealant", "Hardware Store Wholesale Distribution"],
      ar: ["عزل وصلات مواسير المياه والتدفئة", "تأمين شبكات البخار والغاز", "توزيع تجارة العدد والأدوات الصحية"],
      zh: ["饮用水管与暖气管道螺纹密封", "蒸汽与工业管件密封", "五金建材批发与零售包装"],
    },
    badge: "Sanitary Trade",
    imageUrl: "/IMG_9340.JPG.webp",
    featured: true,
  },
  {
    id: "prod-flax-spools",
    slug: "flax-spools-with-dispenser",
    category: "plumbing",
    name: {
      en: "Flax Spools with Plastic Dispenser",
      ar: "بكر كتان السباكة داخل علبة بلاستيكية (ديسبنسر)",
      zh: "带塑料盒装水暖生料麻线卷 (Flax Spools)",
    },
    subtitle: {
      en: "Tangle-Free Pocket Dispenser • OEM Barcode & Private Labeling",
      ar: "عبوات عملية مانعة للتشابك جاهزة للبيع التجاري مع إمكانية طباعة علامتك التجارية",
      zh: "便携防缠绕抽出式塑料盒 • 支持OEM品牌定制与条码印刷",
    },
    description: {
      en: "Fine hackled plumbing flax wound into uniform continuous sliver coils and housed inside impact-resistant plastic belt dispensers (or refill spools). Keeps the flax clean, dry, and easy to pull out on job sites. Available with custom OEM brand stickers and EAN barcodes.",
      ar: "شريط كتان سباكة ممشط ملفوف بانتظام داخل علب بلاستيكية متينة سهلة السحب والتعليق في حزام الفني، يحافظ على الكتان نظيفاً وجافاً، ومتاح بتصميم علامتك التجارية الخاصة.",
      zh: "将精梳水暖麻条均匀卷绕并封装于耐冲击便携塑料抽线盒中（亦提供替换芯卷），防潮防污、随抽随用，支持欧洲及中东五金商超OEM贴牌定制。",
    },
    grades: ["40g / 50g Pocket Dispenser", "80g / 100g Pro Dispenser", "Refill Spools (No Box)"],
    specs: {
      stapleLength: "Continuous Combed Sliver",
      moisture: "≤ 10.0%",
      shiveContent: "0.0% (Ultra-Clean)",
      baleWeight: "50–100 pcs per Export Carton on Euro Pallets",
    },
    applications: {
      en: ["DIY & Professional Plumbing Retail", "Toolbelt Quick-Dispense Sealing", "OEM Hardware Brand Chains"],
      ar: ["محلات العدد والأدوات الصحية الكبرى", "الاستخدام السريع للفنيين في المواقع", "العلامات التجارية الخاصة للمستوردين"],
      zh: ["五金建材连锁超市零售", "水暖工随身工具包快速作业", "海外五金品牌OEM定制"],
    },
    imageUrl: "/IMG_9341.JPG.webp",
    featured: false,
  },
  {
    id: "prod-puppets",
    slug: "plumbing-puppets-two-four-heads",
    category: "plumbing",
    name: {
      en: "Plumbing Flax Puppets (Two-Head & Four-Head)",
      ar: "كتان السباكة المجدول (دمى برأسين وأربعة رؤوس)",
      zh: "双头与四头水暖亚麻把 (Two & Four-Head Puppets)",
    },
    subtitle: {
      en: "Traditional European & Middle Eastern Sanitary Bundles",
      ar: "ربطات كتان السباكة القياسية للأسواق الأوروبية والعربية",
      zh: "欧洲及中东传统标准水暖麻把 • 200g / 500g / 1kg 捆装",
    },
    description: {
      en: "Expertly dressed and braided plumbing flax bundles tied into Two-Head or Four-Head 'Puppet' configurations. Designed so tradesmen can pull individual strands smoothly without knotting or waste.",
      ar: "حزم كتان سباكة ممشطة ومربوطة بنظام الرأسين أو الأربعة رؤوس القياسي، مصممة لسحب الخصلات بسلاسة دون هدر أو تشابك أثناء العمل.",
      zh: "按欧洲及中东传统规格整理由精梳长麻扎制的双头（Two-Head）及四头（Four-Head）水暖麻把，抽丝顺畅、不打结、无损耗。",
    },
    grades: ["Two-Head Puppet (100g – 250g)", "Four-Head Puppet (500g – 1000g)", "Golden / Silver Blonde Flax"],
    specs: {
      stapleLength: "700 mm – 900 mm",
      moisture: "≤ 10.5%",
      shiveContent: "0.0%",
      baleWeight: "10 kg / 25 kg Poly-Woven Bags or Cartons",
    },
    applications: {
      en: ["Industrial Pipefitting & Boiler Installations", "Wholesale Sanitary Warehouses", "Agricultural Irrigation Networks"],
      ar: ["تركيبات المواسير الصناعية والغلايات", "تجارة الجملة للأدوات الصحية", "شبكات الري والمحابس الكبرى"],
      zh: ["工业管道与锅炉安装工程", "水暖器材批发商", "市政与农业灌溉管网密封"],
    },
    imageUrl: "/IMG_2667.webp",
    featured: false,
  },
  {
    id: "prod-flax-twine",
    slug: "flax-twine-cones-bobbins-balls",
    category: "twine",
    name: {
      en: "Flax Twine (Cones, Bobbins & Balls)",
      ar: "دوبار وخيوط الكتان (كون، بكر، وكور)",
      zh: "亚麻线与麻绳球 (锥筒 / 线轴 / 麻线球)",
    },
    subtitle: {
      en: "1-Ply to 6-Ply Polished & Natural Linen Twines",
      ar: "خيوط ودوبار كتان طبيعي ومصقول من ١ إلى ٦ فتلات بجميع الأوزان",
      zh: "1至6股抛光及本色纯亚麻线 • 工业包装、园艺与家具弹簧捆扎",
    },
    description: {
      en: "High-tenacity natural Egyptian linen twine spun and twisted from long-line or fine tow fibers. Available in polished (waxed/glazed) or unpolished finishes, wound onto industrial cones, cylindrical bobbins, or retail center-pull balls.",
      ar: "دوبار وخيوط كتان مصري عالي المتانة مغزول ومبروم بعناية، متوفر بتشطيب لامع (مصقول) أو طبيعي على هيئة كون صناعي أو بكر أو كور جاهزة للبيع التجاري.",
      zh: "由优质埃及亚麻纺制并加捻而成的高强力纯天然亚麻线。提供上浆抛光或原色毛麻表面，可卷绕为工业宝塔筒、圆柱线轴或零售抽芯线球。",
    },
    grades: ["Polished Upholstery Twine", "Unpolished Packaging & Garden Twine", "100g – 2.5kg Cones & Balls"],
    specs: {
      stapleLength: "Continuous Twisted Plies (Nm 1.5 to Nm 12)",
      moisture: "≤ 10.5%",
      shiveContent: "Clean Spun Yarn",
      baleWeight: "Shrink-wrapped Balls/Cones in 20 kg Export Cartons",
    },
    applications: {
      en: ["Traditional Furniture Spring Tying & Upholstery", "Postal, Bank & Eco-Packaging", "Vineyard, Floristry & Greenhouse Tying"],
      ar: ["تنجيد الأثاث الكلاسيكي وربط السوست", "التغليف الصناعي والتجاري الصديق للبيئة", "الزراعة والصوبات وتنسيق الزهور"],
      zh: ["古典沙发弹簧捆扎与软包制作", "邮政、银行捆钞及环保礼品包装", "园艺花艺绑扎与温室作物固定"],
    },
    badge: "100% Biodegradable",
    imageUrl: "/IMG_2673.webp",
    featured: true,
  },
  {
    id: "prod-butcher-twine",
    slug: "food-grade-butcher-flax-twine",
    category: "twine",
    name: {
      en: "Food-Grade Butcher & Culinary Flax Twine",
      ar: "خيوط الكتان الغذائية للجزارة والطهي (بوشر توين)",
      zh: "食品级肉制品捆扎亚麻线 (Butcher Twine)",
    },
    subtitle: {
      en: "Oven-Safe, Odorless & High Knot Strength • Natural & Dyed Colors",
      ar: "آمنة غذائياً وتتحمل حرارة الأفران والتدخين • ألوان طبيعيةومميزة",
      zh: "耐高温烘烤、无异味、高结节强力 • 本色及双色食品级染色",
    },
    description: {
      en: "100% natural, chemical-free Egyptian flax twine processed under hygienic standards for meat trussing, charcuterie, sausage curing, and oven roasting. Will not burn, melt, or impart odors at high oven temperatures. Available in natural bleached/unbleached and food-safe spiral colors.",
      ar: "خيوط كتان طبيعية ١٠٠٪ خالية من الكيماويات ومصنعة وفق معايير السلامة الغذائية لربط اللحوم والمصنعات الغذائية، تتحمل درجات حرارة الأفران العالية دون احتراق أو انبعاث روائح.",
      zh: "100%纯天然埃及亚麻制成的食品级捆肉线，不含合成纤维，在高温烘烤与烟熏环境下不熔化、无异味。提供本色、漂白及红白/蓝白双色螺旋标识线。",
    },
    grades: ["Natural Unbleached Food Grade", "Bleached White Culinary", "Red/White & Blue/White Spiral"],
    specs: {
      stapleLength: "1.2 mm – 3.0 mm Diameter (3-Ply to 8-Ply)",
      moisture: "≤ 10.0%",
      shiveContent: "0.0% (Food Contact Compliant)",
      baleWeight: "250g / 500g / 1kg Food-Safe Shrink Spools",
    },
    applications: {
      en: ["Meat Processing & Charcuterie Plants", "Professional Butcheries & Roasteries", "Supermarket Culinary Packaging"],
      ar: ["مصانع اللحوم والشاركتوري", "محلات الجزارة والمطاعم الكبرى", "عبوات الطهي المنزلية في السوبرماركت"],
      zh: ["肉制品深加工与香肠腊肉悬挂", "专业肉铺与烤肉餐饮", "商超厨房烘焙用品零售"],
    },
    imageUrl: "/IMG_9321.webp",
    featured: false,
  },
  {
    id: "prod-flax-ropes-seeds",
    slug: "heavy-duty-flax-ropes-and-seeds",
    category: "twine",
    name: {
      en: "Twisted Flax Ropes & Certified Flax Seeds",
      ar: "حبال الكتان المجدولة وبذور الكتان المصرية المعتمدة",
      zh: "高强亚麻绳索与埃及亚麻籽 (Flax Ropes & Seeds)",
    },
    subtitle: {
      en: "4 mm – 40 mm 3/4-Strand Ropes • Agricultural & Oil-Pressing Linseed",
      ar: "حبال كتان بقطر ٤ إلى ٤٠ مم • وبذور كتان عالية النقاء للزراعة واستخلاص الزيوت",
      zh: "直径 4–40 mm 三股/四股麻绳 • 及高含油率埃及亚麻籽",
    },
    description: {
      en: "Heavy-duty 3-strand and 4-strand twisted natural flax ropes offering superior grip, low stretch, and weather resistance for marine, architectural, agricultural, and gym applications—alongside cleaned, gravity-separated Egyptian flax seeds (Linum usitatissimum) for sowing and linseed oil extraction.",
      ar: "حبال كتان طبيعية مجدولة من ٣ أو ٤ جدلات بأقطار متنوعة تتميز بقوة التحمل ومقاومة العوامل الجوية، بالإضافة إلى بذور الكتان المصرية المنقاة والمغربلة للتصدير الزراعي والصناعي.",
      zh: "提供直径4mm至40mm的三股及四股高强天然亚麻绳，握感极佳、低延伸、耐磨损；同时供应经比重筛选的99.5%高净度埃及亚麻籽，适用于榨油、食品及农业播种。",
    },
    grades: ["4 mm – 40 mm Twisted Rope Coils", "99.5% Purity Golden/Brown Flax Seed", "Oil-Pressing & Sowing Grades"],
    specs: {
      stapleLength: "200m Coils (Ropes) / 99.5% Purity (Seeds)",
      moisture: "≤ 9.0% (Seeds) / ≤ 11.0% (Ropes)",
      shiveContent: "< 0.5% Foreign Matter",
      baleWeight: "25 kg / 50 kg PP Bags or 1000 kg Jumbo Bags",
    },
    applications: {
      en: ["Marine, Architectural & Gymnasium Ropes", "Cold-Pressed Linseed Oil & Animal Nutrition", "Certified Agricultural Flax Cultivation"],
      ar: ["الحبال البحرية والرياضية والديكورية", "استخلاص زيت الكتان الحار والأعلاف", "تقاوي زراعة الكتان المعتمدة"],
      zh: ["航海、建筑装饰与攀爬麻绳", "冷榨亚麻籽油与高端营养饲料", "优质纤维亚麻农业种植"],
    },
    imageUrl: "/IMG_9324.webp",
    featured: false,
  },
];
