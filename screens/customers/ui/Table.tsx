"use client";

import { useCustomerStore } from "@/models/customer/store";
import { Search } from "lucide-react";
import Loader from "@/shared/ui/Loader";
import AdjustSearch from "@/shared/ui/AdjustSearch";

export default function CustomerTable() {
  const { customers, search, loading, hasHydrated } = useCustomerStore();

  /* -------------------- LOADING STATE -------------------- */
  if (!hasHydrated && loading) return <Loader />;

  /* -------------------- NO DATA AT ALL -------------------- */
  if (hasHydrated && (!customers || customers.length === 0)) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500">
        <Search className="w-12 h-12 mb-3 text-slate-400" />
        <h3 className="text-base font-semibold text-slate-900 mb-1">
          No customers yet
        </h3>
        <p className="text-xs">Customers will appear here once created</p>
      </div>
    );
  }

  /* -------------------- FILTER -------------------- */
  const term = search.toLowerCase().trim();
  const filteredData = customers.filter((el) => {
    return (
      (el.email ?? "").toLowerCase().includes(term) ||
      el.name.toLowerCase().includes(term) ||
      (el.phoneNumber ?? "").toLowerCase().includes(term) ||
      el.title.toLowerCase().includes(term)
    );
  });

  /* -------------------- SEARCH EMPTY -------------------- */
  if (hasHydrated && filteredData.length === 0) {
    return <AdjustSearch title="Customers" subTitle="Try adjusting your search" />;
  }

  /* -------------------- TABLE -------------------- */
  return (
    <div className="p-4 pt-0 w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/60 overflow-hidden relative">
        <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-3 text-left text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">
                  Gender
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">
                  Phone
                </th>
                {/* <th className="px-4 py-3 text-left text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                  Email
                </th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredData.map((customer, idx) => {
                const firstLetter = customer.name?.[0]?.toUpperCase();
                const isFemale = customer.title === "MRS" || customer.title === "MISS";

                return (
                  <tr
                    key={idx}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Customer */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-green-700 flex items-center justify-center text-white font-semibold shadow-md shadow-indigo-200/50 group-hover:scale-105 transition-all">
                          {firstLetter}
                        </div>
                        <div className="font-semibold text-slate-900 text-xs truncate max-w-30">
                          {customer.name}
                        </div>
                      </div>
                    </td>

                    {/* Gender */}
                    <td className="px-4 py-3 hidden sm:table-cell text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${isFemale ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                        {isFemale ? "Female" : "Male"}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3 hidden text-center sm:table-cell">
                      <span className="text-[11px] text-slate-600">
                        {customer.phoneNumber || (
                          <span className="text-slate-400 italic">N/A</span>
                        )}
                      </span>
                    </td>

                    {/* Email
                    <td className="px-4 py-3">
                      <span className="text-[11px] text-slate-600 truncate max-w-[150px] block">
                        {customer.email || (
                          <span className="text-slate-400 italic">No Email</span>
                        )}
                      </span>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Loading bar for hydration refreshes */}
        {loading && hasHydrated && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 animate-pulse" />
        )}
      </div>
    </div>
  );
}