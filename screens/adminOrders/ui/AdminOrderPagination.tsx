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

  const start = currentPage * contentPerPage + 1;
  const end = Math.min(start + contentPerPage - 1, totalOrders);

  return (
    <div className="flex h-11 items-center gap-5 justify-between rounded-xl border-2 border-slate-200 bg-white px-5 shadow-sm">
      <p className="text-sm text-slate-600">
        {start}-{end} of {totalOrders}
      </p>
      <div className="flex items-center gap-3">
        <select
          value={contentPerPage}
          onChange={(e) => {
            setContentPerPage(+e.target.value);
            setCurrentPage(0);
          }}
          className="rounded-xl border outline-none border-slate-200 px-3 py-1.5 text-sm"
        >
          {[10, 20, 25, 30, 40, 50, 100].map(n => <option key={n}>{n}</option>)}
        </select>
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="rounded-xl border border-slate-200 p-2 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          disabled={currentPage >= totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="rounded-xl border border-slate-200 p-2 disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
