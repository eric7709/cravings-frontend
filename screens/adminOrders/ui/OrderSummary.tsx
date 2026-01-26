import { ShoppingBag, CheckCircle2, Clock, Banknote, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";
import React from "react";

export default function OrderSummary() {
  const stats = [
    {
      label: "Total Orders",
      value: "156",
      icon: ShoppingBag,
      accent: "bg-blue-600",
      cardBg: "bg-blue-50/80 border-blue-100",
      sidebarBg: "bg-blue-100/50",
      textMain: "text-blue-900",
      textLabel: "text-blue-500",
      subText: "Volume",
      trend: "+12.5%",
      isUp: true,
    },
    {
      label: "Completed",
      value: "142",
      icon: CheckCircle2,
      accent: "bg-emerald-500",
      cardBg: "bg-emerald-50/80 border-emerald-100",
      sidebarBg: "bg-emerald-100/50",
      textMain: "text-emerald-900",
      textLabel: "text-emerald-500",
      subText: "Success Rate",
      trend: "91%",
      isUp: true,
    },
    {
      label: "In Progress",
      value: "08",
      icon: Clock,
      accent: "bg-purple-600",
      cardBg: "bg-purple-50/80 border-purple-100",
      sidebarBg: "bg-purple-100/50",
      textMain: "text-purple-900",
      textLabel: "text-purple-500",
      subText: "Wait Time",
      trend: "-2m",
      isUp: false, // Down is good for wait time
    },
    {
      label: "Revenue",
      value: "$4.2k",
      icon: Banknote,
      accent: "bg-amber-500",
      cardBg: "bg-amber-50/80 border-amber-100",
      sidebarBg: "bg-amber-100/50",
      textMain: "text-amber-900",
      textLabel: "text-amber-500",
      subText: "vs Yesterday",
      trend: "+$410",
      isUp: true,
    },
  ];

  return (
    <div className="p-4 pb-1">

      <div className="grid p-5 bg-white rounded-3xl shadow shadow-gray-300 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group relative rounded-3xl p-2 pr-5 border transition-all duration-300 hover:shadow-xl hover:translate-0.5 flex items-center gap-4 overflow-hidden ${stat.cardBg}`}
          >
            {/* Left Icon Sidebar */}
            <div className={`h-24 w-20 rounded-[28px] flex flex-col items-center justify-center gap-2 transition-all group-hover:bg-white/50 ${stat.sidebarBg}`}>
              <stat.icon size={28} strokeWidth={2.2} className={stat.textMain} />
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${stat.accent}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${stat.accent}`}></span>
                </span>
              </div>
            </div>
            {/* Content Area */}
            <div className="flex-1 py-1">
              <div className="flex items-center justify-between">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${stat.textLabel}`}>
                  {stat.label}
                </p>
                <ChevronRight size={12} className={`${stat.textLabel} opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1`} />
              </div>
              <div className="mt-0.5">
                <p className={`text-3xl font-black tracking-tight ${stat.textMain}`}>
                  {stat.value}
                </p>
              </div>
              {/* Flex Between Context Area */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className={`text-[9px] font-bold uppercase tracking-tighter ${stat.textLabel} opacity-80`}>
                    {stat.subText}
                  </span>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-black ${stat.sidebarBg} ${stat.textMain} border border-white/40`}>
                  {stat.isUp ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}
                  {stat.trend}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}