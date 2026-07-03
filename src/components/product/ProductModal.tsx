"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { formatCurrency } from "@/utils";
import { useCart } from "@/context/CartContext";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  // Reset state when a new product is opened
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setNotes("");
    }
  }, [product?.id]);

  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleAdd() {
    if (!product) return;
    addItem(product, quantity, notes);
    toast.success(`${product.name} adicionado ao pedido!`);
    onClose();
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[50%] -translate-y-1/2 z-50 max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Image */}
            <div className="relative h-52">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow"
                aria-label="Fechar"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>

              {product.featured && (
                <span className="absolute bottom-3 left-3 bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  Popular
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <h2 id="modal-title" className="text-xl font-bold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="item-notes"
                  className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide"
                >
                  Observações
                </label>
                <textarea
                  id="item-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: sem cebola, ponto da carne..."
                  rows={2}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                />
              </div>

              {/* Footer: quantity + add */}
              <div className="flex items-center justify-between pt-1">
                <QuantitySelector value={quantity} onChange={setQuantity} />

                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors active:scale-95 text-sm"
                >
                  <span>Adicionar</span>
                  <span className="font-bold">
                    {formatCurrency(product.price * quantity)}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
