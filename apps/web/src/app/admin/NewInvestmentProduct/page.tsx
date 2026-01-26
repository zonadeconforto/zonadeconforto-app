"use client";

import { useEffect } from "react";
import { listInstitutions, Institution } from "@/services/institutionService";
import { useState } from "react";
import { TextInput } from "@/shared/utils/formatters/TextInput";
import { SelectInput } from "@/shared/components/SelectInput";
import { useRouter } from "next/navigation";
import { investmentProductHttpService } from "@/services/investmentProductService";
import BackButtonA from "@/shared/components/BackButtonA";
import { CurrencyInput } from "@/shared/utils/formatters/CurrencyInput";

/**
 * Page responsible for creating a new Investment Product.
 * UI only — business rules live in the backend.
 */

export default function NewInvestmentProduct() {
  const router = useRouter();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    productType: "CDB",
    financialInstitutionId: "",
    profitabilityType: "PREFIXED",
    profitabilityValue: 0,
    indexer: "",
    termMonths: 12,
    liquidity: "MATURITY",
    graceDays: 0,
    minValue: 0,
    maxValue: 0,
    description: "",
    status: "ACTIVE",
    incomeTax: "REGRESSIVE",
  });

  useEffect(() => {
    async function load() {
      const data = await listInstitutions();
      setInstitutions(data);
    }
    load();
  }, []);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      await investmentProductHttpService.create({
        ...form,
        profitabilityValue: Number(form.profitabilityValue),
        termMonths: Number(form.termMonths),
        minValue: Number(form.minValue),
        maxValue: Number(form.maxValue),
        indexer: form.indexer || undefined,
      });

      router.push("admin/ListInvestmentProducts");
    } catch (err) {
      setError("Failed to create investment product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <BackButtonA></BackButtonA>
      <h1 className="text-3xl font-bold text-center">Cadastrar Produto de Investimento</h1>
      {error && <p className="p-3 bg-red-900/30 border border-red-700 rounded-lg">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectInput
          backgroundColor="white"
          label="Instituição *"
          value={form.financialInstitutionId}
          onChange={v => updateField("financialInstitutionId", v)}
          options={institutions.map(i => ({
            value: i.id,
            label: i.name,
          }))}
        />

        <TextInput
          label="Nome"
          value={form.name}
          required
          placeholder="Ex: CDB Banco XP 120% CDI"
          onChange={v => updateField("name", v)}
        />

        <SelectInput
          backgroundColor="white"
          label="Tipo do Produto *"
          value={form.productType}
          onChange={v => updateField("productType", v)}
          options={[
            { value: "CDB", label: "CDB" },
            { value: "LCI", label: "LCI" },
            { value: "LCA", label: "LCA" },
            { value: "DEBENTURE", label: "Debênture" },
            { value: "OTHER", label: "Outro" },
          ]}
        />

        <SelectInput
          backgroundColor="white"
          label="Tipo de Rentabilidade *"
          value={form.profitabilityType}
          onChange={v => updateField("profitabilityType", v)}
          options={[
            { value: "PREFIXED", label: "Prefixado" },
            { value: "CDI_POST_FIXED", label: "Pós-fixado (CDI)" },
            { value: "IPCA_PLUS", label: "IPCA +" },
            { value: "HYBRID", label: "Híbrido" },
          ]}
        />

        <TextInput
          label="Rentabilidade (%) *"
          type="number"
          value={form.profitabilityValue}
          onChange={v => updateField("profitabilityValue", Number(v))}
        />

        {/* if the profitabilityType is PREFIXED the Indexer must be CDI */}
        {form.profitabilityType === "PREFIXED" && (
          <SelectInput
            backgroundColor="white"
            label="Indexador *"
            value={form.indexer}
            onChange={v => updateField("indexer", v)}
            options={[{ value: "CDI", label: "CDI" }]}
          />
        )}

        {(form.profitabilityType === "CDI_POST_FIXED" || form.profitabilityType === "HYBRID") && (
          <SelectInput
            backgroundColor="white"
            label="Indexador *"
            value={form.indexer}
            onChange={v => updateField("indexer", v)}
            options={[
              { value: "CDI", label: "CDI" },
              { value: "IPCA", label: "IPCA" },
              { value: "SELIC", label: "SELIC" },
            ]}
          />
        )}

        <TextInput
          label="Prazo (meses) *"
          type="number"
          value={form.termMonths}
          onChange={v => updateField("termMonths", Number(v))}
        />

        <SelectInput
          backgroundColor="white"
          label="Liquidez *"
          value={form.liquidity}
          onChange={v => updateField("liquidity", v)}
          options={[
            { value: "DAILY", label: "Diária" },
            { value: "MATURITY", label: "No vencimento" },
            { value: "GRACE_PERIOD", label: "Com carência" },
          ]}
        />

        {/* if the liquidity is GRACE_PERIOD if the product have graceDays */}
        {form.liquidity === "GRACE_PERIOD" && (
          <TextInput
            label="Dias de carência*"
            type="number"
            value={form.graceDays}
            onChange={v => updateField("graceDays", Number(v))}
          />
        )}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Valor mínimo (R$) *</label>

          <CurrencyInput value={form.minValue} onChange={v => updateField("minValue", v)} />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Valor máximo (R$) *</label>

          <CurrencyInput value={form.maxValue} onChange={v => updateField("maxValue", v)} />
        </div>

        <TextInput
          label="Descrição"
          value={form.description}
          placeholder="Informações adicionais do produto"
          onChange={v => updateField("description", v)}
        />

        <SelectInput
          backgroundColor="white"
          label="Status"
          value={form.status}
          onChange={v => updateField("status", v)}
          options={[
            { value: "ACTIVE", label: "Ativo" },
            { value: "INACTIVE", label: "Inativo" },
            { value: "COMING_SOON", label: "Em breve" },
            { value: "EXPIRED", label: "Expirado" },
          ]}
        />

        <SelectInput
          backgroundColor="white"
          label="Imposto de Renda *"
          value={form.incomeTax}
          onChange={v => updateField("incomeTax", v)}
          options={[
            { value: "REGRESSIVE", label: "Regressivo" },
            { value: "EXEMPT", label: "Isento" },
            { value: "EXCLUSIVE", label: "Exclusivo na fonte" },
          ]}
        />

        <button
          type="submit"
          onClick={() => router.back()}
          disabled={loading}
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold disabled:opacity-60"
        >
          {loading ? "Salvando..." : "Cadastrar Produto"}
        </button>
      </form>
    </main>
  );
}
