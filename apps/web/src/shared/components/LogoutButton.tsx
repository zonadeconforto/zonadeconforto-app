"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  className?: string;
  label?: string;
  width?: string;
  height?: string;
}

export default function LogoutButton({
  className = "bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition cursor-pointer active:scale-95",
  label = "Sair da conta",
  width = "160px",
  height = "40px",
}: LogoutButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function logout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <>
      {/* Botão principal */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          width,
          height,
        }}
        className={className}
      >
        {label}
      </button>

      {/* Modal de confirmação */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl space-y-4 w-80 text-center border border-zinc-700">
            <p className="text-xl font-bold text-black">Tem certeza que quer sair da conta?</p>

            <div className="pt-6 flex justify-between">
              {/* NÃO */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  w-20
                  bg-gray-400 hover:bg-gray-500
                  text-black
                  py-2
                  rounded-lg
                  font-semibold
                  transition
                  cursor-pointer
                  active:scale-95
                "
              >
                Não
              </button>

              {/* SIM */}
              <button
                type="button"
                onClick={logout}
                className="
                  w-20
                  bg-red-600 hover:bg-red-700
                  text-white
                  py-2
                  rounded-lg
                  font-semibold
                  transition
                  cursor-pointer
                  active:scale-95
                "
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
