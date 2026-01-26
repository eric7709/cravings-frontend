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
      <div className="p-8 flex-1 flex flex-col justify-center items-center text-center text-slate-500">
        <Search className="w-16 h-16 mb-4 text-slate-400" />
        <p className="text-2xl font-semibold">No tables created yet</p>
        <p className="text-base mt-2">
          Create tables to manage seating and QR ordering
        </p>
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

  /* -------------------- SEARCH EMPTY -------------------- */
  if (hasHydrated && filteredData.length === 0) return <AdjustSearch title="Tables" subTitle="Try adjusting your search" />



  /* -------------------- TABLE -------------------- */
  return (
    <div className="p-4 pt-0 w-full flex-1 mx-auto">
      <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Table
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">
                  Waiter
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">
                  Cashier
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredData.map((table) => (
                <tr
                  key={table.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  {/* Table Number */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 shrink-0 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all">
                        {table.tableNumber}
                      </div>
                    </div>
                  </td>

                  {/* Table Name */}
                  <td className="px-6 py-4 font-semibold text-slate-900 text-sm sm:text-base">
                    {table.tableName}
                  </td>

                  {/* Waiter */}
                  <td className="px-6 py-4 hidden text-center sm:table-cell">
                    {table.waiterId ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
                        {table.waiterName}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400 italic">
                        Unassigned
                      </span>
                    )}
                  </td>

                  {/* Cashier */}
                  <td className="px-6 py-4 hidden text-center sm:table-cell">
                    {table.cashierId ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
                        {table.cashierName}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400 italic">
                        Unassigned
                      </span>
                    )}
                  </td>

                  {/* Capacity */}
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {table.capacity} Seats
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedTable(table);
                          openUpdateModal();
                        }}
                        className="p-2 rounded-lg cursor-pointer bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                        title="Edit table"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedTable(table);
                          openQRCodeModal();
                        }}
                        className="p-2 rounded-lg cursor-pointer bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors"
                        title="Generate QR Code"
                      >
                        <BsQrCode size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedTable(table);
                          openDeleteModal();
                        }}
                        className="p-2 rounded-lg cursor-pointer bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        title="Delete table"
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
      </div>
    </div>
  );
}
