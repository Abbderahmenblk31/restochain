'use client';

// =============================================================================
// RestoChain OS — Minimalist Luxury Kitchen Display System (KDS)
// Seamless elevated tickets, quiet harmonious status dots, crystal-clear typography
// =============================================================================

import React, { useState, useEffect } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { soundFx } from '@/lib/utils/audio';
import {
  IconKitchen,
  IconCheckCircle,
} from '@/components/icons/RestoIcons';

export function KitchenDisplayBoard() {
  const { state, activeBranch, updateOrderStatus } = useRestoStore();
  const { locale, t } = useLanguage();
  const [selectedStation, setSelectedStation] = useState<string>('ALL');
  const [struckItems, setStruckItems] = useState<Record<string, boolean>>({});

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
        dot: 'bg-emerald-500',
        text: 'text-neutral-500 dark:text-neutral-400',
        label: `${minutes}m`,
      };
    } else if (minutes < 18) {
      return {
        dot: 'bg-amber-500',
        text: 'text-amber-600 dark:text-amber-400 font-bold',
        label: `${minutes}m`,
      };
    } else {
      return {
        dot: 'bg-rose-500 animate-pulse',
        text: 'text-rose-600 dark:text-rose-400 font-black',
        label: `${minutes}m`,
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <span>{t.kdsTitle}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            {activeOrders.length} {t.kdsActiveTicketsCount}
          </p>
        </div>

        {/* Quiet Station Tabs */}
        <div className="flex items-center gap-1 bg-neutral-200/50 dark:bg-white/5 p-1 rounded-xl">
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                selectedStation === st.id
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Quiet Operational Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: NEW */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200/60 dark:border-white/5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {t.colNew}
            </h2>
            <span className="font-mono text-xs text-neutral-400">
              {activeOrders.filter((o) => o.status === 'NEW').length}
            </span>
          </div>

          <div className="space-y-3">
            {activeOrders.filter((o) => o.status === 'NEW').length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-400">
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
                      className="quiet-card rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                            {order.ticketNumber}
                          </span>
                          <span className="text-xs text-neutral-400 block">
                            {order.type === 'DINE_IN' ? `Table ${order.tableNumber}` : t.takeaway}
                          </span>
                        </div>
                        <span className={`text-xs font-mono flex items-center gap-1.5 ${timer.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${timer.dot}`}></span>
                          {timer.label}
                        </span>
                      </div>

                      <div className="space-y-1.5 py-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start text-xs">
                            <span className="font-medium text-neutral-800 dark:text-neutral-200">
                              {item.name}
                            </span>
                            <span className="font-mono text-neutral-400">
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.customerNotes && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                          {order.customerNotes}
                        </p>
                      )}

                      <button
                        onClick={() => handleAdvanceStatus(order.id, 'PREPARING')}
                        className="w-full py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold text-xs"
                      >
                        {t.startCookingBtn}
                      </button>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Column 2: PREPARING */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200/60 dark:border-white/5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {t.colPreparing}
            </h2>
            <span className="font-mono text-xs text-neutral-400">
              {activeOrders.filter((o) => o.status === 'PREPARING').length}
            </span>
          </div>

          <div className="space-y-3">
            {activeOrders.filter((o) => o.status === 'PREPARING').length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-400">
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
                      className="quiet-card rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                            {order.ticketNumber}
                          </span>
                          <span className="text-xs text-neutral-400 block">
                            {order.type === 'DINE_IN' ? `Table ${order.tableNumber}` : t.takeaway}
                          </span>
                        </div>
                        <span className={`text-xs font-mono flex items-center gap-1.5 ${timer.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${timer.dot}`}></span>
                          {timer.label}
                        </span>
                      </div>

                      <div className="space-y-1 py-1">
                        {order.items.map((item, idx) => {
                          const itemKey = `${order.id}-${idx}`;
                          const isDone = struckItems[itemKey];
                          return (
                            <div
                              key={idx}
                              onClick={() => toggleItemStrike(itemKey)}
                              className={`flex justify-between items-start text-xs p-1.5 rounded cursor-pointer transition-colors ${
                                isDone
                                  ? 'text-neutral-400 line-through'
                                  : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5'
                              }`}
                            >
                              <span>{item.name}</span>
                              <span className="font-mono font-medium">x{item.quantity}</span>
                            </div>
                          );
                        })}
                      </div>

                      {order.customerNotes && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                          {order.customerNotes}
                        </p>
                      )}

                      <button
                        onClick={() => handleAdvanceStatus(order.id, 'READY')}
                        className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <IconCheckCircle className="w-3.5 h-3.5" />
                        <span>{t.markReadyBtn}</span>
                      </button>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Column 3: READY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200/60 dark:border-white/5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {t.colReady}
            </h2>
            <span className="font-mono text-xs text-neutral-400">
              {activeOrders.filter((o) => o.status === 'READY').length}
            </span>
          </div>

          <div className="space-y-3">
            {activeOrders.filter((o) => o.status === 'READY').length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-400">
                {t.noReadyOrders}
              </div>
            ) : (
              activeOrders
                .filter((o) => o.status === 'READY')
                .map((order) => (
                  <div
                    key={order.id}
                    className="quiet-card rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                          {order.ticketNumber}
                        </span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">
                          {order.type === 'DINE_IN' ? `Table ${order.tableNumber}` : t.takeaway}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400 font-mono">
                        {t.waitingRunner}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-400 font-mono space-y-0.5">
                      <div>{order.items.length} dishes • {order.serverName}</div>
                    </div>

                    <button
                      onClick={() => handleAdvanceStatus(order.id, 'SERVED')}
                      className="w-full py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <IconCheckCircle className="w-3.5 h-3.5" />
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
