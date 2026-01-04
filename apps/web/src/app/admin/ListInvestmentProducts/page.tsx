"use client";

import { useInvestmentProducts } from "@/hooks/useInvestmentProductForm";
import Link from "next/link";

/**
 * Displays a table with all registered investment products.
 */
export default function ListInvestmentProducts() {
  const { data, loading, error } = useInvestmentProducts();

  if (loading) {
    return <p className="p-6">Loading investment products...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Produtos de Investimento</h1>

        <Link
          href="/admin/NewInvestmentProduct"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          + Novo Produto
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-zinc-700 rounded-lg">
          <thead>
            <tr className="bg-slate-300 text-left">
              <th className="p-3 border border-zinc-700">Nome</th>
              <th className="p-3 border border-zinc-700">Tipo</th>
              <th className="p-3 border border-zinc-700">Liquidez</th>
              <th className="p-3 border border-zinc-700">Vencimento</th>
              <th className="p-3 border border-zinc-700">Valor mínimo</th>
              <th className="p-3 border border-zinc-700">Ações</th>
            </tr>
          </thead>

          <tbody>
            {data.map(item => (
              <tr key={item.id} className="bg-white hover:bg-blue-300">
                <td className="p-3 border-zinc-700 font-medium capitalize">{item.name}</td>
                <td className="p-3 border border-zinc-700">{item.productType}</td>
                <td className="p-3 border border-zinc-700">{item.liquidity}</td>
                <td className="p-3 border border-zinc-700">{item.termMonths} meses</td>
                <td className="p-3 border border-zinc-700">
                  {item.minValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="p-3 flex gap-3">
                  <Link href={`/investment-product/${item.id}`} className="text-yellow-400">
                    ✏️
                  </Link>
                  <button className="text-red-500">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
