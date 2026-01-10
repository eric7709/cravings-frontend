"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCustomerStore } from "@/models/customer/store";
import { Search } from "lucide-react";

export default function CustomerTable() {
  const { customers, search } = useCustomerStore();
  
  if (!customers?.length) return null;

  const filteredData = customers.filter(el => {
    return (
      (el.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      el.name.toLowerCase().includes(search.toLowerCase()) ||
      (el.phoneNumber ?? "").toLowerCase().includes(search.toLowerCase()) ||
      el.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-4 flex-1 overflow-y-auto w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Gender</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence>
                {filteredData.map((customer, idx) => {
                  const firstLetter = customer.name?.[0]?.toUpperCase();
                  return (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all">
                            {firstLetter}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 text-sm sm:text-base">
                              {customer.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Gender */}
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {customer.title === "MRS" || customer.title === "MISS" ? "Female" : "Male"}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <div className="text-sm text-slate-900">
                          {customer.phoneNumber || <span className="text-slate-400 italic">Not provided</span>}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">
                          {customer.email || <span className="text-slate-400 italic">Not provided</span>}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-slate-400 mb-2">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No customers found</h3>
            <p className="text-slate-500">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}