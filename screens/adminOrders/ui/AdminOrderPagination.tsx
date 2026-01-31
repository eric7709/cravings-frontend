'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useOrderStore } from '@/models/orders/store';
export default function AdminOrderPagination() {
  const {
    currentPage,
    setCurrentPage,
    contentPerPage,
    setContentPerPage,
    totalPages,
    totalOrders,
  } = useOrderStore();

  const start = totalOrders === 0 ? 0 : currentPage * contentPerPage + 1;
  const end = Math.min((currentPage + 1) * contentPerPage, totalOrders);

  return (
    <div className="flex h-8 items-center justify-between gap-2 rounded-full border border-slate-200 bg-white pl-3 pr-1 shadow-sm">
      {/* 1. Range Info - Minimalist */}
      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 whitespace-nowrap">
        <span className="font-bold text-slate-900">{start}-{end}</span>
        <span className="opacity-50">/</span>
        <span>{totalOrders}</span>
      </div>

      <div className="flex items-center gap-1 h-full">
        {/* 2. Compact Select - Integrated look */}
        <select
          value={contentPerPage}
          onChange={(e) => {
            setContentPerPage(+e.target.value);
            setCurrentPage(0);
          }}
          className="bg-transparent text-[11px] font-bold text-slate-600 outline-none hover:text-indigo-600 px-1 cursor-pointer"
        >
          {[10, 20, 50].map(n => <option key={n} value={n}>{n} rows</option>)}
        </select>

        {/* 3. Navigation - Unified Button Group */}
        <div className="flex items-center bg-slate-50 rounded-full p-0.5 border border-slate-100">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-1 hover:text-indigo-600 disabled:opacity-20 transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          
          <span className="text-[10px] font-black min-w-[30px] text-center text-slate-700">
            {currentPage + 1}
          </span>

          <button
            disabled={currentPage >= totalPages - 1}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-1 hover:text-indigo-600 disabled:opacity-20 transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}