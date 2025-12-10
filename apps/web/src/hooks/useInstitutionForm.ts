/*
centralizes the form logic (state, validation, and submit)
this keeps the page.tsx file clean and makes everything easier
*/
import { useState } from "react";
import { createInstitution } from "../services/institutionService";

export function useInstitutionForm() {
  const [form, setForm] = useState({
    name: "",
    cnpj: "",
    type: "BANK",
    site: "",
  });

  const [message, setMessage] = useState("");

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.cnpj || !form.type) {
      setMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    const result = await createInstitution({
      ...form,
      site: form.site || null,
    });

    if (result.success) {
      setMessage("Instituição cadastrada com sucesso!");
      setForm({ name: "", cnpj: "", type: "BANK", site: "" });
    } else {
      setMessage(result.message || "Erro ao cadastrar instituição.");
    }
  };

  return { form, message, updateField, submitForm };
}
