"use client";

import { useMenuItemStore } from "@/models/menuItems/store";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

export const MenuItemSearch = () => {
  const { search, setSearch } = useMenuItemStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full xl:w-64"
    >
      {/* Search Icon */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />

      {/* Input */}
      <input
        type="text"
        placeholder="Search menu items"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full h-12 rounded-xl bg-white
          pl-11 pr-10 text-sm font-medium
          border-2 border-slate-200 shadow-md
          placeholder:text-slate-400
          focus:border-indigo-500 
          outline-none transition
        "
      />

      {/* Clear Button */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
};
