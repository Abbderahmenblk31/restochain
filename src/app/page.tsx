'use client';

// =============================================================================
// RestoChain OS - Executive Multi-Branch HQ Command Center
// Multi-location revenue aggregation, table occupancy, active tickets & chain telemetry
// =============================================================================

import React from 'react';
import Link from 'next/link';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import {
  IconStore,
  IconPos,
  IconKitchen,
  IconInventory,
  IconReceipt,
  IconTrendingUp,
  IconTable,
  IconCheckCircle,
} from '@/components/icons/RestoIcons';

export default function RestoChainHqPage() {
  const { state, switchBranch } = useRestoStore();
  const { locale, t } = useLanguage();

  const totalChainRevenue = state.branches.reduce((acc, b) => acc + b.dailyRevenue, 0);
  const totalChainOrders = state.branches.reduce((acc, b) => acc + b.activeOrdersCount, 0);
  const occupiedTables = state.tables.filter((t) => t.status === 'OCCUPIED' || t.status === 'BILL_REQUESTED').length;
  const occupancyRate = Math.round((occupiedTables / state.tables.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border border-rose-900/40 p-8 sm:p-12 text-white shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            <span>{t.hqBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t.hqTitle}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {t.hqSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link
              href="/pos"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-600/30 transition-all"
            >
              <IconPos className="w-4 h-4" />
              <span>{t.hqOpenPos}</span>
            </Link>

            <Link
              href="/kds"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-all"
            >
              <IconKitchen className="w-4 h-4" />
              <span>{t.hqLiveKds}</span>
            </Link>

            <Link
              href="/inventory"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              <IconInventory className="w-4 h-4" />
              <span>{t.hqInventoryBtn}</span>
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute top-0 end-0 -translate-y-12 translate-x-12 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* KPI Cards: Revenue, Active Orders, Table Occupancy, Chain Margin */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>{t.kpiTotalRevenue}</span>
            <IconTrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {totalChainRevenue.toFixed(3)} {t.currency}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <span>+14.2%</span>
            <span className="text-slate-400 font-normal">{t.kpiComparedLastWeek}</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>{t.kpiActiveOrders}</span>
            <IconKitchen className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {totalChainOrders}
          </div>
          <div className="text-[11px] text-amber-600 font-bold">
            <span>{t.kpiAvgCookTime}</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>{t.kpiTableOccupancy}</span>
            <IconTable className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {occupancyRate}%
          </div>
          <div className="text-[11px] text-slate-400">
            <span>{occupiedTables} / {state.tables.length} {t.kpiOccupiedCount}</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>{t.kpiFoodCostAvg}</span>
            <IconCheckCircle className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
            28.4%
          </div>
          <div className="text-[11px] text-emerald-600 font-bold">
            <span>{t.kpiTargetRange}</span>
          </div>
        </div>

      </div>

      {/* Multi-Location Branches Performance Grid */}
      <div className="bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {t.branchPerformanceTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.branchPerformanceSubtitle}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
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
                onClick={() => switchBranch(b.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-4 ${
                  isSelected
                    ? 'border-rose-600 bg-rose-50/40 dark:bg-rose-950/20 shadow-md ring-2 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      {branchName}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{b.address}</p>
                  </div>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-600 text-white">
                      {t.activeBranchBadge}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.branchSalesToday}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {b.dailyRevenue.toFixed(3)} {t.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.branchActiveOrders}</span>
                    <span className="font-mono font-bold text-amber-600">
                      {b.activeOrdersCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.branchTables}</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">
                      {b.tablesCount}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>{t.branchManager}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{b.managerName}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link
          href="/pos"
          className="p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:shadow-xl transition-all group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 group-hover:bg-rose-600 group-hover:text-white flex items-center justify-center transition-colors">
            <IconPos className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
            {t.posCardTitle}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t.posCardDesc}
          </p>
        </Link>

        <Link
          href="/kds"
          className="p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:shadow-xl transition-all group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center transition-colors">
            <IconKitchen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
            {t.kdsCardTitle}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t.kdsCardDesc}
          </p>
        </Link>

        <Link
          href="/shifts"
          className="p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-xl transition-all group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
            <IconReceipt className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
            {t.shiftsCardTitle}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t.shiftsCardDesc}
          </p>
        </Link>

      </div>

    </div>
  );
}
