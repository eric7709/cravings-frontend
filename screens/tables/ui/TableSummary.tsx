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
    <div className="p-3 pb-1">
      <div className="grid grid-cols-1 p-3 bg-white rounded-2xl shadow shadow-gray-300 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group relative rounded-2xl p-2 pr-5 border transition-all duration-300 shadow hover:translate-y-px flex items-center gap-4 overflow-hidden ${stat.cardBg}`}
          >
            {/* Floor Plan Styled Sidebar */}
            
            <div className={`h-18 w-15 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all `}>
              <stat.icon size={25} strokeWidth={2.2} className={stat.textMain} />
              <div className="flex -space-x-1.5">
                <div className={`h-1.5 w-1.5 rounded-full border border-white ${stat.accent}`} />
                <div className={`h-1 w-1 rounded-full ${stat.accent} opacity-20`} />
                <div className={`h-1 w-1 rounded-full ${stat.accent} opacity-40`} />
              </div>
            </div>

            {/* Table Details */}
            <div className="flex-1 py-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-[8px] font-bold uppercase tracking-widest ${stat.textLabel}`}>
                  {stat.label}
                </p>
              </div>

              <div className="mt-0.5">
                <p className={`text-xl font-black tracking-tighter ${stat.textMain}`}>
                  {stat.value}
                </p>
              </div>

              {/* Bottom Flex Section */}
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-[8px] font-bold uppercase ${stat.textLabel}`}>
                  {stat.subText}
                </span>

               
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}