"use client";

import { useSimulation } from "@/hooks/useSimulationForm";
import SimulationForm from "../components/SimulationForm";
import SimulationResult from "../components/SimulationResult";

type Props = {
  investmentProductId: string;
};

export default function SimulationPage({ investmentProductId }: Props) {
  const simulation = useSimulation();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Simulação de investimento</h1>

      <p className="text-sm text-gray-500">Produto selecionado: {investmentProductId}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <SimulationForm {...simulation} />
        </div>

        <div className="border rounded-lg p-4">
          <SimulationResult {...simulation.result} />
        </div>
      </div>
    </div>
  );
}
