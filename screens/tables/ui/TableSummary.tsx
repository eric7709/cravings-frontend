import { Armchair, Users, UserCheck, Timer, ChevronRight, ArrowUpRight } from "lucide-react";
import React from "react";

export default function TableSummary() {
  const stats = [
    {
      label: "Total Tables",
      value: "24",
      icon: Armchair,
      accent: "bg-blue-600",
      cardBg: "bg-blue-50/80 border-blue-100",
      sidebarBg: "bg-blue-100/50",
      textMain: "text-blue-900",
      textLabel: "text-blue-500",
      subText: "Max Capacity",
      metric: "96 Seats",
      isPositive: true,
    },
    {
      label: "Occupied",
      value: "18",
      icon: Users,
      accent: "bg-amber-500",
      cardBg: "bg-amber-50/80 border-amber-100",
      sidebarBg: "bg-amber-100/50",
      textMain: "text-amber-900",
      textLabel: "text-amber-600",
      subText: "Occupancy",
      metric: "75% Full",
      isPositive: true,
    },
    {
      label: "Active Waiters",
      value: "06",
      icon: UserCheck,
      accent: "bg-purple-600",
      cardBg: "bg-purple-50/80 border-purple-100",
      sidebarBg: "bg-purple-100/50",
      textMain: "text-purple-900",
      textLabel: "text-purple-500",
      subText: "Staffing",
      metric: "4 Tables/ea",
      isPositive: true,
    },
    {
      label: "Avg. Turnaround",
      value: "42m",
      icon: Timer,
      accent: "bg-emerald-500",
      cardBg: "bg-emerald-50/80 border-emerald-100",
      sidebarBg: "bg-emerald-100/50",
      textMain: "text-emerald-900",
      textLabel: "text-emerald-500",
      subText: "Efficiency",
      metric: "-5m vs yesterday",
      isPositive: false, // Down is better for time
    },
  ];

  return (
    <div className="p-4 pb-1 mb-3">
      <div className="grid grid-cols-1 p-5 bg-white rounded-3xl shadow shadow-gray-300 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group relative rounded-3xl p-2 pr-5 border transition-all duration-300 hover:shadow-xl hover:translate-y-px flex items-center gap-4 overflow-hidden ${stat.cardBg}`}
          >
            {/* Floor Plan Styled Sidebar */}
            <div className={`h-24 w-20 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all group-hover:scale-95 ${stat.sidebarBg}`}>
              <stat.icon size={26} strokeWidth={2.2} className={stat.textMain} />
              <div className="flex gap-0.5">
                <div className={`h-1 w-1 rounded-full ${stat.accent}`} />
                <div className={`h-1 w-1 rounded-full ${stat.accent} opacity-40`} />
                <div className={`h-1 w-1 rounded-full ${stat.accent} opacity-20`} />
              </div>
            </div>

            {/* Table Details */}
            <div className="flex-1 py-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${stat.textLabel}`}>
                  {stat.label}
                </p>
                <ChevronRight size={12} className={`${stat.textLabel} opacity-0 group-hover:opacity-100 transition-all`} />
              </div>

              <div className="mt-0.5">
                <p className={`text-3xl font-black tracking-tighter ${stat.textMain}`}>
                  {stat.value}
                </p>
              </div>

              {/* Bottom Flex Section */}
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-[9px] font-bold uppercase ${stat.textLabel}`}>
                  {stat.subText}
                </span>

                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black ${stat.textMain} bg-white/50 border border-white/30`}>
                  {!stat.isPositive && <ArrowUpRight size={10} className="rotate-90" />}
                  {stat.metric}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}