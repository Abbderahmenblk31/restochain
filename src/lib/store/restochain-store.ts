'use client';

// =============================================================================
// RestoChain OS — Persistent Multi-Branch Reactive State Manager
// =============================================================================

import { useState, useEffect } from 'react';
import {
  BranchLocation,
  MenuItem,
  MenuCategory,
  RestaurantTable,
  RestaurantOrder,
  OrderItem,
  RawIngredient,
  DishRecipe,
  StaffShift,
  ZDailyReport,
  DeliveryCourier,
  OrderType,
  OrderStatus,
  PaymentMethod,
} from '../types';
import {
  RESTOCHAIN_BRANCHES,
  MENU_CATEGORIES,
  MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_ORDERS,
  RAW_INGREDIENTS,
  DISH_RECIPES,
  ACTIVE_SHIFTS,
  DELIVERY_FLEET,
} from '../data/mock-restochain-data';

const STORAGE_KEY = 'restochain_state_v2';

export interface RestoChainState {
  activeBranchId: string;
  branches: BranchLocation[];
  categories: MenuCategory[];
  menuItems: MenuItem[];
  tables: RestaurantTable[];
  orders: RestaurantOrder[];
  activeCart: OrderItem[];
  ingredients: RawIngredient[];
  recipes: DishRecipe[];
  shifts: StaffShift[];
  zReports: ZDailyReport[];
  couriers: DeliveryCourier[];
}

const DEFAULT_STATE: RestoChainState = {
  activeBranchId: 'BR-LAC',
  branches: RESTOCHAIN_BRANCHES,
  categories: MENU_CATEGORIES,
  menuItems: MENU_ITEMS,
  tables: INITIAL_TABLES,
  orders: INITIAL_ORDERS,
  activeCart: [],
  ingredients: RAW_INGREDIENTS,
  recipes: DISH_RECIPES,
  shifts: ACTIVE_SHIFTS,
  zReports: [],
  couriers: DELIVERY_FLEET,
};

function getStoredState(): RestoChainState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      return DEFAULT_STATE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STATE;
  }
}

function saveStoredState(state: RestoChainState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event('restochain_state_synced'));
  } catch {}
}

export function useRestoChainStore() {
  const [state, setState] = useState<RestoChainState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setState(getStoredState());
    setIsLoaded(true);

    const handleSync = () => {
      setState(getStoredState());
    };

    window.addEventListener('restochain_state_synced', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('restochain_state_synced', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const activeBranch = state.branches.find((b) => b.id === state.activeBranchId) || state.branches[0];

  const switchBranch = (branchId: string) => {
    const current = getStoredState();
    const updated: RestoChainState = {
      ...current,
      activeBranchId: branchId,
    };
    saveStoredState(updated);
    setState(updated);
  };

  const addToCart = (item: OrderItem) => {
    const current = getStoredState();
    const existingIdx = current.activeCart.findIndex(
      (c) =>
        c.menuItemId === item.menuItemId &&
        c.selectedVariant?.id === item.selectedVariant?.id &&
        c.specialNotes === item.specialNotes
    );

    let updatedCart: OrderItem[];
    if (existingIdx > -1) {
      updatedCart = [...current.activeCart];
      updatedCart[existingIdx] = {
        ...updatedCart[existingIdx],
        quantity: updatedCart[existingIdx].quantity + item.quantity,
      };
    } else {
      updatedCart = [...current.activeCart, item];
    }

    const updated: RestoChainState = { ...current, activeCart: updatedCart };
    saveStoredState(updated);
    setState(updated);
  };

  const updateCartItemQuantity = (id: string, newQty: number) => {
    const current = getStoredState();
    let updatedCart: OrderItem[];
    if (newQty <= 0) {
      updatedCart = current.activeCart.filter((i) => i.id !== id);
    } else {
      updatedCart = current.activeCart.map((i) => (i.id === id ? { ...i, quantity: newQty } : i));
    }
    const updated: RestoChainState = { ...current, activeCart: updatedCart };
    saveStoredState(updated);
    setState(updated);
  };

  const removeFromCart = (id: string) => {
    const current = getStoredState();
    const updatedCart = current.activeCart.filter((i) => i.id !== id);
    const updated: RestoChainState = { ...current, activeCart: updatedCart };
    saveStoredState(updated);
    setState(updated);
  };

  const clearCart = () => {
    const current = getStoredState();
    const updated: RestoChainState = { ...current, activeCart: [] };
    saveStoredState(updated);
    setState(updated);
  };

  const submitCartOrder = (
    type: OrderType,
    tableNumber?: number,
    notes?: string,
    paymentMethod: PaymentMethod = 'CASH'
  ): RestaurantOrder | null => {
    const current = getStoredState();
    if (current.activeCart.length === 0) return null;

    const subtotal = current.activeCart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;

    const newOrder: RestaurantOrder = {
      id: `ORD-${Date.now()}`,
      ticketNumber: `TKT-#${Math.floor(200 + Math.random() * 800)}`,
      branchId: current.activeBranchId,
      type,
      tableNumber,
      status: 'PREPARING',
      items: [...current.activeCart],
      customerNotes: notes,
      serverName: 'محمد بن سالم',
      createdAt: new Date().toISOString(),
      totalAmount: total,
      taxAmount: tax,
      discountAmount: 0,
      paymentMethod,
      isPaid: true,
    };

    // Update tables if dine-in
    let updatedTables = current.tables;
    if (type === 'DINE_IN' && tableNumber) {
      updatedTables = current.tables.map((t) =>
        t.number === tableNumber ? { ...t, status: 'OCCUPIED' as const, currentBill: total } : t
      );
    }

    // Update branch revenue
    const updatedBranches = current.branches.map((b) =>
      b.id === current.activeBranchId
        ? {
            ...b,
            dailyRevenue: b.dailyRevenue + total,
            activeOrdersCount: b.activeOrdersCount + 1,
          }
        : b
    );

    const updated: RestoChainState = {
      ...current,
      orders: [newOrder, ...current.orders],
      activeCart: [],
      tables: updatedTables,
      branches: updatedBranches,
    };

    saveStoredState(updated);
    setState(updated);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const current = getStoredState();
    const updatedOrders = current.orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    const updated: RestoChainState = { ...current, orders: updatedOrders };
    saveStoredState(updated);
    setState(updated);
  };

  const updateStock = (ingredientId: string, newStock: number) => {
    const current = getStoredState();
    const updatedIngredients = current.ingredients.map((i) =>
      i.id === ingredientId ? { ...i, currentStock: newStock } : i
    );
    const updated: RestoChainState = { ...current, ingredients: updatedIngredients };
    saveStoredState(updated);
    setState(updated);
  };

  const generateZReport = (actualDrawerCash: number): ZDailyReport | null => {
    const current = getStoredState();
    const branch = current.branches.find((b) => b.id === current.activeBranchId);
    if (!branch) return null;

    const expectedCash = 450.0;
    const discrepancy = actualDrawerCash - expectedCash;

    const report: ZDailyReport = {
      id: `Z-${Date.now()}`,
      branchId: branch.id,
      branchName: branch.name,
      reportDate: new Date().toLocaleDateString('fr-TN'),
      grossSales: branch.dailyRevenue,
      taxAmount: branch.dailyRevenue * 0.07,
      expectedDrawerCash: expectedCash,
      actualDrawerCash,
      discrepancy,
      cashierName: 'محمد بن سالم',
    };

    const updated: RestoChainState = {
      ...current,
      zReports: [report, ...current.zReports],
    };
    saveStoredState(updated);
    setState(updated);
    return report;
  };

  return {
    state,
    isLoaded,
    activeBranch,
    switchBranch,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    submitCartOrder,
    updateOrderStatus,
    updateStock,
    generateZReport,
  };
}

export const useRestoStore = useRestoChainStore;
