import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabor Delivery — Cardápio Online",
  description:
    "Peça hambúrgueres artesanais, pizzas na pedra, bebidas e sobremesas com entrega rápida.",
  keywords: ["delivery", "hamburguer", "pizza", "comida", "pedido online"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: {
                background: "#1f2937",
                color: "#f9fafb",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
                padding: "10px 16px",
              },
              success: {
                iconTheme: { primary: "#f97316", secondary: "#fff" },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
