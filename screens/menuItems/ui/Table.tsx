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
    const newStatus =
      item.status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";

    mutate(
      { id: item.id, data: { ...item, status: newStatus } },
      { onSuccess: updateMenuItem, onError: console.error }
    );
  };

  /* -------------------- INITIAL LOADING -------------------- */
  if (!hasHydrated && loading) return <Loader />

  /* -------------------- EMPTY AFTER HYDRATION -------------------- */
  if (hasHydrated && menuItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500">
        <Search className="w-16 h-16 mb-4 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          No menu items yet
        </h3>
        <p>Create menu items to start taking orders</p>
      </div>
    );
  }

  /* -------------------- FILTER -------------------- */
  const term = search.toLowerCase().trim();

  const filteredData = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.categoryName.toLowerCase().includes(term) ||
      item.price.toString().includes(term);

    const matchesStatus =
      status == null || item.status === status;

    return matchesSearch && matchesStatus;
  });

  /* -------------------- SEARCH EMPTY -------------------- */
  if (hasHydrated && filteredData.length === 0) {
    return <AdjustSearch title="Menu Items" />;
  }

  /* -------------------- TABLE -------------------- */
  return (
    <div className="p-4 flex-1 pt-0 overflow-y-auto w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Item
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase w-40">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  {/* Item */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12  shrink-0 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {item.id}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-slate-500 hidden sm:block">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {item.categoryName ?? "-"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-bold text-slate-900">
                    ₦{item.price.toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 w-40">
                    <span
                      className={`inline-flex w-32 justify-center items-center gap-2 px-2 py-2 rounded-full text-xs font-semibold ${item.status === "AVAILABLE"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                          : "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20"
                        }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full animate-pulse ${item.status === "AVAILABLE"
                            ? "bg-emerald-500"
                            : "bg-rose-500"
                          }`}
                      />
                      {item.status === "AVAILABLE"
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(item)}
                        className="p-2 cursor-pointer rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"
                      >
                        {item.status === "AVAILABLE" ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMenuItem(item);
                          openUpdateModal();
                        }}
                        className="p-2 cursor-pointer rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMenuItem(item);
                          openDeleteModal();
                        }}
                        className="p-2 cursor-pointer rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
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

        {/* subtle background loading */}
        {loading && hasHydrated && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500 animate-pulse" />
        )}
      </div>
    </div>
  );
}
