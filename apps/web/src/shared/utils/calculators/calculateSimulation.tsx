function calculateSimulation(amount: number, monthlyRate: number, months: number) {
  const values: number[] = [];
  let current = amount;

  for (let i = 0; i <= months; i++) {
    values.push(Number(current.toFixed(2)));
    current *= 1 + monthlyRate;
  }

  const finalAmount = values[values.length - 1];
  const totalYield = finalAmount - amount;

  return {
    finalAmount,
    totalYield,
    chartValues: values,
  };
}
