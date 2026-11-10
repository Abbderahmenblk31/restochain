'use client';

// =============================================================================
// RestoChain OS — Minimalist Luxury HQ Operations Command
// Harmonious monochromatic palette, breathable negative space, seamless elevated surfaces
// =============================================================================

import React from 'react';
import Link from 'next/link';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { soundFx } from '@/lib/utils/audio';
import {
  IconPos,
  IconKitchen,
  IconInventory,
  IconReceipt,
  IconTrendingUp,
} from '@/components/icons/RestoIcons';

export default function RestoChainHqPage() {
  const { state, switchBranch } = useRestoStore();
  const { locale, t } = useLanguage();

  const totalChainRevenue = state.branches.reduce((acc, b) => acc + b.dailyRevenue, 0);
  const totalChainOrders = state.branches.reduce((acc, b) => acc + b.activeOrdersCount, 0);
  const occupiedTables = state.tables.filter((t) => t.status === 'OCCUPIED' || t.status === 'BILL_REQUESTED').length;
  const occupancyRate = Math.round((occupiedTables / state.tables.length) * 100);

  const topDishes = [
    { name: 'Black Angus Truffle Burger', nameAr: 'برغر الكمأة واللحم البقري', orders: 142, revenue: 4899, margin: 71.6 },
    { name: 'Pizza Napoletana Burrata', nameAr: 'بيتزا نابوليتانا بالبوراتا', orders: 118, revenue: 3776, margin: 73.1 },
    { name: 'Ribeye Steak 300g', nameAr: 'ستيك ريب آي أنغوس', orders: 64, revenue: 4352, margin: 70.0 },
    { name: 'Tagliatelle Gamberi', nameAr: 'تاليياتيلي بالروبيان', orders: 79, revenue: 3002, margin: 70.5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Quiet Header with Direct Action Teleport */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200/60 dark:border-white/5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>RESTOCHAIN HQ • LIVE TELEMETRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {t.hqTitle}
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xl">
            {t.hqSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/pos"
            onClick={() => soundFx.playClick()}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs transition-transform active:scale-[0.99] flex items-center gap-2"
          >
            <IconPos className="w-4 h-4" />
            <span>{t.hqOpenPos}</span>
          </Link>

          <Link
            href="/kds"
            onClick={() => soundFx.playKitchenBell()}
            className="px-5 py-2.5 rounded-xl bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200/70 font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <IconKitchen className="w-4 h-4" />
            <span>{t.hqLiveKds}</span>
          </Link>
        </div>
      </div>

      {/* 4 Quiet Essential KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-6 rounded-2xl quiet-card space-y-2">
          <div className="text-xs font-medium text-neutral-400">
            {t.kpiTotalRevenue}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white">
            {totalChainRevenue.toFixed(3)} <span className="text-xs text-neutral-400 font-sans">{t.currency}</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
            +14.2% {t.kpiComparedLastWeek}
          </div>
        </div>

        <div className="p-6 rounded-2xl quiet-card space-y-2">
          <div className="text-xs font-medium text-neutral-400">
            {t.kpiActiveOrders}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white">
            {totalChainOrders}
          </div>
          <div className="text-[11px] font-mono text-neutral-400">
            {t.kpiAvgCookTime}
          </div>
        </div>

        <div className="p-6 rounded-2xl quiet-card space-y-2">
          <div className="text-xs font-medium text-neutral-400">
            {t.kpiTableOccupancy}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white">
            {occupancyRate}%
          </div>
          <div className="text-[11px] font-mono text-neutral-400">
            {occupiedTables} / {state.tables.length} {t.kpiOccupiedCount}
          </div>
        </div>

        <div className="p-6 rounded-2xl quiet-card space-y-2">
          <div className="text-xs font-medium text-neutral-400">
            {t.kpiFoodCostAvg}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
            28.4%
          </div>
          <div className="text-[11px] font-mono text-neutral-400">
            {t.kpiTargetRange}
          </div>
        </div>

      </div>

      {/* Multi-Location Branches Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
            {t.branchPerformanceTitle}
          </h2>
          <span className="text-xs font-mono text-neutral-400">
            {t.branchConnectedCount}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {state.branches.map((b) => {
            const isSelected = b.id === state.activeBranchId;
            const branchName = locale === 'ar' ? b.name : b.nameFr || b.name;
            return (
              <div
                key={b.id}
                onClick={() => {
                  soundFx.playClick();
                  switchBranch(b.id);
                }}
                className={`p-5 rounded-2xl quiet-card cursor-pointer transition-all space-y-3 ${
                  isSelected ? 'ring-1 ring-neutral-900 dark:ring-white' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {branchName}
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{b.address}</p>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  )}
                </div>

                <div className="space-y-1 pt-2 border-t border-neutral-100 dark:border-white/5 text-xs font-mono">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>{t.branchSalesToday}</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      {b.dailyRevenue.toFixed(3)} {t.currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>{t.branchActiveOrders}</span>
                    <span>{b.activeOrdersCount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Product Mix Matrix */}
      <div className="quiet-card rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
          الأطباق الأكثر مبيعاً والربحية (Menu Performance)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topDishes.map((dish, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-neutral-50 dark:bg-white/5 space-y-2"
            >
              <div className="flex items-start justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-white">
                  {locale === 'ar' ? dish.nameAr : dish.name}
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  +{dish.margin}%
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
                <span>{dish.orders} orders</span>
                <span>{dish.revenue} {t.currency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
