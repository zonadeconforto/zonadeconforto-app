"use client";

interface CdbCardProps {
  id: string;
  name: string;
  profitabilityValue: number;
  termMonths: number;
  liquidity: string;
  minValue: number;
  maxValue: number;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function CdbCard({
  id,
  name,
  profitabilityValue,
  termMonths,
  liquidity,
  minValue,
  maxValue,
  selected,
  onSelect,
}: CdbCardProps) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`w-full text-left border rounded-xl p-6 transition
        ${selected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}
      `}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold">{name}</h3>

          <p className="text-xl text-gray-600">Rentabilidade: {profitabilityValue}% do CDI</p>

          <p className="text-xl text-gray-600">Prazo: {termMonths} meses</p>

          <p className="text-xl text-gray-600">Liquidez: {liquidity}</p>

          <p className="text-xl text-gray-600">
            Valor mínimo: R$ {minValue.toLocaleString("pt-BR")}
          </p>

          <p className="text-xl text-gray-600">
            Valor máximo: R$ {maxValue.toLocaleString("pt-BR")}
          </p>
        </div>

        <div className="flex flex-col">
          <span className="text-green-600 font-bold text-3xl">
            +{Math.floor(profitabilityValue / 15)}% a.a.
          </span>

          <span className="whitespace-pre-wrap text-lg">Rendimento estimado</span>
        </div>
      </div>
    </button>
  );
}
