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
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">Liquidez</th>
              <th className="p-3 text-left">Vencimento</th>
              <th className="p-3 text-left">Valor mínimo</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>

          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-t border-zinc-700 hover:bg-zinc-800">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">{item.productType}</td>
                <td className="p-3">{item.liquidity}</td>
                <td className="p-3">{item.termMonths} meses</td>
                <td className="p-3">
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
