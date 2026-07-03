"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils";

interface CartButtonProps {
  onClick: () => void;
}

export function CartButton({ onClick }: CartButtonProps) {
  const { itemCount, subtotal } = useCart();

  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={onClick}
        className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-blue-200 transition-colors"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 bg-white text-blue-500 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        </div>
        <span className="font-semibold text-sm hidden sm:inline">
          Ver pedido
        </span>
        <span className="font-bold text-sm">{formatCurrency(subtotal)}</span>
      </motion.button>
    </AnimatePresence>
  );
}
