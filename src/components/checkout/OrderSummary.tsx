"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CreditCard,
  DollarSign,
  MapPin,
  Package,
  Phone,
  QrCode,
  User,
} from "lucide-react";
import { OrderSummaryData } from "@/types";
import { formatCurrency } from "@/utils";
import { WhatsAppButton } from "../whatsAppButton/WhatsAppButton";

const PAYMENT_LABELS: Record<string, { label: string; icon: React.ReactNode }> =
  {
    pix: { label: "PIX", icon: <QrCode className="w-4 h-4" /> },
    cartao: { label: "Cartão", icon: <CreditCard className="w-4 h-4" /> },
    dinheiro: { label: "Dinheiro", icon: <DollarSign className="w-4 h-4" /> },
  };

const DELIVERY_LABELS: Record<string, string> = {
  delivery: "Delivery",
  retirada: "Retirada no local",
};

interface OrderSummaryProps {
  order: OrderSummaryData;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const payment = PAYMENT_LABELS[order.paymentMethod];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto space-y-5 pb-16"
    >
      {/* Success header */}
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </motion.div>
        <h1 className="text-2xl font-black text-gray-900">Pedido confirmado!</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Número do pedido:{" "}
          <span className="font-bold text-blue-500">{order.orderNumber}</span>
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Tempo estimado: 30 – 45 minutos
        </p>
      </div>

      {/* Items */}
      <Card title="Itens do pedido" icon={<Package className="w-4 h-4 text-blue-500" />}>
        <div className="divide-y divide-gray-50">
          {order.items.map(({ product, quantity, notes }) => (
            <div key={product.id} className="py-2.5 first:pt-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    {quantity}× {product.name}
                  </span>
                  {notes && (
                    <p className="text-xs text-gray-400 mt-0.5 italic">
                      &ldquo;{notes}&rdquo;
                    </p>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-700 ml-4">
                  {formatCurrency(product.price * quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-200 mt-3 pt-3 space-y-1">
          <Row label="Subtotal" value={formatCurrency(order.subtotal)} />
          <Row
            label="Entrega"
            value={
              order.deliveryFee === 0
                ? "Grátis"
                : formatCurrency(order.deliveryFee)
            }
            valueClass={order.deliveryFee === 0 ? "text-green-600" : undefined}
          />
          <Row
            label="Total"
            value={formatCurrency(order.total)}
            bold
          />
        </div>

        {order.generalNotes && (
          <p className="mt-3 text-xs text-gray-400 bg-gray-50 rounded-lg p-2 italic">
            📝 {order.generalNotes}
          </p>
        )}
      </Card>

      {/* Customer & delivery info */}
      <Card title="Dados do pedido" icon={<User className="w-4 h-4 text-blue-500" />}>
        <InfoRow icon={<User className="w-3.5 h-3.5" />} label={order.customer.name} />
        <InfoRow icon={<Phone className="w-3.5 h-3.5" />} label={order.customer.phone} />
        {order.customer.address && (
          <InfoRow
            icon={<MapPin className="w-3.5 h-3.5" />}
            label={order.customer.address}
          />
        )}
        <InfoRow
          icon={<Package className="w-3.5 h-3.5" />}
          label={DELIVERY_LABELS[order.deliveryType]}
        />
        <InfoRow icon={payment.icon} label={payment.label} />
      </Card>

      <Link
        href="/"
        className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-colors"
      >
        Fazer novo pedido
      </Link>
      <WhatsAppButton order={order} />
    </motion.div>
  );
}


// ─── Small helpers ──────────────────────────────────────────────────────────

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  valueClass,
}: {
  label: string;
  value: string;
  bold?: boolean;
  valueClass?: string;
}) {
  return (
    <div className={`flex justify-between text-sm ${bold ? "font-bold text-gray-900" : "text-gray-600"}`}>
      <span>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

function InfoRow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700 py-1.5">
      <span className="text-gray-400">{icon}</span>
      {label}
    </div>
  );
}
