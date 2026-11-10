'use client';

// =============================================================================
// RestoChain OS - Staff Shift & Fiscal Daily Z-Report Generator
// Shift roster, cash drawer reconciliation, discrepancy alerts & official Z closing
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { ZDailyReport } from '@/lib/types';
import {
  IconReceipt,
  IconCheckCircle,
  IconAlertTriangle,
  IconClock,
  IconPrinter,
} from '@/components/icons/RestoIcons';

export function ZReportModal() {
  const { state, activeBranch, generateZReport } = useRestoStore();
  const [actualCashCounted, setActualCashCounted] = useState<number>(450.0);
  const [generatedReport, setGeneratedReport] = useState<ZDailyReport | null>(null);
  const [reportSuccess, setReportSuccess] = useState(false);

  const activeStaff = state.shifts.filter((s) => s.branchId === state.activeBranchId);

  const handleRunZReport = () => {
    const report = generateZReport(actualCashCounted);
    if (report) {
      setGeneratedReport(report);
      setReportSuccess(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Shifts Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
            <IconReceipt className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 dark:text-white">إدارة الورديات وتقرير الإغلاق Z</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                المطابقة المالية اليومية
              </span>
            </div>
            <p className="text-xs text-slate-500">
              الفرع: <strong className="text-slate-800 dark:text-slate-200">{activeBranch?.name}</strong> • طاقم الوردية: <strong className="text-slate-800 dark:text-slate-200">{activeStaff.length} موظفين نشطين</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const elem = document.getElementById('z-report-box');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
        >
          <IconReceipt className="w-4 h-4" />
          <span>إغلاق الصندوق وإصدار تقرير Z</span>
        </button>
      </div>

      {/* Staff Roster Grid */}
      <div className="bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <IconClock className="w-4 h-4 text-emerald-600" />
            <span>طاقم العمل المسجل في الوردية النشطة (Shift In-Progress)</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">
            وردية الغداء (11:00 - 17:00)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {activeStaff.map((staff) => {
            const roleLabels: Record<string, string> = {
              CASHIER: 'مسؤول الصندوق (Cashier)',
              HEAD_CHEF: 'رئيس الطهاة (Head Chef)',
              WAITER: 'نادل صالة (Server)',
              COURIER: 'سائق توصيل (Courier)',
              MANAGER: 'مدير الصالة (Floor Mgr)',
            };

            return (
              <div
                key={staff.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-800 dark:text-white">
                    {staff.staffName[0]}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    على رأس العمل
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">
                    {staff.staffName}
                  </h4>
                  <p className="text-[11px] text-slate-500">{roleLabels[staff.role]}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-mono">
                  بدأ: {staff.startTime}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fiscal Z-Report Calculator Section */}
      <div id="z-report-box" className="bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-base font-black text-slate-900 dark:text-white">
            مطابقة صندوق النقدية وإصدار تقرير Z اليومي (Rapport Z de Clôture)
          </h2>
          <p className="text-xs text-slate-500">
            تقرير الإغلاق المالي اليومي الإلزامي لمطابقة المقابيض النقدية مع المعاملات الإلكترونية والضريبية.
          </p>
        </div>

        {reportSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <IconCheckCircle className="w-5 h-5 shrink-0" />
            <span>تم توليد تقرير Z بنجاح! تم حفظ البيانات في السجل المالي غير القابل للتعديل.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Drawer Reconciliation Inputs */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              1. إدخال مبالغ الجرد الفعلي (Comptage Physique)
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                النقدية المعدودة في الدرج (Espèces comptées en caisse):
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.100"
                  value={actualCashCounted}
                  onChange={(e) => setActualCashCounted(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-sm focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute end-3 top-2.5 text-xs text-slate-400 font-mono">د.ت</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <div>المسؤول عن الإغلاق: <strong className="text-slate-800 dark:text-slate-200">محمد بن سالم</strong></div>
              <div>توقيت الإغلاق: <strong className="text-slate-800 dark:text-slate-200">الآن ({new Date().toLocaleTimeString('fr-TN')})</strong></div>
            </div>

            <button
              onClick={handleRunZReport}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <IconCheckCircle className="w-4 h-4" />
              <span>تأكيد الإغلاق واحتساب الفارق (Calculer Écart)</span>
            </button>
          </div>

          {/* Real-time Calculation Result Preview */}
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-3">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">رقم تقرير Z:</span>
              <span className="font-bold text-emerald-400">Z-2026-11-10-001</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span>المبيعات الإجمالية الخام (Gross Sales):</span>
                <span>{(activeBranch?.dailyRevenue || 3420).toFixed(3)} د.ت</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>الضريبة المحصلة TVA (7% & 19%):</span>
                <span>{((activeBranch?.dailyRevenue || 3420) * 0.07).toFixed(3)} د.ت</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>مدفوعات البطاقة البنكية TPE:</span>
                <span>1,240.000 د.ت</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>مدفوعات تطبيقات التوصيل:</span>
                <span>450.000 د.ت</span>
              </div>
              <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800">
                <span>النقدية المتوقعة في الدرج (Expected Cash):</span>
                <span className="text-amber-400">450.000 د.ت</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>النقدية الفعلية المدخلة:</span>
                <span>{actualCashCounted.toFixed(3)} د.ت</span>
              </div>
            </div>

            {/* Discrepancy Indicator */}
            <div className="pt-3 border-t border-slate-800">
              {Math.abs(actualCashCounted - 450.0) < 0.001 ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-between">
                  <span>فارق الصندوق (Écart de caisse):</span>
                  <span>0.000 د.ت (مطابقة تامة 100%)</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 font-bold flex items-center justify-between">
                  <span>فارق الصندوق (Écart de caisse):</span>
                  <span>{(actualCashCounted - 450.0).toFixed(3)} د.ت (يوجد فارق!)</span>
                </div>
              )}
            </div>

            <button
              onClick={() => window.print()}
              className="w-full mt-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <IconPrinter className="w-3.5 h-3.5" />
              <span>طباعة إشعار Z المالي</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
