/**
 * Props for the TextInput component.
 *
 * @interface TextInputProps
 * @property {string} label - Text displayed above the input field.
 * @property {string} value - Current value of the input.
 * @property {(value: string) => void} onChange - Callback triggered whenever the input value changes.
 * @property {string} [placeholder] - Text shown when the input is empty.
 * @property {boolean} [required] - Indicates whether the field is required.
 */
interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

/**
 * Reusable text input component designed to maintain visual and behavioral
 * consistency across the application.
 *
 * Displays a label and a styled input field, and triggers the `onChange`
 * function whenever the user modifies the value. It supports optional
 * placeholder text and a required field indicator (*).
 *
 * @function TextInput
 * @param {TextInputProps} props - The component properties.
 * @returns {JSX.Element} A reusable text input element.
 */
export function TextInput({ label, value, onChange, placeholder, required }: TextInputProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label} {required && "*"}
      </label>
      <input
        className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
