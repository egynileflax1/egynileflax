"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  LanguageCode,
  ProductItem,
  CompanyInfo,
  PRODUCTS,
  COMPANY,
} from "@/data/initialData";
import { TRANSLATIONS, UITranslations } from "@/data/translations";

interface FlaxContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: UITranslations;
  products: ProductItem[];
  company: CompanyInfo;
}

const FlaxContext = createContext<FlaxContextType | undefined>(undefined);

const LANG_STORAGE_KEY = "egynileflax_lang_v1";

export function FlaxProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>("en");
  const [hydrated, setHydrated] = useState(false);

  // Restore the visitor's last chosen language
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as LanguageCode | null;
      if (savedLang && TRANSLATIONS[savedLang]) setLang(savedLang);
    } catch (e) {
      console.error("Failed to read language preference", e);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // storage unavailable (private mode etc.) - ignore
    }
    document.documentElement.dir = TRANSLATIONS[lang].dir;
    document.documentElement.lang = lang;
  }, [lang, hydrated]);

  return (
    <FlaxContext.Provider
      value={{
        lang,
        setLang,
        t: TRANSLATIONS[lang],
        products: PRODUCTS,
        company: COMPANY,
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
