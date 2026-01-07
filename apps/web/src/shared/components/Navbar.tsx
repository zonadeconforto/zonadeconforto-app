export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm fixed w-full top-0 z-50">
      <a href="#">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">ZC</span>
          </div>
          <span className="font-semibold text-gray-800 text-lg">Zona de Conforto</span>
        </div>
      </a>

      <ul className="hidden md:flex items-center gap-8 text-gray-700">
        <li>
          <a href="#como-funciona" className="hover:text-blue-600">
            Como Funciona
          </a>
        </li>
        <li>
          <a href="#contato" className="hover:text-blue-600">
            Contato
          </a>
        </li>
        <li>
          <a href="login" className="hover:text-blue-600">
            Entrar
          </a>
        </li>
        <li>
          <a
            href="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Cadastre-se
          </a>
        </li>
      </ul>
    </nav>
  );
}
