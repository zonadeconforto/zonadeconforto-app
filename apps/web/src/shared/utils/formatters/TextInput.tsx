import { useMask } from "@react-input/mask";

/**
 * Props for the TextInput component.
 */
interface TextInputProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  onFocus?: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  mask?: string;
  type?: React.HTMLInputTypeAttribute;
  error?: string | null;
  backgroundColor?: string;
  textColor?: string;
}

/**
 * Reusable text input component with optional mask support.
 */
export function TextInput({
  label,
  value,
  onChange,
  onFocus,
  placeholder,
  required,
  mask,
  type = "text",
  error,
  backgroundColor,
  textColor,
}: TextInputProps) {
  const inputRef = useMask(mask ? { mask, replacement: { x: /\d/ } } : undefined);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && "*"}
      </label>

      <input
        style={{ backgroundColor: backgroundColor, color: textColor }}
        ref={mask ? inputRef : undefined}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={e => onChange(e.target.value)}
        onFocus={e => e.target.select()}
        className={`text-black w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
