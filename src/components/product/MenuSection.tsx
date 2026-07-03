"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, products } from "@/data/menu";
import { CategoryId, Product } from "@/types";
import { matchesSearch } from "@/utils";
import { SearchBar } from "@/components/ui/SearchBar";
import { CategoryList } from "@/components/category/CategoryList";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductModal } from "@/components/product/ProductModal";
import { EmptyState } from "@/components/ui/EmptyState";

export function MenuSection() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products based on search query and active category
  const filtered = products.filter((p) => {
    const matchesCat = !activeCategory || p.categoryId === activeCategory;
    const matchesQ =
      !query.trim() ||
      matchesSearch(p.name, query) ||
      matchesSearch(p.description, query);
    return matchesCat && matchesQ;
  });

  const isFiltering = query.trim().length > 0 || activeCategory !== null;

  // Group filtered products by category
  const grouped = categories
    .map((cat) => ({
      category: cat,
      items: filtered.filter((p) => p.categoryId === cat.id),
    }))
    .filter((g) => g.items.length > 0);

  function clearFilters() {
    setQuery("");
    setActiveCategory(null);
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Search + filters */}
          {/* Search + filters — fica fixo abaixo do Header ao rolar */}
          <div className="sticky top-16 z-20 bg-gray-50 -mx-4 px-4 sm:-mx-6 sm:px-6 py-3 space-y-3">
            <SearchBar value={query} onChange={setQuery} />
            <CategoryList active={activeCategory} onChange={setActiveCategory} />
          </div>

        {/* Results header when filtering */}
        {isFiltering && filtered.length > 0 && (
          <p className="text-sm text-gray-500">
            {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"} encontrado
            {filtered.length !== 1 && "s"}
          </p>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <EmptyState query={query} onClear={clearFilters} />
        )}

        {/* Grouped product sections */}
        <AnimatePresence mode="popLayout">
          {grouped.map(({ category, items }) => (
            <motion.section
              key={category.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg leading-tight">
                    {category.name}
                  </h2>
                  <p className="text-xs text-gray-400">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {items.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenModal={setSelectedProduct}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      {/* Product modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
