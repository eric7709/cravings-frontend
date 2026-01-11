"use client";

import { useTableStore } from "@/models/table/store";
import { Pencil, Trash2, Search } from "lucide-react";
import { BsQrCode } from "react-icons/bs";

export default function Table() {
  const {
    tables,
    setSelectedTable,
    openUpdateModal,
    openDeleteModal,
    search,
    openQRCodeModal,
  } = useTableStore();

  if (!tables?.length) return null;

  const filteredData = tables.filter(table => {
    const term = search.toLowerCase().trim();

    return (
      table.tableName.toLowerCase().includes(term) ||
      table.tableNumber.toString().includes(term) ||
      (table.waiterName ?? "").toLowerCase().includes(term) ||
      (table.cashierName ?? "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4 flex-1 overflow-y-auto w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Table</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Waiter</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Cashier</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {filteredData.map((table, idx) => (
                  <tr
                    key={table.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Table Number */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all">
                          {table.tableNumber}
                        </div>
                      </div>
                    </td>

                    {/* Table Name */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 text-sm sm:text-base">
                        {table.tableName}
                      </div>
                    </td>

                    {/* Waiter */}
                    <td className="px-6 py-4 hidden text-center sm:table-cell">
                      {table.waiterId ? (
                        <span className="inline-flex items-center  px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
                          {table.waiterName}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400 italic">Unassigned</span>
                      )}
                    </td>

                    {/* Cashier */}
                    <td className="px-6 py-4 hidden text-center sm:table-cell">
                      {table.cashierId ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
                          {table.cashierName}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400 italic">Unassigned</span>
                      )}
                    </td>

                    {/* Capacity */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">
                        {table.capacity} Seats
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setSelectedTable(table); openUpdateModal(); }}
                          className="p-2 rounded-lg bg-indigo-50 cursor-pointer text-indigo-600 hover:bg-indigo-100 transition-colors"
                          title="Edit table"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => { setSelectedTable(table); openQRCodeModal(); }}
                          className="p-2 rounded-lg bg-teal-50 cursor-pointer text-teal-600 hover:bg-teal-100 transition-colors"
                          title="Generate QR Code"
                        >
                          <BsQrCode size={18} />
                        </button>

                        <button
                          onClick={() => { setSelectedTable(table); openDeleteModal(); }}
                          className="p-2 rounded-lg bg-rose-50 cursor-pointer text-rose-600 hover:bg-rose-100 transition-colors"
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

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-slate-400 mb-2">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No tables found</h3>
            <p className="text-slate-500">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}