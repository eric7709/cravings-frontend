'use client'

import { useRouter } from "next/navigation";
import { CustomDateDropdown } from "./CustomDateDropdown";
import { LayoutGrid, UtensilsCrossed } from "lucide-react";
import { useMenuItemStore } from "@/models/menuItems/store";

export default function Header() {
  const router = useRouter();
  const { openCreateModal } = useMenuItemStore();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between w-full px-4 pt-3 gap-4">
      <CustomDateDropdown />
      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          onClick={() => router.push("/admin/tables")}
          className="flex items-center gap-3 h-9 px-2 w-full lg:w-fit cursor-pointer bg-white border-[1.5px] border-emerald-400 text-gray-700 rounded-lg shadow-sm hover:bg-emerald-50 transition-all duration-300 active:scale-90"
        >
          <LayoutGrid size={15} className="text-emerald-500 transition-colors duration-300" />
          <span className="text-[10px] font-bold tracking-wide -translate-x-1">Manage Tables</span>
        </button>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-3 h-9 px-2 w-full lg:w-fit cursor-pointer bg-white border-[1.5px] border-orange-400 text-gray-700 rounded-lg shadow-sm hover:bg-orange-50 transition-all duration-300 active:scale-90"
        >
          <UtensilsCrossed size={15} className="text-orange-500 transition-colors duration-300" />
          <span className="text-[10px] font-bold tracking-wide -translate-x-1">Create Menu-Item</span>
        </button>
      </div>
    </div>
  );
}