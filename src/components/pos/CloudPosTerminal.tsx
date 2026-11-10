'use client';

// =============================================================================
// RestoChain OS - Enterprise Cloud POS Terminal
// Ultra-fast order builder, table selector, variant/modifier customization & split bill
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { MenuItem, MenuItemVariant, MenuItemModifier, OrderItem, RestaurantOrder } from '@/lib/types';
import { ReceiptModal } from '@/components/pos/ReceiptModal';
import {
  IconPos,
  IconTable,
  IconPlus,
  IconMinus,
  IconTrash,
  IconReceipt,
  IconKitchen,
  IconFilter,
  IconCheckCircle,
  IconAlertTriangle,
} from '@/components/icons/RestoIcons';

export function CloudPosTerminal() {
  const {
    state,
    activeBranch,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    submitCartOrder,
  } = useRestoStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTableNumber, setSelectedTableNumber] = useState<number | undefined>(4);
  const [orderType, setOrderType] = useState<'DINE_IN' | 'TAKEAWAY' | 'DELIVERY'>('DINE_IN');
  const [customerNotes, setCustomerNotes] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Customization Modal State
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [chosenVariant, setChosenVariant] = useState<MenuItemVariant | undefined>(undefined);
  const [chosenModifiers, setChosenModifiers] = useState<MenuItemModifier[]>([]);
  const [itemCustomNote, setItemCustomNote] = useState('');

  // Checkout & Receipt State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [lastGeneratedOrder, setLastGeneratedOrder] = useState<RestaurantOrder | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [cashReceived, setCashReceived] = useState<number>(50);

  // Filter Menu Items
  const filteredItems = state.menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.categoryId === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.nameFr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate Cart Financials
  const cartSubtotal = state.activeCart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const taxAmount = cartSubtotal * 0.07; // 7% Tunisian Hospitality VAT
  const totalAmount = Math.max(0, cartSubtotal + taxAmount - appliedDiscount);

  // Open item customization dialog or add directly
  const handleItemClick = (item: MenuItem) => {
    if (item.variants && item.variants.length > 0) {
      setCustomizingItem(item);
      setChosenVariant(item.variants[0]);
      setChosenModifiers([]);
      setItemCustomNote('');
    } else {
      addToCart({
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        menuItemId: item.id,
        name: item.name,
        unitPrice: item.price,
        quantity: 1,
        selectedModifiers: [],
      });
    }
  };

  const handleConfirmCustomization = () => {
    if (!customizingItem) return;
    const extraPrice = chosenModifiers.reduce((acc, m) => acc + m.price, 0);
    const unitPrice = (chosenVariant ? chosenVariant.price : customizingItem.price) + extraPrice;

    addToCart({
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      menuItemId: customizingItem.id,
      name: customizingItem.name,
      unitPrice,
      quantity: 1,
      selectedVariant: chosenVariant,
      selectedModifiers: chosenModifiers,
      specialNotes: itemCustomNote.trim() || undefined,
    });

    setCustomizingItem(null);
  };

  const toggleModifier = (mod: MenuItemModifier) => {
    if (chosenModifiers.some((m) => m.id === mod.id)) {
      setChosenModifiers(chosenModifiers.filter((m) => m.id !== mod.id));
    } else {
      setChosenModifiers([...chosenModifiers, mod]);
    }
  };

  const handleApplyPromo = () => {
    if (discountCode.trim().toUpperCase() === 'RESTO10') {
      const disc = cartSubtotal * 0.10;
      setAppliedDiscount(disc);
    } else if (discountCode.trim().toUpperCase() === 'VIP20') {
      const disc = cartSubtotal * 0.20;
      setAppliedDiscount(disc);
    } else {
      alert('كود الخصم غير صالح. جرب RESTO10 للحصول على 10% أو VIP20');
    }
  };

  const handleCompletePayment = (paymentMethod: 'CASH' | 'CARD' | 'DELIVERY_APP') => {
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
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top POS Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
            <IconPos className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 dark:text-white">نقطة البيع السحابية Cloud POS</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                محطة #01 - متصلة بالشبكة
              </span>
            </div>
            <p className="text-xs text-slate-500">
              الفرع: <strong className="text-slate-800 dark:text-slate-200">{activeBranch?.name}</strong> • الكاشير: <strong className="text-slate-800 dark:text-slate-200">محمد بن سالم</strong>
            </p>
          </div>
        </div>

        {/* Order Type Toggle */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl gap-1 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setOrderType('DINE_IN')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              orderType === 'DINE_IN'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-rose-600'
            }`}
          >
            صالة (Sur Place)
          </button>
          <button
            onClick={() => setOrderType('TAKEAWAY')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              orderType === 'TAKEAWAY'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-rose-600'
            }`}
          >
            سفري (À Emporter)
          </button>
          <button
            onClick={() => setOrderType('DELIVERY')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              orderType === 'DELIVERY'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-rose-600'
            }`}
          >
            توصيل (Livraison)
          </button>
        </div>
      </div>

      {/* Table Selector Strip (When Dine-in is active) */}
      {orderType === 'DINE_IN' && (
        <div className="p-4 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <IconTable className="w-4 h-4 text-rose-600" />
              اختر الطاولة المفتوحة (Plan de Salle):
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> شاغرة
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> مشغولة
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> تطلب الحساب
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {state.tables.map((table) => {
              const isSelected = selectedTableNumber === table.number;
              const statusColors = {
                AVAILABLE: 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300',
                OCCUPIED: 'border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300',
                BILL_REQUESTED: 'border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300',
                RESERVED: 'border-slate-300 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
              };

              return (
                <button
                  key={table.id}
                  onClick={() => setSelectedTableNumber(table.number)}
                  className={`px-3.5 py-2.5 rounded-2xl border text-center shrink-0 transition-all ${
                    isSelected
                      ? 'ring-2 ring-rose-600 ring-offset-2 scale-105 font-black bg-rose-600 text-white border-rose-600 shadow-md'
                      : statusColors[table.status]
                  }`}
                >
                  <div className="text-xs font-bold">طاولة {table.number}</div>
                  <div className="text-[10px] opacity-80">{table.capacity} مقاعد</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Split Grid: Menu Catalog (65%) & Live Cart (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left / Center: Menu Catalog */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Category Pills & Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === 'ALL'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-rose-400'
                }`}
              >
                الكل (All)
              </button>
              {state.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-rose-400'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="w-full sm:w-56 shrink-0">
              <input
                type="text"
                placeholder="بحث في القائمة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="cursor-pointer group p-3.5 rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                      {item.name}
                    </h3>
                    {item.variants && item.variants.length > 0 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                        أحجام متعددة
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans line-clamp-1 mt-0.5">
                    {item.nameFr}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-rose-600 dark:text-rose-400">
                    {item.price.toFixed(3)} د.ت
                  </span>
                  <button className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 group-hover:bg-rose-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <IconPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Cart & Order Builder (35%) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md p-5 flex flex-col space-y-4 sticky top-24">
          
          {/* Cart Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>طلب جاري</span>
                {orderType === 'DINE_IN' && selectedTableNumber && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-bold">
                    طاولة {selectedTableNumber}
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-400">
                {state.activeCart.length} أصناف في السلة
              </p>
            </div>

            {state.activeCart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1"
                title="إفراغ السلة"
              >
                <IconTrash className="w-3.5 h-3.5" />
                <span>إفراغ</span>
              </button>
            )}
          </div>

          {/* Cart Items List */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pe-1">
            {state.activeCart.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <IconPos className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                <p className="text-xs font-bold">السلة فارغة حالياً</p>
                <p className="text-[11px]">اضغط على أي صنف من القائمة لإضافته للطلب</p>
              </div>
            ) : (
              state.activeCart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        {item.name}
                      </h4>
                      {item.selectedVariant && (
                        <span className="text-[10px] text-rose-600 font-bold block">
                          حجم: {item.selectedVariant.name}
                        </span>
                      )}
                      {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                        <span className="text-[10px] text-slate-500 block">
                          إضافات: {item.selectedModifiers.map(m => m.name).join(', ')}
                        </span>
                      )}
                      {item.specialNotes && (
                        <span className="text-[10px] text-amber-600 block italic">
                          ملاحظة: {item.specialNotes}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                      {(item.unitPrice * item.quantity).toFixed(3)} د.ت
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.unitPrice.toFixed(3)} د.ت للقطعة
                    </span>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-2 py-0.5">
                      <button
                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        className="text-slate-500 hover:text-rose-600 font-bold text-xs"
                      >
                        <IconMinus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-xs px-2 text-slate-800 dark:text-slate-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        className="text-slate-500 hover:text-rose-600 font-bold text-xs"
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
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                ملاحظات المطبخ الخاصة (Instructions Chef):
              </label>
              <input
                type="text"
                placeholder="مثال: بدون بصل، ستيك نصف استواء..."
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}

          {/* Promo Code Input */}
          {state.activeCart.length > 0 && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="كود خصم (RESTO10)"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 uppercase font-mono"
              />
              <button
                onClick={handleApplyPromo}
                className="px-3 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold hover:bg-slate-900 transition-colors"
              >
                تطبيق
              </button>
            </div>
          )}

          {/* Financial Calculation Summary */}
          {state.activeCart.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>المجموع الأولي (HT):</span>
                <span className="font-mono">{cartSubtotal.toFixed(3)} د.ت</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>الأداء على القيمة المضافة (TVA 7%):</span>
                <span className="font-mono">{taxAmount.toFixed(3)} د.ت</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>خصم ترويجي:</span>
                  <span className="font-mono">-{appliedDiscount.toFixed(3)} د.ت</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>المجموع النهائي الصافي:</span>
                <span className="text-base font-mono text-rose-600 dark:text-rose-400">
                  {totalAmount.toFixed(3)} د.ت
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {state.activeCart.length > 0 && (
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <IconReceipt className="w-4 h-4" />
                <span>دفع وطباعة الفاتورة ({totalAmount.toFixed(3)} د.ت)</span>
              </button>

              <button
                onClick={() => {
                  const ord = submitCartOrder(orderType, selectedTableNumber, customerNotes, 'CASH');
                  if (ord) {
                    alert(`تم إرسال الطلب ${ord.ticketNumber} بنجاح إلى شاشة المطبخ KDS!`);
                  }
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <IconKitchen className="w-4 h-4" />
                <span>إرسال للمطبخ فقط (Send to KDS)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Item Customization Dialog (Sizes & Addons) */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  تخصيص: {customizingItem.name}
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

            {/* Variants / Sizes Selection */}
            {customizingItem.variants && customizingItem.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  اختر الحجم / التشكيلة:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {customizingItem.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setChosenVariant(v)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        chosenVariant?.id === v.id
                          ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-xs">{v.name}</div>
                      <div className="text-xs font-mono font-bold mt-1">{v.price.toFixed(3)} د.ت</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Modifiers / Addons Selection */}
            {customizingItem.availableModifiers && customizingItem.availableModifiers.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  إضافات اختيارية (Suppléments):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {customizingItem.availableModifiers.map((mod) => {
                    const isSelected = chosenModifiers.some((m) => m.id === mod.id);
                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleModifier(mod)}
                        className={`p-2.5 rounded-xl border text-start flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{mod.name}</span>
                        <span className="font-mono text-[11px]">+{mod.price.toFixed(3)} د.ت</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Chef Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                ملاحظة للشيف:
              </label>
              <input
                type="text"
                placeholder="مثال: بدون مايونيز، بدون جبن..."
                value={itemCustomNote}
                onChange={(e) => setItemCustomNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              />
            </div>

            {/* Dialog Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCustomizingItem(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                إلغاء
              </button>
              <button
                onClick={handleConfirmCustomization}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30"
              >
                إضافة للطلب
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout / Payment Method Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  تسجيل الدفع وإصدار الفاتورة
                </h3>
                <p className="text-xs text-slate-400">
                  المبلغ المطلوب: <strong className="text-rose-600 font-mono text-sm">{totalAmount.toFixed(3)} د.ت</strong>
                </p>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                طريقة الدفع:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleCompletePayment('CASH')}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-600 bg-slate-50 dark:bg-slate-800 text-center font-bold text-xs hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
                >
                  <div className="text-base mb-1">💵</div>
                  <div>نقداً (Espèces)</div>
                </button>
                <button
                  onClick={() => handleCompletePayment('CARD')}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-600 bg-slate-50 dark:bg-slate-800 text-center font-bold text-xs hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
                >
                  <div className="text-base mb-1">💳</div>
                  <div>بطاقة TPE</div>
                </button>
                <button
                  onClick={() => handleCompletePayment('DELIVERY_APP')}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-600 bg-slate-50 dark:bg-slate-800 text-center font-bold text-xs hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
                >
                  <div className="text-base mb-1">🛵</div>
                  <div>Glovo / Yassir</div>
                </button>
              </div>
            </div>

            {/* Quick Cash Calculator */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs">
                <span>المبلغ المستلم:</span>
                <input
                  type="number"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                  className="w-24 px-2 py-1 rounded bg-white dark:bg-slate-900 border text-end font-mono font-bold"
                />
              </div>
              <div className="flex justify-between text-xs font-bold text-emerald-600">
                <span>الباقي للزبون (Monnaie à rendre):</span>
                <span className="font-mono">
                  {Math.max(0, cashReceived - totalAmount).toFixed(3)} د.ت
                </span>
              </div>
            </div>
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
