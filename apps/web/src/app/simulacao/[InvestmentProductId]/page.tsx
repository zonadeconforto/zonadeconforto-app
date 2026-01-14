import { notFound } from "next/navigation";
import { Simulation } from "./Simulation";

interface PageProps {
  params: Promise<{
    InvestmentProductId: string;
  }>;
}

export default async function SimulationPage({ params }: PageProps) {
  const { InvestmentProductId } = await params;

  if (!InvestmentProductId) {
    notFound();
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${API_BASE_URL}/investment-product/${InvestmentProductId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Erro ao carregar produto</div>;
  }

  const product = await res.json();

  return <Simulation product={product} />;
}
