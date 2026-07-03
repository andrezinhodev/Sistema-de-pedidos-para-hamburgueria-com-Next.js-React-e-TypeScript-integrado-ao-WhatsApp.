"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { CartItem, CartState, Product } from "@/types";

// ─── Actions ───────────────────────────────────────────────────────────────

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number; notes: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "UPDATE_NOTES"; payload: { productId: string; notes: string } }
  | { type: "SET_GENERAL_NOTES"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartState };

// ─── Reducer ───────────────────────────────────────────────────────────────

const initialState: CartState = {
  items: [],
  generalNotes: "",
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, notes } = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity, notes: notes || i.notes }
              : i
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity, notes }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => i.product.id !== action.payload.productId
        ),
      };

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i
        ),
      };
    }

    case "UPDATE_NOTES":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.productId
            ? { ...i, notes: action.payload.notes }
            : i
        ),
      };

    case "SET_GENERAL_NOTES":
      return { ...state, generalNotes: action.payload };

    case "CLEAR_CART":
      return initialState;

    case "HYDRATE":
      return action.payload;

    default:
      return state;
  }
}

// ─── Context ───────────────────────────────────────────────────────────────

interface CartContextValue {
  state: CartState;
  addItem: (product: Product, quantity: number, notes: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  setGeneralNotes: (notes: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "cardapio_cart";

// ─── Provider ──────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: "HYDRATE", payload: JSON.parse(stored) });
      }
    } catch {
      // Ignore parse errors — start fresh
    }
  }, []);

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage quota exceeded or unavailable — silently ignore
    }
  }, [state]);

  const addItem = useCallback(
    (product: Product, quantity: number, notes: string) =>
      dispatch({ type: "ADD_ITEM", payload: { product, quantity, notes } }),
    []
  );

  const removeItem = useCallback(
    (productId: string) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productId } }),
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } }),
    []
  );

  const updateNotes = useCallback(
    (productId: string, notes: string) =>
      dispatch({ type: "UPDATE_NOTES", payload: { productId, notes } }),
    []
  );

  const setGeneralNotes = useCallback(
    (notes: string) => dispatch({ type: "SET_GENERAL_NOTES", payload: notes }),
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const getItemQuantity = useCallback(
    (productId: string) =>
      state.items.find((i) => i.product.id === productId)?.quantity ?? 0,
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        setGeneralNotes,
        clearCart,
        itemCount,
        subtotal,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
