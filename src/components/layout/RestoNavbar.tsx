'use client';

// =============================================================================
// RestoChain OS - Enterprise Multi-Branch Top Navigation Bar
// Zero childish emojis, 100% sharp SVG icons, pristine typography & responsiveness
// =============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRestoStore } from '@/lib/store/restochain-store';
import {
  IconStore,
  IconPos,
  IconKitchen,
  IconInventory,
  IconReceipt,
  IconMotorcycle,
  IconChevronDown,
  IconClock,
  IconTrendingUp,
} from '@/components/icons/RestoIcons';

export function RestoNavbar() {
  const pathname = usePathname();
  const { state, switchBranch, activeBranch } = useRestoStore();
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
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
    { href: '/', label: 'القيادة المركزية HQ', icon: IconTrendingUp },
    { href: '/pos', label: 'نقطة البيع POS', icon: IconPos },
    { href: '/kds', label: 'شاشة المطبخ KDS', icon: IconKitchen, badge: state.orders.filter(o => o.status === 'PREPARING' && o.branchId === state.activeBranchId).length },
    { href: '/inventory', label: 'المخزون والتكاليف', icon: IconInventory },
    { href: '/shifts', label: 'الورديات وتقرير Z', icon: IconReceipt },
    { href: '/delivery', label: 'أسطول التوصيل', icon: IconMotorcycle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0c121e]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      
      {/* Top Enterprise Ticker Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              نظام المزامنة السحابي نشط
            </span>
            <span className="hidden sm:inline text-slate-400">
              شبكة الفروع: 4 فروع متصلة بالزمن الفعلي • الدقة المالية 100%
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline text-slate-400">
              الوردية النشطة: <strong className="text-white">الغداء (Shift #104)</strong>
            </span>
            <span className="text-amber-400 font-bold">
              مبيعات اليوم: {activeBranch ? `${activeBranch.dailyRevenue.toFixed(3)} د.ت` : '0.000 د.ت'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-700 via-rose-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30 group-hover:scale-105 transition-transform">
              <IconStore className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-start">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-rose-600 dark:text-rose-400 font-sans">
                  ريستو تشين
                </span>
                <span className="text-xs font-black uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                  OS v3.4
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                إدارة سلاسل المطاعم ونقاط البيع السحابية
              </span>
            </div>
          </Link>

          {/* Multi-Branch Switcher */}
          <div className="relative">
            <button
              onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
            >
              <IconStore className="w-3.5 h-3.5 text-rose-600" />
              <span>{activeBranch ? activeBranch.name : 'اختر الفرع'}</span>
              <IconChevronDown className="w-3.5 h-3.5 text-rose-500" />
            </button>

            {branchDropdownOpen && (
              <div className="absolute top-full mt-2 start-0 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  تبديل الفرع المباشر (Multi-Location)
                </div>
                {state.branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      switchBranch(b.id);
                      setBranchDropdownOpen(false);
                    }}
                    className={`w-full text-start p-2.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                      b.id === state.activeBranchId
                        ? 'bg-rose-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{b.name}</div>
                      <div className={`text-[10px] ${b.id === state.activeBranchId ? 'text-rose-100' : 'text-slate-400'}`}>
                        {b.address}
                      </div>
                    </div>
                    <span className="font-mono text-[11px] font-bold">
                      {b.dailyRevenue.toFixed(0)} د.ت
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions & Utilities */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              title="تبديل النمط المظلم"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="القائمة"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-800 space-y-1 bg-white dark:bg-[#0c121e]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  pathname === link.href
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
