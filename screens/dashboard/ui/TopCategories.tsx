"use client"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS } from "../data/data";
import { useDashboardStore } from "@/models/dashboard/store";


export default function TopCategories() {
  const { overview } = useDashboardStore();
  const categories = overview?.topCategories ?? [];

  const data = categories.map((cat, i) => ({
    category: cat.category,
    amount: cat.totalSales,
    color: COLORS[i],
  }));

  if (data.length === 0) {
    return (
      <div className="border-gray-200 px-6 pt-4 rounded-3xl border bg-white">
        <p className="text-2xl font-bold text-gray-800">Top Categories</p>
        <p className="text-center text-gray-500 py-12">No data</p>
      </div>
    );
  }

  return (
    <div className="border-gray-200 px-5 pt-3 rounded-3xl border bg-white">
      <p className="text-xl font-bold text-gray-800">Top Categories</p>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {/* Legend */}
        <div className="space-y-2 text-sm">
          {data.map((el, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 w-3 shrink-0 rounded-full" style={{ background: el.color }} />
              <p className="text-gray-700 text-[11px] capitalize">{el.category}</p>
            </div>
          ))}
        </div>
        {/* Chart */}
        <div className="w-full h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                innerRadius="50%"
                outerRadius="80%"
                paddingAngle={4}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={data[index].color} />
                ))}
              </Pie>
              <Tooltip formatter={(v?: number) => `₦${Number(v).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}