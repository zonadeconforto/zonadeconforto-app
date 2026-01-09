import React from "react";
import { useRouter } from "next/navigation"; // ou 'next/router' se usar Pages Router

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed left-6 top-6 z-50 flex items-center justify-center
                 w-12 h-12 bg-transparent hover:opacity-75 transition-opacity duration-200"
      aria-label="Voltar"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current text-black" // Define a cor do traço como preto
      >
        {/* Círculo externo */}
        <circle cx="12" cy="12" r="10" strokeWidth="2.5" />

        <path
          d="M12 8L8 12M8 12L12 16M8 12H16"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default BackButton;
