"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/menu";
import { CategoryId, Product } from "@/types";
import { matchesSearch } from "@/utils";

interface UseSearchResult {
  query: string;
  setQuery: (q: string) => void;
  activeCategory: CategoryId | null;
  setActiveCategory: (id: CategoryId | null) => void;
  filteredProducts: Product[];
  isFiltering: boolean;
}

export function useSearch(): UseSearchResult {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = !activeCategory || p.categoryId === activeCategory;
      const matchesQuery =
        matchesSearch(p.name, query) || matchesSearch(p.description, query);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const isFiltering = query.trim().length > 0 || activeCategory !== null;

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    isFiltering,
  };
}
