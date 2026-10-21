/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, TranslationKey, en } from "./translations";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  formatNumber: (num: number | string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export const formatNumber = (num: number | string, lang: Language): string => {
  const str = String(num);
  if (lang === "en") return str;
  return str.replace(/[0-9]/g, (digit) => devanagariDigits[parseInt(digit, 10)]);
};

// In-memory cache for loaded language dictionaries. English is bundled by default.
const translationsCache: Record<Language, Partial<Record<TranslationKey, string>>> = {
  en: en,
  hi: {},
  mr: {},
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("aaa_lang");
      if (saved === "hi" || saved === "mr" || saved === "en") {
        return saved as Language;
      }
    } catch {
      // Fallback
    }
    return "en";
  });

  const [, setVersion] = useState(0);

  useEffect(() => {
    if (language === "hi" && Object.keys(translationsCache.hi).length === 0) {
      import("./locales/hi").then((mod) => {
        translationsCache.hi = mod.default || mod.hi;
        setVersion((v) => v + 1);
      });
    } else if (language === "mr" && Object.keys(translationsCache.mr).length === 0) {
      import("./locales/mr").then((mod) => {
        translationsCache.mr = mod.default || mod.mr;
        setVersion((v) => v + 1);
      });
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("aaa_lang", lang);
    } catch {
      // Fallback
    }
    if (lang === "hi" && Object.keys(translationsCache.hi).length === 0) {
      import("./locales/hi").then((mod) => {
        translationsCache.hi = mod.default || mod.hi;
        setVersion((v) => v + 1);
      });
    } else if (lang === "mr" && Object.keys(translationsCache.mr).length === 0) {
      import("./locales/mr").then((mod) => {
        translationsCache.mr = mod.default || mod.mr;
        setVersion((v) => v + 1);
      });
    }
  };

  const formatNumberWrapped = (num: number | string): string => {
    return formatNumber(num, language);
  };

  const t = (key: TranslationKey): string => {
    const activeDict = translationsCache[language];
    const text = (activeDict && activeDict[key]) || translationsCache.en[key] || String(key);
    return formatNumber(text, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatNumber: formatNumberWrapped }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
