'use client';

// =============================================================================
// RestoChain OS — Minimalist Luxury Navigation Bar
// Zero loud borders, unified harmonious palette, breathable negative space
// =============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Locale } from '@/lib/i18n/translations';
import { soundFx } from '@/lib/utils/audio';
import {
  IconStore,
  IconPos,
  IconKitchen,
  IconInventory,
  IconReceipt,
  IconMotorcycle,
  IconChevronDown,
  IconTrendingUp,
} from '@/components/icons/RestoIcons';

export function RestoNavbar() {
  const pathname = usePathname();
  const { state, switchBranch, activeBranch } = useRestoStore();
  const { locale, setLocale, t } = useLanguage();

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { href: '/', label: t.navHq, icon: IconTrendingUp },
    { href: '/pos', label: t.navPos, icon: IconPos },
    {
      href: '/kds',
      label: t.navKds,
      icon: IconKitchen,
      badge: state.orders.filter(
        (o) => o.status === 'PREPARING' && o.branchId === state.activeBranchId
      ).length,
    },
    { href: '/inventory', label: t.navInventory, icon: IconInventory },
    { href: '/shifts', label: t.navShifts, icon: IconReceipt },
    { href: '/delivery', label: t.navDelivery, icon: IconMotorcycle },
  ];

  const languages: { code: Locale; label: string }[] = [
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ];

  const branchDisplayName = locale === 'ar' ? activeBranch?.name : activeBranch?.nameFr || activeBranch?.name;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0c0e14]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              onClick={() => soundFx.playClick()}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold">
                <IconStore className="w-4 h-4" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold tracking-tight text-neutral-900 dark:text-white text-sm">
                  {t.brandTitle}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">OS</span>
              </div>
            </Link>

            {/* Seamless Branch Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{branchDisplayName}</span>
                <IconChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {branchDropdownOpen && (
                <div className="absolute top-full mt-1.5 start-0 w-64 bg-white dark:bg-[#141720] rounded-xl shadow-xl border border-neutral-200/70 dark:border-white/10 p-1.5 z-50 space-y-0.5">
                  {state.branches.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        soundFx.playClick();
                        switchBranch(b.id);
                        setBranchDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        b.id === state.activeBranchId
                          ? 'bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white font-bold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{locale === 'ar' ? b.name : b.nameFr || b.name}</span>
                      <span className="font-mono text-[10px] text-neutral-400">
                        {b.dailyRevenue.toFixed(0)} {t.currency}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => soundFx.playClick()}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 relative ${
                    isActive
                      ? 'text-neutral-900 dark:text-white font-semibold bg-neutral-100 dark:bg-white/10'
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-70" />
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-2">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white uppercase transition-colors"
              >
                {locale}
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full mt-1.5 end-0 w-32 bg-white dark:bg-[#141720] rounded-xl shadow-xl border border-neutral-200/70 dark:border-white/10 p-1 z-50 space-y-0.5">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        soundFx.playClick();
                        setLocale(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-start px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        locale === l.code
                          ? 'bg-neutral-100 dark:bg-white/10 font-bold text-neutral-900 dark:text-white'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-neutral-100 dark:border-white/5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
                  pathname === link.href
                    ? 'bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white font-bold'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
