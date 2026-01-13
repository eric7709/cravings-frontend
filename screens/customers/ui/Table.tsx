"use client";

import { useCustomerStore } from "@/models/customer/store";
import { Search } from "lucide-react";

export default function CustomerTable() {
  const { customers, search, loading, hasHydrated} = useCustomerStore();

  /* -------------------- NO DATA AT ALL -------------------- */
  if (!customers || customers.length === 0) {
    return (
      <div className="p-8 flex-1 flex flex-col justify-center items-center text-center text-slate-500">
        <Search className="w-16 h-16 mb-4 text-slate-400" />
        <p className="text-2xl font-semibold">No customers yet</p>
        <p className="text-base mt-2">Customers will appear here once created</p>
      </div>
    );
  }

  /* -------------------- FILTER -------------------- */
  const filteredData = customers.filter((el) => {
    const query = search.toLowerCase();

    return (
      (el.email ?? "").toLowerCase().includes(query) ||
      el.name.toLowerCase().includes(query) ||
      (el.phoneNumber ?? "").toLowerCase().includes(query) ||
      el.title.toLowerCase().includes(query)
    );
  });

  /* -------------------- SEARCH EMPTY -------------------- */
  if (filteredData.length === 0 && hasHydrated) {
    return (
      <div className="p-8 flex-1 flex flex-col justify-center items-center text-center text-slate-500">
        <Search className="w-16 h-16 mb-4 text-slate-400" />
        <p className="text-2xl font-semibold">No customers found</p>
        <p className="text-base mt-2">Try adjusting your search</p>
      </div>
    );
  }

  /* -------------------- TABLE -------------------- */
  return (
    <div className="p-4 flex-1 overflow-y-auto w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">
                  Gender
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredData.map((customer, idx) => {
                const firstLetter = customer.name?.[0]?.toUpperCase();

                return (
                  <tr
                    key={idx}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all">
                          {firstLetter}
                        </div>
                        <div className="font-semibold text-slate-900 text-sm sm:text-base">
                          {customer.name}
                        </div>
                      </div>
                    </td>

                    {/* Gender */}
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {customer.title === "MRS" || customer.title === "MISS"
                          ? "Female"
                          : "Male"}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-sm text-slate-900">
                        {customer.phoneNumber || (
                          <span className="text-slate-400 italic">
                            Not provided
                          </span>
                        )}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-900">
                        {customer.email || (
                          <span className="text-slate-400 italic">
                            Not provided
                          </span>
                        )}
                      </span>
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
