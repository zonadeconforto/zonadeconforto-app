"use client";

import { useMemo, useState } from "react";

export function useSimulation() {
  const [amount, setAmount] = useState(1000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(1); // % ao mês

  const result = useMemo(() => {
    const monthlyRate = rate / 100;
    let current = amount;

    const evolution: number[] = [];

    for (let i = 0; i < months; i++) {
      current = current * (1 + monthlyRate);
      evolution.push(Number(current.toFixed(2)));
    }

    return {
      finalValue: Number(current.toFixed(2)),
      profit: Number((current - amount).toFixed(2)),
      evolution,
    };
  }, [amount, months, rate]);

  return {
    amount,
    months,
    rate,
    setAmount,
    setMonths,
    setRate,
    result,
  };
}
