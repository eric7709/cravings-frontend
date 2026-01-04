"use client";

import { useState } from "react";
import CreateButton from "@/shared/ui/CreateButton";
import Search from "@/shared/ui/Search";
import { useMenuItemStore } from "@/models/menuItems/store";
import { TiArrowSortedDown } from "react-icons/ti";

export default function Header() {
  const { openCreateModal, setSearch, search } = useMenuItemStore();
  const [opened, setOpened] = useState(false);

  return (
    <div className="px-4 py-3 bg-white border-b border-gray-100">
      {/* Desktop */}
      <div className="hidden lg:flex bg-white items-center justify-between py-4 px-3 border border-gray-100 rounded-2xl shadow shadow-gray-200">
        <Search value={search} onChange={(e) => setSearch(e.target.value)} className="w-56" placeholder="Search Menu-items..." />
        <div className="flex gap-3 items-center">
          <CreateButton onClick={openCreateModal} title="Create Menu-item" />
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpened(!opened)}
          className="bg-blue-600 flex items-center gap-3 w-full py-3 text-white text-sm font-semibold duration-300 active:scale-95 cursor-pointer shadow-md hover:bg-blue-700 rounded-3xl justify-center"
        >
          Options <TiArrowSortedDown className={`duration-300 ${opened ? "-rotate-180" : ""}`} />
        </button>

        <div
          className={`space-y-3 overflow-hidden duration-300 ${
            opened ? "max-h-[600px] mt-3" : "max-h-0"
          }`}
        >
          <Search className="w-full" placeholder="Search Menu-items..." />
          <CreateButton
            className="w-full justify-center"
            onClick={openCreateModal}
            title="Create Menu-item"
          />
        </div>
      </div>
    </div>
  );
}
