"use client";

import { useInvestmentProducts } from "@/hooks/useInvestmentProductForm";
import Link from "next/link";
import { useState } from "react";

/**
 * Displays a table with all registered investment products.
 */
export default function ListInvestmentProducts() {
  const { data, loading, error } = useInvestmentProducts();
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
            {/* delete modal */}
            {deleteId && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                <div className="bg-zinc-900 p-6 rounded-xl space-y-4 w-80 text-center border border-zinc-700">
                  <p className="text-white text-lg font-bold">Apagar produto?</p>
                  <p style={{ color: "white" }}>Tem certeza que quer apagar este produto?</p>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setDeleteId(null)}
                      className="px-4 py-2 bg-zinc-700 rounded-lg text-white"
                    >
                      Cancelar
                    </button>

                    <button
                      onClick={async () => {
                        await fetch(`http://localhost:3000/api/investment-product?id=${deleteId}`, {
                          method: "DELETE",
                        });
                        setDeleteId(null);
                        location.reload();
                      }}
                      className="px-4 py-2 bg-red-600 rounded-lg text-white"
                    >
                      Apagar
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                  <button onClick={() => setDeleteId(item.id)} className="text-red-500">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
