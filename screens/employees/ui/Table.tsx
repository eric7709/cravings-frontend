"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useEmployeeStore } from "@/models/employee/store";
import { roleColors } from "../data/colors";
import Loader from "@/shared/ui/Loader";
import AdjustSearch from "@/shared/ui/AdjustSearch";

export default function EmployeeTable() {
  const {
    employees,
    loading,
    hasHydrated,
    search,
    setSelectedEmployee,
    openUpdateModal,
    openDeleteModal,
  } = useEmployeeStore();

  /* -------------------- LOADING -------------------- */
  if (loading) return <Loader />;

  /* -------------------- NO EMPLOYEES -------------------- */
  if (hasHydrated && employees.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500 text-sm">
          You are yet to create an employee
        </p>
      </div>
    );
  }

  /* -------------------- FILTER -------------------- */
  const filteredData = employees.filter((el) => {
    const matchesSearch =
      el.email.toLowerCase().includes(search.toLowerCase()) ||
      el.firstName.toLowerCase().includes(search.toLowerCase()) ||
      el.lastName.toLowerCase().includes(search.toLowerCase()) ||
      el.phoneNumber.toLowerCase().includes(search.toLowerCase());

    return matchesSearch && el.role !== "ROLE_ADMIN";
  });

  /* -------------------- NO SEARCH RESULTS -------------------- */
  if (hasHydrated && filteredData.length === 0) {
    return (
      <AdjustSearch
        title="Employees"
        subTitle="Try adjusting your search or filters"
      />
    );
  }

  /* -------------------- ROLE MAP -------------------- */
  const roleMap: Record<string, string> = {
    ROLE_WAITER: "Waiter",
    ROLE_CASHIER: "Cashier",
    ROLE_MANAGER: "Manager",
    ROLE_ADMIN: "Admin",
    ROLE_COOK: "Cook",
    ROLE_CHEF: "Chef",
  };

  /* -------------------- TABLE -------------------- */
  return (
    <div className="p-4 flex-1 overflow-y-auto w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
       <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">
                  Gender
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredData.map((emp) => {
                const firstLetter = emp.firstName?.[0]?.toUpperCase();

                return (
                  <tr
                    key={emp.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                          {firstLetter}
                        </div>
                        <div className="font-semibold text-slate-900 text-sm">
                          {emp.firstName} {emp.lastName}
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 hidden sm:table-cell text-sm">
                      {emp.phoneNumber || (
                        <span className="text-slate-400 italic">
                          Not provided
                        </span>
                      )}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 hidden sm:table-cell text-sm">
                      {emp.email || (
                        <span className="text-slate-400 italic">
                          Not provided
                        </span>
                      )}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleColors[emp.role as any] ??
                          "bg-slate-100 text-slate-700 ring-1 ring-slate-600/20"
                          }`}
                      >
                        {roleMap[emp.role as any]}
                      </span>
                    </td>

                    {/* Gender */}
                    <td className="px-6 py-4 hidden lg:table-cell text-sm">
                      {emp.gender === "MALE" ? "Male" : "Female"}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedEmployee(emp);
                            openUpdateModal();
                          }}
                          className="p-2 cursor-pointer rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedEmployee(emp);
                            openDeleteModal();
                          }}
                          className="p-2 cursor-pointer rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
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
      </div>
    </div>
  );
}
