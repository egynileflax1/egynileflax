export type LanguageCode = "en" | "ar" | "zh" | "fr";

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
    container40HQ: string;
    hsCode: string;
  };
  applications: Record<LanguageCode, string[]>;
  badge?: string;
  imageUrl: string;
  featured: boolean;
}

export interface ShipmentStage {
  step: number;
  title: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  location: string;
  notes: string;
}

export interface LoadingPhoto {
  id: string;
  title: string;
  stage: string;
  timestamp: string;
  containerNo: string;
  imageUrl: string;
  caption: string;
}

export interface ShipmentDocument {
  id: string;
  name: string;
  type: "Contract" | "Invoice" | "Packing List" | "Certificate of Origin" | "Phytosanitary" | "ISO Lab Report";
  status: "Verified" | "Issued" | "Pending";
  referenceNo: string;
  date: string;
}

export interface ClientOrder {
  id: string;
  trackingCode: string;
  pinCode: string;
  clientName: string;
  companyName: string;
  destinationCountry: string;
  destinationPort: string;
  originPort: string;
  productSummary: string;
  grade: string;
  quantityMT: number;
  balesCount: number;
  containerNo: string;
  sealNo: string;
  blNumber: string;
  vesselName: string;
  etd: string;
  eta: string;
  currentStageIndex: number; // 0 to 5
  stages: ShipmentStage[];
  loadingPhotos: LoadingPhoto[];
  documents: ShipmentDocument[];
}

export interface QuoteInquiry {
  id: string;
  createdAt: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  productInterest: string;
  quantityTons: string;
  incoterm: string;
  message: string;
  status: "New" | "Quoted" | "In Negotiation" | "Confirmed";
}

export interface CompanySettings {
  brandName: string;
  legalName: string;
  foundedYear: number;
  isoCert: string;
  councilMembership: string;
  exportCountriesCount: number;
  annualCapacityTons: string;
  primaryEmail: string;
  secondaryEmail: string;
  egyptPhone1: string;
  egyptPhone2: string;
  whatsappNumber: string;
  wechatId: string;
  factoryAddress: string;
  portProximity: string;
  regionalOffices: {
    country: string;
    city: string;
    phone: string;
    role: string;
  }[];
}

export const DEFAULT_COMPANY_SETTINGS: CompanySettings = {
  brandName: "EgyNile Flax",
  legalName: "EgyNile Flax Overseas Co. for Natural Fibres & Export",
  foundedYear: 2008,
  isoCert: "ISO 9001:2015 Certified",
  councilMembership: "Member of Textile Export Council of Egypt (TEC)",
  exportCountriesCount: 23,
  annualCapacityTons: "14,500+ MT",
  primaryEmail: "flax@egynileflax.com",
  secondaryEmail: "export@egynileflax.com",
  egyptPhone1: "+20 128 008 0180",
  egyptPhone2: "+20 111 277 5527",
  whatsappNumber: "201280080180",
  wechatId: "EgyNileFlax_Export",
  factoryAddress: "Industrial Zone, Gamasa & Shubra Mellas Flax Valley, Dakahlia / Gharbia, Egypt",
  portProximity: "25 km from Damietta Port • 160 km from Alexandria Port",
  regionalOffices: [
    {
      country: "Egypt (HQ & Processing Mill)",
      city: "Gamasa Industrial Zone, Dakahlia",
      phone: "+20 128 008 0180",
      role: "Primary Scutching, Hackling, Grading & Container Loading",
    },
    {
      country: "United Arab Emirates",
      city: "Dubai Trade Center District",
      phone: "+971 54 440 4978",
      role: "GCC & Asian Trade Desk & Export Settlement",
    },
    {
      country: "Lebanon",
      city: "Beirut Port Commercial District",
      phone: "+961 81 271 762",
      role: "Mediterranean & Levant Regional Office",
    },
    {
      country: "European Liaison",
      city: "Tirana / Antwerp Logistics Hub",
      phone: "+355 69 298 1126",
      role: "European Mill Distribution & Customs Coordination",
    },
  ],
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "prod-scutched-long",
    slug: "scutched-long-fibers",
    category: "scutched",
    name: {
      en: "Scutched Long Flax Fibers",
      ar: "ألياف الكتان الطويلة المخدومة (المقشورة)",
      zh: "打成亚麻长麻 (Scutched Long Flax)",
      fr: "Fibres de Lin Teillé Longues",
    },
    subtitle: {
      en: "Raw Long-Line Nile Delta Flax • Grades C, D, E, EK, Super",
      ar: "ألياف كتان دلتا النيل الطويلة • درجات التصدير القياسية للمصانع",
      zh: "尼罗河三角洲原麻长纤 • C / D / E / EK 特级标准",
      fr: "Lin long teillé du Delta du Nil • Grades C, D, E, EK",
    },
    description: {
      en: "Long-line flax fibers cleanly separated from the woody core (shive) through controlled dew/water retting and precision mechanical scutching. Graded strictly by length, fineness, tensile strength, and natural golden-grey luster according to spinning mill requirements.",
      ar: "ألياف كتان طويلة مفصولة بدقة عن الساق الخشبية (الساس) بعد عمليات التعطين والتقشير الميكانيكي، ومصنفة حسب الطول والمتانة والنعومة واللون لتناسب مصانع الغزل العالمية.",
      zh: "经过严格沤麻与机械打成工艺，将亚麻长纤维与麻屑彻底分离。按长度、强力、细度及色泽严格分级，直接供应全球亚麻湿纺及干纺纱厂。",
      fr: "Fibres longues de lin séparées avec précision de la chènevotte après rouissage et teillage mécanique. Classées selon la longueur, la finesse et la résistance pour les filatures.",
    },
    grades: ["Grade C", "Grade D", "Grade E", "Grade EK", "Super Selection"],
    specs: {
      stapleLength: "650 mm – 950 mm",
      moisture: "≤ 11.5% (Standard Regain)",
      shiveContent: "< 1.2%",
      baleWeight: "120 kg – 200 kg Hydraulic Pressed Bales",
      container40HQ: "22 – 24 Metric Tons (120–180 Bales)",
      hsCode: "5301.21",
    },
    applications: {
      en: ["Wet & Dry Linen Spinning Mills", "Fine Apparel & Home Textiles", "High-Tenacity Hackling Feedstock"],
      ar: ["مصانع غزل الكتان الرطب والجاف", "المنسوجات الفاخرة والمفروشات", "تغذية خطوط التمشيط الدقيقة"],
      zh: ["湿纺及干纺亚麻纱厂", "高端亚麻服装与家纺面料", "梳成麻深加工原料"],
      fr: ["Filatures de lin au mouillé et au sec", "Textiles d'habillement et linge de maison", "Matière première pour peignage"],
    },
    badge: "Flagship Export",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80",
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
      fr: "Fibres Courtes de Lin (Arrous)",
    },
    subtitle: {
      en: "Primary Scutched Short Fiber • High Cellulose Purity",
      ar: "ألياف قصيرة أولية عالية النقاء لصناعات الغزل والورق والمركبات",
      zh: "打成工序初级短纤维 • 适用于粗支纱、造纸及复合材料",
      fr: "Fibres courtes issues du teillage primaire • Haute pureté",
    },
    description: {
      en: "Shorter raw flax fibers separated during primary scutching operations. Thoroughly shaken and cleaned to reduce shive percentage, offering an economical natural fiber source for coarse spinning, specialty paper pulp, automotive bio-composites, and thermal insulation.",
      ar: "ألياف كتان قصيرة ناتجة عن مراحل التقشير الأولية، يتم تنظيفها وتنفيضها لتقليل نسبة الشوائب الخشبية، وتستخدم في الغزل السميك وعجينة الورق الفاخر والعزل الحراري وصناعة السيارات.",
      zh: "打成加工过程中分离出的初级短麻纤维，经除杂震动筛分处理，广泛用于粗支麻纱、特种造纸纸浆、汽车内饰复合材料及隔音隔热板。",
      fr: "Fibres courtes générées lors du teillage primaire, nettoyées pour réduire le taux d'impuretés. Idéales pour la filature cardée, la papeterie spéciale, l'isolation et la plasturgie.",
    },
    grades: ["Arrous No. 1 (Clean)", "Arrous No. 2 (Standard)", "Paper & Composite Grade"],
    specs: {
      stapleLength: "120 mm – 320 mm",
      moisture: "≤ 12.0%",
      shiveContent: "3.5% – 7.0% (By Grade)",
      baleWeight: "150 kg – 220 kg High-Density Bales",
      container40HQ: "22 – 25 Metric Tons",
      hsCode: "5301.30",
    },
    applications: {
      en: ["Automotive Door Panels & Bio-Composites", "Specialty & Banknote Paper Pulp", "Acoustic & Thermal Insulation Mats"],
      ar: ["ألواح السيارات والمواد المركبة", "عجينة الورق الخاص والفاخر", "ألواح العزل الحراري والصوتي"],
      zh: ["汽车内饰板与生物基复合材料", "特种纸浆与卷烟纸", "建筑保温与隔音材料"],
      fr: ["Panneaux automobiles et biocomposites", "Pâte à papier spéciale", "Panneaux d'isolation thermique et acoustique"],
    },
    imageUrl: "https://images.unsplash.com/photo-1584992236310-6edddc08a2f9?auto=format&fit=crop&w=900&q=80",
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
      fr: "Lin Peigné Longues Fibres",
    },
    subtitle: {
      en: "Combed & Parallelized Spinning Grade • Zero-Impurity Finish",
      ar: "ألياف ممشطة ومتوازية فائقة النعومة لمصانع الغزل الرفيع",
      zh: "精梳平行长麻束 • 高支亚麻纺纱专用",
      fr: "Fibres longues peignées et parallélisées pour filature fine",
    },
    description: {
      en: "Produced by drawing selected scutched long fibers through progressive pinning hackling machines. All short fibers, naps, and residual shives are removed, resulting in silky, parallelized ribbons ready for high-count linen spinning and technical thread manufacture.",
      ar: "تُنتج بتمرير ألياف الكتان الطويلة المختارة عبر ماكينات التمشيط التدريجية لإزالة الشعيرات القصيرة والشوائب بالكامل، مما يمنح خصلات حريرية متوازية جاهزة للغزل الرفيع.",
      zh: "精选优质打成长麻，经多道针排精梳机梳理平行，彻底去除短绒与麻屑。纤维顺直、光泽如丝，直接用于高支纯亚麻纱线纺制。",
      fr: "Obtenu par passage des fibres teillées sur des peigneuses progressives. Les fibres sont parfaitement parallèles, propres et prêtes pour la filature de lin fin.",
    },
    grades: ["Nm 24–36 Spinning Grade", "Fine Combed Selection", "Technical Thread Grade"],
    specs: {
      stapleLength: "600 mm – 880 mm",
      moisture: "≤ 11.0%",
      shiveContent: "< 0.15% (Virtually Shive-Free)",
      baleWeight: "100 kg – 150 kg Wrapped Bales",
      container40HQ: "20 – 22 Metric Tons",
      hsCode: "5301.29",
    },
    applications: {
      en: ["High-Count Wet Spun Linen Yarn", "Luxury Damask & Apparel Linen", "Industrial Sewing & Shoe Threads"],
      ar: ["غزل الكتان الرفيع عالي النمرة", "الأقمشة الكتانية الفاخرة والملابس", "خيوط الحياكة الصناعية والأحذية"],
      zh: ["高支湿纺纯亚麻纱", "高档亚麻时装与提花面料", "高强工业缝纫线与鞋线"],
      fr: ["Fils de lin fin au mouillé", "Tissus damassés et habillement de luxe", "Fils à coudre techniques"],
    },
    badge: "Mill Favorite",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80",
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
      fr: "Ruban de Lin Peigné (Sliver)",
    },
    subtitle: {
      en: "Continuous Uniform Ribbon • Direct Drawing Frame Feed",
      ar: "شريط كتان متصل ومتجانس جاهز مباشرة لماكينات السحب والغزل",
      zh: "均匀连续麻条 • 可直接上并条与细纱机",
      fr: "Ruban continu et régulier prêt pour bancs d'étirage",
    },
    description: {
      en: "Uniform, continuous untwisted strands of parallelized hackled flax fibers formed directly at the spreader/hackling delivery head. Engineered with consistent linear density (g/m) so spinning mills can bypass primary preparation and feed directly into drawing frames.",
      ar: "أشرطة متصلة ومتجانسة من ألياف الكتان الممشطة المتوازية بكثافة طولية دقيقة (جرام/متر)، تتيح لمصانع الغزل التغذية المباشرة على ماكينات السحب دون الحاجة لمراحل التحضير الأولية.",
      zh: "由精梳机联匹成条的连续均匀无捻亚麻条，克重偏差极小（CV%低），纱厂无需前道梳麻设备即可直接进入并条、粗纱及细纱工序。",
      fr: "Ruban continu sans torsion de fibres de lin peignées avec une régularité linéaire contrôlée, permettant une alimentation directe sur les bancs d'étirage.",
    },
    grades: ["20–25 g/m Standard Sliver", "30 g/m Heavy Sliver", "Bleached / Natural Tops"],
    specs: {
      stapleLength: "580 mm – 820 mm",
      moisture: "≤ 11.0%",
      shiveContent: "0.0% – 0.1%",
      baleWeight: "Bump / Coiled Bales in PE Wrap (100–140 kg)",
      container40HQ: "19 – 21 Metric Tons",
      hsCode: "5301.29",
    },
    applications: {
      en: ["Direct Wet/Dry Ring Spinning", "Linen-Silk & Linen-Wool Long Staple Blends", "High-Uniformity Technical Yarns"],
      ar: ["التغذية المباشرة لماكينات الغزل الحلقي", "الخلط مع الصوف والحرير طويل التيلة", "الخيوط الصناعية عالية الانتظام"],
      zh: ["长麻湿纺直接并条纺纱", "亚麻/羊毛、亚麻/真丝长纤混纺", "高均匀度特种技术纱线"],
      fr: ["Filature directe sur métier continu", "Mélanges lin/laine et lin/soie", "Fils techniques haute régularité"],
    },
    imageUrl: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
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
      fr: "Étoupe de Peignage (Machine Tow)",
    },
    subtitle: {
      en: "Clean Combed Shorter Fibers • Tow Yarn & Twine Grade",
      ar: "ألياف ناعمة مفروزة أثناء التمشيط مثالية لغزل التو والدوبار",
      zh: "精梳过程梳理下的洁净短麻 • 亚麻二粗纺纱核心原料",
      fr: "Fibres courtes issues du peignage pour filature d'étoupe",
    },
    description: {
      en: "Combed shorter fibers extracted by the pins during the hackling of long-line flax. Superior in fineness and cleanliness compared to scutching tow, making it the preferred raw material for dry/wet tow spinning, upholstery fabrics, canvas, and twine production.",
      ar: "ألياف مستخلصة أثناء عملية تمشيط الكتان الطويل، تتميز بنعومة ونظافة أعلى بكثير من المشاقة العادية، وتعد الخامة الأساسية لغزل التو وأقمشة المفروشات والكانفاس والدوبار.",
      zh: "在精梳长麻过程中由针排梳理下来的优质短麻（二粗），比普通打成落麻更细洁，是干纺/湿纺亚麻二粗纱、帆布及包装麻线的理想原料。",
      fr: "Fibres courtes extraites par les peignes lors du peignage du lin long. Plus fines et plus propres que l'étoupe de teillage, idéales pour les fils d'étoupe et toiles lourdes.",
    },
    grades: ["Hackling Tow Grade 1", "Hackling Tow Grade 2", "Carded Tow Selection"],
    specs: {
      stapleLength: "180 mm – 400 mm",
      moisture: "≤ 11.5%",
      shiveContent: "< 1.8%",
      baleWeight: "140 kg – 180 kg Pressed Bales",
      container40HQ: "21 – 23 Metric Tons",
      hsCode: "5301.30",
    },
    applications: {
      en: ["Tow Linen Yarn (Nm 6 – Nm 16)", "Heavy Drapery, Canvas & Upholstery", "Polished & Unpolished Twines"],
      ar: ["خيوط غزل التو (نمرة 6 إلى 16)", "الأقمشة الثقيلة والستائر والكانفاس", "صناعة الدوبار والخيوط المبرومة"],
      zh: ["亚麻二粗纱 (Nm 6–16)", "厚重亚麻家纺、沙发布与画布", "制绳与高强包装麻线"],
      fr: ["Fils d'étoupe de lin (Nm 6 à 16)", "Tissus d'ameublement et toiles à peindre", "Ficelles et cordages"],
    },
    imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=900&q=80",
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
      fr: "Fibre de Lin Cotonnisé",
    },
    subtitle: {
      en: "32–38 mm Staple Length • Ready for Cotton Ring & Open-End Spinning",
      ar: "طول تيلة ٣٢–٣٨ مم • جاهز للخلط مع القطن والفسكوز على ماكينات الغزل القطني",
      zh: "32–38 mm 棉型切断与开松 • 适配棉纺环锭纺与气流纺设备",
      fr: "Coupe 32–38 mm • Compatible filature coton anneaux et Open-End",
    },
    description: {
      en: "Mechanically opened, carded, and precision-cut flax fiber engineered to match the staple length and linear density of cotton. Enables conventional cotton spinning mills to spin 100% linen-look blended yarns with cotton, Tencel, viscose, or polyester without specialized wet-linen machinery.",
      ar: "ألياف كتان معالجة ومفتحة ومقصوصة بدقة لتطابق طول تيلة القطن ونعومته، مما يسمح لمصانع الغزل القطني بإنتاج خيوط مخلوطة (كتان/قطن أو كتان/فسكوز) على ماكينات الغزل الحلقي والـ Open-End مباشرة.",
      zh: "经过精细开松、梳理与定长切断处理，使其长度与细度完全匹配棉纺工艺。传统棉纺厂无需改造设备即可在环锭纺或气流纺上与棉、粘胶、天丝混纺。",
      fr: "Fibre de lin affinée mécaniquement à la longueur du coton, permettant aux filatures coton traditionnelles de produire des mélanges lin/coton ou lin/viscose sur machines standard.",
    },
    grades: ["Ring Spun Grade (36–38 mm)", "Open-End OE Grade (32–34 mm)", "Bleached / Natural Cottonised"],
    specs: {
      stapleLength: "32 mm – 38 mm (Custom 42 mm available)",
      moisture: "≤ 11.0%",
      shiveContent: "< 0.25%",
      baleWeight: "160 kg – 200 kg Strapped Bales",
      container40HQ: "22 – 24 Metric Tons",
      hsCode: "5301.29",
    },
    applications: {
      en: ["Cotton/Flax & Viscose/Flax Blended Yarns", "Knitted Linen Jersey & Denim", "Breathable Summer Casualwear"],
      ar: ["خيوط الكتان المخلوط مع القطن والفسكوز", "أقمشة التريكو والجينز الكتاني", "ملابس الصيف الكاجوال المريحة"],
      zh: ["棉麻、粘麻、天丝亚麻混纺纱", "针织亚麻汗布与亚麻牛仔布", "春夏透气休闲服饰面料"],
      fr: ["Fils mélangés coton/lin et viscose/lin", "Maille jersey lin et denim", "Vêtements d'été respirants"],
    },
    badge: "High Demand",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
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
      fr: "Lin de Plomberie — Poupées Jokia",
    },
    subtitle: {
      en: "Fine Combed Thread-Sealing Flax • Sanitary & Heating Grade",
      ar: "كتان ممشط فائق النعومة لعزل وتأمين وصلات المواسير والتدفئة",
      zh: "高纯度精梳水暖管螺纹密封麻 • 耐高温高压防渗漏",
      fr: "Filasse de lin peignée extra-fine pour étanchéité des raccords filetés",
    },
    description: {
      en: "Traditional high-purity combed long-fiber flax formatted into neat 'Jokia' dolls/braids for professional plumbers and sanitary engineers. When combined with jointing compound, the natural flax fibers swell slightly upon contact with water, guaranteeing leak-proof threaded metal pipe joints up to 130°C.",
      ar: "ألياف كتان طويلة ممشطة فائقة النقاء ومجدولة على هيئة 'عرائس جوكيا' المخصصة لأعمال السباكة الاحترافية وشبكات المياه والتدفئة، توفر إحكاماً تاماً ضد التسريب في الوصلات المعدنية الملولبة.",
      zh: "采用精选埃及精梳长麻编结成标准“Jokia”麻束，专用于水暖、燃气及供热金属管螺纹密封。遇水微胀特性确保连接处耐温耐压、绝不渗漏。",
      fr: "Filasse de lin peignée premier choix présentée en poupées Jokia pour l'étanchéité parfaite des raccords filetés en plomberie sanitaire et chauffage.",
    },
    grades: ["Super Extra Combed Jokia", "Standard Sanitary Jokia", "Private Label Retail Packs"],
    specs: {
      stapleLength: "650 mm – 850 mm Combed",
      moisture: "≤ 10.5%",
      shiveContent: "0.0% (100% Dust & Shive Free)",
      baleWeight: "80 g / 100 g / 200 g Dolls in 10–25 kg Master Cartons or Bales",
      container40HQ: "18 – 21 Metric Tons",
      hsCode: "5301.29",
    },
    applications: {
      en: ["Potable Water & Heating Pipe Threads", "Steam & Gas Fitting Sealant", "Hardware Store Wholesale Distribution"],
      ar: ["عزل وصلات مواسير المياه والتدفئة", "تأمين شبكات البخار والغاز", "توزيع تجارة العدد والأدوات الصحية"],
      zh: ["饮用水管与暖气管道螺纹密封", "蒸汽与工业管件密封", "五金建材批发与零售包装"],
      fr: ["Étanchéité eau potable et chauffage", "Raccords vapeur et gaz", "Distribution quincaillerie professionnelle"],
    },
    badge: "Sanitary Trade",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
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
      fr: "Bobines de Lin avec Dévidoir Plastique",
    },
    subtitle: {
      en: "Tangle-Free Pocket Dispenser • OEM Barcode & Private Labeling",
      ar: "عبوات عملية مانعة للتشابك جاهزة للبيع التجاري مع إمكانية طباعة علامتك التجارية",
      zh: "便携防缠绕抽出式塑料盒 • 支持OEM品牌定制与条码印刷",
      fr: "Dévidoir de poche anti-nœuds • Marque propre OEM disponible",
    },
    description: {
      en: "Fine hackled plumbing flax wound into uniform continuous sliver coils and housed inside impact-resistant plastic belt dispensers (or refill spools). Keeps the flax clean, dry, and easy to pull out on job sites. Available with custom OEM brand stickers and EAN barcodes.",
      ar: "شريط كتان سباكة ممشط ملفوف بانتظام داخل علب بلاستيكية متينة سهلة السحب والتعليق في حزام الفني، يحافظ على الكتان نظيفاً وجافاً، ومتاح بتصميم علامتك التجارية الخاصة.",
      zh: "将精梳水暖麻条均匀卷绕并封装于耐冲击便携塑料抽线盒中（亦提供替换芯卷），防潮防污、随抽随用，支持欧洲及中东五金商超OEM贴牌定制。",
      fr: "Ruban de lin peigné enroulé en bobine dans un boîtier dévidoir plastique résistant, gardant la filasse propre et sèche sur chantier.",
    },
    grades: ["40g / 50g Pocket Dispenser", "80g / 100g Pro Dispenser", "Refill Spools (No Box)"],
    specs: {
      stapleLength: "Continuous Combed Sliver",
      moisture: "≤ 10.0%",
      shiveContent: "0.0% (Ultra-Clean)",
      baleWeight: "50–100 pcs per Export Carton on Euro Pallets",
      container40HQ: "14 – 16 Metric Tons (Palletized)",
      hsCode: "5301.29",
    },
    applications: {
      en: ["DIY & Professional Plumbing Retail", "Toolbelt Quick-Dispense Sealing", "OEM Hardware Brand Chains"],
      ar: ["محلات العدد والأدوات الصحية الكبرى", "الاستخدام السريع للفنيين في المواقع", "العلامات التجارية الخاصة للمستوردين"],
      zh: ["五金建材连锁超市零售", "水暖工随身工具包快速作业", "海外五金品牌OEM定制"],
      fr: ["Rayons plomberie GSB et négoces", "Application rapide sur chantier", "Marques de distributeurs (MDD)"],
    },
    imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
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
      fr: "Poupées de Lin (2 Têtes & 4 Têtes)",
    },
    subtitle: {
      en: "Traditional European & Middle Eastern Sanitary Bundles",
      ar: "ربطات كتان السباكة القياسية للأسواق الأوروبية والعربية",
      zh: "欧洲及中东传统标准水暖麻把 • 200g / 500g / 1kg 捆装",
      fr: "Conditionnement traditionnel 2 et 4 têtes pour négoces sanitaires",
    },
    description: {
      en: "Expertly dressed and braided plumbing flax bundles tied into Two-Head or Four-Head 'Puppet' configurations. Designed so tradesmen can pull individual strands smoothly without knotting or waste.",
      ar: "حزم كتان سباكة ممشطة ومربوطة بنظام الرأسين أو الأربعة رؤوس القياسي، مصممة لسحب الخصلات بسلاسة دون هدر أو تشابك أثناء العمل.",
      zh: "按欧洲及中东传统规格整理由精梳长麻扎制的双头（Two-Head）及四头（Four-Head）水暖麻把，抽丝顺畅、不打结、无损耗。",
      fr: "Faisceaux de filasse de lin peignée tressés en poupées à 2 ou 4 têtes, permettant un tirage brin par brin sans gaspillage.",
    },
    grades: ["Two-Head Puppet (100g – 250g)", "Four-Head Puppet (500g – 1000g)", "Golden / Silver Blonde Flax"],
    specs: {
      stapleLength: "700 mm – 900 mm",
      moisture: "≤ 10.5%",
      shiveContent: "0.0%",
      baleWeight: "10 kg / 25 kg Poly-Woven Bags or Cartons",
      container40HQ: "19 – 21 Metric Tons",
      hsCode: "5301.29",
    },
    applications: {
      en: ["Industrial Pipefitting & Boiler Installations", "Wholesale Sanitary Warehouses", "Agricultural Irrigation Networks"],
      ar: ["تركيبات المواسير الصناعية والغلايات", "تجارة الجملة للأدوات الصحية", "شبكات الري والمحابس الكبرى"],
      zh: ["工业管道与锅炉安装工程", "水暖器材批发商", "市政与农业灌溉管网密封"],
      fr: ["Chaufferies et tuyauterie industrielle", "Grossistes en chauffage et sanitaire", "Réseaux d'irrigation"],
    },
    imageUrl: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=900&q=80",
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
      fr: "Ficelle de Lin (Cônes, Bobines & Pelotes)",
    },
    subtitle: {
      en: "1-Ply to 6-Ply Polished & Natural Linen Twines",
      ar: "خيوط ودوبار كتان طبيعي ومصقول من ١ إلى ٦ فتلات بجميع الأوزان",
      zh: "1至6股抛光及本色纯亚麻线 • 工业包装、园艺与家具弹簧捆扎",
      fr: "Ficelles de lin naturel et glacé de 1 à 6 bouts",
    },
    description: {
      en: "High-tenacity natural Egyptian linen twine spun and twisted from long-line or fine tow fibers. Available in polished (waxed/glazed) or unpolished finishes, wound onto industrial cones, cylindrical bobbins, or retail center-pull balls.",
      ar: "دوبار وخيوط كتان مصري عالي المتانة مغزول ومبروم بعناية، متوفر بتشطيب لامع (مصقول) أو طبيعي على هيئة كون صناعي أو بكر أو كور جاهزة للبيع التجاري.",
      zh: "由优质埃及亚麻纺制并加捻而成的高强力纯天然亚麻线。提供上浆抛光或原色毛麻表面，可卷绕为工业宝塔筒、圆柱线轴或零售抽芯线球。",
      fr: "Ficelle en pur lin égyptien haute ténacité, disponible en finition glacée ou naturelle, conditionnée en cônes industriels, bobines ou pelotes.",
    },
    grades: ["Polished Upholstery Twine", "Unpolished Packaging & Garden Twine", "100g – 2.5kg Cones & Balls"],
    specs: {
      stapleLength: "Continuous Twisted Plies (Nm 1.5 to Nm 12)",
      moisture: "≤ 10.5%",
      shiveContent: "Clean Spun Yarn",
      baleWeight: "Shrink-wrapped Balls/Cones in 20 kg Export Cartons",
      container40HQ: "16 – 19 Metric Tons",
      hsCode: "5306.20",
    },
    applications: {
      en: ["Traditional Furniture Spring Tying & Upholstery", "Postal, Bank & Eco-Packaging", "Vineyard, Floristry & Greenhouse Tying"],
      ar: ["تنجيد الأثاث الكلاسيكي وربط السوست", "التغليف الصناعي والتجاري الصديق للبيئة", "الزراعة والصوبات وتنسيق الزهور"],
      zh: ["古典沙发弹簧捆扎与软包制作", "邮政、银行捆钞及环保礼品包装", "园艺花艺绑扎与温室作物固定"],
      fr: ["Tapisserie d'ameublement et guindage de ressorts", "Emballage écologique et ficelage postal", "Horticulture et viticulture"],
    },
    badge: "100% Biodegradable",
    imageUrl: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=900&q=80",
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
      fr: "Ficelle Alimentaire de Boucherie en Lin",
    },
    subtitle: {
      en: "Oven-Safe, Odorless & High Knot Strength • Natural & Dyed Colors",
      ar: "آمنة غذائياً وتتحمل حرارة الأفران والتدخين • ألوان طبيعيةومميزة",
      zh: "耐高温烘烤、无异味、高结节强力 • 本色及双色食品级染色",
      fr: "Qualité alimentaire, résistante au four • Naturelle et bicolore",
    },
    description: {
      en: "100% natural, chemical-free Egyptian flax twine processed under hygienic standards for meat trussing, charcuterie, sausage curing, and oven roasting. Will not burn, melt, or impart odors at high oven temperatures. Available in natural bleached/unbleached and food-safe spiral colors.",
      ar: "خيوط كتان طبيعية ١٠٠٪ خالية من الكيماويات ومصنعة وفق معايير السلامة الغذائية لربط اللحوم والمصنعات الغذائية، تتحمل درجات حرارة الأفران العالية دون احتراق أو انبعاث روائح.",
      zh: "100%纯天然埃及亚麻制成的食品级捆肉线，不含合成纤维，在高温烘烤与烟熏环境下不熔化、无异味。提供本色、漂白及红白/蓝白双色螺旋标识线。",
      fr: "Ficelle 100% lin naturel sans produits chimiques pour rôtisserie, charcuterie et salaison. Ne fond pas au four et garantit une tenue de nœud irréprochable.",
    },
    grades: ["Natural Unbleached Food Grade", "Bleached White Culinary", "Red/White & Blue/White Spiral"],
    specs: {
      stapleLength: "1.2 mm – 3.0 mm Diameter (3-Ply to 8-Ply)",
      moisture: "≤ 10.0%",
      shiveContent: "0.0% (Food Contact Compliant)",
      baleWeight: "250g / 500g / 1kg Food-Safe Shrink Spools",
      container40HQ: "15 – 18 Metric Tons",
      hsCode: "5306.20",
    },
    applications: {
      en: ["Meat Processing & Charcuterie Plants", "Professional Butcheries & Roasteries", "Supermarket Culinary Packaging"],
      ar: ["مصانع اللحوم والشاركتوري", "محلات الجزارة والمطاعم الكبرى", "عبوات الطهي المنزلية في السوبرماركت"],
      zh: ["肉制品深加工与香肠腊肉悬挂", "专业肉铺与烤肉餐饮", "商超厨房烘焙用品零售"],
      fr: ["Salaisons et charcuteries industrielles", "Boucheries artisanales et traiteurs", "Conditionnement culinaire"],
    },
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
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
      fr: "Cordages en Lin Torsadé & Graines de Lin",
    },
    subtitle: {
      en: "4 mm – 40 mm 3/4-Strand Ropes • Agricultural & Oil-Pressing Linseed",
      ar: "حبال كتان بقطر ٤ إلى ٤٠ مم • وبذور كتان عالية النقاء للزراعة واستخلاص الزيوت",
      zh: "直径 4–40 mm 三股/四股麻绳 • 及高含油率埃及亚麻籽",
      fr: "Cordages 3 et 4 torons (4 à 40 mm) • Graines de lin certifiées",
    },
    description: {
      en: "Heavy-duty 3-strand and 4-strand twisted natural flax ropes offering superior grip, low stretch, and weather resistance for marine, architectural, agricultural, and gym applications—alongside cleaned, gravity-separated Egyptian flax seeds (Linum usitatissimum) for sowing and linseed oil extraction.",
      ar: "حبال كتان طبيعية مجدولة من ٣ أو ٤ جدلات بأقطار متنوعة تتميز بقوة التحمل ومقاومة العوامل الجوية، بالإضافة إلى بذور الكتان المصرية المنقاة والمغربلة للتصدير الزراعي والصناعي.",
      zh: "提供直径4mm至40mm的三股及四股高强天然亚麻绳，握感极佳、低延伸、耐磨损；同时供应经比重筛选的99.5%高净度埃及亚麻籽，适用于榨油、食品及农业播种。",
      fr: "Cordages en lin naturel 3 et 4 torons à faible allongement pour usages marins, agricoles et décoratifs, ainsi que graines de lin égyptiennes triées haute pureté.",
    },
    grades: ["4 mm – 40 mm Twisted Rope Coils", "99.5% Purity Golden/Brown Flax Seed", "Oil-Pressing & Sowing Grades"],
    specs: {
      stapleLength: "200m Coils (Ropes) / 99.5% Purity (Seeds)",
      moisture: "≤ 9.0% (Seeds) / ≤ 11.0% (Ropes)",
      shiveContent: "< 0.5% Foreign Matter",
      baleWeight: "25 kg / 50 kg PP Bags or 1000 kg Jumbo Bags",
      container40HQ: "24 – 26 Metric Tons (20'FCL / 40'HQ)",
      hsCode: "5607.90 / 1204.00",
    },
    applications: {
      en: ["Marine, Architectural & Gymnasium Ropes", "Cold-Pressed Linseed Oil & Animal Nutrition", "Certified Agricultural Flax Cultivation"],
      ar: ["الحبال البحرية والرياضية والديكورية", "استخلاص زيت الكتان الحار والأعلاف", "تقاوي زراعة الكتان المعتمدة"],
      zh: ["航海、建筑装饰与攀爬麻绳", "冷榨亚麻籽油与高端营养饲料", "优质纤维亚麻农业种植"],
      fr: ["Cordages marins, sportifs et décoration", "Pressage d'huile de lin et nutrition", "Semences agricoles certifiées"],
    },
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    featured: false,
  },
];

export const INITIAL_CLIENT_ORDERS: ClientOrder[] = [
  {
    id: "ord-1",
    trackingCode: "ENF-2026-8841",
    pinCode: "8841",
    clientName: "Marco Bellini",
    companyName: "Manifattura Linificio Bergamo S.p.A.",
    destinationCountry: "Italy",
    destinationPort: "Port of Genoa (ITGOA)",
    originPort: "Damietta Port, Egypt (EGDAM)",
    productSummary: "Scutched Long Flax Fibers (Grade EK) + Hackled Sliver Tops",
    grade: "Grade EK / 22g/m Sliver",
    quantityMT: 44.8,
    balesCount: 280,
    containerNo: "MSCU 849201-4 / MSCU 910442-0 (2 × 40'HQ)",
    sealNo: "EG-DM-994120 / EG-DM-994121",
    blNumber: "MEDUDM8841209",
    vesselName: "MSC AURORA V.642N",
    etd: "2026-11-06",
    eta: "2026-11-14",
    currentStageIndex: 4,
    stages: [
      {
        step: 1,
        title: "Sales Contract & Proforma Confirmation",
        date: "2026-10-22",
        status: "completed",
        location: "Gamasa HQ, Egypt",
        notes: "Contract #SC-2026-412 signed. Lot allocation reserved from 2026 Nile Delta crop.",
      },
      {
        step: 2,
        title: "Hackling, Grading & Bale Pressing",
        date: "2026-10-28",
        status: "completed",
        location: "EgyNile Mill — Line 2 & Line 4",
        notes: "280 hydraulic bales pressed, coded, and moisture-tested (average regain 10.4%).",
      },
      {
        step: 3,
        title: "ISO 9001 Pre-Shipment Inspection & Sampling",
        date: "2026-11-01",
        status: "completed",
        location: "EgyNile Quality Lab, Gamasa",
        notes: "Tensile strength, shive < 0.8%, and staple uniformity verified. Reference samples couriered via DHL.",
      },
      {
        step: 4,
        title: "Container Loading & Seal Verification",
        date: "2026-11-04",
        status: "completed",
        location: "EgyNile Factory Loading Bay #3",
        notes: "2 × 40'HQ containers stuffed with kraft paper lining and moisture desiccant poles. High-res loading photos uploaded.",
      },
      {
        step: 5,
        title: "Customs Clearance & Vessel Departure",
        date: "2026-11-06",
        status: "current",
        location: "Damietta Port Terminal, Egypt",
        notes: "Full export declaration cleared. Loaded aboard MSC AURORA V.642N bound for Genoa.",
      },
      {
        step: 6,
        title: "Destination Port Arrival & Document Release",
        date: "2026-11-14 (Est.)",
        status: "upcoming",
        location: "Port of Genoa, Italy",
        notes: "Original Bill of Lading, EUR.1 Certificate of Origin, and Phytosanitary Certificate ready for telex/courier release.",
      },
    ],
    loadingPhotos: [
      {
        id: "lp-1",
        title: "Empty Container Floor & Wall Inspection",
        stage: "Stage 1 — Pre-Load Check",
        timestamp: "2026-11-04 08:30 AM",
        containerNo: "MSCU 849201-4",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
        caption: "Dryness check, light-leak test, and kraft moisture liner installation completed prior to bale entry.",
      },
      {
        id: "lp-2",
        title: "Bale Lot Coding & Moisture Meter Verification",
        stage: "Stage 2 — Bale Verification",
        timestamp: "2026-11-04 09:45 AM",
        containerNo: "MSCU 849201-4",
        imageUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80",
        caption: "Each 160 kg bale tagged with Lot #ENF-EK-26 and verified at 10.4% moisture content.",
      },
      {
        id: "lp-3",
        title: "50% Tier Stacking & Desiccant Hanging",
        stage: "Stage 3 — Mid-Load",
        timestamp: "2026-11-04 11:20 AM",
        containerNo: "MSCU 849201-4",
        imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
        caption: "Tight cross-tier hydraulic bale stacking with 8 container desiccant strips installed along corrugated walls.",
      },
      {
        id: "lp-4",
        title: "Full Container Doors & High-Security Bolt Seal",
        stage: "Stage 4 — Final Seal",
        timestamp: "2026-11-04 01:15 PM",
        containerNo: "MSCU 849201-4",
        imageUrl: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80",
        caption: "140 bales loaded in Container #1 (22.40 MT Net). Sealed with bolt seal #EG-DM-994120.",
      },
    ],
    documents: [
      {
        id: "doc-1",
        name: "Signed Sales Contract #SC-2026-412.pdf",
        type: "Contract",
        status: "Verified",
        referenceNo: "SC-2026-412",
        date: "2026-10-22",
      },
      {
        id: "doc-2",
        name: "Commercial Invoice #INV-ENF-8841.pdf",
        type: "Invoice",
        status: "Issued",
        referenceNo: "INV-ENF-8841",
        date: "2026-11-04",
      },
      {
        id: "doc-3",
        name: "Detailed Bale-by-Bale Packing List.pdf",
        type: "Packing List",
        status: "Issued",
        referenceNo: "PL-ENF-8841",
        date: "2026-11-04",
      },
      {
        id: "doc-4",
        name: "EUR.1 Movement & Certificate of Origin.pdf",
        type: "Certificate of Origin",
        status: "Verified",
        referenceNo: "CO-EG-90231",
        date: "2026-11-05",
      },
      {
        id: "doc-5",
        name: "Egyptian Agricultural Phytosanitary Certificate.pdf",
        type: "Phytosanitary",
        status: "Verified",
        referenceNo: "PHY-2026-7719",
        date: "2026-11-05",
      },
      {
        id: "doc-6",
        name: "ISO 9001:2015 Fiber Lab Grading Report.pdf",
        type: "ISO Lab Report",
        status: "Verified",
        referenceNo: "LAB-2026-8841",
        date: "2026-11-01",
      },
    ],
  },
  {
    id: "ord-2",
    trackingCode: "ENF-2026-8902",
    pinCode: "8902",
    clientName: "Chen Wei / Qingdao Linen Textile Co.",
    companyName: "Qingdao Golden Flax Spinning Imp. & Exp. Ltd.",
    destinationCountry: "China",
    destinationPort: "Qingdao Port (CNTAO)",
    originPort: "Alexandria Port, Egypt (EGALY)",
    productSummary: "Scutched Long Flax Fibers (Grade D & E) + Cottonised Flax (36mm)",
    grade: "Grade D/E Mix + 36mm Ring Grade",
    quantityMT: 68.5,
    balesCount: 410,
    containerNo: "COSU 638192-1 / COSU 638199-8 / COSU 638204-2 (3 × 40'HQ)",
    sealNo: "EG-ALX-44101 to 44103",
    blNumber: "COSU6399184420",
    vesselName: "COSCO SHIPPING LOTUS V.118E",
    etd: "2026-11-12",
    eta: "2026-12-09",
    currentStageIndex: 3,
    stages: [
      {
        step: 1,
        title: "Sales Contract & L/C Opening",
        date: "2026-10-25",
        status: "completed",
        location: "Gamasa HQ, Egypt",
        notes: "Irrevocable L/C confirmed. 68.5 MT production order scheduled.",
      },
      {
        step: 2,
        title: "Scutching, Cottonising & Bale Pressing",
        date: "2026-11-02",
        status: "completed",
        location: "EgyNile Mill — Gamasa",
        notes: "410 high-density export bales pressed and strapped with galvanized bands.",
      },
      {
        step: 3,
        title: "ISO 9001 Pre-Shipment Inspection & Sampling",
        date: "2026-11-07",
        status: "completed",
        location: "EgyNile Quality Lab",
        notes: "Staple length diagram and shive test approved by buyer QA team.",
      },
      {
        step: 4,
        title: "Container Loading & Photo Documentation",
        date: "2026-11-09",
        status: "current",
        location: "EgyNile Factory Loading Bay #1",
        notes: "Container 1 & 2 loaded and sealed. Container 3 finishing final tier today.",
      },
      {
        step: 5,
        title: "Customs Clearance & Vessel Departure",
        date: "2026-11-12 (Scheduled)",
        status: "upcoming",
        location: "Alexandria Port, Egypt",
        notes: "Booked on COSCO SHIPPING LOTUS V.118E direct Asia service.",
      },
      {
        step: 6,
        title: "Arrival at Qingdao Port",
        date: "2026-12-09 (Est.)",
        status: "upcoming",
        location: "Qingdao Port, China",
        notes: "AQSIQ / CIQ phyto and origin documents transmitted via bank presentation.",
      },
    ],
    loadingPhotos: [
      {
        id: "lp-201",
        title: "High-Density Bale Staging at Warehouse",
        stage: "Stage 1 — Pre-Load",
        timestamp: "2026-11-09 09:00 AM",
        containerNo: "COSU 638192-1",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
        caption: "410 bales organized by grade lot prior to forklift stuffing.",
      },
      {
        id: "lp-202",
        title: "Full Load Inspection & Seal Lock",
        stage: "Stage 2 — Container Sealed",
        timestamp: "2026-11-09 02:30 PM",
        containerNo: "COSU 638192-1",
        imageUrl: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80",
        caption: "23.1 MT loaded cleanly into Container #1.",
      },
    ],
    documents: [
      {
        id: "doc-201",
        name: "Sales Contract #SC-2026-429.pdf",
        type: "Contract",
        status: "Verified",
        referenceNo: "SC-2026-429",
        date: "2026-10-25",
      },
      {
        id: "doc-202",
        name: "ISO 9001 Quality & Staple Length Certificate.pdf",
        type: "ISO Lab Report",
        status: "Verified",
        referenceNo: "LAB-2026-8902",
        date: "2026-11-07",
      },
      {
        id: "doc-203",
        name: "Provisional Packing List (3x40HQ).pdf",
        type: "Packing List",
        status: "Issued",
        referenceNo: "PL-ENF-8902",
        date: "2026-11-09",
      },
    ],
  },
  {
    id: "ord-3",
    trackingCode: "ENF-2026-8955",
    pinCode: "8955",
    clientName: "Hans-Dieter Krauss",
    companyName: "RheinSanitär Großhandel GmbH",
    destinationCountry: "Germany",
    destinationPort: "Port of Hamburg (DEHAM)",
    originPort: "Damietta Port, Egypt (EGDAM)",
    productSummary: "Jokia Plumbing Flax Dolls (100g) + 80g OEM Plastic Dispenser Spools",
    grade: "Super Extra Sanitary Combed",
    quantityMT: 18.4,
    balesCount: 920,
    containerNo: "HLXU 449102-7 (1 × 40'HQ Palletized)",
    sealNo: "EG-DM-772109",
    blNumber: "HLCUDAM2611084",
    vesselName: "HAPAG-LLOYD EXPRESS V.309N",
    etd: "2026-10-29",
    eta: "2026-11-11",
    currentStageIndex: 5,
    stages: [
      {
        step: 1,
        title: "OEM Packaging Artwork & Contract Approval",
        date: "2026-10-10",
        status: "completed",
        location: "Gamasa HQ, Egypt",
        notes: "German EAN barcodes and private-label dispenser labels approved.",
      },
      {
        step: 2,
        title: "Hackling, Spool Winding & Doll Braiding",
        date: "2026-10-19",
        status: "completed",
        location: "EgyNile Sanitary Flax Division",
        notes: "920 master cartons packed on heat-treated ISPM-15 Euro pallets.",
      },
      {
        step: 3,
        title: "Quality Assurance & Barcode Scan Audit",
        date: "2026-10-24",
        status: "completed",
        location: "EgyNile QA Lab",
        notes: "100% dust-free and shive-free sanitary inspection passed.",
      },
      {
        step: 4,
        title: "Palletized Container Stuffing",
        date: "2026-10-27",
        status: "completed",
        location: "EgyNile Loading Bay #2",
        notes: "24 Euro pallets secured with airbags and corner straps.",
      },
      {
        step: 5,
        title: "Vessel Departure from Damietta Port",
        date: "2026-10-29",
        status: "completed",
        location: "Damietta Port, Egypt",
        notes: "Departed on HAPAG-LLOYD EXPRESS V.309N.",
      },
      {
        step: 6,
        title: "Arriving at Port of Hamburg & Customs Release",
        date: "2026-11-11",
        status: "current",
        location: "Port of Hamburg, Germany",
        notes: "Telex Release issued. Vessel berthing at Burchardkai Terminal.",
      },
    ],
    loadingPhotos: [
      {
        id: "lp-301",
        title: "ISPM-15 Euro Pallet Wrapping & Labeling",
        stage: "Stage 1 — Palletizing",
        timestamp: "2026-10-27 10:15 AM",
        containerNo: "HLXU 449102-7",
        imageUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80",
        caption: "OEM master cartons stretch-wrapped on heat-treated Euro pallets.",
      },
      {
        id: "lp-302",
        title: "Final Container Seal & Airbag Bracing",
        stage: "Stage 2 — Sealed",
        timestamp: "2026-10-27 01:50 PM",
        containerNo: "HLXU 449102-7",
        imageUrl: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80",
        caption: "Container sealed with #EG-DM-772109.",
      },
    ],
    documents: [
      {
        id: "doc-301",
        name: "Commercial Invoice #INV-ENF-8955.pdf",
        type: "Invoice",
        status: "Verified",
        referenceNo: "INV-ENF-8955",
        date: "2026-10-27",
      },
      {
        id: "doc-302",
        name: "EUR.1 Certificate of Origin (Germany).pdf",
        type: "Certificate of Origin",
        status: "Verified",
        referenceNo: "CO-EG-88912",
        date: "2026-10-28",
      },
    ],
  },
];

export const INITIAL_INQUIRIES: QuoteInquiry[] = [
  {
    id: "inq-101",
    createdAt: "2026-11-08 14:22",
    companyName: "Siūlas Linen Mill UAB",
    contactPerson: "Tomas Kazlauskas",
    email: "procurement@siulas-mill.lt",
    phone: "+370 612 44910",
    country: "Lithuania",
    productInterest: "Scutched Long Flax Fibers (Grade D & EK)",
    quantityTons: "44 MT (2 × 40'HQ)",
    incoterm: "CIF Klaipėda",
    message: "Please send your latest November/December crop offer for Grade D and EK scutched long fiber with staple length >750mm.",
    status: "Quoted",
  },
  {
    id: "inq-102",
    createdAt: "2026-11-09 09:40",
    companyName: "Anatolia Denim & Blend Tekstil A.Ş.",
    contactPerson: "Mehmet Yılmaz",
    email: "myilmaz@anatoliatekstil.com.tr",
    phone: "+90 532 418 9920",
    country: "Turkey",
    productInterest: "Cottonised Flax Fiber (36mm Ring Spun Grade)",
    quantityTons: "22 MT (1 × 40'HQ Trial)",
    incoterm: "CIF Mersin",
    message: "Looking for low-shive (<0.2%) cottonised flax suitable for 70/30 Cotton-Linen ring yarn Ne 16/1.",
    status: "New",
  },
];

