'use client';

import { useRef, useState } from 'react';
import { useOrderStore } from '@/models/orders/store';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { ChevronDown } from 'lucide-react';

export default function AdminOrderStatus() {
  const { orderStatus, setOrderStatus, todayOrderStats } = useOrderStore();
  const totalCount = todayOrderStats.cancelled + todayOrderStats.paid + todayOrderStats.completed + todayOrderStats.pending + todayOrderStats.preparing

  const OPTIONS = [
    { label: 'All', value: null, color: 'bg-slate-400', count: totalCount },
    { label: 'Pending', value: 'PENDING', color: 'bg-amber-500', count: todayOrderStats.pending },
    { label: 'Preparing', value: 'PREPARING', color: 'bg-blue-500', count: todayOrderStats.preparing },
    { label: 'Completed', value: 'COMPLETED', color: 'bg-green-500', count: todayOrderStats.completed },
    { label: 'Paid', value: 'PAID', color: 'bg-emerald-500', count: todayOrderStats.paid },
    { label: 'Cancelled', value: 'CANCELLED', color: 'bg-red-500', count: todayOrderStats.cancelled },
  ];


  const selectedStatus = OPTIONS.find(el => el.value === orderStatus);
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  useClickOutside(ref as any, () => setOpen(false), open);

  return (
    <div ref={ref} className="relative z-50 h-8">
      {/* Trigger Pill - Reduced padding and gaps */}
      <div
        onClick={() => setOpen(!open)}
        className="flex h-full items-center gap-1.5 rounded-full border border-slate-200 bg-white pl-2.5 pr-1.5 shadow-sm cursor-pointer hover:border-slate-300 transition-all"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedStatus?.color || 'bg-slate-400'}`} />
          <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap truncate max-w-17.5">
            {selectedStatus?.label ?? "All"}
          </span>
        </div>

        <div className="bg-slate-100 px-1 py-0.5 rounded text-[9px] font-black text-slate-500 min-w-4.5 text-center">
          {selectedStatus?.count ?? 0}
        </div>

        <ChevronDown size={12} className={`text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown - Reduced width from w-44 to w-36 */}
      <div className={`
        absolute top-[110%] right-0 w-36 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-200
        ${open ? "opacity-100 visible translate-y-0" : "invisible translate-y-1 opacity-0"}
      `}>
        <div className="p-1">
          {OPTIONS.map((el) => (
            <button
              key={el.value ?? 'all'}
              onClick={() => {
                setOrderStatus(el.value);
                setOpen(false);
              }}
              className={`
                flex items-center justify-between w-full px-2 py-1.5 rounded-lg transition-colors
                ${el.value === orderStatus ? "bg-indigo-50" : "hover:bg-slate-50"}
              `}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <div className={`w-1 h-1 rounded-full shrink-0 ${el.color}`} />
                <span className={`text-[11px] truncate ${el.value === orderStatus ? "text-indigo-600 font-bold" : "text-slate-600 font-medium"}`}>
                  {el.label}
                </span>
              </div>
              <span className={`text-[9px] font-bold px-1 rounded ${el.value === orderStatus ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                {el.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}