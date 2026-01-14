type Props = {
  amount: number;
  months: number;
  rate: number;
  setAmount: (v: number) => void;
  setMonths: (v: number) => void;
  setRate: (v: number) => void;
};

export default function SimulationForm({
  amount,
  months,
  rate,
  setAmount,
  setMonths,
  setRate,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Valor investido (R$)</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Prazo (meses)</label>
        <input
          type="number"
          value={months}
          onChange={e => setMonths(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Taxa mensal (%)</label>
        <input
          type="number"
          step="0.01"
          value={rate}
          onChange={e => setRate(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>
    </div>
  );
}
