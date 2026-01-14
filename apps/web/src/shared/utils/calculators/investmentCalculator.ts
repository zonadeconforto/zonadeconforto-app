export function calculateInvestmentEvolution({
  amount,
  annualRate,
  months,
}: {
  amount: number;
  annualRate: number; // ex: 2.2 (220%)
  months: number;
}) {
  if (!amount || !annualRate || !months) {
    return {
      labels: [],
      values: [],
      finalValue: 0,
      profit: 0,
    };
  }

  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

  const labels: string[] = [];
  const values: number[] = [];

  let currentValue = amount;

  for (let i = 0; i <= months; i++) {
    labels.push(`${i} mês${i !== 1 ? "es" : ""}`);
    values.push(Number(currentValue.toFixed(2)));

    currentValue *= 1 + monthlyRate;
  }

  return {
    labels,
    values,
    finalValue: values[values.length - 1],
    profit: values[values.length - 1] - amount,
  };
}
