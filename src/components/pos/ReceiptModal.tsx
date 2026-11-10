'use client';

// =============================================================================
// RestoChain OS - Authentic Thermal POS Paper Receipt Generator
// Serrated zigzag paper cut, high-contrast thermal font & fiscal QR code compliance
// =============================================================================

import React from 'react';
import { RestaurantOrder, BranchLocation } from '@/lib/types';
import { useLanguage } from '@/lib/context/LanguageContext';
import { IconPrinter, IconCheckCircle } from '@/components/icons/RestoIcons';

interface ReceiptModalProps {
  order: RestaurantOrder;
  branch: BranchLocation;
  onClose: () => void;
}

export function ReceiptModal({ order, branch, onClose }: ReceiptModalProps) {
  const { locale, t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  const branchName = locale === 'ar' ? branch.name : branch.nameFr || branch.name;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Modal Navigation */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <IconCheckCircle className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {t.receiptFiscalTitle}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold px-2"
          >
            ✕
          </button>
        </div>

        {/* Realistic Thermal Paper Container with serrated cut edge */}
        <div className="p-6 overflow-y-auto flex justify-center bg-slate-950">
          <div
            id="thermal-receipt"
            className="w-[320px] receipt-paper p-6 font-mono text-[11px] leading-relaxed select-text shadow-2xl"
          >
            {/* Store Brand */}
            <div className="text-center space-y-1 pb-4 border-b border-dashed border-slate-400">
              <h2 className="text-lg font-black tracking-widest uppercase">RESTOCHAIN OS</h2>
              <p className="text-xs font-bold uppercase">{branchName}</p>
              <p className="text-[10px] text-slate-600">{branch.address}</p>
              <p className="text-[10px] text-slate-600">Tel: {branch.phone}</p>
              <p className="text-[9px] text-slate-500 font-bold">MF: 1829471/B/A/M/000</p>
            </div>

            {/* Ticket Metadata */}
            <div className="py-3 border-b border-dashed border-slate-400 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>{t.receiptTicketNo}</span>
                <span className="font-black text-sm">{order.ticketNumber}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t.receiptDateTime}</span>
                <span>{new Date(order.createdAt).toLocaleString(locale === 'ar' ? 'fr-TN' : 'fr-FR', { hour12: false })}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.receiptType}</span>
                <span className="font-bold">
                  {order.type === 'DINE_IN'
                    ? `Table ${order.tableNumber || '-'}`
                    : order.type === 'TAKEAWAY'
                    ? t.takeaway
                    : t.delivery}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t.receiptServer}</span>
                <span>{order.serverName}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="py-3 border-b border-dashed border-slate-400">
              <div className="flex justify-between font-black text-[10px] uppercase text-slate-500 pb-1">
                <span>{t.receiptItem}</span>
                <span className="text-center">{t.receiptQty}</span>
                <span className="text-end">{t.receiptTotal}</span>
              </div>

              <div className="space-y-2 pt-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between font-bold">
                      <span className="truncate max-w-[170px]">{item.name}</span>
                      <span className="text-center font-mono">x{item.quantity}</span>
                      <span className="text-end font-mono">{(item.unitPrice * item.quantity).toFixed(3)}</span>
                    </div>
                    {item.selectedVariant && (
                      <div className="text-[10px] text-slate-600 ps-2">
                        • {item.selectedVariant.name}
                      </div>
                    )}
                    {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                      <div className="text-[10px] text-slate-600 ps-2">
                        {item.selectedModifiers.map(m => `+ ${m.name}`).join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary & Tax Breakdown */}
            <div className="py-3 border-b border-dashed border-slate-400 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span>{t.receiptGrossHt}</span>
                <span>{(order.totalAmount / 1.07).toFixed(3)} {t.currency}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t.receiptVat}</span>
                <span>{order.taxAmount.toFixed(3)} {t.currency}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>{t.discountApplied}</span>
                  <span>-{order.discountAmount.toFixed(3)} {t.currency}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black pt-2 border-t border-slate-800">
                <span>{t.receiptNetTotal}</span>
                <span className="text-lg font-mono font-black">{order.totalAmount.toFixed(3)} {t.currency}</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-600 pt-1">
                <span>{t.receiptPayMethod}</span>
                <span className="font-bold">
                  {order.paymentMethod === 'CASH'
                    ? t.payCash
                    : order.paymentMethod === 'CARD'
                    ? t.payCard
                    : t.payDeliveryApp}
                </span>
              </div>
            </div>

            {/* Electronic Compliance QR Simulation */}
            <div className="pt-4 text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-2 border border-slate-400 rounded bg-white">
                  <svg className="w-20 h-20" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="0" y="0" width="30" height="30" fill="#000" />
                    <rect x="5" y="5" width="20" height="20" fill="#fff" />
                    <rect x="10" y="10" width="10" height="10" fill="#000" />
                    <rect x="70" y="0" width="30" height="30" fill="#000" />
                    <rect x="75" y="5" width="20" height="20" fill="#fff" />
                    <rect x="80" y="10" width="10" height="10" fill="#000" />
                    <rect x="0" y="70" width="30" height="30" fill="#000" />
                    <rect x="5" y="75" width="20" height="20" fill="#fff" />
                    <rect x="10" y="80" width="10" height="10" fill="#000" />
                    <rect x="40" y="10" width="15" height="10" fill="#000" />
                    <rect x="45" y="30" width="25" height="15" fill="#000" />
                    <rect x="15" y="45" width="20" height="10" fill="#000" />
                    <rect x="40" y="60" width="20" height="20" fill="#000" />
                    <rect x="70" y="45" width="15" height="25" fill="#000" />
                    <rect x="70" y="80" width="25" height="15" fill="#000" />
                  </svg>
                </div>
              </div>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest">
                {t.receiptFiscalNotice}
              </p>
              <p className="text-[10px] font-black uppercase">{t.receiptThankYou}</p>
            </div>

            {/* Serrated zigzag edge */}
            <div className="receipt-zigzag-bottom mt-4"></div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-white"
          >
            {t.close}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 pos-key"
          >
            <IconPrinter className="w-4 h-4" />
            <span>{t.receiptPrintBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
