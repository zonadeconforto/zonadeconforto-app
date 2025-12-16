import { useMask } from "@react-input/mask";

/**
 * Props for the TextInput component.
 *
 * @interface TextInputProps
 * @property {string} label - Text displayed above the input field.
 * @property {string} value - Current value of the input.
 * @property {(value: string) => void} onChange - Callback triggered whenever the input value changes.
 * @property {string} [placeholder] - Text shown when the input is empty.
 * @property {boolean} [required] - Indicates whether the field is required.
 * @property {string} [mask] - Optional input mask pattern (e.g. CNPJ).
 */
interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  mask?: string;
}

/**
 * Reusable text input component with optional input masking support.
 *
 * Uses `@react-input/mask` when a mask is provided, otherwise behaves
 * as a regular controlled input.
 *
 * @function TextInput
 * @param {TextInputProps} props - The component properties.
 * @returns {JSX.Element} A reusable text input element.
 */
export function TextInput({ label, value, onChange, placeholder, required, mask }: TextInputProps) {
  const inputRef = useMask(
    mask
      ? {
          mask,
          replacement: { x: /\d/ },
          showMask: false,
        }
      : undefined
  );

  return (
    <div>
      <label className="block mb-1 font-medium">
        {label} {required && "*"}
      </label>

      <input
        // ref={mask ? inputRef : undefined}
        className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
