"use client";

import { TextInput } from "@/shared/components/TextInput";
import { isValidCpf } from "../utils/validators/cpf";

/**
 * Props for CpfInput component.
 */
interface CpfInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

/**
 * CPF input with mask and mathematical validation.
 */
export function CpfInput({ value, onChange, required }: CpfInputProps) {
  const error = value && !isValidCpf(value) ? "CPF inválido" : null;

  return (
    <TextInput
      label="CPF"
      value={value}
      onChange={onChange}
      placeholder="000.000.000-00"
      required={required}
      mask="xxx.xxx.xxx-xx"
      error={error}
    />
  );
}
