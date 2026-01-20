"use client";

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CdbCard } from "@/shared/components/InvestmentProductCard";
import { ContinueSimulationButton } from "@/shared/components/ContinueSimulationButton";

import { investmentProductHttpService } from "@/services/investmentProductService";
import {
  investmentProductToUi,
  type Cdb,
} from "@/modules/investment-product/mappers/investment-product-to-ui.mapper";
import NavbarLogado from "@/shared/components/NavbarLogado";
import { InvestmentChart } from "@/shared/components/InvestmentChart";

export default function CdbListPage() {
  const router = useRouter();

  const [cdbs, setCdbs] = useState<Cdb[]>([]);
  const [selectedCdbId, setSelectedCdbId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCdbs() {
      try {
        const products = await investmentProductHttpService.list();

        const mapped = products.filter(p => p.status === "ACTIVE").map(investmentProductToUi);

        setCdbs(mapped);
      } catch (error) {
        console.error("Error loading investment products", error);
      }
    }

    loadCdbs();
  }, []);

  function handleContinue() {
    if (!selectedCdbId) return;
    router.push(`/simulacao/${selectedCdbId}`);
  }

  return (
    <>
      <NavbarLogado />

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
