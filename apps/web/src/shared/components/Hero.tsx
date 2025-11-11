import React from "react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 pt-24 md:flex-row md:justify-between md:px-32">
      <div className="max-w-2xl md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          CDBs de Alta Rentabilidade com <span className="text-yellow-400">Proteção Total</span>
        </h1>

        <p className="mt-4 text-2xl text-gray-100">
          Descubra CDBs que rendem até <strong className="text-white">200% do CDI.</strong> Nossa
          ferramenta inteligente distribui seus investimentos respeitando os limites do FGC,
          garantindo máxima rentabilidade com segurança total, mesmo sem você conhecer a
          instituição.
        </p>

        <div className="flex flex-wrap gap-4 mt-6 text-sm">
          <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
            ✓ Proteção FGC
          </span>
          <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
            ✓ Sem Taxa
          </span>
          <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
            ✓ Acesso Imediato
          </span>
        </div>
      </div>

      <div className="mt-10 md:mt-0 md:ml-10">
        <video
          src="/videoexplicativo.mp4"
          className="w-[800px] h-auto rounded-2xl shadow-lg"
          controls
          preload="metadata"
        />
      </div>
    </section>
  );
}
