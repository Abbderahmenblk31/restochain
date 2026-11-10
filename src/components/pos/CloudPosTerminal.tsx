'use client';

// =============================================================================
// RestoChain OS - Bespoke Enterprise Cloud POS Terminal
// Architectural Visual Floor Plan, Physical Tactile Numpad, Michelin-Grade Ergonomics
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { MenuItem, MenuItemVariant, MenuItemModifier, RestaurantOrder } from '@/lib/types';
import { ReceiptModal } from '@/components/pos/ReceiptModal';
import { soundFx } from '@/lib/utils/audio';
import {
  IconPos,
  IconTable,
  IconPlus,
  IconMinus,
  IconTrash,
  IconReceipt,
  IconKitchen,
  IconClock,
  IconCheckCircle,
} from '@/components/icons/RestoIcons';

type DiningZone = 'MAIN_HALL' | 'TERRACE' | 'VIP_LOUNGE';

export function CloudPosTerminal() {
  const {
    state,
    activeBranch,
    addToCart,
    updateCartItemQuantity,
    clearCart,
    submitCartOrder,
  } = useRestoStore();
  const { locale, t } = useLanguage();

  const [activeZone, setActiveZone] = useState<DiningZone>('MAIN_HALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTableNumber, setSelectedTableNumber] = useState<number>(3);
  const [orderType, setOrderType] = useState<'DINE_IN' | 'TAKEAWAY' | 'DELIVERY'>('DINE_IN');
  const [customerNotes, setCustomerNotes] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Customization Modal State
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [chosenVariant, setChosenVariant] = useState<MenuItemVariant | undefined>(undefined);
  const [chosenModifiers, setChosenModifiers] = useState<MenuItemModifier[]>([]);
  const [itemCustomNote, setItemCustomNote] = useState('');

  // Payment & Numpad State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [lastGeneratedOrder, setLastGeneratedOrder] = useState<RestaurantOrder | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [cashTenderedStr, setCashTenderedStr] = useState<string>('50');

  // Filter Menu Items
  const filteredItems = state.menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.categoryId === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameFr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Financial Calculations
  const cartSubtotal = state.activeCart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const taxAmount = cartSubtotal * 0.07; // 7% VAT
  const totalAmount = Math.max(0, cartSubtotal + taxAmount - appliedDiscount);
  const cashTendered = parseFloat(cashTenderedStr) || 0;
  const changeDue = Math.max(0, cashTendered - totalAmount);

  // Add Item Handler with tactile audio
  const handleItemClick = (item: MenuItem) => {
    soundFx.playClick();
    if (item.variants && item.variants.length > 0) {
      setCustomizingItem(item);
      setChosenVariant(item.variants[0]);
      setChosenModifiers([]);
      setItemCustomNote('');
    } else {
      addToCart({
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        menuItemId: item.id,
        name: locale === 'ar' ? item.name : item.nameFr,
        unitPrice: item.price,
        quantity: 1,
        selectedModifiers: [],
      });
    }
  };

  const handleConfirmCustomization = () => {
    if (!customizingItem) return;
    soundFx.playClick();
    const extraPrice = chosenModifiers.reduce((acc, m) => acc + m.price, 0);
    const unitPrice = (chosenVariant ? chosenVariant.price : customizingItem.price) + extraPrice;

    addToCart({
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      menuItemId: customizingItem.id,
      name: locale === 'ar' ? customizingItem.name : customizingItem.nameFr,
      unitPrice,
      quantity: 1,
      selectedVariant: chosenVariant,
      selectedModifiers: chosenModifiers,
      specialNotes: itemCustomNote.trim() || undefined,
    });

    setCustomizingItem(null);
  };

  const toggleModifier = (mod: MenuItemModifier) => {
    soundFx.playClick();
    if (chosenModifiers.some((m) => m.id === mod.id)) {
      setChosenModifiers(chosenModifiers.filter((m) => m.id !== mod.id));
    } else {
      setChosenModifiers([...chosenModifiers, mod]);
    }
  };

  // Numpad key input handler
  const handleNumpadKey = (key: string) => {
    soundFx.playClick();
    if (key === 'C') {
      setCashTenderedStr('');
    } else if (key === '⌫') {
      setCashTenderedStr((prev) => prev.slice(0, -1));
    } else if (key === 'EXACT') {
      setCashTenderedStr(totalAmount.toFixed(3));
    } else if (key.startsWith('+')) {
      const add = parseFloat(key.replace('+', ''));
      setCashTenderedStr((prev) => ((parseFloat(prev) || 0) + add).toFixed(0));
    } else {
      setCashTenderedStr((prev) => (prev === '0' ? key : prev + key));
    }
  };

  const handleCompletePayment = (paymentMethod: 'CASH' | 'CARD' | 'DELIVERY_APP') => {
    soundFx.playCashRegister();
    const newOrder = submitCartOrder(
      orderType,
      orderType === 'DINE_IN' ? selectedTableNumber : undefined,
      customerNotes,
      paymentMethod
    );

    if (newOrder) {
      setLastGeneratedOrder(newOrder);
      setCheckoutModalOpen(false);
      setShowReceipt(true);
      setAppliedDiscount(0);
      setDiscountCode('');
      setCustomerNotes('');
      setCashTenderedStr('50');
    }
  };

  const branchName = locale === 'ar' ? activeBranch?.name : activeBranch?.nameFr || activeBranch?.name;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
      
      {/* Top Professional Station Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">
            <IconPos className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight text-slate-900 dark:text-white uppercase">
                {t.posTitle}
              </h1>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                TERMINAL-01 • ONLINE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              {branchName} • Shift #104 (Amine B.)
            </p>
          </div>
        </div>

        {/* Order Mode Selector with tactile physical feel */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl gap-1 border border-slate-200 dark:border-slate-800">
          {(['DINE_IN', 'TAKEAWAY', 'DELIVERY'] as const).map((mode) => {
            const labels = {
              DINE_IN: t.dineIn,
              TAKEAWAY: t.takeaway,
              DELIVERY: t.delivery,
            };
            const isSelected = orderType === mode;
            return (
              <button
                key={mode}
                onClick={() => {
                  soundFx.playClick();
                  setOrderType(mode);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all pos-key ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {labels[mode]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Architectural Floor Plan Grid (When Dine-In is active) */}
      {orderType === 'DINE_IN' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <IconTable className="w-4 h-4 text-amber-500" />
                {t.floorPlanTitle}
              </span>

              {/* Zone Selector Pills */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                {[
                  { id: 'MAIN_HALL', label: locale === 'ar' ? 'القاعة الكبرى' : locale === 'fr' ? 'Salle Principale' : 'Main Dining' },
                  { id: 'TERRACE', label: locale === 'ar' ? 'التراس المفتوح' : locale === 'fr' ? 'Terrasse' : 'Terrace Garden' },
                  { id: 'VIP_LOUNGE', label: locale === 'ar' ? 'صالون VIP' : locale === 'fr' ? 'Salon VIP' : 'VIP Lounge' },
                ].map((z) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveZone(z.id as DiningZone);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                      activeZone === z.id
                        ? 'bg-white dark:bg-slate-800 text-amber-500 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Legend */}
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> {t.tableAvailable}
              </span>
              <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> {t.tableOccupied}
              </span>
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span> {t.tableBillRequested}
              </span>
            </div>
          </div>

          {/* Real Visual Table Layout with physical shapes & timers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-1">
            {state.tables.map((table) => {
              const isSelected = selectedTableNumber === table.number;
              const isRound = table.capacity <= 2;
              const isOccupied = table.status === 'OCCUPIED';
              const isBillReq = table.status === 'BILL_REQUESTED';

              const borderClass = isSelected
                ? 'ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-[#121722] border-amber-500'
                : isBillReq
                ? 'border-amber-400/80 bg-amber-500/10 text-amber-600 dark:text-amber-300'
                : isOccupied
                ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300'
                : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400 text-slate-700 dark:text-slate-300';

              return (
                <button
                  key={table.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedTableNumber(table.number);
                  }}
                  className={`relative p-3 rounded-2xl border text-center transition-all flex flex-col justify-between h-24 pos-key ${borderClass} ${
                    isRound ? 'aspect-square' : ''
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs font-black">
                      T-{table.number}
                    </span>
                    <span className="text-[10px] opacity-75 font-mono">
                      👤 {table.capacity}
                    </span>
                  </div>

                  <div className="my-auto">
                    {isOccupied && (
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono font-black block">
                          {table.currentBill ? `${table.currentBill.toFixed(0)} ${t.currency}` : 'Active'}
                        </span>
                        <span className="text-[9px] font-mono opacity-80 flex items-center justify-center gap-1">
                          <IconClock className="w-2.5 h-2.5" /> 38m
                        </span>
                      </div>
                    )}
                    {isBillReq && (
                      <span className="text-[10px] font-bold text-amber-500 animate-pulse block">
                        طلب الحساب
                      </span>
                    )}
                    {!isOccupied && !isBillReq && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                        شاغرة
                      </span>
                    )}
                  </div>

                  <div className="text-[9px] text-slate-400 truncate w-full">
                    {table.waiterName ? `👨‍🍳 ${table.waiterName}` : '—'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Split Screen: Menu Catalog (62%) & Real-Time Physical Ticket (38%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Side: High-Contrast Dishes Catalog */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Category Filter Pills & Instant Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory('ALL');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all pos-key ${
                  selectedCategory === 'ALL'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'bg-white dark:bg-[#121722] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {t.allCategories}
              </button>
              {state.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all pos-key ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'bg-white dark:bg-[#121722] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {locale === 'ar' ? cat.name : cat.nameFr || cat.name}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-56 shrink-0">
              <input
                type="text"
                placeholder={t.searchMenuPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#121722] border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {filteredItems.map((item) => {
              const displayName = locale === 'ar' ? item.name : item.nameFr;
              const subName = locale === 'ar' ? item.nameFr : item.name;
              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="cursor-pointer group p-4 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-500/80 hover:shadow-md transition-all flex flex-col justify-between pos-key"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                        {displayName}
                      </h3>
                      {item.variants && item.variants.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                          {t.multipleSizesBadge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans line-clamp-1 mt-0.5">
                      {subName}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="font-mono text-sm font-black text-slate-900 dark:text-white">
                      {item.price.toFixed(3)} <span className="text-xs text-amber-500">{t.currency}</span>
                    </span>
                    <button className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                      <IconPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Professional POS Order Docket & Financial Summary */}
        <div className="lg:col-span-4 bg-white dark:bg-[#121722] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-5 flex flex-col space-y-4 sticky top-20">
          
          {/* Ticket Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>{t.currentOrderTitle}</span>
                {orderType === 'DINE_IN' && selectedTableNumber && (
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono font-bold">
                    T-{selectedTableNumber}
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                {state.activeCart.length} {t.itemsInCart}
              </p>
            </div>

            {state.activeCart.length > 0 && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  clearCart();
                }}
                className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1"
                title={t.clearCartBtn}
              >
                <IconTrash className="w-3.5 h-3.5" />
                <span>{t.clearCartBtn}</span>
              </button>
            )}
          </div>

          {/* Cart Items List */}
          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pe-1">
            {state.activeCart.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <IconPos className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                <p className="text-xs font-bold">{t.emptyCartTitle}</p>
                <p className="text-[11px]">{t.emptyCartDesc}</p>
              </div>
            ) : (
              state.activeCart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        {item.name}
                      </h4>
                      {item.selectedVariant && (
                        <span className="text-[10px] text-amber-500 font-bold block">
                          • {item.selectedVariant.name}
                        </span>
                      )}
                      {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                        <span className="text-[10px] text-slate-400 block">
                          + {item.selectedModifiers.map(m => m.name).join(', ')}
                        </span>
                      )}
                      {item.specialNotes && (
                        <span className="text-[10px] text-amber-500 italic block">
                          {item.specialNotes}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                      {(item.unitPrice * item.quantity).toFixed(3)} {t.currency}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.unitPrice.toFixed(3)} {t.perItem}
                    </span>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-2 py-0.5">
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          updateCartItemQuantity(item.id, item.quantity - 1);
                        }}
                        className="text-slate-400 hover:text-rose-500 font-bold text-xs"
                      >
                        <IconMinus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-xs px-2 text-slate-800 dark:text-slate-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          updateCartItemQuantity(item.id, item.quantity + 1);
                        }}
                        className="text-slate-400 hover:text-emerald-500 font-bold text-xs"
                      >
                        <IconPlus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Kitchen Notes */}
          {state.activeCart.length > 0 && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t.kitchenNotesLabel}
              </label>
              <input
                type="text"
                placeholder={t.kitchenNotesPlaceholder}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          )}

          {/* Financial Calculation Summary */}
          {state.activeCart.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>{t.subtotalHt}</span>
                <span className="font-mono">{cartSubtotal.toFixed(3)} {t.currency}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{t.vatLabel}</span>
                <span className="font-mono">{taxAmount.toFixed(3)} {t.currency}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-rose-500 font-bold">
                  <span>{t.discountApplied}</span>
                  <span className="font-mono">-{appliedDiscount.toFixed(3)} {t.currency}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>{t.totalNet}</span>
                <span className="font-mono text-amber-500">
                  {totalAmount.toFixed(3)} {t.currency}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {state.activeCart.length > 0 && (
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setCheckoutModalOpen(true);
                }}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all pos-key"
              >
                <IconReceipt className="w-4 h-4" />
                <span>{t.payAndPrintBtn} ({totalAmount.toFixed(3)} {t.currency})</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playKitchenBell();
                  const ord = submitCartOrder(orderType, selectedTableNumber, customerNotes, 'CASH');
                  if (ord) {
                    alert(`${t.confirm}: ${ord.ticketNumber}`);
                  }
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors pos-key"
              >
                <IconKitchen className="w-4 h-4" />
                <span>{t.sendKdsOnlyBtn}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Item Customization Dialog */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121722] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {t.customizeTitle}: {locale === 'ar' ? customizingItem.name : customizingItem.nameFr}
                </h3>
                <p className="text-xs text-slate-400">{customizingItem.description}</p>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Sizes */}
            {customizingItem.variants && customizingItem.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.chooseSize}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {customizingItem.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        soundFx.playClick();
                        setChosenVariant(v);
                      }}
                      className={`p-3 rounded-xl border text-center transition-all pos-key ${
                        chosenVariant?.id === v.id
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-xs">{v.name}</div>
                      <div className="text-xs font-mono font-bold mt-1">{v.price.toFixed(3)} {t.currency}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Addons */}
            {customizingItem.availableModifiers && customizingItem.availableModifiers.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.optionalAddons}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {customizingItem.availableModifiers.map((mod) => {
                    const isSelected = chosenModifiers.some((m) => m.id === mod.id);
                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleModifier(mod)}
                        className={`p-2.5 rounded-xl border text-start flex items-center justify-between text-xs transition-all pos-key ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{mod.name}</span>
                        <span className="font-mono text-[11px]">+{mod.price.toFixed(3)} {t.currency}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.chefNoteLabel}
              </label>
              <input
                type="text"
                placeholder={t.chefNotePlaceholder}
                value={itemCustomNote}
                onChange={(e) => setItemCustomNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCustomizingItem(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmCustomization}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 pos-key"
              >
                {t.addToOrderBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tactile Hardware Checkout & Numpad Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121722] rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {t.paymentModalTitle}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {t.amountDue} <strong className="text-amber-500 text-base">{totalAmount.toFixed(3)} {t.currency}</strong>
                </p>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleCompletePayment('CASH')}
                className="p-3 rounded-2xl border border-amber-500 bg-amber-500/10 text-amber-500 text-center font-bold text-xs pos-key"
              >
                <div className="text-lg mb-1">💵</div>
                <div>{t.payCash}</div>
              </button>
              <button
                onClick={() => handleCompletePayment('CARD')}
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-900 text-center font-bold text-xs pos-key"
              >
                <div className="text-lg mb-1">💳</div>
                <div>{t.payCard}</div>
              </button>
              <button
                onClick={() => handleCompletePayment('DELIVERY_APP')}
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-900 text-center font-bold text-xs pos-key"
              >
                <div className="text-lg mb-1">🛵</div>
                <div>{t.payDeliveryApp}</div>
              </button>
            </div>

            {/* Hardware Cash Numpad with Bill Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
              
              {/* Display & Quick Tender */}
              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {t.cashReceived}
                  </label>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xl font-black text-end text-slate-900 dark:text-white">
                    {cashTenderedStr || '0.000'} <span className="text-xs text-amber-500">{t.currency}</span>
                  </div>
                </div>

                {/* Change Due Display */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {t.changeDue}
                  </div>
                  <div className="text-xl font-mono font-black text-emerald-500 text-end">
                    {changeDue.toFixed(3)} {t.currency}
                  </div>
                </div>

                {/* Quick Bills buttons */}
                <div className="grid grid-cols-3 gap-1.5">
                  {['+10', '+20', '+50', 'EXACT'].map((bill) => (
                    <button
                      key={bill}
                      onClick={() => handleNumpadKey(bill)}
                      className="py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-xs pos-key hover:border-amber-500"
                    >
                      {bill === 'EXACT' ? 'Exact' : `${bill} DT`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical Keypad Grid */}
              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
                  <button
                    key={k}
                    onClick={() => handleNumpadKey(k)}
                    className={`py-3 rounded-xl font-mono text-sm font-bold pos-key transition-all ${
                      k === 'C'
                        ? 'bg-rose-500/20 text-rose-500 hover:bg-rose-500/30'
                        : k === '⌫'
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm Payment Button */}
            <button
              onClick={() => handleCompletePayment('CASH')}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 pos-key"
            >
              <IconCheckCircle className="w-5 h-5" />
              <span>تأكيد استلام النقدية وإصدار الفاتورة ({totalAmount.toFixed(3)} {t.currency})</span>
            </button>
          </div>
        </div>
      )}

      {/* Generated Thermal Receipt Modal */}
      {showReceipt && lastGeneratedOrder && activeBranch && (
        <ReceiptModal
          order={lastGeneratedOrder}
          branch={activeBranch}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
}
