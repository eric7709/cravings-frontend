'use client';

import { useOrderStore } from "@/models/orders/store";
import { Search, X } from "lucide-react";

export default function AdminOrderSearch() {
  const { search, setSearch } = useOrderStore();

  return (
    <div className="relative group h-8 w-full sm:w-64">
      {/* Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search 
          size={14} 
          className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" 
        />
      </div>

      {/* Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search orders..."
        className="
          w-full h-full pl-9 pr-8
          bg-white border border-slate-200 rounded-full
          text-[12px] font-medium text-slate-700
          placeholder:text-slate-400
          shadow-sm transition-all
          focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50/50
        "
      />

      {/* Clear Button */}
      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={14} className="bg-slate-100 rounded-full p-0.5" />
        </button>
      )}
    </div>
  );
}