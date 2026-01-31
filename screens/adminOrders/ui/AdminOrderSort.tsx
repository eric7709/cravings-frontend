'use client';

import { useOrderStore } from "@/models/orders/store";
import { Order } from "@/models/orders/types";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useRef, useState } from "react";
import { ChevronDown, ArrowUpNarrowWide, ArrowDownWideNarrow } from "lucide-react";

export default function AdminOrderSort() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef as any, () => setOpen(false), open);
  
  const { sortBy, setSortBy, direction, setDirection } = useOrderStore();
  const sortLabel = data.find(el => el.value === sortBy);

  const toggleDirection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(direction === "asc" ? "desc" : "asc");
  };

  return (
    <div ref={dropdownRef} className="relative z-20 h-8">
      {/* Trigger Pill - Compact Version */}
      <div 
        onClick={() => setOpen(!open)} 
        className="flex h-full items-center gap-1.5 rounded-full border border-slate-200 bg-white pl-2.5 pr-1.5 shadow-sm cursor-pointer hover:border-slate-300 transition-all"
      >
        {/* Active Sort Label */}
        <span className="text-[11px] font-bold text-slate-700 truncate max-w-[65px]">
          {sortLabel?.label}
        </span>
        
        {/* Slim Direction Toggle */}
        <button 
          onClick={toggleDirection}
          className="p-1 hover:bg-slate-50 rounded-md text-indigo-600 border border-slate-100 transition-all shadow-sm"
        >
          {direction === "asc" ? <ArrowUpNarrowWide size={12} /> : <ArrowDownWideNarrow size={12} />}
        </button>

        <ChevronDown size={12} className={`text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown Menu - Reduced width to w-36 to match Status dropdown */}
      <div className={`
        absolute top-[110%] right-0 w-36 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-200
        ${open ? "opacity-100 visible translate-y-0" : "invisible translate-y-1 opacity-0"}
      `}>
        <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
          {data.map((el) => (
            <button
              key={el.value}
              onClick={() => {
                setSortBy(el.value);
                setOpen(false);
              }}
              className={`
                w-full text-left px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors
                ${sortBy === el.value 
                  ? "bg-indigo-50 text-indigo-600 font-bold" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
              `}
            >
              {el.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const data: { label: string; value: keyof Order }[] = [
  { label: 'Table No.', value: 'tableNumber' },
  { label: 'Waiter', value: 'waiterName' },
  { label: 'Customer', value: 'customerName' },
  { label: 'Invoice', value: 'invoiceNumber' },
  { label: 'Status', value: 'orderStatus' },
  { label: 'Total', value: 'total' },
  { label: 'Created', value: 'createdAt' },
];