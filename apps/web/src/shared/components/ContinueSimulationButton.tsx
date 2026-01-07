"use client";

interface ContinueSimulationButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export function ContinueSimulationButton({ disabled, onClick }: ContinueSimulationButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`mt-10 w-full max-w-md py-3 rounded-lg font-semibold transition
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }
      `}
    >
      Continuar para Simulação
    </button>
  );
}
