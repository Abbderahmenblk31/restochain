'use client';

// =============================================================================
// RestoChain OS — Minimalist Luxury Delivery Fleet Dispatch
// Zero loud borders, quiet harmonious surfaces, unified typography
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { soundFx } from '@/lib/utils/audio';
import { DeliveryCourier } from '@/lib/types';

export function DeliveryFleetManager() {
  const { state, activeBranch } = useRestoStore();
  const { locale, t } = useLanguage();
  const [couriers, setCouriers] = useState<DeliveryCourier[]>(state.couriers);

  const toggleCourierStatus = (id: string) => {
    soundFx.playClick();
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
      customer: 'Anis Chahed',
      address: 'Residence Les Narcisses, Appt 402, Les Berges du Lac 2',
      itemsCount: 3,
      total: 64.5,
      courier: 'Karim Dridi',
      time: locale === 'ar' ? 'منذ 12 دقيقة' : '12 min ago',
    },
    {
      id: 'del-02',
      platform: 'Yassir',
      customer: 'Sarra Trabelsi',
      address: 'Avenue Hedi Nouira, Ennasr 2',
      itemsCount: 2,
      total: 42.0,
      courier: 'Rami Tounsi',
      time: locale === 'ar' ? 'منذ 4 دقائق' : '4 min ago',
    },
  ];

  const branchName = locale === 'ar' ? activeBranch?.name : activeBranch?.nameFr || activeBranch?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {t.deliveryTitle}
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          {branchName} • {couriers.filter(c => c.status !== 'OFFLINE').length} {t.couriersActiveCount}
        </p>
      </div>

      {/* Courier Fleet Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {t.couriersFleetTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {couriers.map((courier) => (
            <div
              key={courier.id}
              className="p-4 rounded-xl quiet-card space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-white">
                  {courier.name}
                </span>
                <span className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      courier.status === 'AVAILABLE'
                        ? 'bg-emerald-500'
                        : courier.status === 'ON_DELIVERY'
                        ? 'bg-amber-500'
                        : 'bg-neutral-400'
                    }`}
                  ></span>
                  <span>{courier.status}</span>
                </span>
              </div>

              <div className="text-[11px] font-mono text-neutral-400 flex justify-between">
                <span>{courier.phone}</span>
                <span>{courier.vehiclePlate}</span>
              </div>

              <button
                onClick={() => toggleCourierStatus(courier.id)}
                className="w-full py-1.5 rounded-lg text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {t.changeStatusBtn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Outbound Orders */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {t.liveOrdersTitle}
        </h2>

        <div className="space-y-2">
          {deliveryOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-4 rounded-xl quiet-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-900 dark:text-white font-mono uppercase">
                    {ord.platform}
                  </span>
                  <span className="text-neutral-400">• {ord.customer}</span>
                </div>
                <p className="text-neutral-400 text-[11px]">{ord.address}</p>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center font-mono">
                <span className="font-bold text-neutral-900 dark:text-white">
                  {ord.total.toFixed(3)} {t.currency}
                </span>
                <span className="text-neutral-400 text-[11px]">{ord.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
