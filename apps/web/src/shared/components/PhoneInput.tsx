import { TextInput } from "@/components/TextInput";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

/**
 * Phone input with Brazilian mask.
 */
export function PhoneInput({ value, onChange, required }: PhoneInputProps) {
  return (
    <TextInput
      label="Telefone"
      value={value}
      onChange={onChange}
      placeholder="(11) 99999-9999"
      required={required}
      mask="(xx) xxxxx-xxxx"
    />
  );
}
