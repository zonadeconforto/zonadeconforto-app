"use client";

import { useState, useMemo } from "react";
import { InvestmentChart } from "@/shared/components/InvestmentChart";
import { calculateInvestmentEvolution } from "@/shared/utils/calculators/investmentCalculator";
import Navbar from "@/shared/components/NavbarLogado";
import { div } from "framer-motion/client";

interface SimulationProps {
  product: {
    id: string;
    name: string;
    profitabilityValue: number;
    termMonths: number;
    minValue: number;
    maxValue: number;
  };
}

export function Simulation({ product }: SimulationProps) {
  const [amount, setAmount] = useState<number>(product.minValue);
  const [months, setMonths] = useState<number>(product.termMonths);
  const [showResult, setShowResult] = useState(false);

  const annualRate = product.profitabilityValue / 100;

  const result = useMemo(() => {
    return calculateInvestmentEvolution({
      amount,
      annualRate,
      months,
    });
  }, [amount, annualRate, months]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pt-24 space-y-10">
        {/* Título */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">Simulação de Investimento</h1>
          <p className="text-sm text-gray-500">
            Configure seu investimento e veja a projeção de rendimentos
          </p>
        </div>

        {/* Caixa CDB Selecionado */}
        <div className="mx-auto max-w-3xl rounded-lg bg-blue-50 px-6 py-3 text-blue-700 ">
          <h1 className="text-xl">
            <strong>CDB Selecionado:</strong>
            <p></p> {product.name} <p></p>Rentabilidade: {product.profitabilityValue}% a.a. <p></p>{" "}
            Prazo sugerido: {product.termMonths} meses
          </h1>
        </div>

        {/* Inputs */}
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex justify-center gap-10">
            {/* Valor */}
            <div className="w-[500px]">
              <label className="block text-xl font-medium mb-1">Valor a investir</label>
              <input
                type="number"
                min={product.minValue}
                max={product.maxValue}
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="text-sm text-blue-600">
                Valor mínimo: R$ {product.minValue.toLocaleString("pt-BR")}
              </span>
              <p>
                <span className="text-sm text-blue-600">
                  Valor máximo: R$ {product.maxValue.toLocaleString("pt-BR")}
                </span>
              </p>
            </div>

            {/* Prazo */}
            <div className="w-[240px]">
              <label className="block text-xl font-medium mb-1">Prazo (meses)</label>
              <input
                type="number"
                min={1}
                max={product.termMonths}
                value={months}
                onChange={e => setMonths(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Botão */}
          <button
            onClick={() => setShowResult(true)}
            className="w-full rounded-md bg-green-600 py-3 text-white text-base font-semibold hover:bg-green-700 transition"
          >
            Gerar Simulação
          </button>
        </div>

        {/* Resultados */}
        {showResult && (
          <div className="space-y-10">
            <h2 className="text-lg font-semibold">Projeção de Rendimentos</h2>

            <InvestmentChart labels={result.labels} values={result.values} />

            <div className="grid grid-cols-3 gap-6">
              <div className="rounded-lg bg-green-50 p-5 text-center">
                <p className="text-sm text-gray-500">Valor Investido</p>
                <p className="text-xl font-bold text-green-700">
                  R$ {amount.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="rounded-lg bg-green-50 p-5 text-center">
                <p className="text-sm text-gray-500">Rendimento Total</p>
                <p className="text-xl font-bold text-green-700">
                  R$ {result.profit.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="rounded-lg bg-green-50 p-5 text-center">
                <p className="text-sm text-gray-500">Valor Final</p>
                <p className="text-xl font-bold text-green-700">
                  R$ {result.finalValue.toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
