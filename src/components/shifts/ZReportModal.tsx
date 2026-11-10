'use client';

// =============================================================================
// RestoChain OS - Staff Shift & Fiscal Daily Z-Report Generator
// Shift roster, cash drawer reconciliation, discrepancy alerts & official Z closing
// Tri-Lingual (AR / FR / EN) with dynamic RTL/LTR support
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ZDailyReport } from '@/lib/types';
import {
  IconReceipt,
  IconCheckCircle,
  IconClock,
  IconPrinter,
} from '@/components/icons/RestoIcons';

export function ZReportModal() {
  const { state, activeBranch, generateZReport } = useRestoStore();
  const { locale, t } = useLanguage();
  const [actualCashCounted, setActualCashCounted] = useState<number>(450.0);
  const [reportSuccess, setReportSuccess] = useState(false);

  const activeStaff = state.shifts.filter((s) => s.branchId === state.activeBranchId);

  const handleRunZReport = () => {
    const report = generateZReport(actualCashCounted);
    if (report) {
      setReportSuccess(true);
    }
  };

  const branchName = locale === 'ar' ? activeBranch?.name : activeBranch?.nameFr || activeBranch?.name;

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
              <h1 className="text-xl font-black text-slate-900 dark:text-white">{t.shiftsTitle}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {t.shiftsSubtitle}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {t.activeBranchBadge}: <strong className="text-slate-800 dark:text-slate-200">{branchName}</strong> • {t.shiftsStaffActive}: <strong className="text-slate-800 dark:text-slate-200">{activeStaff.length}</strong>
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
          <span>{t.runZReportBtn}</span>
        </button>
      </div>

      {/* Staff Roster Grid */}
      <div className="bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <IconClock className="w-4 h-4 text-emerald-600" />
            <span>{t.rosterTitle}</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">
            {t.lunchShiftName}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {activeStaff.map((staff) => {
            const roleLabels: Record<string, string> = {
              CASHIER: t.roleCashier,
              HEAD_CHEF: t.roleHeadChef,
              WAITER: t.roleWaiter,
              COURIER: t.roleCourier,
              MANAGER: t.roleManager,
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
                    {t.onDuty}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">
                    {staff.staffName}
                  </h4>
                  <p className="text-[11px] text-slate-500">{roleLabels[staff.role]}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-mono">
                  {t.startedAt} {staff.startTime}
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
            {t.zClosingTitle}
          </h2>
          <p className="text-xs text-slate-500">
            {t.zClosingSubtitle}
          </p>
        </div>

        {reportSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <IconCheckCircle className="w-5 h-5 shrink-0" />
            <span>{t.zSuccessNotice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Drawer Reconciliation Inputs */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              {t.cashCountLabel}
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.cashCountLabel}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.100"
                  value={actualCashCounted}
                  onChange={(e) => setActualCashCounted(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-sm focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute end-3 top-2.5 text-xs text-slate-400 font-mono">{t.currency}</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <div>{t.cashierInCharge} <strong className="text-slate-800 dark:text-slate-200">Mohamed Ben Salem</strong></div>
              <div>{t.closingTimeLabel} <strong className="text-slate-800 dark:text-slate-200">{new Date().toLocaleTimeString(locale === 'ar' ? 'fr-TN' : 'fr-FR')}</strong></div>
            </div>

            <button
              onClick={handleRunZReport}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <IconCheckCircle className="w-4 h-4" />
              <span>{t.calculateEcartBtn}</span>
            </button>
          </div>

          {/* Real-time Calculation Result Preview */}
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-3">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">{t.zReportNumber}</span>
              <span className="font-bold text-emerald-400">Z-2026-11-10-001</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span>{t.grossSalesText}</span>
                <span>{(activeBranch?.dailyRevenue || 3420).toFixed(3)} {t.currency}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t.taxCollectedText}</span>
                <span>{((activeBranch?.dailyRevenue || 3420) * 0.07).toFixed(3)} {t.currency}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t.cardPaymentsText}</span>
                <span>1,240.000 {t.currency}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t.deliveryPaymentsText}</span>
                <span>450.000 {t.currency}</span>
              </div>
              <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800">
                <span>{t.expectedCashText}</span>
                <span className="text-amber-400">450.000 {t.currency}</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>{t.actualCashText}</span>
                <span>{actualCashCounted.toFixed(3)} {t.currency}</span>
              </div>
            </div>

            {/* Discrepancy Indicator */}
            <div className="pt-3 border-t border-slate-800">
              {Math.abs(actualCashCounted - 450.0) < 0.001 ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-between">
                  <span>{t.cashDiscrepancy}</span>
                  <span>{t.perfectMatch}</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 font-bold flex items-center justify-between">
                  <span>{t.cashDiscrepancy}</span>
                  <span>{(actualCashCounted - 450.0).toFixed(3)} {t.currency} ({t.discrepancyAlert})</span>
                </div>
              )}
            </div>

            <button
              onClick={() => window.print()}
              className="w-full mt-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <IconPrinter className="w-3.5 h-3.5" />
              <span>{t.printZNotice}</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
