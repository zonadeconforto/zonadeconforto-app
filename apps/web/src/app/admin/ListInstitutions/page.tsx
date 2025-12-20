"use client";

import { TextInput } from "@/components/TextInput";
import { useEffect, useState } from "react";

// Formatador de CNPJ
function formatCNPJ(cnpj: string) {
  return cnpj
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

interface Institution {
  id: string;
  name: string;
  cnpj: string;
  type: string;
  site: string | null;
}

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Institution | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:3000/api/institutions", {
          cache: "no-store",
        });
        const data = await res.json();
        setInstitutions(data);
      } catch (err) {
        console.error("Erro ao carregar instituições:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDelete() {
    if (!deleteId) return;

    const response = await fetch(`http://localhost:3000/api/institutions/${deleteId}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      setInstitutions(prev => prev.filter(inst => inst.id !== deleteId));
    } else {
      alert(response.statusText);
    }
    setDeleteId(null);
  }

  async function handleEditSubmit(e: any) {
    e.preventDefault();

    if (!editData) return;

    const res = await fetch(`http://localhost:3000/api/institutions/${editData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    if (res.ok) {
      setInstitutions(prev => prev.map(inst => (inst.id === editData.id ? editData : inst)));
      setEditData(null);
    }
  }

  if (loading) {
    return <main className="p-6 text-white">Carregando...</main>;
  }

  return (
    <main className="p-6 space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Instituições Cadastradas</h1>

        <a
          href="/admin/NewInstitution"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold"
        >
          + Nova Instituição
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-zinc-800 text-left">
              <th className="p-3 border border-zinc-700">Nome</th>
              <th className="p-3 border border-zinc-700">CNPJ</th>
              <th className="p-3 border border-zinc-700">Tipo</th>
              <th className="p-3 border border-zinc-700">Site</th>
              <th className="p-3 border border-zinc-700">Ações</th>
            </tr>
          </thead>

          <tbody>
            {institutions.map(inst => (
              <tr key={inst.id} className="bg-zinc-900 hover:bg-zinc-800">
                <td className="p-3 border border-zinc-700 capitalize">{inst.name}</td>
                <td className="p-3 border border-zinc-700">{formatCNPJ(inst.cnpj)}</td>
                <td className="p-3 border border-zinc-700">
                  {inst.type === "BANK" ? "Banco" : "Corretora"}
                </td>
                <td className="p-3 border border-zinc-700">
                  {inst.site ? (
                    <a href={inst.site} target="_blank" className="text-blue-400 underline">
                      Acessar
                    </a>
                  ) : (
                    <span className="text-zinc-500 italic">Sem site</span>
                  )}
                </td>

                <td className="p-3 border border-zinc-700 flex gap-3">
                  {/* EDITAR */}
                  <button
                    onClick={() => setEditData(inst)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    🖉
                  </button>

                  <button
                    onClick={() => setDeleteId(inst.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl space-y-4 w-80 text-center border border-zinc-700">
            <h2 className="text-xl font-bold">Apagar instituição X?</h2>
            <p>Tem certeza que quer apagar esta instituição?</p>

            <div className="flex justify-between">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-zinc-700 rounded-lg"
              >
                Cancelar
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* edit modal */}
      {editData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-zinc-900 p-6 rounded-xl space-y-4 w-200 border border-zinc-700"
          >
            <h2 className="text-xl font-bold">Editar Instituição</h2>
            <h2>Nome:</h2>
            <input
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              value={editData.name}
              onChange={e => setEditData({ ...editData, name: e.target.value })}
            />
            <h2>CNPJ</h2>
            <TextInput
              // className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              label="CNPJ"
              value={editData.cnpj}
              required
              mask="xx.xxx.xxx/xxxx-xx"
              placeholder="00.000.000/0000-00"
              onChange={e => setEditData({ ...editData, cnpj: e })}
            />
            {/* <input
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              value={editData.cnpj}
              onChange={e => setEditData({ ...editData, cnpj: e.target.value })}
            /> */}
            <h2>Tipo de Instituição</h2>
            <select
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              value={editData.type}
              onChange={e => setEditData({ ...editData, type: e.target.value })}
            >
              <option value="BANK">Banco</option>
              <option value="BROKERAGE">Corretora</option>
            </select>
            <h2>Site</h2>
            <input
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              value={editData.site ?? ""}
              onChange={e => setEditData({ ...editData, site: e.target.value })}
            />
            <div className="flex justify-between">
              <button
                onClick={() => setEditData(null)}
                type="button"
                className="px-4 py-2 bg-zinc-700 rounded-lg"
              >
                Cancelar
              </button>

              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
