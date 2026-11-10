'use client';

// =============================================================================
// RestoChain OS — Dynamic Language Context & Direction Synchronizer
// Handles Arabic (RTL), French (LTR) and English (LTR) with persistent state
// =============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Translations, TRANSLATIONS } from '../i18n/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
  dir: 'rtl' | 'ltr';
}

const STORAGE_KEY = 'restochain_locale_preference';

const LanguageContext = createContext<LanguageContextType>({
  locale: 'ar',
  setLocale: () => {},
  toggleLocale: () => {},
  t: TRANSLATIONS.ar,
  dir: 'rtl',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && (saved === 'ar' || saved === 'fr' || saved === 'en')) {
        setLocaleState(saved);
        updateDocumentAttributes(saved);
      } else {
        updateDocumentAttributes('ar');
      }
    } catch {
      updateDocumentAttributes('ar');
    }
  }, []);

  const updateDocumentAttributes = (loc: Locale) => {
    if (typeof document === 'undefined') return;
    const isRtl = loc === 'ar';
    document.documentElement.lang = loc;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    updateDocumentAttributes(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {}
  };

  const toggleLocale = () => {
    const sequence: Locale[] = ['ar', 'fr', 'en'];
    const nextIdx = (sequence.indexOf(locale) + 1) % sequence.length;
    setLocale(sequence[nextIdx]);
  };

  const value: LanguageContextType = {
    locale,
    setLocale,
    toggleLocale,
    t: TRANSLATIONS[locale] || TRANSLATIONS.ar,
    dir: locale === 'ar' ? 'rtl' : 'ltr',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
