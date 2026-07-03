"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  Bike,
  MapPinCheckInside,
  CreditCard,
  DollarSign,
  MapPin,
  Phone,
  QrCode,
  ShoppingBag,
  User,
} from "lucide-react";
import { CheckoutData, DeliveryType, PaymentMethod } from "@/types";
import { formatPhone } from "@/utils";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [change, setChange] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Informe seu nome.";
    if (phone.replace(/\D/g, "").length < 10)
      next.phone = "Número inválido.";
    if (deliveryType === "delivery" && !address.trim())
      next.address = "Informe o endereço para entrega.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      customer: { name: name.trim(), phone, address: address.trim() },
      deliveryType,
      paymentMethod,
      change: paymentMethod === "dinheiro" ? change : undefined,
    });
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {/* Customer data */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" />
          Seus dados
        </h2>

        <Field
          label="Nome completo"
          error={errors.name}
          htmlFor="name"
        >
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como devemos te chamar?"
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field label="Telefone / WhatsApp" error={errors.phone} htmlFor="phone">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              className={`${inputClass(!!errors.phone)} pl-9`}
            />
          </div>
        </Field>
      </section>

      {/* Delivery type */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-blue-500" />
          Como quer receber?
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <DeliveryOption
            value="delivery"
            selected={deliveryType === "delivery"}
            onClick={() => setDeliveryType("delivery")}
            icon={<Bike className="h-5 w-5" />}
            label="Delivery"
            sublabel="Recebo em casa"
          />
          <DeliveryOption
            value="retirada"
            selected={deliveryType === "retirada"}
            onClick={() => setDeliveryType("retirada")}
            icon={<MapPinCheckInside className="h-5 w-5" />}
            label="Retirada"
            sublabel="Busco no local"
          />
        </div>

        {deliveryType === "delivery" && (
          <Field label="Endereço completo" error={errors.address} htmlFor="address">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, número, bairro"
                className={`${inputClass(!!errors.address)} pl-9`}
              />
            </div>
          </Field>
        )}
      </section>

      {/* Payment */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-500" />
          Forma de pagamento
        </h2>

        <div className="grid grid-cols-3 gap-2">
          <PaymentOption
            value="pix"
            selected={paymentMethod === "pix"}
            onClick={() => setPaymentMethod("pix")}
            icon={<QrCode className="w-5 h-5" />}
            label="PIX"
          />
          <PaymentOption
            value="cartao"
            selected={paymentMethod === "cartao"}
            onClick={() => setPaymentMethod("cartao")}
            icon={<CreditCard className="w-5 h-5" />}
            label="Cartão"
          />
          <PaymentOption
            value="dinheiro"
            selected={paymentMethod === "dinheiro"}
            onClick={() => setPaymentMethod("dinheiro")}
            icon={<DollarSign className="w-5 h-5" />}
            label="Dinheiro"
          />
        </div>

        {paymentMethod === "dinheiro" && (
          <Field label="Troco para" htmlFor="change">
            <input
              id="change"
              type="text"
              value={change}
              onChange={(e) => setChange(e.target.value)}
              placeholder="R$ 0,00 (deixe em branco se não precisar)"
              className={inputClass(false)}
            />
          </Field>
        )}
      </section>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-colors active:scale-[0.98] text-base shadow-lg shadow-blue-200"
      >
        Confirmar pedido
      </button>
    </motion.form>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold text-gray-600 uppercase tracking-wide"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-3 py-2.5 border rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
    hasError
      ? "border-red-300 focus:ring-red-400"
      : "border-gray-200 focus:ring-blue-400"
  }`;
}

interface DeliveryOptionProps {
  value: DeliveryType;
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  sublabel: string;
}

function DeliveryOption({
  selected,
  onClick,
  icon,
  label,
  sublabel,
}: DeliveryOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
        selected
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : "border-gray-200 text-gray-600 hover:border-blue-200"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-semibold text-sm">{label}</span>
      <span className="text-[10px] text-gray-400">{sublabel}</span>
    </button>
  );
}

interface PaymentOptionProps {
  value: PaymentMethod;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function PaymentOption({ selected, onClick, icon, label }: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
        selected
          ? "border-blue-500 bg-blue-50 text-blue-600"
          : "border-gray-200 text-gray-500 hover:border-blue-200"
      }`}
    >
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
