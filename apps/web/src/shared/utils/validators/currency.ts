/**
 * Format number to BRL currency string
 * Ex: 1234.56 -> "R$ 1.234,56"
 */
export function formatCurrencyBR(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Parse BRL currency string to number
 * Ex: "R$ 1.234,56" -> 1234.56
 */
export function parseCurrencyBR(value: string): number {
  const numeric = value.replace(/\s/g, "").replace("R$", "").replace(/\./g, "").replace(",", ".");

  const parsed = Number(numeric);
  return Number.isNaN(parsed) ? 0 : parsed;
}
