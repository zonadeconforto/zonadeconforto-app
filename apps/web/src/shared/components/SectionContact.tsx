export default function Contato() {
  return (
    <section id="contato" className="py-28 bg-zinc-900 text-center">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">Entre em contato</h2>
      <p className="text-zinc-400 mb-4">
        Dúvidas? Fale conosco.
      </p>
      <a
        href="mailto:contato@zonadeconforto.com"
        className="text-orange-500 hover:underline font-medium"
      >
        contato@zonadeconforto.com
      </a>
    </section>
  );
}
