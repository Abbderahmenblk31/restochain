'use client';

// =============================================================================
// RestoChain OS - Executive Operational Cockpit & Multi-Branch Telemetry
// Replaced generic AI gradients with an authentic Bloomberg/Stripe-tier restaurant cockpit
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
  IconTable,
  IconCheckCircle,
  IconClock,
  IconAlertTriangle,
} from '@/components/icons/RestoIcons';

export default function RestoChainHqPage() {
  const { state, switchBranch } = useRestoStore();
  const { locale, t } = useLanguage();

  const totalChainRevenue = state.branches.reduce((acc, b) => acc + b.dailyRevenue, 0);
  const totalChainOrders = state.branches.reduce((acc, b) => acc + b.activeOrdersCount, 0);
  const occupiedTables = state.tables.filter((t) => t.status === 'OCCUPIED' || t.status === 'BILL_REQUESTED').length;
  const occupancyRate = Math.round((occupiedTables / state.tables.length) * 100);

  // Hourly Dining Rush Curve (Lunch peak 12:00-14:30, Dinner peak 20:00-22:30)
  const rushHours = [
    { hour: '11h', orders: 12, height: '24%' },
    { hour: '12h', orders: 48, height: '85%' },
    { hour: '13h', orders: 62, height: '100%' },
    { hour: '14h', orders: 39, height: '65%' },
    { hour: '15h', orders: 16, height: '30%' },
    { hour: '18h', orders: 18, height: '32%' },
    { hour: '19h', orders: 34, height: '58%' },
    { hour: '20h', orders: 55, height: '92%' },
    { hour: '21h', orders: 59, height: '98%' },
    { hour: '22h', orders: 41, height: '68%' },
  ];

  // Best-seller dishes ranking
  const topDishes = [
    { name: 'Black Angus Truffle Burger', nameAr: 'برغر الكمأة واللحم البقري', orders: 142, revenue: 4899, margin: 71.6 },
    { name: 'Pizza Napoletana Burrata', nameAr: 'بيتزا نابوليتانا بالبوراتا', orders: 118, revenue: 3776, margin: 73.1 },
    { name: 'Ribeye Steak 300g', nameAr: 'ستيك ريب آي أنغوس', orders: 64, revenue: 4352, margin: 70.0 },
    { name: 'Tagliatelle Gamberi', nameAr: 'تاليياتيلي بالروبيان', orders: 79, revenue: 3002, margin: 70.5 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Executive Command Cockpit Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              NETWORK OPERATIONS CENTER • REAL-TIME TELEMETRY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase font-mono">
            {t.hqTitle}
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            {t.hqSubtitle}
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/pos"
            onClick={() => soundFx.playClick()}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs font-mono shadow-lg shadow-amber-500/20 transition-all pos-key flex items-center gap-2"
          >
            <IconPos className="w-4 h-4" />
            <span>{t.hqOpenPos}</span>
          </Link>

          <Link
            href="/kds"
            onClick={() => soundFx.playKitchenBell()}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-mono font-bold text-xs border border-slate-700 transition-all pos-key flex items-center gap-2"
          >
            <IconKitchen className="w-4 h-4" />
            <span>{t.hqLiveKds}</span>
          </Link>

          <Link
            href="/inventory"
            onClick={() => soundFx.playClick()}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs border border-slate-700 transition-all pos-key flex items-center gap-2"
          >
            <IconInventory className="w-4 h-4" />
            <span>{t.hqInventoryBtn}</span>
          </Link>
        </div>
      </div>

      {/* KPI Quad Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono font-bold uppercase">
            <span>{t.kpiTotalRevenue}</span>
            <IconTrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
            {totalChainRevenue.toFixed(3)} <span className="text-xs text-amber-500">{t.currency}</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1">
            <span>+14.2%</span>
            <span className="text-slate-400 font-normal">{t.kpiComparedLastWeek}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono font-bold uppercase">
            <span>{t.kpiActiveOrders}</span>
            <IconKitchen className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-500">
            {totalChainOrders}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            <span>{t.kpiAvgCookTime}</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono font-bold uppercase">
            <span>{t.kpiTableOccupancy}</span>
            <IconTable className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
            {occupancyRate}%
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            <span>{occupiedTables} / {state.tables.length} {t.kpiOccupiedCount}</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono font-bold uppercase">
            <span>{t.kpiFoodCostAvg}</span>
            <IconCheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-500">
            28.4%
          </div>
          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            <span>{t.kpiTargetRange}</span>
          </div>
        </div>

      </div>

      {/* Operations Row: Rush Hours Dining Throughput (55%) & Top Sellers Mix (45%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Hourly Rush Curve */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#121722] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-black uppercase font-mono tracking-wider text-slate-900 dark:text-white">
                منحنى الإقبال والطلبات اللحظي (Hourly Dining Rush Throughput)
              </h2>
              <p className="text-[11px] text-slate-400">
                ذروة الغداء (12:30 - 14:00) وذروة العشاء (20:00 - 22:30) عبر الفروع
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500">
              Peak: 62 orders/hr
            </span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
            {rushHours.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.orders}
                </span>
                <div
                  style={{ height: bar.height }}
                  className="w-full rounded-t-lg bg-slate-200 dark:bg-slate-800 group-hover:bg-amber-500 transition-colors"
                ></div>
                <span className="text-[10px] font-mono text-slate-500">
                  {bar.hour}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Product Mix Matrix */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#121722] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-black uppercase font-mono tracking-wider text-slate-900 dark:text-white">
                الأطباق الأكثر مبيعاً والربحية (Menu Stars Mix)
              </h2>
              <p className="text-[11px] text-slate-400">
                حجم المبيعات ونسبة الهامش الربحي الصافي
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {topDishes.map((dish, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {locale === 'ar' ? dish.nameAr : dish.name}
                  </span>
                  <span className="font-mono font-bold text-emerald-500">
                    +{dish.margin}% Margin
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${(dish.orders / 150) * 100}%` }}
                    className="h-full rounded-full bg-amber-500"
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                  <span>{dish.orders} طلبات اليوم</span>
                  <span>{dish.revenue} {t.currency} Gross</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Multi-Location Branches Telemetry Cards */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121722] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-black uppercase font-mono tracking-wider text-slate-900 dark:text-white">
              {t.branchPerformanceTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.branchPerformanceSubtitle}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-500">
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
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-4 pos-key ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40'
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
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500 text-slate-950">
                      ACTIVE
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.branchSalesToday}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {b.dailyRevenue.toFixed(3)} {t.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.branchActiveOrders}</span>
                    <span className="font-bold text-amber-500">
                      {b.activeOrdersCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.branchTables}</span>
                    <span>{b.tablesCount} tables</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>{t.branchManager}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{b.managerName}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
