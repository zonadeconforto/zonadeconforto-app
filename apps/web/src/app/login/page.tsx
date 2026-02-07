"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AppRouteApiUrl } from "@/shared/strings/app-route-api-url";
import { TextInput } from "@/shared/utils/formatters/TextInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(AppRouteApiUrl.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Invalid credentials");
      }

      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/client/investmentproducts");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        // to translate the erros to portuguese
        const errorToPortuguese: Record<string, string> = {
          "User not found": "Usuário não encontrado",
          "Invalid credentials": "Email ou senha inválidos",
        };

        const errorMessage =
          errorToPortuguese[err.message] || "Erro ao fazer login. Tente novamente.";

        setError(errorMessage);
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Entrar na sua conta</h2>
          <p className="text-gray-600">Acesse sua área de investimentos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <TextInput
              label="Email"
              type="email"
              value={email}
              placeholder="Digite seu Email"
              required
              onChange={v => setEmail(v)}
            />
          </div>

          <div>
            <TextInput
              label="Senha"
              type="password"
              value={password}
              placeholder="Digite sua senha"
              required
              onChange={v => setPassword(v)}
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">Lembrar de mim</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-600">Não tem uma conta? </span>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-semibold"
              onClick={() => router.push("/signup")}
            >
              Criar conta
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
