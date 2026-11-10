'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

export function RestoFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-neutral-200/50 dark:border-white/5 py-8 px-4 sm:px-6 lg:px-8 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px]">
        <div>
          <span className="font-bold text-neutral-700 dark:text-neutral-300">RestoChain OS</span>
          <span className="mx-2">•</span>
          <span>{t.footerDesc}</span>
        </div>

        <div className="flex items-center gap-6">
          <span>{t.fiscalCompliance}</span>
          <span>{t.taxIdLabel}</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
