'use client';

// =============================================================================
// RestoChain OS - Executive Multi-Branch HQ Command Center
// Multi-location revenue aggregation, table occupancy, active tickets & chain performance
// =============================================================================

import React from 'react';
import Link from 'next/link';
import { useRestoStore } from '@/lib/store/restochain-store';
import {
  IconStore,
  IconPos,
  IconKitchen,
  IconInventory,
  IconReceipt,
  IconMotorcycle,
  IconTrendingUp,
  IconTable,
  IconCheckCircle,
} from '@/components/icons/RestoIcons';

export default function RestoChainHqPage() {
  const { state, switchBranch, activeBranch } = useRestoStore();

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
            <span>نظام الإدارة المركزي لسلاسل المطاعم الفاخرة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            لوحة القيادة المركزية HQ الموحدة
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            متابعة فورية للمبيعات اللحظية، مؤشرات الأداء التشغيلية، مراقبة المخزون، ونسب تكلفة الوجبات عبر كافة فروع السلسلة في تونس الكبرى والمحافظات.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link
              href="/pos"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-600/30 transition-all"
            >
              <IconPos className="w-4 h-4" />
              <span>فتح نقطة البيع Cloud POS</span>
            </Link>

            <Link
              href="/kds"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-all"
            >
              <IconKitchen className="w-4 h-4" />
              <span>شاشة المطبخ KDS (بث مباشر)</span>
            </Link>

            <Link
              href="/inventory"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              <IconInventory className="w-4 h-4" />
              <span>المخزون وتكلفة الوجبات</span>
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
            <span>مبيعات السلسلة الإجمالية اليوم</span>
            <IconTrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {totalChainRevenue.toFixed(3)} د.ت
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <span>+14.2%</span>
            <span className="text-slate-400 font-normal">مقارنة بالأسبوع الماضي</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>الطلبات النشطة عبر الفروع</span>
            <IconKitchen className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {totalChainOrders} طلبات
          </div>
          <div className="text-[11px] text-amber-600 font-bold">
            <span>متوسط وقت التحضير: 12.4 دقيقة</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>نسبة إشغال الطاولات (فرعك)</span>
            <IconTable className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {occupancyRate}%
          </div>
          <div className="text-[11px] text-slate-400">
            <span>{occupiedTables} من إجمالي {state.tables.length} طاولات محجوزة</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>متوسط تكلفة الأغذية (Food Cost)</span>
            <IconCheckCircle className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
            28.4%
          </div>
          <div className="text-[11px] text-emerald-600 font-bold">
            <span>ضمن النطاق الأمثل المستهدف (25-32%)</span>
          </div>
        </div>

      </div>

      {/* Multi-Location Branches Performance Grid */}
      <div className="bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              مقارنة أداء الفروع في الزمن الحقيقي (Live Multi-Branch Network)
            </h2>
            <p className="text-xs text-slate-500">
              اضغط على أي فرع للتبديل الفوري وإدارة العمليات الميدانية الخاصة به.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            4 فروع متصلة سحابياً
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {state.branches.map((b) => {
            const isSelected = b.id === state.activeBranchId;
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
                      {b.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{b.address}</p>
                  </div>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-600 text-white">
                      الفرع النشط
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">مبيعات اليوم:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {b.dailyRevenue.toFixed(3)} د.ت
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">طلبات جارية:</span>
                    <span className="font-mono font-bold text-amber-600">
                      {b.activeOrdersCount} طلبات
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">الطاولات:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">
                      {b.tablesCount} طاولة
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>مدير الفرع:</span>
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
            نقطة البيع السحابية Cloud POS
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            بناء طلبات فوري، اختيار الطاولات، تخصيص الأصناف والإضافات، واحتساب الضرائب مع طباعة الفواتير الحرارية.
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
            شاشة المطبخ الذكية KDS
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            مزامنة مباشرة مع الطهاة، مؤقتات دقيقة للتأخير باللونين الأصفر والأحمر، وتأكيد جاهزية الأطباق بضغطة زر.
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
            الورديات وتقرير Z المالي
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            مطابقة صندوق النقدية اليومية، احتساب فوارق الكاشير بدقة، وإغلاق الوردية وفق القوانين الجبائية.
          </p>
        </Link>

      </div>

    </div>
  );
}
