/**
 * Represents an individual selectable option for the SelectInput component.
 *
 * @interface Option
 * @property {string} value - The internal value associated with the option.
 * @property {string} label - The user-facing display text for the option.
 */
interface Option {
  value: string;
  label: string;
}

/**
 * Props for the SelectInput component.
 *
 * @interface SelectInputProps
 * @property {string} label - Text displayed above the select element.
 * @property {string} value - Currently selected value.
 * @property {(value: string) => void} onChange - Callback triggered when the selection changes.
 * @property {Option[]} options - List of selectable options.
 * @property {boolean} [required] - Indicates whether selection is mandatory.
 */
interface SelectInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

/**
 * Reusable select (dropdown) component designed to maintain consistent styling
 * and behavior across the application.
 *
 * Displays a label, a styled `<select>` element, and a list of dynamic options.
 * The component triggers the `onChange` callback whenever the user selects a new value.
 *
 * @function SelectInput
 * @param {SelectInputProps} props - Component properties.
 * @returns {JSX.Element} A styled and reusable select input component.
 */
export function SelectInput({
  label,
  value,
  onChange,
  options,
  required,
  backgroundColor,
  textColor,
}: SelectInputProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label} {required && "*"}
      </label>

      <select
        className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
        style={{ backgroundColor: backgroundColor, color: textColor }}
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
