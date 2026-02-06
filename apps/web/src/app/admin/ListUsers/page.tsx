"use client";

import BackButtonA from "@/shared/components/BackButtonA";
import { UserDashboard } from "@/shared/components/UserDashboard";
import { useEffect, useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function formatCPF(cpf: string | null | undefined) {
  if (!cpf) return "";

  return cpf
    .replace(/\D+/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(phone: string | null | undefined) {
  if (!phone) return "";

  return phone
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
}

interface User {
  id: string;
  name: string;
  email: string;
  plan: "Gratuito" | "Premium" | "Pro";
  phone: string | null;
  cpf: string | null;
  createdAt: string;
}
export default function InstitutionsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadUsers() {
      try {
        const stored = localStorage.getItem("user");

        if (!stored) return;

        const { token } = JSON.parse(stored);

        const response = await fetch(`${API_BASE_URL}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <main className="p-6 ">Carregando...</main>;
  }

  return (
    <main className="p-6 space-y-6">
      <BackButtonA></BackButtonA>
      <div className="flex items-center justify-between">
        <div className="pl-20">
          <h1 className="text-3xl font-bold ">Usuários</h1>
        </div>
        <a
          href="/admin/NewInstitution"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl  font-semibold"
        >
          + Nova Instituição
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-slate-300 text-left">
              <th className="p-3 border border-zinc-700">Nome</th>
              <th className="p-3 border border-zinc-700">Email</th>
              <th className="p-3 border border-zinc-700">Plano</th>
              <th className="p-3 border border-zinc-700">Cadastro</th>
              <th className="p-3 border border-zinc-700">Telefone</th>
              <th className="p-3 border border-zinc-700">CPF</th>

              <th className="p-3 border border-zinc-700">Ações</th>
            </tr>
          </thead>

          <tbody>
            {users.map(users => (
              <tr key={users.id} className="bg-white hover:bg-blue-300">
                <td className="p-3 border border-zinc-700 capitalize">{users.name}</td>
                <td className="p-3 border border-zinc-700">{users.email}</td>
                <td className="p-3 border border-zinc-700">{users.plan}</td>
                <td className="p-3 border border-zinc-700">{users.createdAt}</td>
                <td className="p-3 border border-zinc-700">{formatPhone(users.phone)}</td>
                <td className="p-3 border border-zinc-700">{formatCPF(users.cpf)}</td>
                <td className="p-3 border border-zinc-700 flex gap-3">
                  {/* EDITAR */}
                  <button className="text-yellow-400 hover:text-yellow-300">✏️</button>

                  <button className="text-red-500 hover:text-red-400">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UserDashboard></UserDashboard>
      </div>
      )
    </main>
  );
}
