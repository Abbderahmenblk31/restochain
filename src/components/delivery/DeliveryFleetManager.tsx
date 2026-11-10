'use client';

// =============================================================================
// RestoChain OS - Delivery Fleet Dispatch & Aggregator Integration
// Glovo, Yassir Express and In-house dispatch management with real-time courier statuses
// Tri-Lingual (AR / FR / EN) with dynamic RTL/LTR support
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { DeliveryCourier } from '@/lib/types';
import {
  IconMotorcycle,
} from '@/components/icons/RestoIcons';

export function DeliveryFleetManager() {
  const { state, activeBranch } = useRestoStore();
  const { locale, t } = useLanguage();
  const [couriers, setCouriers] = useState<DeliveryCourier[]>(state.couriers);

  const toggleCourierStatus = (id: string) => {
    setCouriers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus =
            c.status === 'AVAILABLE'
              ? 'ON_DELIVERY'
              : c.status === 'ON_DELIVERY'
              ? 'OFFLINE'
              : 'AVAILABLE';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const deliveryOrders = [
    {
      id: 'del-01',
      platform: 'Glovo',
      platformColor: 'bg-amber-500 text-slate-950',
      customer: 'Anis Chahed',
      address: 'Residence Les Narcisses, Appt 402, Les Berges du Lac 2',
      itemsCount: 3,
      total: 64.5,
      status: 'ON_THE_WAY',
      courier: 'Karim Dridi',
      time: locale === 'ar' ? 'منذ 12 دقيقة' : locale === 'fr' ? 'Il y a 12 min' : '12 min ago',
    },
    {
      id: 'del-02',
      platform: 'Yassir Express',
      platformColor: 'bg-emerald-600 text-white',
      customer: 'Sarra Trabelsi',
      address: 'Avenue Hedi Nouira, Ennasr 2',
      itemsCount: 2,
      total: 42.0,
      status: 'ASSIGNED',
      courier: 'Rami Tounsi',
      time: locale === 'ar' ? 'منذ 4 دقائق' : locale === 'fr' ? 'Il y a 4 min' : '4 min ago',
    },
    {
      id: 'del-03',
      platform: 'RestoChain Direct',
      platformColor: 'bg-rose-600 text-white',
      customer: 'Dr. Moncef Ben Salem',
      address: 'Polyclinique El Manar, Rue Ibn Khaldoun',
      itemsCount: 4,
      total: 89.0,
      status: 'WAITING_DISPATCH',
      courier: locale === 'ar' ? 'في انتظار التعيين' : locale === 'fr' ? 'En attente' : 'Pending',
      time: locale === 'ar' ? 'منذ دقيقة' : locale === 'fr' ? 'Il y a 1 min' : '1 min ago',
    },
  ];

  const branchName = locale === 'ar' ? activeBranch?.name : activeBranch?.nameFr || activeBranch?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Delivery Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
            <IconMotorcycle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 dark:text-white">{t.deliveryTitle}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                {t.deliverySubtitle}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {t.activeBranchBadge}: <strong className="text-slate-800 dark:text-slate-200">{branchName}</strong> • {t.couriersActiveCount}: <strong className="text-slate-800 dark:text-slate-200">{couriers.filter(c => c.status !== 'OFFLINE').length}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-xs">
            Glovo API: Online ✅
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
            Yassir API: Online ✅
          </span>
        </div>
      </div>

      {/* Courier Fleet Cards */}
      <div className="bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <IconMotorcycle className="w-4 h-4 text-rose-600" />
          <span>{t.couriersFleetTitle}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {couriers.map((courier) => {
            const statusConfig = {
              AVAILABLE: { text: t.statusAvailable, color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
              ON_DELIVERY: { text: t.statusOnDelivery, color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
              OFFLINE: { text: t.statusOffline, color: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800' },
            };

            return (
              <div
                key={courier.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs">
                      {courier.name[0]}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        {courier.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono">{courier.phone}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusConfig[courier.status].color}`}>
                    {statusConfig[courier.status].text}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-1">
                  <span>{t.todayDeliveries} {courier.activeOrdersCount}</span>
                  <span>{t.plateLabel} {courier.vehiclePlate}</span>
                </div>

                <button
                  onClick={() => toggleCourierStatus(courier.id)}
                  className="w-full py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-rose-500 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {t.changeStatusBtn}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Dispatched Orders Stream */}
      <div className="bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <h2 className="text-sm font-black text-slate-900 dark:text-white">
          {t.liveOrdersTitle}
        </h2>

        <div className="space-y-3">
          {deliveryOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <span className={`px-3 py-1 rounded-xl text-xs font-black ${ord.platformColor} shrink-0`}>
                  {ord.platform}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      {ord.customer}
                    </span>
                    <span className="text-[11px] text-slate-400">• {ord.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    📍 {ord.address}
                  </p>
                  <div className="text-[11px] text-slate-400">
                    {t.driverLabel} <strong className="text-slate-800 dark:text-slate-200">{ord.courier}</strong> • {t.itemsCountText} {ord.itemsCount}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="font-mono font-black text-sm text-rose-600 dark:text-rose-400">
                  {ord.total.toFixed(3)} {t.currency}
                </span>

                {ord.status === 'WAITING_DISPATCH' ? (
                  <button
                    onClick={() => alert(locale === 'ar' ? 'تم تعيين السائق!' : 'Courier assigned!')}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    {t.assignCourierBtn}
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
                    {t.onTheWay}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
