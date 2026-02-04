"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "./BackButton";
import LogoutButton from "./LogoutButton";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export default function ProfileForm({ user }: { user: User }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
      router.back();
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSuccess]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    function getAuthToken() {
      const stored = localStorage.getItem("user");

      if (!stored) return null;

      return JSON.parse(stored)?.token ?? null;
    }
    const token = getAuthToken();

    const res = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (!localStorage.getItem("user")) return;
    if (res.ok) {
      setShowSuccess(true);
    } else {
      alert("Erro ao salvar.");
    }
  }

  function logout(_event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    localStorage.removeItem("user");
    router.push("/login");
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="border-amber-950 grid md:grid-cols-2 gap-6">
        <BackButton x="right-340" y="top-40" />
        <div>
          <label className="block text-sm mb-1">Nome</label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>

          <input
            value={user.email}
            disabled
            className="w-full bg-gray-100 border rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Telefone</label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">CPF</label>

          <input
            value={user.cpf}
            disabled
            className="w-full bg-gray-100 border rounded-lg px-4 py-2"
          />
        </div>
        <div className="md:col-span-2 flex justify-end pt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Salvar
          </button>
        </div>
        <LogoutButton className="-translate-y-15 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition cursor-pointer active:scale-95" />

        {/* confirmation modal */}
        {isClicked && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl space-y-4 w-80 text-center border border-zinc-700">
              <p style={{ color: "black" }} className="text-xl font-bold ">
                Tem certeza que quer sair da conta?
              </p>
              <p style={{ color: "white" }}>.</p>

              <div className="p-6 flex justify-between">
                <p style={{ color: "black" }}>
                  <button
                    type="button"
                    onClick={() => setIsClicked(false)}
                    className="w-20 bg-gray-400 hover:bg-gray-500 text-black py-2 rounded-lg font-semibold transition cursor-pointer active:scale-95"
                  >
                    Não
                  </button>
                </p>
                <p style={{ color: "black" }}>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-20 bg-red-600 hover:bg-red-700 text-black py-2 rounded-lg font-semibold transition cursor-pointer active:scale-95"
                  >
                    Sim
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
        {/* success popup */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
              className={` bg-white rounded-xl p-6 w-80 shadow-xl text-center transition-all duration-200 scale-100 opacity-100`}
            >
              <h3 className="text-lg font-semibold mb-1">Feito!</h3>
              <div className="text-green-500 text-4xl mb-2">✅</div>

              <p className="text-gray-600 text-sm">Alterações salvas com sucesso.</p>

              <button
                onClick={() => setShowSuccess(false)}
                className="mt-3 bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 text-sm rounded-md transition"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
