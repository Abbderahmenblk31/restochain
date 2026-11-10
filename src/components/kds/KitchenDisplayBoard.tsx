'use client';

// =============================================================================
// RestoChain OS - Authentic Commercial Chef-Grade Kitchen Display System (KDS)
// Stainless Steel Docket Rail, Physical Ticket Clips, Color-Coded Cooking Timers & Service Bell
// =============================================================================

import React, { useState, useEffect } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { soundFx } from '@/lib/utils/audio';
import {
  IconKitchen,
  IconCheckCircle,
  IconClock,
} from '@/components/icons/RestoIcons';

export function KitchenDisplayBoard() {
  const { state, activeBranch, updateOrderStatus } = useRestoStore();
  const { locale, t } = useLanguage();
  const [selectedStation, setSelectedStation] = useState<string>('ALL');
  const [struckItems, setStruckItems] = useState<Record<string, boolean>>({});
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Live timer tick every 10 seconds to refresh elapsed minutes
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 10000);
    return () => clearInterval(timer);
  }, []);

  const activeOrders = state.orders.filter(
    (o) =>
      o.branchId === state.activeBranchId &&
      (o.status === 'NEW' || o.status === 'PREPARING' || o.status === 'READY')
  );

  const toggleItemStrike = (uniqueKey: string) => {
    soundFx.playClick();
    setStruckItems((prev) => ({
      ...prev,
      [uniqueKey]: !prev[uniqueKey],
    }));
  };

  const getElapsedMinutes = (createdAt: string) => {
    const diffMs = Date.now() - new Date(createdAt).getTime();
    return Math.max(1, Math.floor(diffMs / (1000 * 60)));
  };

  const getTimerBadge = (minutes: number) => {
    if (minutes < 10) {
      return {
        bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        label: `${minutes} ${t.timerNormal}`,
        isAlert: false,
      };
    } else if (minutes < 18) {
      return {
        bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        label: `${minutes} ${t.timerWarning}`,
        isAlert: false,
      };
    } else {
      return {
        bg: 'bg-rose-500/30 text-rose-300 border-rose-500 animate-pulse font-black',
        label: `🚨 ${minutes} ${t.timerCritical}`,
        isAlert: true,
      };
    }
  };

  const handleAdvanceStatus = (orderId: string, nextStatus: 'PREPARING' | 'READY' | 'SERVED') => {
    if (nextStatus === 'READY') {
      soundFx.playKitchenBell();
    } else {
      soundFx.playClick();
    }
    updateOrderStatus(orderId, nextStatus);
  };

  const branchName = locale === 'ar' ? activeBranch?.name : activeBranch?.nameFr || activeBranch?.name;

  return (
    <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
      
      {/* Heavy-Duty Commercial KDS Rail Bar */}
      <div className="rounded-2xl kds-rail p-4 text-white border border-slate-700/80 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/30">
            <IconKitchen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight uppercase font-mono">
                {t.kdsTitle}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                LINE-01 • EXPEDITE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {branchName} • {activeOrders.length} {t.kdsActiveTicketsCount}
            </p>
          </div>
        </div>

        {/* Cook Station Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'ALL', label: t.stationAll },
            { id: 'GRILL', label: t.stationGrill },
            { id: 'PIZZA', label: t.stationPizza },
            { id: 'COLD', label: t.stationCold },
            { id: 'BAR', label: t.stationBar },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedStation(st.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all pos-key shrink-0 ${
                selectedStation === st.id
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {st.label}
            </button>
          ))}

          {/* Service Bell Test Button */}
          <button
            onClick={() => soundFx.playKitchenBell()}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-mono font-bold shrink-0 flex items-center gap-1.5"
            title="Service Bell Chime"
          >
            🔔 Ding!
          </button>
        </div>
      </div>

      {/* 3 Operational KDS Columns with authentic physical ticket styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: NEW INCOMING (NEW TICKETS) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
              <h2 className="text-xs font-black uppercase font-mono tracking-wider">
                {t.colNew}
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-black bg-blue-500/20 text-blue-300">
              {activeOrders.filter((o) => o.status === 'NEW').length}
            </span>
          </div>

          <div className="space-y-4">
            {activeOrders.filter((o) => o.status === 'NEW').length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-400 text-xs font-mono">
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
                      className="relative bg-white dark:bg-[#151a26] text-slate-900 dark:text-slate-100 rounded-2xl border-2 border-blue-500 shadow-xl overflow-hidden"
                    >
                      {/* Metal clip simulation */}
                      <div className="w-8 h-2.5 bg-slate-400 dark:bg-slate-600 rounded-b-md mx-auto shadow-xs"></div>

                      <div className="p-4 space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                          <div>
                            <span className="text-lg font-black font-mono tracking-tight text-blue-600 dark:text-blue-400">
                              {order.ticketNumber}
                            </span>
                            <span className="text-xs text-slate-500 font-mono block">
                              {order.type === 'DINE_IN' ? `Table ${order.tableNumber}` : t.takeaway}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold ${timer.bg}`}>
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
                                  <span className="text-[10px] text-slate-400 block ps-2 font-mono">
                                    • {item.selectedVariant.name}
                                  </span>
                                )}
                                {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                                  <span className="text-[10px] text-amber-500 block ps-2 font-mono">
                                    + {item.selectedModifiers.map(m => m.name).join(', ')}
                                  </span>
                                )}
                              </div>
                              <span className="font-mono font-black text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                                x{item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {order.customerNotes && (
                          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-600 dark:text-amber-400 font-bold font-mono">
                            ⚠️ {order.customerNotes}
                          </div>
                        )}

                        {/* Action */}
                        <button
                          onClick={() => handleAdvanceStatus(order.id, 'PREPARING')}
                          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs font-mono shadow-md transition-all pos-key"
                        >
                          {t.startCookingBtn}
                        </button>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Column 2: ON THE LINE (PREPARING) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <h2 className="text-xs font-black uppercase font-mono tracking-wider">
                {t.colPreparing}
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-black bg-amber-500/20 text-amber-300">
              {activeOrders.filter((o) => o.status === 'PREPARING').length}
            </span>
          </div>

          <div className="space-y-4">
            {activeOrders.filter((o) => o.status === 'PREPARING').length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-400 text-xs font-mono">
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
                      className={`relative bg-white dark:bg-[#151a26] text-slate-900 dark:text-slate-100 rounded-2xl border-2 shadow-xl overflow-hidden ${
                        timer.isAlert ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-amber-500'
                      }`}
                    >
                      {/* Metal clip simulation */}
                      <div className="w-8 h-2.5 bg-amber-500 rounded-b-md mx-auto shadow-xs"></div>

                      <div className="p-4 space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                          <div>
                            <span className="text-lg font-black font-mono tracking-tight text-amber-500">
                              {order.ticketNumber}
                            </span>
                            <span className="text-xs text-slate-500 font-mono block">
                              {order.type === 'DINE_IN' ? `Table ${order.tableNumber}` : t.takeaway}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold ${timer.bg}`}>
                            {timer.label}
                          </span>
                        </div>

                        {/* Items with interactive strike off */}
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
                                    ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 line-through'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-900 dark:text-white'
                                }`}
                              >
                                <div>
                                  <span className="font-bold">{item.name}</span>
                                  {item.selectedVariant && (
                                    <span className="text-[10px] text-slate-400 block ps-2 font-mono">
                                      • {item.selectedVariant.name}
                                    </span>
                                  )}
                                  {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                                    <span className="text-[10px] text-amber-500 block ps-2 font-mono">
                                      + {item.selectedModifiers.map(m => m.name).join(', ')}
                                    </span>
                                  )}
                                </div>
                                <span className="font-mono font-black text-sm bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                                  x{item.quantity}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {order.customerNotes && (
                          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-600 dark:text-amber-400 font-bold font-mono">
                            ⚠️ {order.customerNotes}
                          </div>
                        )}

                        {/* Action */}
                        <button
                          onClick={() => handleAdvanceStatus(order.id, 'READY')}
                          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs font-mono shadow-md transition-all flex items-center justify-center gap-1.5 pos-key"
                        >
                          <IconCheckCircle className="w-4 h-4" />
                          <span>{t.markReadyBtn}</span>
                        </button>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Column 3: READY AT PASS (WAITING FOR RUNNER) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h2 className="text-xs font-black uppercase font-mono tracking-wider">
                {t.colReady}
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-black bg-emerald-500/20 text-emerald-300">
              {activeOrders.filter((o) => o.status === 'READY').length}
            </span>
          </div>

          <div className="space-y-4">
            {activeOrders.filter((o) => o.status === 'READY').length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-400 text-xs font-mono">
                {t.noReadyOrders}
              </div>
            ) : (
              activeOrders
                .filter((o) => o.status === 'READY')
                .map((order) => (
                  <div
                    key={order.id}
                    className="relative bg-white dark:bg-[#151a26] text-slate-900 dark:text-slate-100 rounded-2xl border-2 border-emerald-500 shadow-xl overflow-hidden"
                  >
                    {/* Metal clip simulation */}
                    <div className="w-8 h-2.5 bg-emerald-500 rounded-b-md mx-auto shadow-xs"></div>

                    <div className="p-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                        <div>
                          <span className="text-lg font-black font-mono tracking-tight text-emerald-500">
                            {order.ticketNumber}
                          </span>
                          <span className="text-xs text-emerald-500 font-mono font-bold block">
                            {order.type === 'DINE_IN' ? `Table ${order.tableNumber}` : t.takeaway}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono border font-bold bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                          {t.waitingRunner}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 font-mono space-y-1">
                        <div>{t.itemsCountText} <strong className="text-white">{order.items.length} dishes</strong></div>
                        <div>{t.responsibleServer} <strong className="text-white">{order.serverName}</strong></div>
                      </div>

                      {/* Action */}
                      <button
                        onClick={() => handleAdvanceStatus(order.id, 'SERVED')}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs font-mono shadow-md transition-all flex items-center justify-center gap-1.5 pos-key"
                      >
                        <IconCheckCircle className="w-4 h-4" />
                        <span>{t.servedBtn}</span>
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
