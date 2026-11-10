'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { IconStore, IconCheckCircle } from '@/components/icons/RestoIcons';

export function RestoFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e] text-slate-600 dark:text-slate-400 py-8 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
            <IconStore className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white">RestoChain OS Enterprise</span>
            <span className="mx-2">•</span>
            <span>{t.footerDesc}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[11px] font-mono">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <IconCheckCircle className="w-3.5 h-3.5" />
            {t.fiscalCompliance}
          </span>
          <span>{t.taxIdLabel}</span>
          <span>© 2026 RestoChain Technologies</span>
        </div>
      </div>
    </footer>
  );
}
