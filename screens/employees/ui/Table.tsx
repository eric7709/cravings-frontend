"use client";

import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEmployeeStore } from "@/models/employee/store";
import { idColors, roleColors } from "../data/colors";

export default function EmployeeTable() {
  const { employees, setSelectedEmployee, openUpdateModal, openDeleteModal, search } =
    useEmployeeStore();

  if (!employees?.length) return null;

  const data = employees.filter(el => {
    const test =
      el.email.toLowerCase().includes(search.toLowerCase()) ||
      el.firstName.toLowerCase().includes(search.toLowerCase()) ||
      el.lastName.toLowerCase().includes(search.toLowerCase()) ||
      el.phoneNumber.toLowerCase().includes(search.toLowerCase())
    const test2 = el.role !== "ROLE_ADMIN"
    return test && test2;
  });

  return (
    <div className="p-4 flex-1 overflow-y-auto">
      <div className=" p-4 bg-white shadow shadow-gray-200 rounded-2xl overflow-x-auto">
        <p className="font-semibold mb-4 lg:text-2xl text-lg">Employees</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/80 border border-gray-200/60 rounded-2xl overflow-x-auto"
        >
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200/60 bg-gradient-to-r from-gray-50/50 to-gray-100/30">
                {["Name", "Phone", "Email", "Role", "Gender", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="p-3 lg:p-5 text-left lg:text-left text-xs lg:text-xs font-bold uppercase tracking-widest text-gray-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((emp, idx) => {
                const firstLetter = emp.firstName?.[0]?.toUpperCase();
                const roleMap: Record<string, string> = {
                  ROLE_WAITER: "Waiter",
                  ROLE_CASHIER: "Cashier",
                  ROLE_MANAGER: "Manager",
                  ROLE_ADMIN: "Admin",
                  ROLE_COOK: "Cook",
                  ROLE_CHEF: "Chef",
                };

                return (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, type: "spring", stiffness: 120, damping: 15 }}
                    className="group border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-indigo-50/40 hover:via-purple-50/30 hover:to-pink-50/40"
                  >
                    {/* Avatar + Name */}
                    <td className="p-2 lg:p-4">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <motion.div
                          whileHover={{ scale: 1.06, rotate: -2 }}
                          transition={{ type: "spring", stiffness: 250 }}
                          className="relative"
                        >
                          <div
                            className={`h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br ${idColors[idx % idColors.length]
                              } flex items-center justify-center text-white font-bold text-sm lg:text-base group-hover:shadow-md transition-shadow`}
                          >
                            {firstLetter}
                            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </motion.div>
                        <span className="font-bold text-gray-900 text-sm lg:text-base tracking-tight group-hover:text-indigo-700 transition-colors">
                          {emp.firstName} {emp.lastName}
                        </span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="p-2 lg:p-4 text-sm lg:text-base">
                      {emp.phoneNumber || <span className="italic text-gray-400">Not provided</span>}
                    </td>

                    {/* Email */}
                    <td className="p-2 lg:p-4 text-sm lg:text-base">
                      {emp.email || <span className="italic text-gray-400">Not provided</span>}
                    </td>



                    {/* Role Badge */}
                    <td className="p-2 lg:p-4">
                      <div className="flex ">
                        <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 250 }}>
                          <span
                            className={`inline-flex items-center px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-xs rounded-full font-bold tracking-wide border ${roleColors[emp.role] || "bg-gray-500/10 text-gray-600 border-gray-500/20"
                              }`}
                          >
                            {roleMap[emp.role] || "Unknown"}
                          </span>
                        </motion.div>
                      </div>
                    </td>

                    <td className="p-2 lg:p-4 text-sm lg:text-base">
                      {emp.gender == "MALE" ? "Male": "Female"}
                    </td>

                    {/* Action Buttons */}
                    <td className="p-2 lg:p-4 flex   gap-1 lg:gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedEmployee(emp);
                          openUpdateModal();
                        }}
                        className="h-8 w-8 lg:h-10 lg:w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer"
                      >
                        <Pencil className="text-white transition-transform" size={14} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedEmployee(emp);
                          openDeleteModal();
                        }}
                        className="h-8 w-8 lg:h-10 lg:w-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="text-white transition-transform" size={14} />
                      </motion.button>
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
