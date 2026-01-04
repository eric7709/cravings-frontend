"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DonutChartItem = {
  label: string;
  value: number;
  color?: string;
};

type DonutChartProps = {
  title: string;
  data: DonutChartItem[];
  valueFormatter?: (value: number) => string;
};

const DEFAULT_COLORS = [
  "#6F4E37",
  "#FFD166",
  "#06D6A0",
  "#EF476F",
  "#FFB86F",
  "#118AB2",
];

export function DonutChart({
  title,
  data,
  valueFormatter = (v) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(v),
}: DonutChartProps) {
  return (
    <div className="border-gray-200 px-6 pt-4 rounded-3xl border bg-white">
      <p className="text-3xl font-bold text-gray-800">{title}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {/* Legend */}
        <div className="space-y-3 text-sm">
          {data?.map((el, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="h-4 w-4 rounded-full"
                style={{
                  background: el.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
                }}
              />
              <p className="text-gray-700">{el.label}</p>
            </div>
          ))}
        </div>

        {/* Donut */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                paddingAngle={4}
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.color ??
                      DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  valueFormatter(Number(value))
                }
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
