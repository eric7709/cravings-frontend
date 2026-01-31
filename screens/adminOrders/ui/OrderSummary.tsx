import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  Banknote,
  TrendingUp,
} from "lucide-react";

export default function OrderSummary() {
  const stats = [
    { label: "Orders", value: "156", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500" },
    { label: "Done", value: "142", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500" },
    { label: "Active", value: "08", icon: Clock, color: "text-amber-500", bg: "bg-amber-500" },
    { label: "Revenue", value: "$4.2k", icon: Banknote, color: "text-indigo-500", bg: "bg-indigo-500" },
  ];

  return (
    <div className="p-3 pb-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Top Label Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {stat.label}
              </span>
              <stat.icon size={14} className={stat.color} />
            </div>

            {/* Main Content */}
            <div className="p-4 flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  <div className={`h-1 w-8 rounded-full ${stat.bg}`} />
                  <div className="h-1 w-1 rounded-full bg-slate-200" />
                </div>
              </div>

              {/* Trend Badge */}
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">vs Last 24h</span>
                <div className="flex items-center gap-1 text-xs font-black text-emerald-600">
                  <TrendingUp size={12} />
                  <span>12%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}