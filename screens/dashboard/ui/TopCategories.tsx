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
    <div className="border-gray-200 px-6 pt-4 rounded-3xl border bg-white">
      <p className="text-3xl font-bold text-gray-800">Top Categories</p>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {/* Legend */}
        <div className="space-y-3 text-sm">
          {data.map((el, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full" style={{ background: el.color }} />
              <p className="text-gray-700 capitalize">{el.category}</p>
            </div>
          ))}
        </div>
        {/* Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                paddingAngle={4}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={data[index].color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `₦${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}