"use client";

import { useState, useMemo } from "react";
import { InvestmentChart } from "@/shared/components/InvestmentChart";
import { calculateInvestmentEvolution } from "@/shared/utils/calculators/investmentCalculator";
import Navbar from "@/shared/components/NavbarLog";
import BackButton from "@/shared/components/BackButton";
import { CurrencyInput } from "@/shared/utils/formatters/CurrencyInput";
import { FGC_LIMIT } from "@/hooks/useSimulationForm";
interface SimulationProps {
  product: {
    id: string;
    name: string;
    profitabilityValue: number;
    termMonths: number;
    minValue: number;
    maxValue: number;
    site?: string | null;
  };
}

export function Simulation({ product }: SimulationProps) {
  const [amount, setAmount] = useState<number>(product.minValue);
  const [months, setMonths] = useState<number>(product.termMonths);
  const [showResult, setShowResult] = useState(false);
  const annualRate = product.profitabilityValue / 100;
  console.log(product.site);
  const result = useMemo(() => {
    return calculateInvestmentEvolution({
      amount,
      annualRate,
      months,
    });
  }, [amount, annualRate, months]);

  /**
   * check if the value is below the minimum value
   */
  const belowMinValue = amount < product.minValue;
  const exceedsFGC = result.finalValue > FGC_LIMIT;

  /**
   * max value that can be invested with the fgc protection
   */
  const maxSafeAmount = useMemo(() => {
    const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
    const divisor = Math.pow(1 + monthlyRate, months);

    return Number((FGC_LIMIT / divisor).toFixed(2));
  }, [annualRate, months]);

  return (
    <div>
      <Navbar />
      <BackButton />

      <div className="mx-auto max-w-5xl px-4 pt-24 space-y-10">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">Simulação de Investimento</h1>
          <p className="text-sm text-gray-500">
            Configure seu investimento e veja a projeção de rendimentos
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-lg bg-blue-50 px-6 py-4 text-blue-700 text-lg">
          <strong>Produto Selecionado:</strong>
          <p>{product.name}</p>
          <p>Rentabilidade: {product.profitabilityValue}% a.a.</p>
          <p>Prazo sugerido: {product.termMonths} meses</p>
        </div>

        {/* Inputs */}
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex justify-center gap-10">
            {/* Amount */}
            <div className="w-[500px]">
              <label className="block text-xl font-medium mb-1">Valor a investir</label>

              <CurrencyInput value={amount} onChange={setAmount} />

              <p className="text-sm text-blue-600 mt-1">
                Valor mínimo: R$ {product.minValue.toLocaleString("pt-BR")}
              </p>
              <p className="text-sm text-blue-600">
                Valor máximo: R$ {product.maxValue.toLocaleString("pt-BR")}
              </p>

              {/* 🔴 alert minimum value */}
              {belowMinValue && (
                <div className="mt-4 rounded-md border border-red-400 bg-red-50 p-4 text-sm text-red-900">
                  <p className="font-semibold">❌ Valor abaixo do mínimo permitido</p>

                  <p className="mt-1">
                    O valor mínimo para investir neste CDB é{" "}
                    <strong>R$ {product.minValue.toLocaleString("pt-BR")}</strong>.
                  </p>

                  <button
                    type="button"
                    onClick={() => setAmount(product.minValue)}
                    className="mt-3 rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition"
                  >
                    Valor mínimo
                  </button>
                </div>
              )}

              {/* 🟡 fgc alert */}
              {exceedsFGC && (
                <div className="mt-4 rounded-md border border-yellow-400 bg-yellow-50 p-4 text-sm text-yellow-900">
                  <p className="font-semibold">⚠️ Atenção: Valor acima do limite do FGC!</p>

                  <p className="mt-1">
                    O FGC protege <strong>R$ {maxSafeAmount.toLocaleString("pt-BR")}</strong> nesse
                    investimento.
                  </p>

                  <button
                    type="button"
                    onClick={() => setAmount(maxSafeAmount)}
                    className="mt-3 rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition"
                  >
                    Valor máximo assegurado
                  </button>
                </div>
              )}
            </div>

            {/* Months */}
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

          {/* Button */}
          <button
            disabled={belowMinValue}
            onClick={() => setShowResult(true)}
            className={`w-full rounded-md py-3 text-base font-semibold transition
              ${
                belowMinValue
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }
            `}
          >
            Gerar Simulação
          </button>
        </div>

        {/* Results */}
        {showResult && !belowMinValue && (
          <div className="space-y-10">
            <h2 className="text-lg font-semibold">Projeção de Rendimentos</h2>
            <InvestmentChart labels={result.labels} values={result.values} />
            <div className="grid grid-cols-3 gap-7">
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
            {/* Button */}
            {showResult && !belowMinValue && (
              <a href={product.site}>
                <button
                  disabled={belowMinValue}
                  className={`w-full rounded-md py-3 text-base font-semibold transition
              ${
                belowMinValue
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-400 hover:bg-amber-500 text-white"
              }
            `}
                >
                  Ver Investimento
                </button>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
