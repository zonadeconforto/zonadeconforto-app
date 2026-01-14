import { Line } from "react-chartjs-2";

type Props = {
  finalValue: number;
  profit: number;
  evolution: number[];
};

export default function SimulationResult({ finalValue, profit, evolution }: Props) {
  const data = {
    labels: evolution.map((_, i) => `Mês ${i + 1}`),
    datasets: [
      {
        label: "Evolução do investimento",
        data: evolution,
      },
    ],
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-6">
        <div>
          <p className="text-sm text-gray-500">Valor final</p>
          <p className="text-lg font-bold">R$ {finalValue.toLocaleString("pt-BR")}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Lucro</p>
          <p className="text-lg font-bold text-green-600">R$ {profit.toLocaleString("pt-BR")}</p>
        </div>
      </div>

      <Line data={data} />
    </div>
  );
}
