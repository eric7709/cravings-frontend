"use client";

import { useTableStore } from "@/models/table/store";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { BsQrCode } from "react-icons/bs";

const idColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-fuchsia-500 to-pink-600",
];

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
  const data = tables.filter(table => {
    const term = search.toLowerCase().trim();

    return (
      table.tableName.toLowerCase().includes(term) ||
      table.tableNumber.toString().includes(term) ||
      (table.waiterName ?? "").toLowerCase().includes(term) ||
      (table.cashierName ?? "").toLowerCase().includes(term)
    );
  });



  return (
    <div className="flex-1 overflow-y-auto bg-white shadow shadow-gray-200 p-4 rounded-2xl overflow-x-auto">
      <p className="font-semibold text-xl lg:text-2xl mb-4">Tables</p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/80 border border-gray-200/60 rounded-xl overflow-x-auto"
      >
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200/60 bg-gradient-to-r from-gray-50/50 to-gray-100/30">
              <th className="p-3 lg:p-5 text-left text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-500">
                Table
              </th>
              <th className="p-3 lg:p-5 text-left text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-500">
                Name
              </th>
              <th className="p-3 lg:p-5 text-center text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-500">
                Waiter
              </th>
              <th className="p-3 lg:p-5 text-center text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-500">
                Cashier
              </th>
              <th className="p-3 lg:p-5 text-center text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-500">
                Capacity
              </th>
              <th className="p-3 lg:p-5 text-center text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((t, idx) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, type: "spring", stiffness: 120, damping: 15 }}
                className="group border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-indigo-50/40 hover:via-purple-50/30 hover:to-pink-50/40"
              >
                {/* Table Number Badge */}
                <td className="p-2 lg:p-4">
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: -2 }}
                    transition={{ type: "spring", stiffness: 250 }}
                    className="relative"
                  >
                    <div
                      className={`h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br ${idColors[idx % idColors.length]
                        } flex items-center justify-center text-white font-bold text-sm lg:text-base group-hover:shadow-md transition-shadow`}
                    >
                      {t.tableNumber}
                      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                </td>

                {/* Table Name */}
                <td className="p-2 lg:p-4">
                  <span className="font-bold text-gray-900 text-sm lg:text-base tracking-tight group-hover:text-indigo-700 transition-colors">
                    {t.tableName}
                  </span>
                </td>

                {/* Waiter */}
                <td className="p-2 lg:p-4">
                  <div className="flex justify-center">
                    {t.waiterId ? (
                      <div className="px-2 lg:px-4 py-1 lg:py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <span className="text-xs lg:text-sm font-bold text-blue-700">{t.waiterName}</span>
                      </div>
                    ) : (
                      <span className="text-xs lg:text-sm font-semibold text-gray-400 italic">Unassigned</span>
                    )}
                  </div>
                </td>

                {/* Cashier */}
                <td className="p-2 lg:p-4">
                  <div className="flex justify-center">
                    {t.cashierId ? (
                      <div className="px-2 lg:px-4 py-1 lg:py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <span className="text-xs lg:text-sm font-bold text-blue-700">{t.cashierName}</span>
                      </div>
                    ) : (
                      <span className="text-xs lg:text-sm font-semibold text-gray-400 italic">Unassigned</span>
                    )}
                  </div>
                </td>

                {/* Capacity */}
                <td className="p-2 lg:p-4">
                  <div className="flex items-center justify-center">
                    <div className="px-2 lg:px-3 py-1 rounded-full bg-gray-100 group-hover:bg-indigo-100 transition-colors">
                      <span className="font-bold text-gray-700 group-hover:text-indigo-700 text-xs lg:text-sm transition-colors">
                        {t.capacity} Seats
                      </span>
                    </div>
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="p-2 lg:p-4">
                  <div className="flex justify-center gap-2">
                    {/* Edit */}
                    <motion.button
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedTable(t);
                        openUpdateModal();
                      }}
                      className="h-8 w-8 lg:h-10 lg:w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 flex items-center justify-center"
                    >
                      <Pencil className="text-white transition-transform" size={14} />
                    </motion.button>

                    {/* QR Code */}
                    <motion.button
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedTable(t);
                        openQRCodeModal();
                      }}
                      className="h-8 w-8 lg:h-10 lg:w-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 flex items-center justify-center"
                    >
                      <BsQrCode className="text-white transition-transform" size={14} />
                    </motion.button>

                    {/* Delete */}
                    <motion.button
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedTable(t);
                        openDeleteModal();
                      }}
                      className="h-8 w-8 lg:h-10 lg:w-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 flex items-center justify-center"
                    >
                      <Trash2 className="text-white transition-transform" size={14} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
