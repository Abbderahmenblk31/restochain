'use client';

// =============================================================================
// RestoChain OS — Minimalist Luxury Shift Management & Daily Z-Report
// Clean financial reconciliation, quiet typography, zero loud borders
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { soundFx } from '@/lib/utils/audio';

export function ZReportModal() {
  const { state, activeBranch, generateZReport } = useRestoStore();
  const { locale, t } = useLanguage();
  const [actualCashCounted, setActualCashCounted] = useState<number>(450.0);
  const [reportSuccess, setReportSuccess] = useState(false);

  const activeStaff = state.shifts.filter((s) => s.branchId === state.activeBranchId);

  const handleRunZReport = () => {
    soundFx.playCashRegister();
    const report = generateZReport(actualCashCounted);
    if (report) {
      setReportSuccess(true);
    }
  };

  const branchName = locale === 'ar' ? activeBranch?.name : activeBranch?.nameFr || activeBranch?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.shiftsTitle}
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            {branchName} • {activeStaff.length} {t.shiftsStaffActive}
          </p>
        </div>

        <button
          onClick={() => {
            const elem = document.getElementById('z-report-box');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs"
        >
          {t.runZReportBtn}
        </button>
      </div>

      {/* Staff Roster Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {t.rosterTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {activeStaff.map((staff) => (
            <div
              key={staff.id}
              className="p-4 rounded-xl quiet-card space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-white">
                  {staff.staffName}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-[11px] text-neutral-400">{staff.role}</p>
              <div className="text-[10px] font-mono text-neutral-400 pt-1 border-t border-neutral-100 dark:border-white/5">
                {t.startedAt} {staff.startTime}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Z-Report Financial Reconciliation */}
      <div id="z-report-box" className="quiet-card rounded-2xl p-6 space-y-6">
        <div>
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
            {t.zClosingTitle}
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            {t.zClosingSubtitle}
          </p>
        </div>

        {reportSuccess && (
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
            {t.zSuccessNotice}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Drawer Reconciliation Input */}
          <div className="p-5 rounded-xl bg-neutral-50 dark:bg-white/5 space-y-3 text-xs">
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              {t.cashCountLabel}
            </h3>

            <div className="relative">
              <input
                type="number"
                step="0.100"
                value={actualCashCounted}
                onChange={(e) => setActualCashCounted(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 rounded-lg bg-white dark:bg-[#11141d] font-mono text-sm font-bold"
              />
              <span className="absolute end-3 top-2.5 text-neutral-400 font-mono text-xs">{t.currency}</span>
            </div>

            <button
              onClick={handleRunZReport}
              className="w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs"
            >
              {t.calculateEcartBtn}
            </button>
          </div>

          {/* Result Preview */}
          <div className="p-5 rounded-xl bg-neutral-900 dark:bg-white/5 text-neutral-300 font-mono text-xs space-y-2">
            <div className="flex justify-between border-b border-white/10 pb-2 text-white font-bold">
              <span>{t.zReportNumber}</span>
              <span>Z-2026-11-10</span>
            </div>
            <div className="flex justify-between">
              <span>{t.grossSalesText}</span>
              <span>{(activeBranch?.dailyRevenue || 3420).toFixed(3)} {t.currency}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.taxCollectedText}</span>
              <span>{((activeBranch?.dailyRevenue || 3420) * 0.07).toFixed(3)} {t.currency}</span>
            </div>
            <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10">
              <span>{t.expectedCashText}</span>
              <span>450.000 {t.currency}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.actualCashText}</span>
              <span>{actualCashCounted.toFixed(3)} {t.currency}</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white">
              <span>{t.cashDiscrepancy}</span>
              <span>{(actualCashCounted - 450.0).toFixed(3)} {t.currency}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
