// =============================================================================
// RestoChain OS — Enterprise Multi-Location Restaurant Chain Domain Model
// =============================================================================

export interface BranchLocation {
  id: string;
  name: string;
  nameFr?: string;
  code: string;
  city: string;
  address: string;
  phone: string;
  managerName: string;
  tablesCount: number;
  status: 'OPEN' | 'BUSY' | 'CLOSING_SOON' | 'CLOSED';
  dailyRevenue: number;
  activeOrdersCount: number;
  avgPreparationTimeMinutes: number;
}

export interface MenuItemVariant {
  id: string;
  name: string;
  price: number;
}

export interface MenuItemModifier {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  code: string;
  name: string;
  nameFr: string;
  description: string;
  price: number;
  foodCost: number;
  preparationMinutes: number;
  isAvailable: boolean;
  variants?: MenuItemVariant[];
  availableModifiers?: MenuItemModifier[];
  allergens?: string[];
  imageUrl?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameFr?: string;
  iconKey: string;
  itemsCount: number;
}

export type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'BILL_REQUESTED';

export interface RestaurantTable {
  id: string;
  branchId: string;
  number: number;
  capacity: number;
  status: TableStatus;
  currentBill?: number;
  waiterName?: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  selectedVariant?: MenuItemVariant;
  selectedModifiers?: MenuItemModifier[];
  specialNotes?: string;
}

export type OrderType = 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY';
export type OrderStatus = 'NEW' | 'PREPARING' | 'READY' | 'SERVED' | 'PAID' | 'CANCELLED';
export type PaymentMethod = 'CASH' | 'CARD' | 'DELIVERY_APP';

export interface RestaurantOrder {
  id: string;
  ticketNumber: string;
  branchId: string;
  type: OrderType;
  tableNumber?: number;
  status: OrderStatus;
  items: OrderItem[];
  customerNotes?: string;
  serverName: string;
  createdAt: string;
  totalAmount: number;
  taxAmount: number;
  discountAmount: number;
  paymentMethod?: PaymentMethod;
  isPaid: boolean;
}

export interface RawIngredient {
  id: string;
  name: string;
  unit: string;
  currentStock: number;
  minAlertThreshold: number;
  costPerUnit: number;
}

export interface RecipeIngredient {
  ingredientId: string;
  ingredientName: string;
  quantityUsed: number;
  unit: string;
  cost: number;
}

export interface DishRecipe {
  id: string;
  menuItemId: string;
  dishName: string;
  costPerPortion: number;
  foodCostPercentage: number;
  ingredients: RecipeIngredient[];
}

export interface StaffShift {
  id: string;
  branchId: string;
  staffName: string;
  role: 'CASHIER' | 'HEAD_CHEF' | 'WAITER' | 'COURIER' | 'MANAGER';
  startTime: string;
  status: 'ACTIVE' | 'BREAK' | 'COMPLETED';
}

export interface ZDailyReport {
  id: string;
  branchId: string;
  branchName: string;
  reportDate: string;
  grossSales: number;
  taxAmount: number;
  expectedDrawerCash: number;
  actualDrawerCash: number;
  discrepancy: number;
  cashierName: string;
}

export interface DeliveryCourier {
  id: string;
  name: string;
  phone: string;
  status: 'AVAILABLE' | 'ON_DELIVERY' | 'OFFLINE';
  activeOrdersCount: number;
  vehiclePlate: string;
}
