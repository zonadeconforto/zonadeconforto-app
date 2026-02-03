import { useRouter } from "next/navigation";

interface BackButtonProps {
  x?: string;
  y?: string;
}

const BackButton = ({ x = "left-6", y = "top-6" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`
        fixed ${x} ${y} z-50
        flex items-center justify-center
        w-12 h-12
        bg-transparent
        hover:opacity-75
        transition-opacity duration-200
        cursor-pointer
      `}
      aria-label="Voltar"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current text-black"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2.5" />

        <path
          d="M12 8L8 12M8 12L12 16M8 12H16"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default BackButton;
