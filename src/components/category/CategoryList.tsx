"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/menu";
import { CategoryId } from "@/types";

interface CategoryListProps {
  active: CategoryId | null;
  onChange: (id: CategoryId | null) => void;
}

export function CategoryList({ active, onChange }: CategoryListProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {/* "All" pill */}
      <CategoryPill
        label="Tudo"
        icon=""
        isActive={active === null}
        onClick={() => onChange(null)}
      />

      {categories.map((cat) => (
        <CategoryPill
          key={cat.id}
          label={cat.name}
          icon={cat.icon}
          isActive={active === cat.id}
          onClick={() => onChange(active === cat.id ? null : cat.id)}
        />
      ))}
    </div>
  );
}

interface CategoryPillProps {
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

function CategoryPill({ label, icon, isActive, onClick }: CategoryPillProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
        isActive
          ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200"
          : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-500"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </motion.button>
  );
}
