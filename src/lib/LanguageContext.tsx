/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, TranslationKey } from "./translations";

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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("aaa_lang");
    if (saved === "hi" || saved === "mr" || saved === "en") {
      return saved as Language;
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("aaa_lang", lang);
  };

  const formatNumberWrapped = (num: number | string): string => {
    return formatNumber(num, language);
  };

  const t = (key: TranslationKey): string => {
    const translationSet = translations[language] || translations["en"];
    const text = translationSet[key] || translations["en"][key] || String(key);
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
