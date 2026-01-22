"use client";

interface CurrencyInputProps {
  value: number; // valor REAL (ex: 1234.56)
  onChange?: (value: number) => void;
}

export function CurrencyInput({ value, onChange }: CurrencyInputProps) {
  // converte reais → centavos
  const cents = Math.round(value * 100);

  const formatted = (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // remove tudo que não é número
    const digits = e.target.value.replace(/\D/g, "");

    // evita NaN
    const newCents = digits ? Number(digits) : 0;

    // converte de volta pra reais
    onChange(newCents / 100);
  }

  return (
    <input
      type="text"
      value={formatted}
      onChange={handleChange}
      onFocus={e => e.target.select()}
      inputMode="numeric"
      className="w-full rounded-md border px-3 py-2 text-base
        focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
}
