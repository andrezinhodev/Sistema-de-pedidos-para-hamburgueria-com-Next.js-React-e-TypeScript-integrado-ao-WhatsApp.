"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/data/menu";

export default function CartOrdersPage() {
  const router = useRouter();

  const {
    state,
    removeItem,
    updateQuantity,
    updateNotes,
    setGeneralNotes,
    subtotal,
    itemCount,
  } = useCart();

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;

  function handleCheckout() {
    router.push("/checkout");
  }

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <header className="mb-5 flex items-center justify-between rounded-xl bg-white px-4 py-4 shadow-sm sm:px-5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-blue-500" />
              <h1 className="font-bold text-gray-900 sm:text-lg">
                Seu pedido
                {itemCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({itemCount} {itemCount === 1 ? "item" : "itens"})
                  </span>
                )}
              </h1>
            </div>
    
            <button
              onClick={() => router.push("/")}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              aria-label="Voltar para o cardápio"
            >
              <ArrowLeft className="h-4 w-4 text-gray-600" />
            </button>
          </header>
    
          {state.items.length === 0 ? (
            <section className="flex min-h-[65vh] flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-sm">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                <ShoppingBag className="h-9 w-9 text-blue-300" />
              </div>
    
              <p className="mt-4 font-semibold text-gray-700">Carrinho vazio</p>
    
              <p className="mt-1 max-w-xs text-sm text-gray-400">
                Adicione itens do cardápio para começar seu pedido.
              </p>
    
              <button
                onClick={() => router.push("/")}
                className="mt-4 text-sm font-semibold text-blue-500 hover:underline"
              >
                Ver cardápio
              </button>
            </section>
          ) : (
            <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-start">
              <section className="space-y-4">
                {remaining > 0 && (
                  <div className="rounded-xl bg-blue-50 p-4 text-center">
                    <p className="text-xs text-blue-700 sm:text-sm">
                      Faltam{" "}
                      <span className="font-bold">
                        {formatCurrency(remaining)}
                      </span>{" "}
                      para frete grátis!
                    </p>
    
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-blue-100">
                      <div
                        className="h-full rounded-full bg-blue-400 transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            (subtotal / FREE_DELIVERY_THRESHOLD) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
    
                {state.items.map((item) => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    onQuantityChange={(qty) => updateQuantity(item.product.id, qty)}
                    onNotesChange={(notes) => updateNotes(item.product.id, notes)}
                    onRemove={() => removeItem(item.product.id)}
                  />
                ))}
    
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <label
                    htmlFor="general-notes"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600"
                  >
                    Observações gerais
                  </label>
    
                  <textarea
                    id="general-notes"
                    value={state.generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    placeholder="Algum recado para o restaurante..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </section>
    
              <aside className="rounded-xl bg-white p-5 shadow-sm lg:sticky lg:top-6">
                <h2 className="mb-4 font-bold text-gray-900">Resumo</h2>
    
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
    
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Taxa de entrega</span>
                    {deliveryFee === 0 ? (
                      <span className="font-medium text-green-600">Grátis</span>
                    ) : (
                      <span>{formatCurrency(deliveryFee)}</span>
                    )}
                  </div>
    
                  <div className="flex justify-between border-t border-dashed border-gray-200 pt-3 text-base font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
    
                  <button
                    onClick={handleCheckout}
                    className="w-full rounded-xl bg-blue-500 py-3.5 font-bold text-white transition-colors hover:bg-blue-600 active:scale-[0.98]"
                  >
                    Finalizar pedido
                  </button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    );
}

interface CartItemRowProps {
  item: ReturnType<typeof useCart>["state"]["items"][number];
  onQuantityChange: (qty: number) => void;
  onNotesChange: (notes: string) => void;
  onRemove: () => void;
}

function CartItemRow({
  item,
  onQuantityChange,
  onNotesChange,
  onRemove,
}: CartItemRowProps) {
  const { product, quantity, notes } = item;

  return (
    <div className="border border-gray-100 rounded-xl p-3 space-y-3">
      <div className="flex gap-3">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">
            {product.name}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatCurrency(product.price)} cada
          </p>
        </div>

        <button
          onClick={onRemove}
          className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
          aria-label={`Remover ${product.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <QuantitySelector
          value={quantity}
          onChange={onQuantityChange}
          size="sm"
          min={0}
        />

        <span className="font-bold text-sm text-gray-900">
          {formatCurrency(product.price * quantity)}
        </span>
      </div>

      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Observação para este item..."
        rows={2}
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
      />
    </div>
  );
}