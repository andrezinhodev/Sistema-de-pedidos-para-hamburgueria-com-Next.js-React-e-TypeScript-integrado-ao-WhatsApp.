"use client";

import { SearchX } from "lucide-react";

interface EmptyStateProps {
  query: string;
  onClear: () => void;
}

export function EmptyState({ query, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <SearchX className="w-10 h-10 text-blue-400" />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Nenhum resultado encontrado
      </h3>

      <p className="text-gray-500 max-w-xs mb-6">
        Não encontramos nada para{" "}
        <span className="font-medium text-gray-700">&ldquo;{query}&rdquo;</span>.
        Tente outro termo ou limpe os filtros.
      </p>

      <button
        onClick={onClear}
        className="px-5 py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
      >
        Limpar busca
      </button>
    </div>
  );
}
