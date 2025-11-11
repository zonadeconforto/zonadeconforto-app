export default function Footer() {
  return (
    <footer
      id="contato"
      className="py-10 bg-gray-900 text-center text-gray-400 text-sm"
    >
      <p>
        © {new Date().getFullYear()} Zona de Conforto — Todos os direitos
        reservados.
      </p>
      <p className="mt-2">
        Contato:{" "}
        <a
          href="mailto:contato@zonadeconforto.com"
          className="text-indigo-400 hover:underline"
        >
          contato@zonadeconforto.com
        </a>
      </p>
    </footer>
  );
}
