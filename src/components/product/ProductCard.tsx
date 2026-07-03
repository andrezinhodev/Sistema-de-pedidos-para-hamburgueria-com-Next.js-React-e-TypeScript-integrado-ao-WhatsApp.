"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export function ProductCard({ product, onOpenModal }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCart();
  const inCart = getItemQuantity(product.id);

  function handleQuickAdd(e: React.MouseEvent) {
    e.stopPropagation();
    addItem(product, 1, "");
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={() => onOpenModal(product)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
            Popular
          </span>
        )}
        {inCart > 0 && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {inCart}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900 text-sm">
            {formatCurrency(product.price)}
          </span>

          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Adicionar
          </button>
        </div>
      </div>
    </motion.article>
  );
}
