// ─── Product & Category ────────────────────────────────────────────────────

export type CategoryId =
  | "hamburgueres"
  | "pizzas"
  | "bebidas"
  | "sobremesas";

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
  id: string;
  categoryId: CategoryId;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  image: string;
  tags?: string[];
  featured?: boolean;
}

// ─── Cart ──────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
  notes: string;
}

export interface CartState {
  items: CartItem[];
  generalNotes: string;
}

// ─── Checkout ──────────────────────────────────────────────────────────────

export type DeliveryType = "retirada" | "delivery";
export type PaymentMethod = "dinheiro" | "pix" | "cartao";

export interface CustomerData {
  name: string;
  phone: string;
  address: string;
}

export interface CheckoutData {
  customer: CustomerData;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  change?: string;
}

export interface OrderSummaryData {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerData;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  generalNotes: string;
  orderNumber: string;
  createdAt: Date;
}

// ─── UI State ──────────────────────────────────────────────────────────────

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}
