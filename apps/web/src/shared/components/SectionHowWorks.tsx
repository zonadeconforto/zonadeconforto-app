"use client";
import { CheckCircle, TrendingUp, DollarSign } from "lucide-react";

export default function SectionHowWorks() {
  const steps = [
    {
      id: 1,
      title: "Cadastre-se Gratuitamente",
      description:
        "Crie sua conta em menos de 2 minutos. Sem taxas, sem burocracias. Comece com nosso plano básico e acesse CDBs selecionados.",
      icon: <CheckCircle className="w-8 h-8 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      id: 2,
      title: "Escolha os Melhores CDBs",
      description:
        "Nossa curadoria especializada seleciona apenas CDBs de bancos sólidos com as melhores rentabilidades do mercado, sempre com proteção FGC.",
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      bg: "bg-green-50",
    },
    {
      id: 3,
      title: "Otimização Automática",
      description:
        "Nossa ferramenta distribui automaticamente seus investimentos entre diferentes bancos, respeitando o limite de R$ 250.000 por instituição para máxima proteção.",
      icon: <DollarSign className="w-8 h-8 text-purple-500" />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <section id="SectionHowWorks" className="py-24 bg-gray-50 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Como Funciona</h2>
        <p className="text-lg text-gray-600 mb-16">
          Nossa plataforma conecta você aos melhores CDBs do mercado, otimizando automaticamente
          seus investimentos dentro dos limites de proteção do FGC.
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map(step => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full mb-6 ${step.bg}`}
              >
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                {`${step.id}. ${step.title}`}
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
