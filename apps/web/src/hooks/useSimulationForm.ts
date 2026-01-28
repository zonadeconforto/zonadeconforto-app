"use client";

import { useMemo, useState } from "react";

export const FGC_LIMIT = 250_000;

interface UseSimulationFormParams {
  minValue: number;
  maxValue: number;
  profitabilityValue: number; // ex: 220 (% a.a.)
  termMonths: number;
}

export function useSimulationForm({
  minValue,
  maxValue,
  profitabilityValue,
  termMonths,
}: UseSimulationFormParams) {
  const [amount, setAmountState] = useState<number>(minValue);
  const [months, setMonths] = useState<number>(termMonths);
  const annualRate = profitabilityValue / 100;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

  /**
   * Prevent invalid values (min / max)
   */
  const setAmount = (value: number) => {
    if (Number.isNaN(value)) return;

    if (value < minValue) {
      setAmountState(minValue);
      return;
    }

    if (value > maxValue) {
      setAmountState(maxValue);
      return;
    }

    setAmountState(value);
  };

  /**
   * Core simulation calculation
   */
  const result = useMemo(() => {
    let current = amount;
    const values: number[] = [];

    for (let i = 0; i <= months; i++) {
      values.push(Number(current.toFixed(2)));
      current *= 1 + monthlyRate;
    }

    const finalValue = values[values.length - 1];
    const profit = finalValue - amount;

    const exceedsFGC = finalValue > FGC_LIMIT;
    const fgcCoveredAmount = Math.min(finalValue, FGC_LIMIT);

    return {
      values,
      finalValue: Number(finalValue.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      exceedsFGC,
      fgcCoveredAmount,
    };
  }, [amount, months, monthlyRate]);

  /**
   * max amount to invest without exceeding FGC at maturity
   */
  const amountToReachFGCLimit = useMemo(() => {
    const divisor = Math.pow(1 + monthlyRate, months);
    const idealAmount = FGC_LIMIT / divisor;

    return Math.min(Math.max(Number(idealAmount.toFixed(2)), minValue), maxValue);
  }, [monthlyRate, months, minValue, maxValue]);

  return {
    amount,
    months,
    setAmount,
    setMonths,
    result,
    FGC_LIMIT,
    amountToReachFGCLimit,
  };
}
