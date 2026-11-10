'use client';

// =============================================================================
// RestoChain OS - Live Kitchen Display System (KDS)
// Real-time chef ticket queues, cooking timers, station filters & one-click status transitions
// Tri-Lingual (AR / FR / EN) with dynamic RTL/LTR support
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import {
  IconKitchen,
  IconCheckCircle,
} from '@/components/icons/RestoIcons';

export function KitchenDisplayBoard() {
  const { state, activeBranch, updateOrderStatus } = useRestoStore();
  const { locale, t } = useLanguage();
  const [selectedStation, setSelectedStation] = useState<string>('ALL');
  const [struckItems, setStruckItems] = useState<Record<string, boolean>>({});

  // Filter orders for active branch that are active in kitchen
  const activeOrders = state.orders.filter(
    (o) =>
      o.branchId === state.activeBranchId &&
      (o.status === 'NEW' || o.status === 'PREPARING' || o.status === 'READY')
  );

  const toggleItemStrike = (uniqueKey: string) => {
    setStruckItems((prev) => ({
      ...prev,
      [uniqueKey]: !prev[uniqueKey],
    }));
  };

  const getElapsedMinutes = (createdAt: string) => {
    const diffMs = Date.now() - new Date(createdAt).getTime();
    return Math.floor(diffMs / (1000 * 60));
  };

  const getTimerBadge = (minutes: number) => {
    if (minutes < 10) {
      return {
        color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        label: `${minutes} ${t.timerNormal}`,
      };
    } else if (minutes < 18) {
      return {
        color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        label: `${minutes} ${t.timerWarning}`,
      };
    } else {
      return {
        color: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500 animate-pulse font-black',
        label: `🚨 ${minutes} ${t.timerCritical}`,
      };
    }
  };

  const branchName = locale === 'ar' ? activeBranch?.name : activeBranch?.nameFr || activeBranch?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top KDS Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <IconKitchen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black">{t.kdsTitle}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {t.kdsLiveBadge}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t.activeBranchBadge}: <strong className="text-white">{branchName}</strong> • {t.kdsSubtitle}: <strong className="text-amber-400">{activeOrders.length} {t.kdsActiveTicketsCount}</strong>
            </p>
          </div>
        </div>

        {/* Station Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'ALL', label: t.stationAll },
            { id: 'GRILL', label: t.stationGrill },
            { id: 'PIZZA', label: t.stationPizza },
            { id: 'COLD', label: t.stationCold },
            { id: 'BAR', label: t.stationBar },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStation(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedStation === st.id
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Operational Columns: New, Preparing, Ready */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: NEW ORDERS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <h2 className="text-sm font-black text-blue-900 dark:text-blue-300">
                {t.colNew}
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100">
              {activeOrders.filter((o) => o.status === 'NEW').length}
            </span>
          </div>

          <div className="space-y-4">
            {activeOrders.filter((o) => o.status === 'NEW').length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                {t.noNewOrders}
              </div>
            ) : (
              activeOrders
                .filter((o) => o.status === 'NEW')
                .map((order) => {
                  const elapsed = getElapsedMinutes(order.createdAt);
                  const timer = getTimerBadge(elapsed);
                  return (
                    <div
                      key={order.id}
                      className="p-4 rounded-3xl bg-white dark:bg-[#0c121e] border-2 border-blue-400 shadow-md space-y-3"
                    >
                      {/* Ticket Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div>
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            {order.ticketNumber}
                          </span>
                          <span className="text-xs text-slate-500 block">
                            {order.type === 'DINE_IN' ? `${t.tableLabel} ${order.tableNumber}` : t.takeaway}
                          </span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-xl text-xs font-mono border ${timer.color}`}>
                          {timer.label}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start text-xs">
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white">
                                {item.name}
                              </span>
                              {item.selectedVariant && (
                                <span className="text-[10px] text-slate-400 block ps-2">
                                  • {item.selectedVariant.name}
                                </span>
                              )}
                              {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                                <span className="text-[10px] text-amber-600 block ps-2">
                                  + {item.selectedModifiers.map(m => m.name).join(', ')}
                                </span>
                              )}
                            </div>
                            <span className="font-mono font-bold text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.customerNotes && (
                        <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-700 dark:text-amber-300 font-bold">
                          ⚠️ {order.customerNotes}
                        </div>
                      )}

                      {/* Action */}
                      <button
                        onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>{t.startCookingBtn}</span>
                      </button>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Column 2: PREPARING (ON THE LINE) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
              <h2 className="text-sm font-black text-amber-900 dark:text-amber-300">
                {t.colPreparing}
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100">
              {activeOrders.filter((o) => o.status === 'PREPARING').length}
            </span>
          </div>

          <div className="space-y-4">
            {activeOrders.filter((o) => o.status === 'PREPARING').length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                {t.noPrepOrders}
              </div>
            ) : (
              activeOrders
                .filter((o) => o.status === 'PREPARING')
                .map((order) => {
                  const elapsed = getElapsedMinutes(order.createdAt);
                  const timer = getTimerBadge(elapsed);
                  return (
                    <div
                      key={order.id}
                      className="p-4 rounded-3xl bg-white dark:bg-[#0c121e] border-2 border-amber-500 shadow-lg space-y-3"
                    >
                      {/* Ticket Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div>
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            {order.ticketNumber}
                          </span>
                          <span className="text-xs text-slate-500 block">
                            {order.type === 'DINE_IN' ? `${t.tableLabel} ${order.tableNumber}` : t.takeaway}
                          </span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-xl text-xs font-mono border ${timer.color}`}>
                          {timer.label}
                        </span>
                      </div>

                      {/* Items with strike-through capability */}
                      <div className="space-y-2">
                        {order.items.map((item, idx) => {
                          const itemKey = `${order.id}-${idx}`;
                          const isDone = struckItems[itemKey];
                          return (
                            <div
                              key={idx}
                              onClick={() => toggleItemStrike(itemKey)}
                              className={`flex justify-between items-start text-xs p-2 rounded-xl cursor-pointer transition-all ${
                                isDone
                                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 line-through'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-900 dark:text-white'
                              }`}
                            >
                              <div>
                                <span className="font-bold">{item.name}</span>
                                {item.selectedVariant && (
                                  <span className="text-[10px] text-slate-400 block ps-2">
                                    • {item.selectedVariant.name}
                                  </span>
                                )}
                                {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                                  <span className="text-[10px] text-amber-600 block ps-2">
                                    + {item.selectedModifiers.map(m => m.name).join(', ')}
                                  </span>
                                )}
                              </div>
                              <span className="font-mono font-bold text-sm bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-lg shrink-0">
                                x{item.quantity}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {order.customerNotes && (
                        <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-700 dark:text-amber-300 font-bold">
                          ⚠️ {order.customerNotes}
                        </div>
                      )}

                      {/* Action */}
                      <button
                        onClick={() => updateOrderStatus(order.id, 'READY')}
                        className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <IconCheckCircle className="w-4 h-4" />
                        <span>{t.markReadyBtn}</span>
                      </button>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Column 3: READY (READY FOR RUNNER / WAITER) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <h2 className="text-sm font-black text-emerald-900 dark:text-emerald-300">
                {t.colReady}
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100">
              {activeOrders.filter((o) => o.status === 'READY').length}
            </span>
          </div>

          <div className="space-y-4">
            {activeOrders.filter((o) => o.status === 'READY').length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                {t.noReadyOrders}
              </div>
            ) : (
              activeOrders
                .filter((o) => o.status === 'READY')
                .map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-3xl bg-white dark:bg-[#0c121e] border-2 border-emerald-500 shadow-md space-y-3"
                  >
                    {/* Ticket Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <div>
                        <span className="text-base font-black text-slate-900 dark:text-white">
                          {order.ticketNumber}
                        </span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">
                          {order.type === 'DINE_IN' ? `${t.tableLabel} ${order.tableNumber}` : t.takeaway}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40">
                        {t.waitingRunner}
                      </span>
                    </div>

                    {/* Summary */}
                    <div className="text-xs text-slate-500 space-y-1">
                      <div>{t.itemsCountText} <strong className="text-slate-800 dark:text-slate-200">{order.items.length}</strong></div>
                      <div>{t.responsibleServer} <strong className="text-slate-800 dark:text-slate-200">{order.serverName}</strong></div>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() => updateOrderStatus(order.id, 'SERVED')}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <IconCheckCircle className="w-4 h-4" />
                      <span>{t.servedBtn}</span>
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
