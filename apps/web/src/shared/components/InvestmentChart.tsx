"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

interface InvestmentChartProps {
  labels: string[];
  values: number[];
}

export function InvestmentChart({ labels, values }: InvestmentChartProps) {
  return (
    <div className="h-[350px] w-full">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Valor do Investimento",
              data: values,
              fill: true,
              tension: 0.4,
              borderWidth: 3,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              ticks: {
                callback: value => `R$ ${Number(value).toLocaleString("pt-BR")}`,
              },
            },
          },
        }}
      />
    </div>
  );
}
