import { Soup, Star, CircleDollarSign, Gem, ChevronRight, ArrowUpRight } from "lucide-react";
import React from "react";

export default function MenuItemSummary() {
  const stats = [
    {
      label: "Total Items",
      value: "48",
      icon: Soup,
      accent: "bg-green-600",
      cardBg: "bg-green-50/80 border-green-100",
      sidebarBg: "bg-green-100/50",
      textMain: "text-green-900",
      textLabel: "text-green-500",
      subText: "Live Menu",
      metric: "8 Categories",
      isPositive: true,
    },
    {
      label: "Best Seller",
      value: "Wagyu Burger",
      icon: Star,
      accent: "bg-yellow-500",
      cardBg: "bg-yellow-50/80 border-yellow-100",
      sidebarBg: "bg-yellow-100/50",
      textMain: "text-yellow-900",
      textLabel: "text-yellow-600",
      subText: "Popularity",
      metric: "Top 1%",
      isPositive: true,
    },
    {
      label: "Avg. Price",
      value: "$18.50",
      icon: CircleDollarSign,
      accent: "bg-emerald-600",
      cardBg: "bg-emerald-50/80 border-emerald-100",
      sidebarBg: "bg-emerald-100/50",
      textMain: "text-emerald-900",
      textLabel: "text-emerald-500",
      subText: "Price Point",
      metric: "+2.4% MoM",
      isPositive: true,
    },
    {
      /* CHANGED: From Out of Stock to Premium Selection */
      label: "Premium Tier",
      value: "12",
      icon: Gem,
      accent: "bg-violet-500",
      cardBg: "bg-violet-50/80 border-violet-100",
      sidebarBg: "bg-violet-100/50",
      textMain: "text-violet-900",
      textLabel: "text-violet-500",
      subText: "High Value",
      metric: "Above $30",
      isPositive: true,
    },
  ];

  return (
    <div className="p-4 pb-1 mb-3">
      <div className="grid grid-cols-1 bg-white shadow shadow-gray-300 rounded-3xl p-5 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group relative rounded-3xl p-2 pr-5 border transition-all duration-300 hover:shadow-xl hover:translate-y-px flex items-center gap-4 overflow-hidden ${stat.cardBg}`}
          >
            {/* Sidebar Icon Area */}
            <div className={`h-24 w-20 rounded-[28px] flex flex-col items-center justify-center gap-2 transition-all group-hover:bg-white/50 ${stat.sidebarBg}`}>
              <stat.icon size={26} strokeWidth={2.2} className={stat.textMain} />
              <div className={`h-1 w-1 rounded-full ${stat.accent} shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]`} />
            </div>

            {/* Content Area */}
            <div className="flex-1 py-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${stat.textLabel}`}>
                  {stat.label}
                </p>
                <ChevronRight size={12} className={`${stat.textLabel} opacity-0 group-hover:opacity-100 transition-all`} />
              </div>

              <div className="mt-0.5">
                <p className={`text-2xl font-black tracking-tight ${stat.textMain} truncate`}>
                  {stat.value}
                </p>
              </div>

              {/* Flex Between Context Footer */}
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className={`text-[9px] font-bold uppercase whitespace-nowrap ${stat.textLabel}`}>
                  {stat.subText}
                </span>

                <div className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-[9px] font-black uppercase ${stat.textMain} bg-white/60 border border-white/20 shadow-sm`}>
                  {stat.isPositive && <ArrowUpRight size={10} />}
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