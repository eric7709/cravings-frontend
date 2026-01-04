"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart() {
  const data = [
    { date: "Jan 1", revenue: 12000 },
    { date: "Jan 2", revenue: 15000 },
    { date: "Jan 3", revenue: 11000 },
    { date: "Jan 4", revenue: 18000 },
    { date: "Jan 5", revenue: 14000 },
    { date: "Jan 6", revenue: 20000 },
    { date: "Jan 7", revenue: 17000 },
  ];

  return (
    <div className="p-6 bg-white rounded-3xl shadow-md">
      <h2 className="font-bold text-xl mb-4 text-gray-800">
        Revenue Over Time
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          {/* Light grid for better look */}
          <CartesianGrid strokeDasharray="5 5" stroke="#f3f4f6" />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
          />

          {/* Y Axis */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
            width={70}
            tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderRadius: "0.5rem",
              border: "none",
              color: "white",
              padding: "0.5rem 1rem",
            }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={(value: number) => `₦${value.toLocaleString()}`}
          />

          {/* Smooth Line */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={{ r: 5, stroke: "#2563eb", strokeWidth: 2, fill: "white" }}
            activeDot={{ r: 6, stroke: "#1d4ed8", strokeWidth: 3, fill: "#3b82f6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
