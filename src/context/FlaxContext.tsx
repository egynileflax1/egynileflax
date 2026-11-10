"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  LanguageCode,
  ProductItem,
  ClientOrder,
  QuoteInquiry,
  CompanySettings,
  INITIAL_PRODUCTS,
  INITIAL_CLIENT_ORDERS,
  INITIAL_INQUIRIES,
  DEFAULT_COMPANY_SETTINGS,
} from "@/data/initialData";
import { TRANSLATIONS, UITranslations } from "@/data/translations";

export type ActiveView = "showcase" | "portal" | "admin";

interface FlaxContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: UITranslations;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedPortalCode: string;
  openPortalWithCode: (code?: string) => void;
  products: ProductItem[];
  addProduct: (product: ProductItem) => void;
  updateProduct: (product: ProductItem) => void;
  deleteProduct: (id: string) => void;
  orders: ClientOrder[];
  addOrder: (order: ClientOrder) => void;
  updateOrder: (order: ClientOrder) => void;
  deleteOrder: (id: string) => void;
  inquiries: QuoteInquiry[];
  addInquiry: (inquiry: Omit<QuoteInquiry, "id" | "createdAt" | "status">) => QuoteInquiry;
  updateInquiryStatus: (id: string, status: QuoteInquiry["status"]) => void;
  company: CompanySettings;
  updateCompany: (settings: CompanySettings) => void;
  resetAllToDefaults: () => void;
  preselectedProductForQuote: string;
  setPreselectedProductForQuote: (productName: string) => void;
}

const FlaxContext = createContext<FlaxContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: "egynileflax_lang_v1",
  PRODUCTS: "egynileflax_products_v1",
  ORDERS: "egynileflax_orders_v1",
  INQUIRIES: "egynileflax_inquiries_v1",
  COMPANY: "egynileflax_company_v1",
};

export function FlaxProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("en");
  const [activeView, setActiveView] = useState<ActiveView>("showcase");
  const [selectedPortalCode, setSelectedPortalCode] = useState<string>("ENF-2026-8841");
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<ClientOrder[]>(INITIAL_CLIENT_ORDERS);
  const [inquiries, setInquiries] = useState<QuoteInquiry[]>(INITIAL_INQUIRIES);
  const [company, setCompany] = useState<CompanySettings>(DEFAULT_COMPANY_SETTINGS);
  const [preselectedProductForQuote, setPreselectedProductForQuote] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEYS.LANG) as LanguageCode | null;
      if (savedLang && TRANSLATIONS[savedLang]) {
        setLangState(savedLang);
      }
      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

      const savedCompany = localStorage.getItem(STORAGE_KEYS.COMPANY);
      if (savedCompany) setCompany(JSON.parse(savedCompany));
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
      document.documentElement.dir = TRANSLATIONS[lang].dir;
      document.documentElement.lang = lang;
    } catch (e) {
      console.error(e);
    }
  }, [lang, hydrated]);

  const setLang = (newLang: LanguageCode) => {
    setLangState(newLang);
  };

  const openPortalWithCode = (code?: string) => {
    if (code) setSelectedPortalCode(code);
    setActiveView("portal");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addProduct = (product: ProductItem) => {
    const next = [product, ...products];
    setProducts(next);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
  };

  const updateProduct = (updated: ProductItem) => {
    const next = products.map((p) => (p.id === updated.id ? updated : p));
    setProducts(next);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
  };

  const deleteProduct = (id: string) => {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
  };

  const addOrder = (order: ClientOrder) => {
    const next = [order, ...orders];
    setOrders(next);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(next));
  };

  const updateOrder = (updated: ClientOrder) => {
    const next = orders.map((o) => (o.id === updated.id ? updated : o));
    setOrders(next);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(next));
  };

  const deleteOrder = (id: string) => {
    const next = orders.filter((o) => o.id !== id);
    setOrders(next);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(next));
  };

  const addInquiry = (
    input: Omit<QuoteInquiry, "id" | "createdAt" | "status">
  ): QuoteInquiry => {
    const newInquiry: QuoteInquiry = {
      ...input,
      id: `ENF-RFQ-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "New",
    };
    const next = [newInquiry, ...inquiries];
    setInquiries(next);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(next));
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: QuoteInquiry["status"]) => {
    const next = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    setInquiries(next);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(next));
  };

  const updateCompany = (settings: CompanySettings) => {
    setCompany(settings);
    localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(settings));
  };

  const resetAllToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_CLIENT_ORDERS);
    setInquiries(INITIAL_INQUIRIES);
    setCompany(DEFAULT_COMPANY_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.COMPANY);
  };

  return (
    <FlaxContext.Provider
      value={{
        lang,
        setLang,
        t: TRANSLATIONS[lang],
        activeView,
        setActiveView,
        selectedPortalCode,
        openPortalWithCode,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        addOrder,
        updateOrder,
        deleteOrder,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        company,
        updateCompany,
        resetAllToDefaults,
        preselectedProductForQuote,
        setPreselectedProductForQuote,
      }}
    >
      {children}
    </FlaxContext.Provider>
  );
}

export function useFlax() {
  const ctx = useContext(FlaxContext);
  if (!ctx) throw new Error("useFlax must be used within a FlaxProvider");
  return ctx;
}

