interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
}

export function SelectInput({ label, value, onChange, options, required }: SelectInputProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label} {required && "*"}
      </label>

      <select
        className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
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
