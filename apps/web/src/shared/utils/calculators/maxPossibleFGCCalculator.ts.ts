/**
 * Converte taxa anual para mensal (juros compostos)
 */
export function annualToMonthlyRate(annualRate: number): number {
  return Math.pow(1 + annualRate, 1 / 12) - 1;
}

/**
 * Calcula valor máximo para atingir R$ 250.000 no vencimento (FGC)
 */
export function calculateMaxInvestmentFGC(
  desiredFinalValue: number,
  annualRate: number,
  months: number
): number {
  const monthlyRate = annualToMonthlyRate(annualRate);
  return desiredFinalValue / Math.pow(1 + monthlyRate, months);
}
