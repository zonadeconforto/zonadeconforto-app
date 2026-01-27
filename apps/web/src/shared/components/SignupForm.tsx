"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupTerms from "./SignupTerms";
import { TextInput } from "@/shared/utils/formatters/TextInput";
import { PhoneInput } from "./PhoneInput";
import { EmailInput } from "../utils/formatters/EmailInput";
import { removeMask } from "../utils/remove-mask";
import { UserServiceImpl } from "@/modules/user/services/user.service.impl";
import { userSignup } from "@/services/userService";
import { CpfInput } from "../utils/formatters/CpfInput";

/**
 * Signup form component
 */
export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      /**
       * API integration will be added later
       */
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = {
        name,
        email,
        password,
        cpf: removeMask(cpf),
        phone: removeMask(phone),
      };
      const response = userSignup(data);
      console.log(response);
      router.push("/login");
    } catch {
      setError("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Nome Completo"
        value={name}
        onChange={setName}
        placeholder="Digite seu nome completo"
        required
      />
      <EmailInput value={email} onChange={setEmail} required />
      <CpfInput value={cpf} onChange={setCpf} required />
      <PhoneInput value={phone} onChange={setPhone} required />
      <TextInput
        label="Senha"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Crie uma senha segura"
        required
      />
      <SignupTerms />
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
      >
        {loading ? "Criando conta..." : "Criar Conta"}
      </button>
      <div className="text-center mt-4">
        <span className="text-gray-600">Já tem uma conta? </span>
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
