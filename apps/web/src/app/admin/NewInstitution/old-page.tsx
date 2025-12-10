"use client";

import { useState } from "react";

export default function NewInstitutionPage() {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [type, setType] = useState("BANK");
  const [site, setSite] = useState("");

  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!name || !cnpj || !type) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/institutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          cnpj,
          type,
          site: site || null,
        }),
      });

      if (res.ok) {
        setMensagem("Instituição cadastrada com sucesso!");
        setName("");
        setCnpj("");
        setSite("");
      } else {
        setMensagem("Erro ao cadastrar instituição.");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro no servidor.");
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <center>
        <h1 className="text-3xl font-bold">Cadastrar Instituição</h1>
      </center>
      {mensagem && <p className="p-3 bg-zinc-800 rounded-lg border border-zinc-700">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nome *</label>
          <input
            className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ex: Itau"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">CNPJ *</label>
          <input
            className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
            value={cnpj}
            onChange={e => setCnpj(e.target.value)}
            placeholder="Ex: 11111111111111"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tipo *</label>
          <select
            className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="BANK">Banco</option>
            <option value="BROKERAGE">Corretora</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Site (opcional)</label>
          <input
            className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
            value={site}
            onChange={e => setSite(e.target.value)}
            placeholder="https://site.com.br"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
        >
          Cadastrar Instituição
        </button>
      </form>
    </main>
  );
}
