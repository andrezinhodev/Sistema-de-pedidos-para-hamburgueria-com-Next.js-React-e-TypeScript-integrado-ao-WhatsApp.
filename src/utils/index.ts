/**
 * Formats a number as Brazilian Real currency.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Generates a random order number like #2847.
 */
export function generateOrderNumber(): string {
  return `#${Math.floor(1000 + Math.random() * 9000)}`;
}

/**
 * Formats a phone number as (XX) XXXXX-XXXX while the user types.
 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * Normalizes a string for search: lower-case, no accents.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Returns true if the product name or description matches the query.
 */
export function matchesSearch(
  text: string,
  query: string
): boolean {
  if (!query.trim()) return true;
  return normalizeText(text).includes(normalizeText(query));
}

/**
 * Clamps a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
