import { TextInput } from "@/shared/utils/formatters/TextInput";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

/**
 * Email input with simple validation.
 */
export function EmailInput({ value, onChange, required }: EmailInputProps) {
  const isValid = !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return (
    <TextInput
      label="Email"
      value={value}
      onChange={onChange}
      placeholder="email@exemplo.com"
      required={required}
      type="email"
      error={isValid ? null : "Email inválido"}
    />
  );
}
