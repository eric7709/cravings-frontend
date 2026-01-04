'use client';
import { motion } from "framer-motion";
import { Pencil, Trash2, Package } from "lucide-react";
import { useCategoryStore } from "@/models/categories/store";

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

export default function CategoryTable() {
  const { categories, search, openUpdateModal, setSelectedCategory, openDeleteModal } = useCategoryStore();

  if (!categories?.length) return null;
  const data = categories.filter(cat => {
    const term = search.toLowerCase().trim();

    return (
      cat.name.toLowerCase().includes(term) ||
      (cat.description?.toLowerCase().includes(term) ?? false) ||
      cat.status.toLowerCase().includes(term) ||
      cat.menuItemCount.toString().includes(term)
    );
  });


  return (
    <div className="p-2 sm:p-4">
      <div className="flex-1 bg-white shadow border border-gray-100 shadow-gray-200 p-2 sm:p-4 rounded-2xl overflow-x-auto">
        <p className="font-semibold text-lg sm:text-2xl mb-3 sm:mb-4">Categories</p>
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
                  <th className="p-2 sm:p-4 text-left text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">Category</th>
                  <th className="p-2 sm:p-4 text-left text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">Description</th>
                  <th className="p-2 sm:p-4 text-center text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">Items</th>
                  <th className="p-2 sm:p-4 text-center text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((cat, idx) => (
                  <motion.tr
                    key={cat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03, type: "spring", stiffness: 120, damping: 15 }}
                    className="group border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-indigo-50/40 hover:via-purple-50/30 hover:to-pink-50/40"
                  >
                    {/* ID Badge */}
                    <td className="p-1 sm:p-4">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 250 }}
                        className="relative"
                      >
                        <div className={`h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br ${idColors[idx % idColors.length]} flex items-center justify-center text-white font-bold text-xs sm:text-sm group-hover:shadow-md transition-shadow`}>
                          {cat.id}
                          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </motion.div>
                    </td>

                    {/* Category Name */}
                    <td className="p-1 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="font-bold text-gray-900 text-sm sm:text-base capitalize tracking-tight group-hover:text-indigo-700 transition-colors">
                          {cat.name}
                        </span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="p-1 sm:p-4">
                      <p className="text-gray-600 text-xs sm:text-sm max-w-xs sm:max-w-md truncate leading-relaxed font-medium" title={cat.description || ""}>
                        {cat.description || <span className="text-gray-400 italic font-normal">No description</span>}
                      </p>
                    </td>

                    {/* Items Count */}
                    <td className="p-1 sm:p-4">
                      <div className="flex items-center justify-center">
                        <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gray-100 group-hover:bg-indigo-100 transition-colors">
                          <span className="font-bold text-gray-700 group-hover:text-indigo-700 text-xs sm:text-sm transition-colors">{cat.menuItemCount}</span>
                        </div>
                      </div>
                    </td>

                 

               
                    {/* Actions */}
                    <td className="p-1 sm:p-4">
                      <div className="flex justify-center gap-1 sm:gap-2">
                        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                          onClick={() => { setSelectedCategory(cat); openUpdateModal(); }}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br cursor-pointer from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center">
                          <Pencil className="text-white transition-transform" size={14} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
                          onClick={() => { setSelectedCategory(cat); openDeleteModal(); }}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br cursor-pointer from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center">
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
      </div>
    </div>
  );
}
