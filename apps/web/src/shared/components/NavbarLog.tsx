import LogoutButton from "./LogoutButton";
import { UserIcon } from "./UserIcon";

export default function NavbarLog() {
  return (
    <nav className="flex items-center px-30 py-4 bg-white shadow-sm fixed w-full top-0 z-50">
      {/* Logo */}
      <a href="#" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">ZC</span>
        </div>

        <span className="font-semibold text-gray-800 text-lg">Zona de Conforto</span>
      </a>{" "}
      {/* Right side */}
      <div className="flex items-center gap-4 ml-auto">
        <ul className="hidden md:flex items-center gap-6 text-gray-700">
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
        </ul>
        <a href="./profile">
          <UserIcon />
        </a>
        <LogoutButton label="Sair" width="95px" height="37px" />
      </div>
    </nav>
  );
}
