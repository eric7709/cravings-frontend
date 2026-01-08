"use client";

import { useUpdateMenuItem } from "@/models/menuItems/hook";
import { useMenuItemStore } from "@/models/menuItems/store";
import { MenuItem } from "@/models/menuItems/types";
import { motion } from "framer-motion";
import { Eye, EyeOff, Pencil, Trash2, Package } from "lucide-react";

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

export default function MenuTable() {
  const { menuItems, setSelectedMenuItem, openUpdateModal, search, openDeleteModal, updateMenuItem, status } = useMenuItemStore();
  const { mutate } = useUpdateMenuItem();

  const toggleStatus = (item: MenuItem) => {
    const status = item.status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";
    mutate(
      { id: item.id, data: { ...item, status } },
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



  return (
    <div className="p-2 flex-1 overflow-y-auto sm:p-4 ">
      <div className="flex-1 bg-white shadow border border-gray-100 shadow-gray-200 p-2 sm:p-4 rounded-2xl overflow-x-auto">
        <p className="font-semibold text-lg sm:text-2xl mb-3 sm:mb-4">Menu Items</p>
        <div className="overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/80 border border-gray-200/60 rounded-xl overflow-x-auto"
          >
            <table className="w-full min-w-[600px] sm:min-w-[800px] md:min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200/60 bg-gradient-to-r from-gray-50/50 to-gray-100/30">
                  <th className="p-2 sm:p-4 text-left text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">ID</th>
                  <th className="p-2 sm:p-4 text-left text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">Item</th>
                  <th className="p-2 sm:p-4 text-left text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">Category</th>
                  <th className="p-2 sm:p-4 text-center text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">Price</th>
                  <th className="p-2 sm:p-4 text-center text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="p-2 sm:p-4 text-center text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 120, damping: 15 }}
                    className="group border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-indigo-50/40 hover:via-purple-50/30 hover:to-pink-50/40"
                  >
                    {/* ID Badge */}
                    <td className="p-1 sm:p-4">
                        <div className={`h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br ${idColors[idx % idColors.length]} flex items-center justify-center text-white font-bold text-xs sm:text-sm group-hover:shadow-md transition-shadow`}>
                          {item.id}
                          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </td>

                    {/* Item Name */}
                    <td className="p-1 sm:p-4">
                      <span className="font-bold text-gray-900 text-sm sm:text-base tracking-tight group-hover:text-indigo-700 transition-colors">
                        {item.name}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="p-1 sm:p-4">
                      <p className="text-gray-600 text-xs  capitalize sm:text-sm font-medium">
                        {item.categoryName ?? <span className="text-gray-400 italic font-normal">-</span>}
                      </p>
                    </td>

                    {/* Price */}
                    <td className="p-1 sm:p-4">
                      <div className="flex items-center justify-center">
                        <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gray-100 group-hover:bg-indigo-100 transition-colors">
                          <span className="font-bold text-gray-700 group-hover:text-indigo-700 text-xs sm:text-sm transition-colors">
                            ₦{item.price?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-1 sm:p-4">
                      <div className="flex justify-center">
                        <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 250 }}>
                          <span className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-[9px] sm:text-xs rounded-full font-bold tracking-wide ${item.status === "AVAILABLE" ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20" : "bg-rose-500/10 text-rose-700 border border-rose-500/20"}`}>
                            <span className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${item.status === "AVAILABLE" ? "bg-emerald-500" : "bg-rose-500"} animate-pulse`} />
                            {item.status}
                          </span>
                        </motion.div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-1 sm:p-4">
                      <div className="flex justify-center gap-1 sm:gap-2">
                        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} onClick={() => toggleStatus(item)}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br cursor-pointer from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center">
                          {item.status === "AVAILABLE" ? <Eye className="text-white" size={14} /> : <EyeOff className="text-white" size={14} />}
                        </motion.button>

                        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} onClick={() => { setSelectedMenuItem(item); openUpdateModal(); }}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br cursor-pointer from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center">
                          <Pencil className="text-white" size={14} />
                        </motion.button>

                        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} onClick={() => { setSelectedMenuItem(item); openDeleteModal(); }}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br cursor-pointer from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center">
                          <Trash2 className="text-white" size={14} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  );
}