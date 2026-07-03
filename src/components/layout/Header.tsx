"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartButton } from "@/components/cart/CartButton";

export function Header({ }) {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="leading-tight">
            <p className="font-black text-gray-900 tracking-tight">Black Bun</p>
            <p className="text-[10px] text-blue-500 font-semibold uppercase tracking-widest -mt-0.5">
              Delivery
            </p>
          </div>
        </Link>

        <CartButton onClick={() => router.push("/cart-orders")} />
      </div>
    </header>
  );
}
