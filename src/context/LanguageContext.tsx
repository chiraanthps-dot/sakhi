"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

type TranslationKey =
  | "nav_home"
  | "nav_understand"
  | "nav_tracker"
  | "nav_about"
  | "nav_quiz"
  | "nav_signin"
  | "nav_profile"
  | "hero_badge"
  | "hero_title_1"
  | "hero_title_2"
  | "hero_subtitle"
  | "btn_check_risk"
  | "btn_learn_pcos"
  | "stat_1"
  | "stat_2"
  | "footer_copy"
  | "footer_about"
  | "footer_links"
  | "footer_resources"
  | "footer_terms"
  | "footer_privacy";

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    nav_home: "Home",
    nav_understand: "Understand",
    nav_tracker: "Cycle Tracker",
    nav_about: "About Pi",
    nav_quiz: "Take the Quiz →",
    nav_signin: "Sign In",
    nav_profile: "👤 Profile",
    hero_badge: "🌿 Trusted by women, built with care",
    hero_title_1: "Your body speaks.",
    hero_title_2: "Let's learn to listen.",
    hero_subtitle: "Sakhi is your companion in understanding PCOS & PCOD. Take a research-based assessment, learn about your body, and discover what you can do — all in one place.",
    btn_check_risk: "Check Your Risk →",
    btn_learn_pcos: "Learn About PCOS",
    stat_1: "💜 1 in 10 women affected",
    stat_2: "✨ Early awareness helps",
    footer_copy: "© 2026 Pi. All rights reserved.",
    footer_about: "About Pi",
    footer_links: "Quick Links",
    footer_resources: "Resources",
    footer_terms: "Terms of Service",
    footer_privacy: "Privacy Policy",
  },
  hi: {
    nav_home: "मुख्य पृष्ठ",
    nav_understand: "समझें",
    nav_tracker: "मासिक धर्म ट्रैकर",
    nav_about: "टीम के बारे में",
    nav_quiz: "प्रश्नावली लें →",
    nav_signin: "लॉग इन करें",
    nav_profile: "👤 प्रोफ़ाइल",
    hero_badge: "🌿 महिलाओं द्वारा विश्वसनीय, देखभाल के साथ निर्मित",
    hero_title_1: "आपका शरीर बोलता है।",
    hero_title_2: "आइए सुनना सीखें।",
    hero_subtitle: "सखी PCOS और PCOD को समझने में आपकी साथी है। अनुसंधान-आधारित मूल्यांकन लें, अपने शरीर के बारे में जानें, और जानें कि आप क्या कर सकती हैं — सब एक ही स्थान पर।",
    btn_check_risk: "अपना जोखिम जांचें →",
    btn_learn_pcos: "PCOS के बारे में जानें",
    stat_1: "💜 10 में से 1 महिला प्रभावित",
    stat_2: "✨ समय पर जागरूकता मदद करती है",
    footer_copy: "© 2026 Pi. सर्वाधिकार सुरक्षित।",
    footer_about: "Pi के बारे में",
    footer_links: "त्वरित लिंक्स",
    footer_resources: "संसाधन",
    footer_terms: "सेवा की शर्तें",
    footer_privacy: "गोपनीयता नीति",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("sakhi-language") as Language;
    if (saved === "en" || saved === "hi") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("sakhi-language", lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
