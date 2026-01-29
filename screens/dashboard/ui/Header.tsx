'use client'

import { useRouter } from "next/navigation";
import { CustomDateDropdown } from "./CustomDateDropdown";
import { LayoutGrid, UtensilsCrossed } from "lucide-react";
import { useMenuItemStore } from "@/models/menuItems/store";

export default function Header() {
  const router = useRouter();
  const { openCreateModal } = useMenuItemStore();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between w-full px-4 pt-4 gap-4">
      <CustomDateDropdown />
      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          onClick={() => router.push("/admin/tables")}
          className="flex items-center gap-3 h-12 px-4 w-full lg:w-fit cursor-pointer bg-white border border-emerald-500 text-gray-700 rounded-xl shadow-sm hover:bg-emerald-50 transition-all duration-300 active:scale-90"
        >
          <LayoutGrid size={20} className="text-emerald-500 transition-colors duration-300" />
          <span className="text-sm font-bold tracking-wide">Manage Tables</span>
        </button>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-3 h-12 px-4 w-full lg:w-fit cursor-pointer bg-white border border-orange-500 text-gray-700 rounded-xl shadow-sm hover:bg-orange-50 transition-all duration-300 active:scale-90"
        >
          <UtensilsCrossed size={20} className="text-orange-500 transition-colors duration-300" />
          <span className="text-sm font-bold tracking-wide">Create Menu-Item</span>
        </button>
      </div>
    </div>
  );
}