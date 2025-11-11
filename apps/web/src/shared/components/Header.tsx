import Image from "next/image";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid #eee",
      }}
    >
      <Image src="/next.svg" alt="Logo" width={40} />
      <h1>Tela Inicial Zona de Conforto</h1>
    </header>
  );
}
