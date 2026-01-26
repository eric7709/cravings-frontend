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

  /* -------------------- INITIAL LOADING -------------------- */
  if (!hasHydrated && loading) return <Loader />

  /* -------------------- EMPTY AFTER HYDRATION -------------------- */
  if (hasHydrated && categories.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500">
        <Search className="w-16 h-16 mb-4 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          No categories yet
        </h3>
        <p>Create categories to organize your menu</p>
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
  if (filteredData.length > 0) return (
    <div className="p-4 pt-0  w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/60 overflow-hidden relative">
        <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Items
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((cat) => (
                <tr
                  key={cat.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  {/* Category */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 shrink-0 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200/50 group-hover:scale-105 transition-all">
                        {cat.id}
                      </div>
                      <div className="font-semibold text-slate-900 capitalize">
                        {cat.name}
                      </div>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p
                      className="text-sm text-slate-600 max-w-md truncate"
                      title={cat.description || ""}
                    >
                      {cat.description || (
                        <span className="text-slate-400 italic">
                          No description
                        </span>
                      )}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {cat.menuItemCount}{" "}
                    {cat.menuItemCount === 1 ? "Item" : "Items"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(cat);
                          openUpdateModal();
                        }}
                        className="p-2 cursor-pointer rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        title="Edit category"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCategory(cat);
                          openDeleteModal();
                        }}
                        className="p-2 cursor-pointer rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                        title="Delete category"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Subtle refetch indicator */}
        {loading && hasHydrated && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500 animate-pulse" />
        )}
      </div>
    </div>
  );
}
