"use client";

import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export default function ProfileForm({ user }: { user: User }) {
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

    if (res.ok) {
      alert("Perfil atualizado!");
    } else {
      alert("Erro ao salvar.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </form>
  );
}
