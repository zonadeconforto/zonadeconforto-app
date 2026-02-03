"use client";

import ProfileForm from "@/shared/components/ProfileForm";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      window.location.href = "/login";
      return;
    }

    let parsed: any;

    try {
      parsed = JSON.parse(stored);
    } catch {
      window.location.href = "/login";
      return;
    }

    const token = parsed?.token;

    if (!token) {
      window.location.href = "/login";
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE_URL}/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        JSON.parse(localStorage.getItem("user"));
        if (!res.ok) {
          console.log("não autorizado");
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Carregando perfil...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.[0]}
              </div>

              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>

                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>

            <span className="px-4 py-1 rounded-full bg-gray-300 text-sm">Plano Gratuito</span>
          </div>

          <div className="border-t mb-8" />

          <ProfileForm user={user} />
        </div>
      </div>
    </main>
  );
}
