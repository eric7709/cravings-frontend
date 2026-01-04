'use client';

import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useCategoryStore } from "@/models/categories/store";
import CreateButton from "@/shared/ui/CreateButton";
import Search from "@/shared/ui/Search";

export default function Header() {
  const { openCreateModal, setSearch, search } = useCategoryStore();
  const [opened, setOpened] = useState(false);

  return (
    <div className="px-4 py-3 bg-white border-b border-gray-100">
      {/* Desktop Header */}
      <div className="hidden lg:flex bg-white items-center justify-between py-4 px-3 border border-gray-100 rounded-2xl shadow shadow-gray-200">
        <Search value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Categories..." className="w-56" />
        <div className="flex items-center gap-3">
          <CreateButton title="Create Category" onClick={openCreateModal} />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpened(!opened)}
          className="bg-blue-600 flex items-center gap-3 w-full py-3 text-white text-sm font-semibold duration-300 active:scale-95 cursor-pointer shadow-md hover:bg-blue-700 rounded-3xl justify-center"
        >
          Options <TiArrowSortedDown className={`duration-300 ${opened ? "-rotate-180" : ""}`} />
        </button>

        <div
          className={`space-y-3 overflow-hidden transition-all duration-300 ease-in-out ${opened ? "max-h-[600px] mt-3" : "max-h-0"
            }`}
        >
          <Search placeholder="Search Categories..." className="w-full" />
          <CreateButton title="Create Category" className="w-full justify-center" onClick={openCreateModal} />
        </div>
      </div>
    </div>
  );
}
