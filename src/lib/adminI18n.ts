import { LeadStatus, SupplierType } from "@/lib/db";

export type AdminLang = "en" | "ar";

export interface AdminTranslations {
  dir: "ltr" | "rtl";
  langToggleLabel: string;
  loadingCrm: string;
  loginTitle: string;
  loginSubtitle: string;
  googleNotConfigured: string;
  signInGoogle: string;
  unauthorizedEmail: string;
  googleSignInError: string;
  headerTitleShort: string;
  headerTitleFull: string;
  headerSubtitle: string;
  signedInAs: string;
  b2bMailBtn: string;
  addLeadBtn: string;
  addSupplierBtn: string;
  importCsvBtn: string;
  importingCsvBtn: string;
  exportCsvBtn: string;
  signOutBtn: string;
  tabLeads: string;
  tabSuppliers: string;
  viewTable: string;
  viewKanban: string;
  dbMissingTitle: string;
  dbMissingBody: string;
  kpiTotalLeads: string;
  kpiNewInquiries: string;
  kpiSampleQuoted: string;
  kpiWonDeals: string;
  kpiFollowUpsDue: string;
  filterAll: string;
  filterDue: string;
  searchLeadsPlaceholder: string;
  refreshTitle: string;
  loadingLeads: string;
  noLeadsMatch: string;
  generalInquiry: string;
  followUpLabel: string;
  followUpDueBadge: string;
  dropLeadHere: string;
  thBuyerCompany: string;
  thQuickContact: string;
  thProductVolume: string;
  thQuoteTracking: string;
  thCountry: string;
  thStatus: string;
  thFollowUp: string;
  ownerLabel: string;
  callBtn: string;
  whatsappBtn: string;
  pdfQuoteBtn: string;
  deleteLeadTitle: string;
  deleteLeadConfirm: (name: string) => string;
  sourceLabel: string;
  createdLabel: string;
  updatedByLabel: string;
  buyerInquiryMsg: string;
  drawerSectionTitle: string;
  trackCourierShipment: string;
  fieldBuyerName: string;
  fieldCompany: string;
  fieldEmail: string;
  fieldPhone: string;
  fieldCountry: string;
  fieldProduct: string;
  fieldContainerVolume: string;
  fieldQuotedPrice: string;
  fieldStage: string;
  fieldIncoterm: string;
  fieldNextFollowUp: string;
  fieldSampleTracking: string;
  fieldAssignedAdmin: string;
  unassigned: string;
  fieldInternalNotes: string;
  notesPlaceholder: string;
  savingBtn: string;
  saveChangesBtn: string;
  savedMsg: string;
  quickReplyTitle: (email: string) => string;
  fullComposerLink: string;
  emailSubjectPlaceholder: string;
  autoAttachPdfQuote: string;
  sendingBtn: string;
  sendAndLogBtn: string;
  emailHistoryTitle: string;
  loadingHistory: string;
  noEmailsLogged: string;
  addLeadModalTitle: string;
  phContactName: string;
  phCompanyMill: string;
  phEmail: string;
  phPhoneWhatsapp: string;
  phCountry: string;
  phProductInterest: string;
  phContainerVolume: string;
  phQuotedPrice: string;
  phNotes: string;
  langEnOption: string;
  langZhOption: string;
  langArOption: string;
  srcWhatsapp: string;
  srcWechat: string;
  srcEmail: string;
  srcTradeShow: string;
  srcManual: string;
  cancelBtn: string;
  addingBtn: string;
  createLeadBtn: string;
  statuses: Record<LeadStatus, string>;
  // Suppliers Tab
  supKpiTotal: string;
  supKpiFactories: string;
  supKpiFarmers: string;
  supKpiTraders: string;
  supTypes: Record<SupplierType, string>;
  supTypesPlural: Record<SupplierType, string>;
  supSearchPlaceholder: string;
  supLoading: string;
  supNoMatch: string;
  supOutputLabel: string;
  supStockLabel: string;
  supPriceLabel: string;
  supMapsLink: string;
  supThName: string;
  supThType: string;
  supThContactActions: string;
  supThProductsStock: string;
  supThPriceRating: string;
  supThMap: string;
  supThNotes: string;
  supDrawerId: (id: number) => string;
  supDeleteConfirm: (name: string) => string;
  supFieldName: string;
  supFieldType: string;
  supFieldPhone: string;
  supFieldContact: string;
  supFieldRating: string;
  supFieldMaps: string;
  supFieldProducts: string;
  supFieldStock: string;
  supFieldPricePerTon: string;
  supFieldWorkers: string;
  supFieldDailyOutput: string;
  supFieldNotes: string;
  supAddModalTitle: string;
  supSaveBtn: string;
  // B2B Mail Composer
  mailLoading: string;
  mailTitle: string;
  mailSubtitle: (fromEmail: string) => string;
  mailAuthTitle: string;
  mailAuthSubtitle: string;
  mailOrViaCrm: string;
  mailBackToCrm: string;
  mailTemplatesTitle: string;
  mailClearBtn: string;
  mailToEmail: string;
  mailToName: string;
  mailCc: string;
  mailReplyTo: string;
  mailQuoteGenTitle: string;
  mailAttachPdfQuote: string;
  mailPrintView: string;
  mailSubject: string;
  mailMessage: string;
  mailLayoutBranded: string;
  mailLayoutPersonal: string;
  mailProviderAuto: string;
  mailIncludeSignature: string;
  mailAttachFile: string;
  mailPreviewBtn: string;
  mailHidePreviewBtn: string;
  mailSendBtn: string;
  mailSendingBtn: string;
  mailPreviewHeader: string;
  mailFromLabel: string;
}

export const ADMIN_TRANSLATIONS: Record<AdminLang, AdminTranslations> = {
  en: {
    dir: "ltr",
    langToggleLabel: "العربية",
    loadingCrm: "Loading Admin CRM...",
    loginTitle: "Egy Nile Flax CRM",
    loginSubtitle: "Admin Lead & Quotation Management",
    googleNotConfigured:
      "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment variables to enable Google Sign-In.",
    signInGoogle: "Sign in with Google",
    unauthorizedEmail:
      "Access denied: this Google account is not authorized for Egy Nile Flax CRM.",
    googleSignInError: "Google Sign-In did not complete. Please try again.",
    headerTitleShort: "Admin CRM",
    headerTitleFull: "Egy Nile Flax — Admin CRM",
    headerSubtitle: "Export Leads, Quotations & Mill Suppliers",
    signedInAs: "Signed in as",
    b2bMailBtn: "B2B Mail",
    addLeadBtn: "Add Lead",
    addSupplierBtn: "Add Supplier",
    importCsvBtn: "Import CSV",
    importingCsvBtn: "Importing...",
    exportCsvBtn: "Export CSV",
    signOutBtn: "Sign Out",
    tabLeads: "Buyers / Leads",
    tabSuppliers: "Suppliers & Mills",
    viewTable: "Table",
    viewKanban: "Kanban Board",
    dbMissingTitle: "Database not connected yet (DATABASE_URL missing)",
    dbMissingBody:
      "Add your Neon Postgres DATABASE_URL in .env.local and Vercel Environment Variables, then refresh—tables will be created automatically.",
    kpiTotalLeads: "Total Leads",
    kpiNewInquiries: "New Inquiries",
    kpiSampleQuoted: "Sample / Quoted",
    kpiWonDeals: "Won Deals",
    kpiFollowUpsDue: "Follow-ups Due",
    filterAll: "All",
    filterDue: "Due",
    searchLeadsPlaceholder: "Search buyer, company, country...",
    refreshTitle: "Refresh",
    loadingLeads: "Loading leads...",
    noLeadsMatch: "No leads match this filter yet.",
    generalInquiry: "General Inquiry",
    followUpLabel: "Follow-up",
    followUpDueBadge: "Follow-up Due",
    dropLeadHere: "Drop lead here",
    thBuyerCompany: "Buyer / Company",
    thQuickContact: "Quick Contact",
    thProductVolume: "Product & Volume",
    thQuoteTracking: "Quote / Tracking",
    thCountry: "Country",
    thStatus: "Status",
    thFollowUp: "Follow-Up",
    ownerLabel: "Owner",
    callBtn: "Call",
    whatsappBtn: "WhatsApp",
    pdfQuoteBtn: "PDF Quote",
    deleteLeadTitle: "Delete Lead",
    deleteLeadConfirm: (name) => `Delete lead for ${name}?`,
    sourceLabel: "Source",
    createdLabel: "Created",
    updatedByLabel: "Updated by",
    buyerInquiryMsg: "Buyer Inquiry Message",
    drawerSectionTitle: "Buyer Contact, Deal & Sample Tracking",
    trackCourierShipment: "Track Courier Shipment",
    fieldBuyerName: "Buyer Name",
    fieldCompany: "Company / Spinning Mill",
    fieldEmail: "Email",
    fieldPhone: "Phone / WhatsApp",
    fieldCountry: "Destination Country / Port",
    fieldProduct: "Flax Product / Grade",
    fieldContainerVolume: "Container / Volume",
    fieldQuotedPrice: "Quoted Price ($/MT)",
    fieldStage: "Stage",
    fieldIncoterm: "Incoterm",
    fieldNextFollowUp: "Next Follow-Up",
    fieldSampleTracking: "Sample Courier Tracking #",
    fieldAssignedAdmin: "Assigned Admin",
    unassigned: "Unassigned",
    fieldInternalNotes: "Internal Notes",
    notesPlaceholder: "Buyer lab requirements, target staple length, payment terms...",
    savingBtn: "Saving...",
    saveChangesBtn: "Save Changes",
    savedMsg: "Saved!",
    quickReplyTitle: (email) => `Send B2B Email / Quote to ${email}`,
    fullComposerLink: "Full Composer",
    emailSubjectPlaceholder: "Email Subject",
    autoAttachPdfQuote: "Auto-attach Official PDF Quotation",
    sendingBtn: "Sending...",
    sendAndLogBtn: "Send & Log Email",
    emailHistoryTitle: "Email History",
    loadingHistory: "Loading history...",
    noEmailsLogged: "No emails logged for this buyer yet.",
    addLeadModalTitle: "Add B2B Lead",
    phContactName: "Contact Name *",
    phCompanyMill: "Company / Mill",
    phEmail: "Email *",
    phPhoneWhatsapp: "Phone / WhatsApp",
    phCountry: "Country",
    phProductInterest: "Product of Interest",
    phContainerVolume: "Container / Volume (e.g. 24 MT)",
    phQuotedPrice: "Quoted Price (e.g. $2,450/MT)",
    phNotes: "Notes...",
    langEnOption: "Language: English (EN)",
    langZhOption: "Language: Chinese (中文)",
    langArOption: "Language: Arabic (AR)",
    srcWhatsapp: "WhatsApp",
    srcWechat: "WeChat",
    srcEmail: "Direct Email",
    srcTradeShow: "Trade Show",
    srcManual: "Manual Entry",
    cancelBtn: "Cancel",
    addingBtn: "Adding...",
    createLeadBtn: "Create Lead",
    statuses: {
      new: "New",
      contacted: "Contacted",
      sample_sent: "Sample Sent",
      quoted: "Quoted",
      won: "Won",
      lost: "Lost",
    },
    supKpiTotal: "Total Suppliers",
    supKpiFactories: "Factories",
    supKpiFarmers: "Farmers",
    supKpiTraders: "Traders",
    supTypes: {
      factory: "Factory",
      farmer: "Farmer",
      trader: "Trader",
    },
    supTypesPlural: {
      factory: "Factories",
      farmer: "Farmers",
      trader: "Traders",
    },
    supSearchPlaceholder: "Search mill, phone, product...",
    supLoading: "Loading suppliers...",
    supNoMatch: "No suppliers match this filter.",
    supOutputLabel: "Output",
    supStockLabel: "Stock",
    supPriceLabel: "Price",
    supMapsLink: "Maps",
    supThName: "Factory / Farmer",
    supThType: "Type",
    supThContactActions: "Contact & Actions",
    supThProductsStock: "Products & Stock",
    supThPriceRating: "Price / Rating",
    supThMap: "Map",
    supThNotes: "Notes",
    supDrawerId: (id) => `Supplier #${id}`,
    supDeleteConfirm: (name) => `Delete supplier "${name}"?`,
    supFieldName: "Factory / Farmer Name",
    supFieldType: "Type",
    supFieldPhone: "Phone",
    supFieldContact: "Contact Person / Owner",
    supFieldRating: "Quality Rating (1–5)",
    supFieldMaps: "Google Maps Link or Coordinates",
    supFieldProducts: "Products",
    supFieldStock: "Current Stock (MT)",
    supFieldPricePerTon: "Price per Ton (EGP / USD)",
    supFieldWorkers: "Workers / Shifts",
    supFieldDailyOutput: "Daily Output",
    supFieldNotes: "Price & Inspection Notes",
    supAddModalTitle: "Add Supplier / Mill",
    supSaveBtn: "Save Supplier",
    mailLoading: "Loading B2B Mail Sender...",
    mailTitle: "Egy Nile Flax — B2B Mail Sender",
    mailSubtitle: (fromEmail) => `Sending from ${fromEmail}`,
    mailAuthTitle: "B2B Mail Sender",
    mailAuthSubtitle: "Sign in with an authorized Egy Nile Flax Google account",
    mailOrViaCrm: "Or sign in via Admin CRM",
    mailBackToCrm: "Admin CRM",
    mailTemplatesTitle: "Quick B2B Templates (EN / 中文 / AR)",
    mailClearBtn: "Clear",
    mailToEmail: "To Email *",
    mailToName: "Recipient / Company Name",
    mailCc: "CC (optional, comma-separated)",
    mailReplyTo: "Reply-To Email",
    mailQuoteGenTitle: "Official Proforma Quote Generator (Optional PDF Attachment)",
    mailAttachPdfQuote: "Attach PDF Quote",
    mailPrintView: "Print / View",
    mailSubject: "Subject *",
    mailMessage: "Message *",
    mailLayoutBranded: "Branded Card",
    mailLayoutPersonal: "Primary Inbox (Clean)",
    mailProviderAuto: "Auto",
    mailIncludeSignature: "Include Factory Signature",
    mailAttachFile: "Attach PDF / File (max 3)",
    mailPreviewBtn: "Preview Email",
    mailHidePreviewBtn: "Hide Preview",
    mailSendBtn: "Send B2B Email",
    mailSendingBtn: "Sending...",
    mailPreviewHeader: "Live Branded Email Preview",
    mailFromLabel: "From:",
  },
  ar: {
    dir: "rtl",
    langToggleLabel: "English",
    loadingCrm: "جاري تحميل لوحة إدارة العملاء...",
    loginTitle: "إدارة عملاء إيجي نايل فلاكس",
    loginSubtitle: "نظام متابعة العملاء وعروض الأسعار والموردين",
    googleNotConfigured:
      "قم بإعداد GOOGLE_CLIENT_ID و GOOGLE_CLIENT_SECRET في متغيرات البيئة لتفعيل تسجيل الدخول عبر جوجل.",
    signInGoogle: "تسجيل الدخول عبر جوجل",
    unauthorizedEmail: "تم رفض الوصول: هذا الحساب غير مصرح له بالدخول إلى لوحة الإدارة.",
    googleSignInError: "لم يكتمل تسجيل الدخول عبر جوجل. يرجى المحاولة مرة أخرى.",
    headerTitleShort: "إدارة CRM",
    headerTitleFull: "إيجي نايل فلاكس — لوحة الإدارة",
    headerSubtitle: "إدارة عملاء التصدير وعروض الأسعار والمصانع الموردة",
    signedInAs: "مسجل الدخول:",
    b2bMailBtn: "بريد B2B",
    addLeadBtn: "إضافة عميل",
    addSupplierBtn: "إضافة مورد",
    importCsvBtn: "استيراد CSV",
    importingCsvBtn: "جاري الاستيراد...",
    exportCsvBtn: "تصدير CSV",
    signOutBtn: "تسجيل الخروج",
    tabLeads: "العملاء والمشترون",
    tabSuppliers: "المصانع والموردون",
    viewTable: "جدول",
    viewKanban: "لوحة المراحل (كانبان)",
    dbMissingTitle: "قاعدة البيانات غير متصلة بعد (DATABASE_URL غير موجود)",
    dbMissingBody:
      "أضف رابط Neon Postgres DATABASE_URL في ملف .env.local وإعدادات Vercel ثم أعد تحميل الصفحة.",
    kpiTotalLeads: "إجمالي العملاء",
    kpiNewInquiries: "طلبات جديدة",
    kpiSampleQuoted: "عينات / عروض أسعار",
    kpiWonDeals: "صفقات ناجحة",
    kpiFollowUpsDue: "متابعات مستحقة",
    filterAll: "الكل",
    filterDue: "مستحق",
    searchLeadsPlaceholder: "ابحث بالاسم أو الشركة أو الدولة...",
    refreshTitle: "تحديث",
    loadingLeads: "جاري تحميل العملاء...",
    noLeadsMatch: "لا يوجد عملاء مطابقون لهذا الفلتر.",
    generalInquiry: "استفسار عام",
    followUpLabel: "متابعة",
    followUpDueBadge: "متابعة مستحقة",
    dropLeadHere: "اسحب العميل هنا",
    thBuyerCompany: "المشتري / الشركة",
    thQuickContact: "تواصل سريع",
    thProductVolume: "المنتج والكمية",
    thQuoteTracking: "السعر / التتبع",
    thCountry: "الدولة",
    thStatus: "المرحلة",
    thFollowUp: "المتابعة",
    ownerLabel: "المسؤول",
    callBtn: "اتصال",
    whatsappBtn: "واتساب",
    pdfQuoteBtn: "عرض سعر PDF",
    deleteLeadTitle: "حذف العميل",
    deleteLeadConfirm: (name) => `هل تريد حذف بيانات العميل ${name}؟`,
    sourceLabel: "المصدر",
    createdLabel: "تاريخ الإضافة",
    updatedByLabel: "آخر تحديث بواسطة",
    buyerInquiryMsg: "رسالة استفسار العميل",
    drawerSectionTitle: "بيانات العميل والصفقة وتتبع العينات",
    trackCourierShipment: "تتبع شحنة العينات",
    fieldBuyerName: "اسم المشتري",
    fieldCompany: "الشركة / المصنع",
    fieldEmail: "البريد الإلكتروني",
    fieldPhone: "الهاتف / واتساب",
    fieldCountry: "دولة / ميناء الوصول",
    fieldProduct: "صنف / درجة الكتان",
    fieldContainerVolume: "الكمية / عدد الحاويات",
    fieldQuotedPrice: "السعر المعروض ($/طن)",
    fieldStage: "المرحلة",
    fieldIncoterm: "شروط التسليم (Incoterm)",
    fieldNextFollowUp: "موعد المتابعة القادم",
    fieldSampleTracking: "رقم تتبع شحنة العينات",
    fieldAssignedAdmin: "المسؤول عن العميل",
    unassigned: "غير معين",
    fieldInternalNotes: "ملاحظات داخلية",
    notesPlaceholder: "متطلبات المعمل، طول التيلة المطلوب، شروط الدفع...",
    savingBtn: "جاري الحفظ...",
    saveChangesBtn: "حفظ التعديلات",
    savedMsg: "تم الحفظ!",
    quickReplyTitle: (email) => `إرسال بريد / عرض سعر إلى ${email}`,
    fullComposerLink: "المحرر الكامل",
    emailSubjectPlaceholder: "عنوان الرسالة",
    autoAttachPdfQuote: "إرفاق عرض سعر PDF رسمي تلقائياً",
    sendingBtn: "جاري الإرسال...",
    sendAndLogBtn: "إرسال وتسجيل البريد",
    emailHistoryTitle: "سجل الرسائل المرسلة",
    loadingHistory: "جاري تحميل السجل...",
    noEmailsLogged: "لم يتم إرسال رسائل لهذا العميل بعد.",
    addLeadModalTitle: "إضافة عميل جديد (B2B)",
    phContactName: "اسم المسؤول *",
    phCompanyMill: "الشركة / المصنع",
    phEmail: "البريد الإلكتروني *",
    phPhoneWhatsapp: "الهاتف / واتساب",
    phCountry: "الدولة",
    phProductInterest: "المنتج المطلوب",
    phContainerVolume: "الكمية / الحاويات (مثال: 24 طن)",
    phQuotedPrice: "السعر المعروض (مثال: $2,450/طن)",
    phNotes: "ملاحظات...",
    langEnOption: "اللغة: الإنجليزية (EN)",
    langZhOption: "اللغة: الصينية (中文)",
    langArOption: "اللغة: العربية (AR)",
    srcWhatsapp: "واتساب",
    srcWechat: "وي شات (WeChat)",
    srcEmail: "بريد مباشر",
    srcTradeShow: "معرض تجاري",
    srcManual: "إدخال يدوي",
    cancelBtn: "إلغاء",
    addingBtn: "جاري الإضافة...",
    createLeadBtn: "حفظ العميل",
    statuses: {
      new: "جديد",
      contacted: "تم التواصل",
      sample_sent: "تم إرسال عينة",
      quoted: "تم تقديم عرض سعر",
      won: "تمت الصفقة",
      lost: "ملغي / خسارة",
    },
    supKpiTotal: "إجمالي الموردين",
    supKpiFactories: "المصانع",
    supKpiFarmers: "المزارعون",
    supKpiTraders: "التجار",
    supTypes: {
      factory: "مصنع",
      farmer: "مزارع",
      trader: "تاجر",
    },
    supTypesPlural: {
      factory: "المصانع",
      farmer: "المزارعون",
      trader: "التجار",
    },
    supSearchPlaceholder: "ابحث بالمصنع أو الهاتف أو المنتج...",
    supLoading: "جاري تحميل الموردين...",
    supNoMatch: "لا يوجد موردون مطابقون لهذا الفلتر.",
    supOutputLabel: "الإنتاج",
    supStockLabel: "المخزون",
    supPriceLabel: "السعر",
    supMapsLink: "الخريطة",
    supThName: "المصنع / المزارع",
    supThType: "النوع",
    supThContactActions: "التواصل والإجراءات",
    supThProductsStock: "المنتجات والمخزون",
    supThPriceRating: "السعر والتقييم",
    supThMap: "الموقع",
    supThNotes: "ملاحظات",
    supDrawerId: (id) => `مورد رقم #${id}`,
    supDeleteConfirm: (name) => `هل تريد حذف المورد "${name}"؟`,
    supFieldName: "اسم المصنع / المزارع",
    supFieldType: "النوع",
    supFieldPhone: "رقم الهاتف",
    supFieldContact: "المسؤول / المالك",
    supFieldRating: "تقييم الجودة (1–5)",
    supFieldMaps: "رابط خرائط جوجل أو الإحداثيات",
    supFieldProducts: "المنتجات",
    supFieldStock: "المخزون الحالي (طن)",
    supFieldPricePerTon: "السعر للطن (جنيه / دولار)",
    supFieldWorkers: "العمالة / الورديات",
    supFieldDailyOutput: "الإنتاج اليومي",
    supFieldNotes: "ملاحظات الأسعار والفحص",
    supAddModalTitle: "إضافة مورد / مصنع",
    supSaveBtn: "حفظ المورد",
    mailLoading: "جاري تحميل محرر البريد...",
    mailTitle: "إيجي نايل فلاكس — مرسل بريد B2B",
    mailSubtitle: (fromEmail) => `الإرسال من ${fromEmail}`,
    mailAuthTitle: "مرسل بريد B2B",
    mailAuthSubtitle: "قم بتسجيل الدخول بحساب جوجل المصرح له",
    mailOrViaCrm: "أو سجل الدخول عبر لوحة الإدارة",
    mailBackToCrm: "لوحة الإدارة",
    mailTemplatesTitle: "قوالب رسائل سريعة (EN / 中文 / AR)",
    mailClearBtn: "مسح",
    mailToEmail: "البريد المرسل إليه *",
    mailToName: "اسم المستلم / الشركة",
    mailCc: "نسخة CC (اختياري، مفصول بفاصلة)",
    mailReplyTo: "بريد الرد (Reply-To)",
    mailQuoteGenTitle: "منشئ عرض السعر الرسمي (إرفاق PDF اختياري)",
    mailAttachPdfQuote: "إرفاق عرض سعر PDF",
    mailPrintView: "طباعة / معاينة",
    mailSubject: "عنوان الرسالة *",
    mailMessage: "نص الرسالة *",
    mailLayoutBranded: "قالب الشركة",
    mailLayoutPersonal: "نص بسيط (Inbox)",
    mailProviderAuto: "تلقائي",
    mailIncludeSignature: "تضمين توقيع المصنع",
    mailAttachFile: "إرفاق ملف / PDF (بحد أقصى 3)",
    mailPreviewBtn: "معاينة البريد",
    mailHidePreviewBtn: "إخفاء المعاينة",
    mailSendBtn: "إرسال البريد",
    mailSendingBtn: "جاري الإرسال...",
    mailPreviewHeader: "معاينة حية للبريد",
    mailFromLabel: "من:",
  },
};
