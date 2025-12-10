"use client";

import { SelectInput } from "@/components/SelectInput";
import { TextInput } from "@/components/TextInput";
import { useInstitutionForm } from "@/hooks/useInstitutionForm";

export default function NewInstitutionPage() {
  const { form, message, updateField, submitForm } = useInstitutionForm();

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <center>
        <h1 className="text-3xl font-bold">Cadastrar Instituição</h1>
      </center>

      {message && <p className="p-3 bg-zinc-800 rounded-lg border border-zinc-700">{message}</p>}

      <form onSubmit={submitForm} className="space-y-4">
        <TextInput
          label="Nome"
          value={form.name}
          required
          placeholder="Ex: Itau"
          onChange={v => updateField("name", v)}
        />

        <TextInput
          label="CNPJ"
          value={form.cnpj}
          required
          placeholder="Ex: 11111111111111"
          onChange={v => updateField("cnpj", v)}
        />

        <SelectInput
          label="Tipo"
          value={form.type}
          required
          onChange={v => updateField("type", v)}
          options={[
            { value: "BANK", label: "Banco" },
            { value: "BROKERAGE", label: "Corretora" },
          ]}
        />

        <TextInput
          label="Site (opcional)"
          value={form.site}
          placeholder="https://site.com.br"
          onChange={v => updateField("site", v)}
        />

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
