"use client";

import { ReactNode } from "react";

interface AdminCardProps {
  title: string;
  description?: string;
  onClick: () => void;
  icon?: ReactNode;
}

export function AdminCard({ title, description, onClick, icon }: AdminCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        group
        bg-white
        rounded-2xl
        p-10
        w-full
        max-w-sm
        text-left
        border
        border-gray-200
        shadow-md
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-xl
        hover:bg-gray-50
      "
    >
      {icon && <div className="mb-4 text-blue-600 text-4xl">{icon}</div>}

      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>

      {description && <p className="text-gray-600">{description}</p>}
    </button>
  );
}
