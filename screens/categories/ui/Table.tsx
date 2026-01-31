'use client';
import { Pencil, Trash2, Search } from "lucide-react";
import { useCategoryStore } from "@/models/categories/store";
import Loader from "@/shared/ui/Loader";
import AdjustSearch from "@/shared/ui/AdjustSearch";

export default function CategoryTable() {
  const {
    categories,
    search,
    openUpdateModal,
    setSelectedCategory,
    openDeleteModal,
    hasHydrated,
    loading,
  } = useCategoryStore();

  if (!hasHydrated && loading) return <Loader />

  if (hasHydrated && categories.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 py-10">
        <Search className="w-12 h-12 mb-3 text-slate-400" />
        <h3 className="text-base font-semibold text-slate-900 mb-1">
          No categories yet
        </h3>
        <p className="text-xs">Create categories to organize your menu</p>
      </div>
    );
  }

  /* -------------------- FILTER -------------------- */
  const term = search.toLowerCase().trim();

  const filteredData = categories.filter((cat) => {
    return (
      cat.name.toLowerCase().includes(term) ||
      (cat.description?.toLowerCase().includes(term) ?? false) ||
      cat.status.toLowerCase().includes(term) ||
      cat.menuItemCount.toString().includes(term)
    );
  });

  /* -------------------- SEARCH EMPTY -------------------- */
  if (hasHydrated && filteredData.length === 0) return <AdjustSearch title="Categories" subTitle="Try adjusting your search" />

  /* -------------------- TABLE -------------------- */
  return (
    <div className="p-4 pt-0 w-full mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden relative">
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                  Category
                </th>
                <th className="px-4 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-tight hidden sm:table-cell">
                  Description
                </th>
                <th className="px-4 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                  Items
                </th>
                <th className="px-4 py-3.5 text-center text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((cat) => (
                <tr
                  key={cat.id}
                  className="group hover:bg-slate-50/30 transition-colors"
                >
                  {/* Category */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 shrink-0 rounded-full bg-green-700 text-[10px] flex items-center justify-center text-white font-bold shadow-sm">
                        {cat.id}
                      </div>
                      <div className="font-bold text-[11px] text-slate-800 capitalize">
                        {cat.name}
                      </div>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="text-slate-500 text-[10px] max-w-xs truncate" title={cat.description || ""}>
                      {cat.description || <span className="text-slate-300 italic">None</span>}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="px-4 py-3 text-[10px] font-semibold text-slate-700">
                    {cat.menuItemCount} {cat.menuItemCount === 1 ? "Item" : "Items"}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button
                        onClick={() => { setSelectedCategory(cat); openUpdateModal(); }}
                        className="p-1.5 cursor-pointer rounded-md bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={() => { setSelectedCategory(cat); openDeleteModal(); }}
                        className="p-1.5 cursor-pointer rounded-md bg-red-100 text-red-600 hover:bg-rose-600 hover:text-white transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && hasHydrated && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500 animate-pulse" />
        )}
      </div>
    </div>
  );
}