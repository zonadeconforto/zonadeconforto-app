"use client";

import { useState, useMemo } from "react";
import { InvestmentChart } from "@/shared/components/InvestmentChart";
import { calculateInvestmentEvolution } from "@/shared/utils/calculators/investmentCalculator";

interface SimulationProps {
  product: {
    id: string;
    name: string;
    profitabilityValue: number; // ex: 220
    termMonths: number;
    minValue: number;
    maxValue: number;
  };
}

export function Simulation({ product }: SimulationProps) {
  const [amount, setAmount] = useState<number>(product.minValue);
  const [months, setMonths] = useState<number>(product.termMonths);

  // taxa anual REAL vinda da API (220% → 2.2)
  const annualRate = product.profitabilityValue / 100;

  const result = useMemo(() => {
    return calculateInvestmentEvolution({
      amount,
      annualRate,
      months,
    });
  }, [amount, annualRate, months]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Simulação – {product.name}</h1>

      {/* Inputs */}
      <div className="flex gap-4">
        <div>
          <label className="block text-sm">Valor investido</label>
          <input
            type="number"
            min={product.minValue}
            max={product.maxValue}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            className="border px-2 py-1"
          />
        </div>

        <div>
          <label className="block text-sm">Prazo (meses)</label>
          <input
            type="number"
            min={1}
            max={product.termMonths}
            value={months}
            onChange={e => setMonths(Number(e.target.value))}
            className="border px-2 py-1"
          />
        </div>
      </div>

      {/* Resultados */}
      <div className="space-y-1">
        <p>
          Valor investido: <strong>R$ {amount.toLocaleString("pt-BR")}</strong>
        </p>

        <p>
          Rendimento: <strong>R$ {result.profit.toLocaleString("pt-BR")}</strong>
        </p>

        <p>
          Valor final: <strong>R$ {result.finalValue.toLocaleString("pt-BR")}</strong>
        </p>
      </div>

      {/* Gráfico */}
      <InvestmentChart labels={result.labels} values={result.values} />
    </div>
  );
}
