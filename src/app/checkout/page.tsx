"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CheckoutData, OrderSummaryData } from "@/types";
import { formatCurrency, generateOrderNumber } from "@/utils";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/data/menu";

export default function CheckoutPage() {
  const { state, subtotal, clearCart } = useCart();
  const [order, setOrder] = useState<OrderSummaryData | null>(null);

  const deliveryFee =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  // Empty cart guard
  if (state.items.length === 0 && !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="font-bold text-gray-800 text-lg">Carrinho vazio</p>
        <p className="text-gray-500 text-sm">
          Adicione itens ao pedido antes de finalizar.
        </p>
        <Link
          href="/"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Ver cardápio
        </Link>
      </div>
    );
  }

  function handleSubmit(data: CheckoutData) {
    const summary: OrderSummaryData = {
      items: state.items,
      subtotal,
      deliveryFee,
      total,
      customer: data.customer,
      deliveryType: data.deliveryType,
      paymentMethod: data.paymentMethod,
      generalNotes: state.generalNotes,
      orderNumber: generateOrderNumber(),
      createdAt: new Date(),
    };
    clearCart();
    setOrder(summary);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          {!order && (
            <Link
              href="/"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Voltar ao cardápio"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </Link>
          )}
          <h1 className="font-bold text-gray-900">
            {order ? "Pedido confirmado" : "Finalizar pedido"}
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {order ? (
          <OrderSummary order={order} />
        ) : (
          <div className="space-y-6">
            {/* Order preview */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Resumo do pedido
              </p>
              <div className="space-y-1.5">
                {state.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {item.quantity}× {item.product.name}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-900">
                <span>Total estimado</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <CheckoutForm onSubmit={handleSubmit} />
          </div>
        )}
      </main>
    </div>
  );
}
