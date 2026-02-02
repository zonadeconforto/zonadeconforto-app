import { useState } from "react";
import { useMask } from "@react-input/mask";
import { Eye, EyeOff } from "lucide-react";
import { a } from "framer-motion/client";

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
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useMask(mask ? { mask, replacement: { x: /\d/ } } : undefined);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && "*"}
      </label>

      <div className="relative">
        <input
          style={{ backgroundColor: backgroundColor, color: textColor }}
          ref={mask ? inputRef : undefined}
          type={inputType}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={e => onChange(e.target.value)}
          onFocus={e => e.target.select()}
          className={`text-black w-full p-2 pr-10 rounded-lg border focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500" : "border-gray-300"}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
