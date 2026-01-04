"use client";

import { motion } from "framer-motion";
import { useCustomerStore } from "@/models/customer/store";

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

export default function CustomerTable() {
  const { customers, search } = useCustomerStore();
  if (!customers?.length) return null;

  const data = customers.filter(el => {
    return (
      (el.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      el.name.toLowerCase().includes(search.toLowerCase()) ||
      (el.phoneNumber ?? "").toLowerCase().includes(search.toLowerCase()) ||
      el.title.toLowerCase().includes(search.toLowerCase())
    );
  });


  return (
    <div className="p-4">
      <div className="flex-1 bg-white shadow border border-gray-100 shadow-gray-200 p-4 rounded-2xl overflow-x-auto">
        <p className="font-semibold mb-4 lg:text-2xl text-lg">Customers</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/80 border border-gray-200/60 rounded-xl overflow-x-auto"
        >
          <table className="w-full min-w-[800px] md:min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200/60 bg-gradient-to-r from-gray-50/50 to-gray-100/30">
                <th className="p-3 md:p-5 text-left text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">Customer</th>
                <th className="p-3 md:p-5 text-left text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">Gender</th>
                <th className="p-3 md:p-5 text-left text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">Phone</th>
                <th className="p-3 md:p-5 text-left text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c, idx) => {
                const firstLetter = c.name?.[0]?.toUpperCase();
                return (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, type: "spring", stiffness: 120, damping: 15 }}
                    className="group border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-indigo-50/20 hover:via-purple-50/20 hover:to-pink-50/20"
                  >
                    <td className="p-3 md:p-5 flex items-center gap-3 md:gap-5">
                      <div className={`h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br ${idColors[idx % idColors.length]} flex items-center justify-center text-white font-bold text-sm md:text-base`}>
                        {firstLetter}
                      </div>
                      <span className="font-bold text-gray-900 text-sm md:text-base">{c.name}</span>
                    </td>
                    <td className="p-3 md:p-5 text-sm md:text-base">{c.title === "MRS" || c.title === "MISS" ? "Female" : "Male"}</td>
                    <td className="p-3 md:p-5 text-sm md:text-base">
                      {c.phoneNumber || <span className="text-gray-400 italic">Not provided</span>}
                    </td>
                    <td className="p-3 md:p-5 text-sm md:text-base">
                      {c.email || <span className="text-gray-400 italic">Not provided</span>}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
