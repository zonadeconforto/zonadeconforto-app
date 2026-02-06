"use client";

import { useRouter } from "next/navigation";
import { Building2, Layers, LayoutDashboardIcon } from "lucide-react";
import { AdminCard } from "@/shared/components/AdminCard";

export default function AdminPage() {
  const router = useRouter();

  return (
    <div
      className="
        min-h-screen
        bg-linear-to-r
        from-blue-600
        to-purple-600
        flex
        flex-col
        items-center
        justify-center
        px-6
      "
    >
      <h1 className="text-white text-4xl font-bold mb-12">Administrador</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AdminCard
          title="Produtos de Investimento"
          description="Crie e edite os Produtos de Investimento."
          icon={<Layers size={42} />}
          onClick={() => router.push("/admin/ListInvestmentProducts")}
        />
        <AdminCard
          title="Instituições"
          description="Cadestre e gerencie as instituições financeiras."
          icon={<Building2 size={42} />}
          onClick={() => router.push("/admin/ListInstitutions")}
        />
        {/* <div className="flex min-h-[70vh] w-full items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-20"> */}
        <AdminCard
          title="Usuários"
          description="Cadestre e gerencie as instituições financeiras."
          icon={<LayoutDashboardIcon size={42} />}
          onClick={() => router.push("/admin/ListUsers")}
        />
      </div>
    </div>
  );
}
