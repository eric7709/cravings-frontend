"use client";

import { useTableStore } from "@/models/table/store";
import AdjustSearch from "@/shared/ui/AdjustSearch";
import Loader from "@/shared/ui/Loader";
import { Pencil, Trash2, Search } from "lucide-react";
import { BsQrCode } from "react-icons/bs";

export default function Table() {
  const {
    tables,
    setSelectedTable,
    openUpdateModal,
    openDeleteModal,
    openQRCodeModal,
    search,
    loading,
    hasHydrated
  } = useTableStore();

  if (loading) return <Loader />

  /* -------------------- NO TABLES -------------------- */
  if ((!tables || tables.length === 0) && hasHydrated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 py-10">
        <Search className="w-12 h-12 mb-3 text-slate-400" />
        <h3 className="text-base font-semibold text-slate-900 mb-1">No tables created yet</h3>
        <p className="text-xs">Create tables to manage seating and QR ordering</p>
      </div>
    );
  }

  /* -------------------- FILTER -------------------- */
  const term = search.toLowerCase().trim();
  const filteredData = tables.filter((table) => {
    return (
      table.tableName.toLowerCase().includes(term) ||
      table.tableNumber.toString().includes(term) ||
      (table.waiterName ?? "").toLowerCase().includes(term) ||
      (table.cashierName ?? "").toLowerCase().includes(term)
    );
  });

  if (hasHydrated && filteredData.length === 0) return <AdjustSearch title="Tables" subTitle="Try adjusting your search" />

  /* -------------------- TABLE -------------------- */
  return (
    <div className="p-4 pt-0 w-full flex-1 mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden relative">
        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Table</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Waiter</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Cashier</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Capacity</th>
                <th className="px-3 py-2.5 text-right text-[10px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {filteredData.map((table) => (
                <tr key={table.id} className="group hover:bg-slate-50/30 transition-colors">
                  {/* Table Number */}
                  <td className="px-3 py-2">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-[10px] shadow-sm group-hover:scale-105 transition-transform">
                      {table.tableNumber}
                    </div>
                  </td>

                  {/* Table Name */}
                  <td className="px-3 py-2 font-bold text-[11px] text-slate-800 capitalize">
                    {table.tableName}
                  </td>

                  {/* Waiter */}
                  <td className="px-3 py-2 hidden text-center sm:table-cell">
                    {table.waiterId ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-600 ring-1 ring-blue-500/10">
                        {table.waiterName}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">Unassigned</span>
                    )}
                  </td>

                  {/* Cashier */}
                  <td className="px-3 py-2 hidden text-center sm:table-cell">
                    {table.cashierId ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/10">
                        {table.cashierName}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">Unassigned</span>
                    )}
                  </td>

                  {/* Capacity */}
                  <td className="px-3 py-2 font-semibold text-[10px] text-slate-700">
                    {table.capacity} Seats
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => { setSelectedTable(table); openUpdateModal(); }}
                        className="p-1.5 rounded-md cursor-pointer bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={() => { setSelectedTable(table); openQRCodeModal(); }}
                        className="p-1.5 rounded-md cursor-pointer bg-teal-100 text-teal-600 hover:bg-teal-600 hover:text-white transition-all"
                      >
                        <BsQrCode size={12} />
                      </button>
                      <button
                        onClick={() => { setSelectedTable(table); openDeleteModal(); }}
                        className="p-1.5 rounded-md cursor-pointer bg-red-100 text-red-600 hover:bg-rose-600 hover:text-white transition-all"
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
      </div>
    </div>
  );
}