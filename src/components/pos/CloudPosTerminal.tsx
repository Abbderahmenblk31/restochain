'use client';

// =============================================================================
// RestoChain OS — Minimalist Luxury POS Terminal
// Zero loud borders, unified harmonious palette, bespoke typography & tactile clarity
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { MenuItem, MenuItemVariant, MenuItemModifier, RestaurantOrder } from '@/lib/types';
import { ReceiptModal } from '@/components/pos/ReceiptModal';
import { soundFx } from '@/lib/utils/audio';
import {
  IconPlus,
  IconMinus,
  IconTrash,
  IconReceipt,
  IconKitchen,
} from '@/components/icons/RestoIcons';

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

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTableNumber, setSelectedTableNumber] = useState<number>(3);
  const [orderType, setOrderType] = useState<'DINE_IN' | 'TAKEAWAY' | 'DELIVERY'>('DINE_IN');
  const [customerNotes, setCustomerNotes] = useState('');

  // Customization & Payment States
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [chosenVariant, setChosenVariant] = useState<MenuItemVariant | undefined>(undefined);
  const [chosenModifiers, setChosenModifiers] = useState<MenuItemModifier[]>([]);
  const [itemCustomNote, setItemCustomNote] = useState('');

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [lastGeneratedOrder, setLastGeneratedOrder] = useState<RestaurantOrder | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [cashTenderedStr, setCashTenderedStr] = useState<string>('50');

  // Filter Dishes
  const filteredItems = state.menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.categoryId === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameFr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartSubtotal = state.activeCart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const taxAmount = cartSubtotal * 0.07;
  const totalAmount = cartSubtotal + taxAmount;
  const cashTendered = parseFloat(cashTenderedStr) || 0;
  const changeDue = Math.max(0, cashTendered - totalAmount);

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
      setCustomerNotes('');
      setCashTenderedStr('50');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Sub-Bar: Order Mode & Table Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Order Mode Pills */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-white/5 p-1 rounded-2xl border border-slate-300/50 dark:border-white/5">
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
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {labels[mode]}
              </button>
            );
          })}
        </div>

        {/* Table Strip (Dine-in only) */}
        {orderType === 'DINE_IN' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-bold pe-1 shrink-0">
              {t.tableLabel}:
            </span>
            {state.tables.map((table) => {
              const isSelected = selectedTableNumber === table.number;
              const isOccupied = table.status === 'OCCUPIED';
              const isBillReq = table.status === 'BILL_REQUESTED';
              return (
                <button
                  key={table.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedTableNumber(table.number);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-600 text-white font-black shadow-xs ring-2 ring-amber-500/30'
                      : 'bg-white dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-white/10 hover:border-slate-400'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isBillReq
                        ? 'bg-amber-400 animate-pulse'
                        : isOccupied
                        ? 'bg-slate-400'
                        : 'bg-emerald-500'
                    }`}
                  ></span>
                  <span>T{table.number}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Grid: Catalog & Side Order Docket */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Category Filter & Clean Dish Cards */}
        <div className="md:col-span-7 lg:col-span-8 space-y-5">
          
          {/* Category Tabs & Clean Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory('ALL');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                  selectedCategory === 'ALL'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                    : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5'
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                      : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5'
                  }`}
                >
                  {locale === 'ar' ? cat.name : cat.nameFr || cat.name}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-60 shrink-0">
              <input
                type="text"
                placeholder={t.searchMenuPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>

          {/* Dishes Grid — High-contrast, tactile, enterprise luxury restaurant cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const displayName = locale === 'ar' ? item.name : item.nameFr;
              const subName = locale === 'ar' ? item.nameFr : item.name;
              
              // Elegant Category Icon mapping
              const categoryIcon = item.categoryId === 'CAT-BURGERS' ? '🍔'
                : item.categoryId === 'CAT-PIZZA' ? '🍕'
                : item.categoryId === 'CAT-STEAKS' ? '🥩'
                : item.categoryId === 'CAT-PASTA' ? '🍝'
                : item.categoryId === 'CAT-DRINKS' ? '🍹'
                : '🍰';

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="cursor-pointer group p-4 rounded-2xl bg-white dark:bg-[#121622] border border-slate-200 dark:border-white/10 hover:border-amber-500/50 hover:shadow-lg transition-all flex flex-col justify-between min-h-[195px] relative"
                >
                  <div>
                    {/* Top Row: Category Icon, Time & Customization indicator */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base">{categoryIcon}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                          ⏱ {item.preparationMinutes}m
                        </span>
                        {item.variants && item.variants.length > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-[9px] border border-amber-500/20">
                            {locale === 'ar' ? 'خيارات' : 'Options'}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                      {displayName}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {subName}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-base font-black text-amber-600 dark:text-amber-400">
                        {item.price.toFixed(3)}
                      </span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        {t.currency}
                      </span>
                    </div>

                    <span className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 group-hover:bg-amber-600 dark:group-hover:bg-amber-400 text-xs font-bold transition-colors flex items-center gap-1 shadow-xs">
                      <IconPlus className="w-3.5 h-3.5" />
                      <span>{locale === 'ar' ? 'إضافة' : locale === 'fr' ? 'Ajouter' : 'Add'}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Seamless Order Docket */}
        <div id="order-docket" className="md:col-span-5 lg:col-span-4 bg-white dark:bg-[#121622] rounded-2xl p-5 space-y-4 sticky top-20 border border-slate-200 dark:border-white/10 shadow-sm">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
            <div>
              <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>{t.currentOrderTitle}</span>
                {orderType === 'DINE_IN' && selectedTableNumber && (
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    (T{selectedTableNumber})
                  </span>
                )}
              </h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {state.activeCart.length} {t.itemsInCart}
              </p>
            </div>

            {state.activeCart.length > 0 && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  clearCart();
                }}
                className="text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors"
              >
                {t.clearCartBtn}
              </button>
            )}
          </div>

          {/* Cart Item Rows */}
          <div className="space-y-3 max-h-[340px] overflow-y-auto pe-1">
            {state.activeCart.length === 0 ? (
              <div className="py-14 text-center text-slate-400 space-y-2">
                <div className="text-3xl">🧾</div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.emptyCartTitle}</p>
                <p className="text-[11px] text-slate-500">{t.emptyCartDesc}</p>
              </div>
            ) : (
              state.activeCart.map((item) => (
                <div
                  key={item.id}
                  className="py-2.5 border-b border-slate-100 dark:border-white/10 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </h4>
                      {item.selectedVariant && (
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block">
                          {item.selectedVariant.name}
                        </span>
                      )}
                      {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                          {item.selectedModifiers.map(m => m.name).join(', ')}
                        </span>
                      )}
                      {item.specialNotes && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 block italic font-medium">
                          {item.specialNotes}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                      {(item.unitPrice * item.quantity).toFixed(3)}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium">
                      {item.unitPrice.toFixed(3)} {t.perItem}
                    </span>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          updateCartItemQuantity(item.id, item.quantity - 1);
                        }}
                        className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 flex items-center justify-center font-bold"
                      >
                        <IconMinus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-black text-xs px-1.5 text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          updateCartItemQuantity(item.id, item.quantity + 1);
                        }}
                        className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 flex items-center justify-center font-bold"
                      >
                        <IconPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Special Notes */}
          {state.activeCart.length > 0 && (
            <div>
              <input
                type="text"
                placeholder={t.kitchenNotesPlaceholder}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          )}

          {/* Financial Calculation */}
          {state.activeCart.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/10 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                <span>{t.subtotalHt}</span>
                <span className="font-mono font-bold">{cartSubtotal.toFixed(3)} {t.currency}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                <span>{t.vatLabel}</span>
                <span className="font-mono font-bold">{taxAmount.toFixed(3)} {t.currency}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-white/10">
                <span>{t.totalNet}</span>
                <span className="font-mono text-base font-extrabold text-amber-600 dark:text-amber-400">{totalAmount.toFixed(3)} {t.currency}</span>
              </div>
            </div>
          )}

          {/* Primary Action Buttons */}
          {state.activeCart.length > 0 && (
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setCheckoutModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs transition-transform active:scale-[0.99] flex items-center justify-center gap-2 shadow-md hover:bg-amber-600 hover:text-white dark:hover:bg-amber-400 transition-colors"
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
                className="w-full py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10"
              >
                <IconKitchen className="w-3.5 h-3.5" />
                <span>{t.sendKdsOnlyBtn}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Sticky Mobile / Tablet Order Bar when items exist */}
      {state.activeCart.length > 0 && (
        <div className="md:hidden fixed bottom-4 inset-x-4 z-40 bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl flex items-center justify-between border border-white/15">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
              {state.activeCart.length}
            </span>
            <div>
              <div className="text-xs font-bold">{t.currentOrderTitle}</div>
              <div className="text-xs font-mono text-amber-400 font-extrabold">{totalAmount.toFixed(3)} {t.currency}</div>
            </div>
          </div>
          <button
            onClick={() => {
              const docket = document.getElementById('order-docket');
              if (docket) docket.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl bg-white text-slate-950 font-extrabold text-xs shadow-md"
          >
            {locale === 'ar' ? 'عرض الفاتورة' : locale === 'fr' ? 'Voir le Panier' : 'View Docket'} →
          </button>
        </div>
      )}

      {/* Item Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#11141d] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {locale === 'ar' ? customizingItem.name : customizingItem.nameFr}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{customizingItem.description}</p>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-lg font-bold p-1"
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
                      className={`p-3 rounded-xl text-center text-xs font-bold transition-all ${
                        chosenVariant?.id === v.id
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5'
                      }`}
                    >
                      <div>{v.name}</div>
                      <div className="font-mono text-xs font-black text-amber-600 dark:text-amber-400 mt-1">{v.price.toFixed(3)} {t.currency}</div>
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
                        className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5'
                        }`}
                      >
                        <span>{mod.name}</span>
                        <span className="font-mono text-[11px] font-black text-amber-600 dark:text-amber-400">+{mod.price.toFixed(3)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => setCustomizingItem(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmCustomization}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs hover:bg-amber-600 transition-colors"
              >
                {t.addToOrderBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#11141d] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {t.paymentModalTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  {t.amountDue} <strong className="text-amber-600 dark:text-amber-400 text-sm font-black">{totalAmount.toFixed(3)} {t.currency}</strong>
                </p>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleCompletePayment('CASH')}
                className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-center font-bold text-xs text-slate-900 dark:text-white transition-colors border border-slate-200 dark:border-white/5"
              >
                💵 {t.payCash}
              </button>
              <button
                onClick={() => handleCompletePayment('CARD')}
                className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-center font-bold text-xs text-slate-900 dark:text-white transition-colors border border-slate-200 dark:border-white/5"
              >
                💳 {t.payCard}
              </button>
              <button
                onClick={() => handleCompletePayment('DELIVERY_APP')}
                className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-center font-bold text-xs text-slate-900 dark:text-white transition-colors border border-slate-200 dark:border-white/5"
              >
                🛵 {t.payDeliveryApp}
              </button>
            </div>

            {/* Numpad & Quick Tender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {t.cashReceived}
                  </label>
                  <div className="p-3 rounded-xl bg-white dark:bg-[#11141d] font-mono text-xl font-black text-slate-900 dark:text-white text-end border border-slate-200 dark:border-white/10">
                    {cashTenderedStr || '0.000'} <span className="text-xs text-slate-500">{t.currency}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <div className="text-[10px] font-bold uppercase">{t.changeDue}</div>
                  <div className="text-lg font-mono font-black text-end">
                    {changeDue.toFixed(3)} {t.currency}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {['+10', '+20', '+50', 'EXACT'].map((bill) => (
                    <button
                      key={bill}
                      onClick={() => handleNumpadKey(bill)}
                      className="py-1.5 rounded-lg bg-white dark:bg-[#11141d] font-mono text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 border border-slate-200 dark:border-white/10 transition-colors"
                    >
                      {bill === 'EXACT' ? 'Exact' : `${bill}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical Keys */}
              <div className="grid grid-cols-3 gap-1.5">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
                  <button
                    key={k}
                    onClick={() => handleNumpadKey(k)}
                    className="py-3 rounded-lg font-mono text-xs font-black bg-white dark:bg-[#11141d] text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleCompletePayment('CASH')}
              className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs transition-transform active:scale-[0.99] hover:bg-amber-600 transition-colors shadow-md"
            >
              {t.confirm} ({totalAmount.toFixed(3)} {t.currency})
            </button>
          </div>
        </div>
      )}

      {/* Thermal Receipt */}
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
