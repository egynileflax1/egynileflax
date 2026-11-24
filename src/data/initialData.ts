export type LanguageCode = "en" | "ar" | "zh";

export type ProductCategory = "scutched" | "hackled" | "plumbing";

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
  images: string[];
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
  rednoteId: string;
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
  rednoteId: "egynileflax",
  facebookId: "egynileflax",
  instagramId: "egynileflax",
  linkedinId: "egy-nile-flax",
  factoryAddress: "Tanta, Gharbia, Egypt",
};

export const PRODUCTS: ProductItem[] = [
  {
    id: "prod-scutched-flax",
    slug: "scutched-flax",
    category: "scutched",
    name: {
      en: "Scutched Flax",
      ar: "الكتان المقشور (المخدوم)",
      zh: "打成亚麻 (Scutched Flax)",
    },
    subtitle: {
      en: "Outer Bark Removed After Retting • Grade A & Grade B • 250 kg Bales",
      ar: "منزوع القشرة الخارجية بعد التعطين • درجة A ودرجة B • بالات ٢٥٠ كجم",
      zh: "沤麻去皮精制 • A 级与 B 级标准 • 250 公斤麻包",
    },
    description: {
      en: "Scutched flax is flax that has had its outer bark removed after the retting process. It is known for its smoothness and high quality, primarily used in producing fine threads and fabrics. We offer two grades of scutched flax — Grade A and Grade B — pressed in bales weighing 250 kg.",
      ar: "الكتان المقشور هو الكتان الذي تمت إزالة قشرته الخارجية بعد عملية التعطين. يتميز بنعومته وجودته العالية، ويُستخدم بشكل أساسي في إنتاج الخيوط والأقمشة الفاخرة. نوفر درجتين من الكتان المقشور: درجة A ودرجة B، ويُكبس في بالات بوزن 250 كجم.",
      zh: "打成亚麻是经过沤麻工艺后去除外皮的亚麻纤维，以柔顺光滑和高品质著称，主要用于生产精细纱线与高档面料。我们提供 A 级和 B 级两种等级，压制打包为 250 公斤/包。",
    },
    grades: ["Grade A", "Grade B"],
    specs: {
      stapleLength: "Smooth Long-Line Scutched Fiber",
      moisture: "≤ 11.5% (Standard Regain)",
      shiveContent: "Grade A & Grade B Selection",
      baleWeight: "250 kg Pressed Bales",
    },
    applications: {
      en: ["Fine Thread Production", "High-Quality Linen Fabrics", "Textile Spinning Mills"],
      ar: ["إنتاج الخيوط الدقيقة", "الأقمشة الكتانية عالية الجودة", "مصانع غزل المنسوجات"],
      zh: ["精细纱线生产", "高品质亚麻面料", "亚麻纺织纱厂"],
    },
    badge: "Flagship Product",
    imageUrl: "/Scutched flax.webp",
    images: [
      "/Scutched flax.webp",
      "/Scutched flax0.webp",
      "/Scutched flax1.webp",
      "/Scutched flax2.webp",
      "/Scutched flax3.webp",
    ],
    featured: true,
  },
  {
    id: "prod-flax-arrous",
    slug: "flax-arrous",
    category: "scutched",
    name: {
      en: "Flax Arrous",
      ar: "عروس الكتان (Flax Arrous)",
      zh: "亚麻短纤 / 精制落麻 (Flax Arrous)",
    },
    subtitle: {
      en: "Refined Flax Residues • 1 to 5 Purification Stages • 200 kg Bales",
      ar: "تكرير مخلفات الكتان • من ١ إلى ٥ مراحل تنقية • بالات ٢٠٠ كجم",
      zh: "亚麻余料精制 • 1至5道净化分级 • 200 公斤麻包",
    },
    description: {
      en: "Flax arrous is the product of refining flax residues, and the purification can be done in one, two, three, four, or five stages depending on the grade of cleaning required. It is pressed in bales weighing 200 kg.",
      ar: "عروس الكتان هو ناتج تكرير وتنقية مخلفات الكتان، ويمكن إجراء التنقية على مرحلة واحدة أو مرحلتين أو ثلاث أو أربع أو خمس مراحل حسب درجة النظافة المطلوبة. يُكبس في بالات بوزن 200 كجم.",
      zh: "亚麻短纤 (Flax Arrous) 由亚麻余料精制而成，可根据所需的洁净等级进行一道、两道、三道、四道或五道净化处理。压制打包为 200 公斤/包。",
    },
    grades: [
      "1-Stage Cleaning",
      "2-Stage Cleaning",
      "3-Stage Cleaning",
      "4-Stage Cleaning",
      "5-Stage Cleaning",
    ],
    specs: {
      stapleLength: "Refined Flax Residue Fiber",
      moisture: "≤ 12.0%",
      shiveContent: "1, 2, 3, 4, or 5 Purification Stages",
      baleWeight: "200 kg Pressed Bales",
    },
    applications: {
      en: ["Coarse & Tow Spinning", "Specialty Paper & Pulp", "Bio-Composites & Insulation"],
      ar: ["الغزل السميك وغزل التو", "عجينة الورق الخاص", "المواد المركبة والعزل"],
      zh: ["粗支及落麻纺纱", "特种造纸纸浆", "生物基复合材料与保温材料"],
    },
    imageUrl: "/Flax Arrous.webp",
    images: ["/Flax Arrous.webp", "/Flax Arrous1.webp", "/Flax Arrous2.webp"],
    featured: true,
  },
  {
    id: "prod-hackled-flax",
    slug: "hackled-flax",
    category: "hackled",
    name: {
      en: "Hackled Flax",
      ar: "الكتان الممشط (الهاكلد)",
      zh: "梳成亚麻 (Hackled Flax)",
    },
    subtitle: {
      en: "Combed Long Fibers • Early Stage of Spinning • 200 or 250 kg Bales",
      ar: "ألياف طويلة ممشطة وناعمة • المرحلة المبكرة في صناعة الغزل • بالات ٢٠٠ أو ٢٥٠ كجم",
      zh: "精梳顺直长纤 • 纺纱前道核心原料 • 200 / 250 公斤麻包",
    },
    description: {
      en: "Hackled flax is flax that has been combed to separate the long fibers from the short ones, resulting in smooth, long fibers used in fine spinning and high-quality textiles. Hackled flax is considered the early stage in the manufacture of spinning, and is pressed in bales weighing 200 or 250 kg.",
      ar: "الكتان الممشط هو كتان تم تمشيطه لفصل الألياف الطويلة عن القصيرة، مما ينتج أليافاً طويلة وناعمة تُستخدم في الغزل الرفيع والمنسوجات عالية الجودة. يُعد الكتان الممشط المرحلة المبكرة في صناعة الغزل، ويُكبس في بالات بوزن 200 أو 250 كجم.",
      zh: "梳成亚麻是经过梳理工艺将长纤维与短纤维分离的亚麻，纤维顺直柔滑，广泛用于精细纺纱与高品质纺织品。梳成亚麻是纺纱制造的前道关键阶段，压制打包为 200 公斤或 250 公斤/包。",
    },
    grades: ["Fine Combed Long Fibers", "200 kg Bales", "250 kg Bales"],
    specs: {
      stapleLength: "Combed Smooth Long Fibers",
      moisture: "≤ 11.0%",
      shiveContent: "Combed & Shive-Free",
      baleWeight: "200 kg or 250 kg Pressed Bales",
    },
    applications: {
      en: ["Fine Linen Spinning", "High-Quality Textiles", "Early-Stage Spinning Manufacture"],
      ar: ["الغزل الكتاني الرفيع", "المنسوجات عالية الجودة", "المرحلة المبكرة في صناعة الغزل"],
      zh: ["精细亚麻纺纱", "高品质纺织面料", "纺纱前道制造原料"],
    },
    badge: "Mill Favorite",
    imageUrl: "/Hackled flax.webp",
    images: ["/Hackled flax.webp"],
    featured: true,
  },
  {
    id: "prod-flax-dolls",
    slug: "flax-dolls",
    category: "plumbing",
    name: {
      en: "Flax Dolls",
      ar: "عرائس الكتان (جوكيا ورؤوس مجدولة)",
      zh: "手工亚麻束 / 水暖麻把 (Flax Dolls)",
    },
    subtitle: {
      en: "Handmade from Hackled Flax • 2/4/5-Head & Jokia Shapes • 50 kg Bales",
      ar: "مصنوعة يدوياً من الكتان الممشط • برأسين و٤ و٥ رؤوس وأشكال جوكيا • بالات ٥٠ كجم",
      zh: "梳成亚麻手工精制 • 双/四/五头及 Jokia 造型 • 50 公斤麻包",
    },
    description: {
      en: "Flax dolls consist of four parts, each weighing 12.5 kg, packed together in a bale of 50 kg. They are handmade products made from hackled flax, available in different weights and shapes: flax dolls with two, four, and five heads (170, 200, or 250 grams), and flax dolls in Jokia shapes with various weights (20, 50, 60, 70, 100, 200, 250, 500, and 1000 grams). Used in many chemical industries and by plumbers in sanitary applications. All doll items can be made in any weight or shape according to the client's needs.",
      ar: "تتكون بالة عرائس الكتان من أربعة أجزاء بوزن 12.5 كجم لكل جزء، معبأة معاً في بالة بوزن 50 كجم. وهي منتجات مصنوعة يدوياً من الكتان الممشط، متوفرة بأوزان وأشكال مختلفة: عرائس برأسين وأربعة وخمسة رؤوس (170 - 200 أو 250 جرام)، وعرائس بأشكال جوكيا بأوزان متنوعة (20-50-60-70-100-200-250-500-1000 جرام). تُستخدم في العديد من الصناعات الكيميائية ولدى السباكين في التطبيقات الصحية، ويمكن تصنيع أي وزن أو شكل حسب احتياجات العميل.",
      zh: "手工亚麻束由 4 个 12.5 公斤分包组成，合装为 50 公斤/包。采用梳成亚麻手工精制，提供多种克重与造型：双头、四头、五头亚麻把（170 / 200 / 250 克），以及 Jokia 造型麻束（20 / 50 / 60 / 70 / 100 / 200 / 250 / 500 / 1000 克）。广泛用于化工行业及水暖卫浴管道密封，所有规格与造型均可按客户需求定制。",
    },
    grades: [
      "2 / 4 / 5 Heads (170–250 g)",
      "Jokia (20–1000 g)",
      "Custom Weight & Shape",
    ],
    specs: {
      stapleLength: "2/4/5-Head (170–250 g) & Jokia (20–1000 g)",
      moisture: "≤ 10.5%",
      shiveContent: "Handmade from Hackled Flax",
      baleWeight: "50 kg Bale (4 × 12.5 kg Parts)",
    },
    applications: {
      en: [
        "Plumbing & Sanitary Applications",
        "Chemical Industries",
        "Custom Client Weights & Shapes",
      ],
      ar: [
        "أعمال السباكة والتطبيقات الصحية",
        "الصناعات الكيميائية المتعددة",
        "أوزان وأشكال مخصصة حسب طلب العميل",
      ],
      zh: [
        "水暖与卫浴管道密封",
        "各类化工行业应用",
        "按客户需求定制任意克重与造型",
      ],
    },
    badge: "Handmade & Custom",
    imageUrl: "/Flax dolls.webp",
    images: [
      "/Flax dolls.webp",
      "/Flax dolls1.webp",
      "/Flax dolls2.webp",
      "/Flax dolls3.webp",
      "/Flax dolls4.webp",
      "/Flax dolls5.webp",
    ],
    featured: true,
  },
  {
    id: "prod-sliver",
    slug: "flax-sliver",
    category: "hackled",
    name: {
      en: "Sliver",
      ar: "شريط الكتان (Sliver)",
      zh: "精梳亚麻条 (Sliver)",
    },
    subtitle: {
      en: "Hackled Flax Sliver • 15 gr/m to 35 gr/m • 40–50 kg Bales",
      ar: "شريط كتان ممشط • من ١٥ إلى ٣٥ جم/متر • بالات ٤٠ إلى ٥٠ كجم",
      zh: "梳成亚麻条 • 15–35 克/米 • 40–50 公斤麻包",
    },
    description: {
      en: "Sliver is available in hackled flax with weights ranging from 15 gr/m to 35 gr/m. Packaging is in bales weighing from 40 kg to 50 kg.",
      ar: "يتوفر شريط الكتان (السليفر) من الكتان الممشط بأوزان تتراوح من 15 جم/متر إلى 35 جم/متر، ومعبأ في بالات يتراوح وزنها من 40 كجم إلى 50 كجم.",
      zh: "精梳亚麻条 (Sliver) 采用优质梳成亚麻制成，克重范围为 15 克/米至 35 克/米，包装规格为 40 公斤至 50 公斤/包。",
    },
    grades: ["15–20 gr/m", "20–25 gr/m", "25–35 gr/m"],
    specs: {
      stapleLength: "15 gr/m – 35 gr/m (Hackled Flax)",
      moisture: "≤ 11.0%",
      shiveContent: "Clean Combed Hackled Flax",
      baleWeight: "40 kg – 50 kg Bales",
    },
    applications: {
      en: ["Direct Drawing Frame Feed", "Fine Linen Spinning", "High-Uniformity Yarn Production"],
      ar: ["التغذية المباشرة لماكينات السحب", "الغزل الكتاني الرفيع", "إنتاج خيوط عالية الانتظام"],
      zh: ["并条机直接喂入", "精细亚麻纺纱", "高均匀度纱线生产"],
    },
    imageUrl: "/Flax Sliver.webp",
    images: ["/Flax Sliver.webp"],
    featured: true,
  },
];
