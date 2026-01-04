"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CdbCard } from "@/shared/components/CdbCard";
import { ContinueSimulationButton } from "@/shared/components/ContinueSimulationButton";
import Navbar from "@/shared/components/Navbar";

/**
 * Temporary mock – this will come from investmentProductService later
 */
const mockCdbs = [
  {
    id: "1",
    name: "teste1",
    profitabilityValue: 110,
    termMonths: 12,
    liquidity: "No vencimento",
    minValue: 1000,
    maxValue: 200000,
  },
  {
    id: "2",
    name: "teste2",
    profitabilityValue: 120,
    termMonths: 18,
    liquidity: "No vencimento",
    minValue: 5000,
    maxValue: 210000,
  },
  {
    id: "3",
    name: "teste3",
    profitabilityValue: 105,
    termMonths: 6,
    liquidity: "Diária após 90 dias",
    minValue: 500,
    maxValue: 240000,
  },
];

export default function CdbListPage() {
  const router = useRouter();

  const [cdbs, setCdbs] = useState<typeof mockCdbs>([]);
  const [selectedCdbId, setSelectedCdbId] = useState<string | null>(null);

  useEffect(() => {
    // depois troca isso por service
    setCdbs(mockCdbs);
  }, []);

  function handleContinue() {
    if (!selectedCdbId) return;
    router.push(`/simulacao/${selectedCdbId}`);
  }

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-center mt-10">CDBs Disponíveis</h1>

        <p className="text-center text-gray-600 mt-2">
          Selecione um CDB para simular seu investimento
        </p>

        <div className="mt-10 space-y-6">
          {cdbs.map(cdb => (
            <CdbCard
              key={cdb.id}
              {...cdb}
              selected={cdb.id === selectedCdbId}
              onSelect={setSelectedCdbId}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <ContinueSimulationButton disabled={!selectedCdbId} onClick={handleContinue} />
        </div>
      </main>
    </>
  );
}
