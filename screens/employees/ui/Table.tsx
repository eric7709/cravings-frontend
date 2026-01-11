"use client";

import { Pencil, Trash2, Search } from "lucide-react";
import { useEmployeeStore } from "@/models/employee/store";
import { roleColors } from "../data/colors";

export default function EmployeeTable() {
  const { employees, setSelectedEmployee, openUpdateModal, openDeleteModal, search } =
    useEmployeeStore();

  if (!employees?.length) return null;

  const filteredData = employees.filter(el => {
    const test =
      el.email.toLowerCase().includes(search.toLowerCase()) ||
      el.firstName.toLowerCase().includes(search.toLowerCase()) ||
      el.lastName.toLowerCase().includes(search.toLowerCase()) ||
      el.phoneNumber.toLowerCase().includes(search.toLowerCase())
    const test2 = el.role !== "ROLE_ADMIN"
    return test && test2;
  });

  const roleMap: Record<string, string> = {
    ROLE_WAITER: "Waiter",
    ROLE_CASHIER: "Cashier",
    ROLE_MANAGER: "Manager",
    ROLE_ADMIN: "Admin",
    ROLE_COOK: "Cook",
    ROLE_CHEF: "Chef",
  };

  return (
    <div className="p-4 flex-1 overflow-y-auto w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden lg:table-cell">Gender</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((emp, idx) => {
                const firstLetter = emp.firstName?.[0]?.toUpperCase();

                return (
                  <tr
                    key={emp.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all">
                          {firstLetter}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm sm:text-base">
                            {emp.firstName} {emp.lastName}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="text-sm text-slate-900">
                        {emp.phoneNumber || <span className="text-slate-400 italic">Not provided</span>}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="text-sm text-slate-900">
                        {emp.email || <span className="text-slate-400 italic">Not provided</span>}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleColors[emp.role as any] || "bg-slate-100 text-slate-700 ring-1 ring-slate-600/20"}`}>
                        {roleMap[emp.role as any] || "Unknown"}
                      </span>
                    </td>

                    {/* Gender */}
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-sm text-slate-900">
                        {emp.gender === "MALE" ? "Male" : "Female"}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setSelectedEmployee(emp); openUpdateModal(); }}
                          className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors cursor-pointer"
                          title="Edit employee"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => { setSelectedEmployee(emp); openDeleteModal(); }}
                          className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                          title="Delete employee"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-slate-400 mb-2">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No employees found</h3>
            <p className="text-slate-500">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}