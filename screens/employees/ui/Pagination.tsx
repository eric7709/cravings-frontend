import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export function Pagination() {
  return (
    <div className="sticky bottom-0 flex-col  bg-white/40 backdrop-blur-md border-t-2 border-gray-100 px-6 py-3.5 flex items-center justify-between z-20">
      {/* 1. Results Summary */}
      <div className="flex items-center gap-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Showing <span className="text-gray-900 font-black">1 — 10</span> of <span className="text-gray-900 font-black">24</span> Results
        </p>
        
        <div className="h-4 w-0.5 bg-gray-100 hidden sm:block" />
        
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Per Page:</span>
          <select className="bg-gray-50 border-2 border-gray-100 rounded-lg text-xs font-bold py-1 px-2 outline-none focus:border-blue-200 transition-colors cursor-pointer">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </div>

      {/* 2. Industrial Navigation Controls */}
      <div className="flex items-center gap-1.5">
        {/* First Page */}
        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          <ChevronsLeft size={18} strokeWidth={2.5} />
        </button>

        {/* Prev */}
        <button className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-50 border-2 border-transparent rounded-xl transition-all disabled:opacity-30">
          <ChevronLeft size={16} strokeWidth={2.5} />
          <span className="hidden md:block">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 px-2">
          <button className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-blue-600 bg-blue-600 text-white font-black text-sm shadow-md shadow-blue-200 transition-all">
            1
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-transparent text-gray-500 font-bold text-sm hover:border-gray-200 hover:text-gray-700 transition-all">
            2
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-transparent text-gray-500 font-bold text-sm hover:border-gray-200 hover:text-gray-700 transition-all">
            3
          </button>
        </div>

        {/* Next */}
        <button className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 border-2 border-transparent rounded-xl transition-all">
          <span className="hidden md:block">Next</span>
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>

        {/* Last Page */}
        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
          <ChevronsRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}