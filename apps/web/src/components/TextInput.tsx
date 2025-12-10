// reusable input component to maintain visual consistency
interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

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
