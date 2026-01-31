"use client";

import { useUpdateMenuItem } from "@/models/menuItems/hook";
import { useMenuItemStore } from "@/models/menuItems/store";
import { MenuItem } from "@/models/menuItems/types";
import AdjustSearch from "@/shared/ui/AdjustSearch";
import Loader from "@/shared/ui/Loader";
import { Eye, EyeOff, Pencil, Trash2, Search } from "lucide-react";

export default function MenuTable() {
  const {
    menuItems,
    setSelectedMenuItem,
    openUpdateModal,
    hasHydrated,
    loading,
    search,
    openDeleteModal,
    updateMenuItem,
    status,
  } = useMenuItemStore();

  const { mutate } = useUpdateMenuItem();

  const toggleStatus = (item: MenuItem) => {
    const newStatus = item.status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";

    mutate(
      { id: item.id, data: { ...item, status: newStatus } },
      { onSuccess: updateMenuItem, onError: console.error }
    );
  };

  if (!hasHydrated && loading) return <Loader />

  if (hasHydrated && menuItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 py-10">
        <Search className="w-12 h-12 mb-3 text-slate-400" />
        <h3 className="text-base font-semibold text-slate-900 mb-1">No items yet</h3>
        <p className="text-xs">Create menu items to start taking orders</p>
      </div>
    );
  }

  const term = search.toLowerCase().trim();
  const filteredData = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.categoryName.toLowerCase().includes(term) ||
      item.price.toString().includes(term);
    const matchesStatus = status == null || item.status === status;
    return matchesSearch && matchesStatus;
  });

  if (hasHydrated && filteredData.length === 0) return <AdjustSearch title="Menu Items" />;

  return (
    <div className="p-4 flex-1 pt-0 w-full mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden relative">
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase">Item</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase hidden sm:table-cell">Category</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-bold text-slate-500 uppercase">Price</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-bold text-slate-500 uppercase w-32">Status</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-bold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/30 transition-colors">
                  {/* Item */}
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 shrink-0 rounded-full bg-green-700 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                        {item.id}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-[11px] text-slate-800 truncate max-w-30">{item.name}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-37.5 hidden sm:block italic">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-3 py-2 hidden sm:table-cell">
                    <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                      {item.categoryName ?? "-"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-3 py-2 font-bold text-center text-[11px] text-slate-900">
                    ₦{item.price.toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                      item.status === "AVAILABLE" 
                      ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/10" 
                      : "bg-rose-50 text-rose-600 ring-1 ring-rose-500/10"
                    }`}>
                      <span className={`h-1 w-1 rounded-full ${item.status === "AVAILABLE" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                      {item.status === "AVAILABLE" ? "Live" : "Off"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-2">
                    <div className="flex justify-center gap-1.5">
                      <button onClick={() => toggleStatus(item)} className="p-1.5 cursor-pointer rounded-md bg-amber-100 text-amber-600 hover:bg-amber-500 hover:text-white transition-all">
                        {item.status === "AVAILABLE" ? <Eye size={12} /> : <EyeOff size={12} />}
                      </button>
                      <button onClick={() => { setSelectedMenuItem(item); openUpdateModal(); }} className="p-1.5 cursor-pointer rounded-md bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                        <Pencil size={12} />
                      </button>
                      <button onClick={() => { setSelectedMenuItem(item); openDeleteModal(); }} className="p-1.5 cursor-pointer rounded-md bg-red-100 text-red-600 hover:bg-rose-600 hover:text-white transition-all">
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