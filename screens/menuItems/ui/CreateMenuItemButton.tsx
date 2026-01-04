"use client"
import { useMenuItemStore } from "@/models/menuItems/store";
import { Plus } from "lucide-react";

export default function CreateMenuItemButton() {
  const { openCreateModal } = useMenuItemStore()
  return (
    <button
      onClick={openCreateModal}
      className="
        flex items-center gap-2 
        bg-blue-600 text-white font-semibold
        px-5 py-3 rounded-xl shadow-md
        hover:bg-blue-700 hover:shadow-lg
        active:scale-95 duration-300
      "
    >
      <Plus size={18} />
      Create Menu Item
    </button>
  );
}
