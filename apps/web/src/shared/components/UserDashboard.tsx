"use client";

import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface User {
  id: string;
  name: string;
  email: string;
  plan: "Gratuito" | "Premium" | "Pro";
  phone: string | null;
  cpf: string | null;
  createdAt: string;
}

export const UserDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const planPrices = {
    Gratuito: 0,
    Premium: 19.9,
    Pro: 49.9,
  };

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

  const metrics = useMemo(() => {
    const totalUsers = users.length;

    const freeUsers = users.filter(user => user.plan === "Gratuito").length;

    const monthlyRevenue = users.reduce((total, user) => {
      return total + (planPrices[user.plan] || 0);
    }, 0);

    const planDistribution = Object.keys(planPrices).map(plan => ({
      name: plan,
      value: users.filter(user => user.plan === plan).length,
      price: planPrices[plan as keyof typeof planPrices],
    }));

    return {
      totalUsers,
      freeUsers,
      monthlyRevenue,
      planDistribution,
    };
  }, [users]);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  if (loading) {
    return <div className="text-center py-20 text-gray-600">Carregando usuários...</div>;
  }

  return (
    <div className="w-full">
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium">Usuários Totais</p>

            <p className="text-3xl font-bold mt-2">{metrics.totalUsers}</p>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium">Usuários Gratuitos</p>

            <p className="text-3xl font-bold mt-2">{metrics.freeUsers}</p>

            {metrics.totalUsers > 0 && (
              <p className="text-gray-500 text-xs mt-2">
                {((metrics.freeUsers / metrics.totalUsers) * 100).toFixed(1)}% do total
              </p>
            )}
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium">Receita Mensal</p>

            <p className="text-3xl font-bold mt-2">
              R$ {metrics.monthlyRevenue.toFixed(2).replace(".", ",")}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Usuários por Plano</h3>

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={metrics.planDistribution}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {metrics.planDistribution.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full lg:w-1/2 lg:pl-6 mt-6 lg:mt-0 space-y-4">
              {metrics.planDistribution.map((plan, index) => (
                <div key={plan.name} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />

                    <span className="font-medium">{plan.name}</span>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{plan.value} usuários</p>

                    <p className="text-sm text-gray-600">
                      R$ {(plan.value * plan.price).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
