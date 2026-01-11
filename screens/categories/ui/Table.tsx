'use client';
import { Pencil, Trash2, Search } from "lucide-react";
import { useCategoryStore } from "@/models/categories/store";

export default function CategoryTable() {
  const { categories, search, openUpdateModal, setSelectedCategory, openDeleteModal } = useCategoryStore();

  if (!categories?.length) return null;

  const filteredData = categories.filter(cat => {
    const term = search.toLowerCase().trim();

    return (
      cat.name.toLowerCase().includes(term) ||
      (cat.description?.toLowerCase().includes(term) ?? false) ||
      cat.status.toLowerCase().includes(term) ||
      cat.menuItemCount.toString().includes(term)
    );
  });

  return (
    <div className="p-4 flex-1 overflow-y-auto w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((cat, idx) => (
                <tr
                  key={cat.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  {/* Category */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all">
                        {cat.id}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm sm:text-base capitalize">
                          {cat.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-sm text-slate-600 max-w-md truncate" title={cat.description || ""}>
                      {cat.description || <span className="text-slate-400 italic">No description</span>}
                    </p>
                  </td>

                  {/* Items Count */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">
                      {cat.menuItemCount} {cat.menuItemCount === 1 ? 'Item' : 'Items'}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setSelectedCategory(cat); openUpdateModal(); }}
                        className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors cursor-pointer"
                        title="Edit category"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => { setSelectedCategory(cat); openDeleteModal(); }}
                        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
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

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-slate-400 mb-2">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No categories found</h3>
            <p className="text-slate-500">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}