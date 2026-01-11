"use client";

import { useUpdateMenuItem } from "@/models/menuItems/hook";
import { useMenuItemStore } from "@/models/menuItems/store";
import { MenuItem } from "@/models/menuItems/types";
import AdjustSearch from "@/shared/ui/AdjustSearch";
import { Eye, EyeOff, Pencil, Trash2, Search } from "lucide-react";

export default function MenuTable() {
  const { menuItems, setSelectedMenuItem, openUpdateModal, search, openDeleteModal, updateMenuItem, status } = useMenuItemStore();
  const { mutate } = useUpdateMenuItem();

  const toggleStatus = (item: MenuItem) => {
    const newStatus = item.status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";
    mutate(
      { id: item.id, data: { ...item, status: newStatus } },
      { onSuccess: updateMenuItem, onError: console.error }
    );
  };

  if (!menuItems?.length) return null;

  const filteredData = menuItems.filter(item => {
    const term = search.toLowerCase().trim();
    const matchesSearch =
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.categoryName.toLowerCase().includes(term) ||
      item.price.toString().includes(term);
    const matchesStatus =
      status == null || item.status === status;
    return matchesSearch && matchesStatus;
  });

  if (filteredData.length == 0) return <AdjustSearch title="Menu Items" />

  return (
    <div className="p-4 flex-1 overflow-y-auto w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Item</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-40">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, idx) => (
                <tr
                  key={item.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  {/* Item */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all">
                        {item.id}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm sm:text-base">{item.name}</div>
                        <div className="text-sm text-slate-500 hidden sm:block">{item.description}</div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {item.categoryName ?? <span className="text-slate-400 italic font-normal">-</span>}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">
                      ₦{item.price?.toLocaleString()}
                    </div>
                  </td>

                  {/* Status - Fixed Width */}
                  <td className="px-6 py-4 w-40">
                    <span className={`inline-flex items-center gap-2 px-2 py-2 rounded-full text-xs font-semibold w-32 justify-center ${item.status === "AVAILABLE"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                      : "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20"
                      }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${item.status === "AVAILABLE" ? "bg-emerald-500" : "bg-rose-500"
                        } animate-pulse`} />
                      {item.status === "AVAILABLE" ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(item)}
                        className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                        title={item.status === "AVAILABLE" ? "Mark as unavailable" : "Mark as available"}
                      >
                        {item.status === "AVAILABLE" ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>

                      <button
                        onClick={() => { setSelectedMenuItem(item); openUpdateModal(); }}
                        className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                        title="Edit item"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => { setSelectedMenuItem(item); openDeleteModal(); }}
                        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        title="Delete item"
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
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No items found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}