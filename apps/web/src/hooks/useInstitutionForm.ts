import { useState } from "react";
import { createInstitution } from "../services/institutionService";

/**
 * Custom hook that centralizes all form logic for creating an institution.
 *
 * It encapsulates:
 * - Form state management
 * - Field updates
 * - Basic validation
 * - Submit handling
 *
 * This helps keep page components clean, organized, and easier to maintain.
 *
 * @function useInstitutionForm
 * @returns {{
 *   form: { name: string; cnpj: string; type: string; site: string };
 *   message: string;
 *   updateField: (field: string, value: string) => void;
 *   submitForm: (e: React.FormEvent) => Promise<void>;
 * }} Returns the form state, message feedback, and helper functions.
 */
export function useInstitutionForm() {
  const [form, setForm] = useState({
    name: "",
    cnpj: "",
    type: "BANK",
    site: "",
  });

  const [message, setMessage] = useState("");

  /**
   * Updates a specific field in the form state.
   *
   * @param {string} field - The name of the form field to update.
   * @param {string} value - The new value for the field.
   */
  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Handles the form submission process.
   *
   * - Prevents page refresh
   * - Validates required fields
   * - Sends data to the API via `createInstitution`
   * - Resets the form and sets feedback messages
   *
   * @param {React.FormEvent} e - The form submit event.
   * @returns {Promise<void>} Resolves when the submission logic completes.
   */
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.cnpj || !form.type) {
      setMessage("Fill all required fields.");
      return;
    }

    const cleanCnpj = form.cnpj.replace(/\D/g, "");
    const result = await createInstitution({
      ...form,
      cnpj: cleanCnpj,
      site: form.site || null,
    });

    if (result.success) {
      setMessage("Instituição registrada com sucesso!");
      setForm({ name: "", cnpj: "", type: "BANK", site: "" });
    } else {
      setMessage(result.message || "Error registering institution.");
    }
  };

  return { form, message, updateField, submitForm };
}
