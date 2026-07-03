"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: QuantitySelectorProps) {
  const isSmall = size === "sm";

  const btnClass = isSmall
    ? "w-7 h-7 text-sm"
    : "w-9 h-9 text-base";

  const valueClass = isSmall ? "w-7 text-sm" : "w-10 text-base";

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
        className={`${btnClass} rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
      >
        <Minus className={isSmall ? "w-3 h-3" : "w-4 h-4"} />
      </button>

      <span
        className={`${valueClass} text-center font-semibold text-gray-900 tabular-nums`}
      >
        {value}
      </span>

      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
        className={`${btnClass} rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
      >
        <Plus className={isSmall ? "w-3 h-3" : "w-4 h-4"} />
      </button>
    </div>
  );
}
