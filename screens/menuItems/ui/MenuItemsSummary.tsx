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
      accent: "bg-blue-600",
      cardBg: "bg-blue-50/80 border-blue-100",
      sidebarBg: "bg-blue-100/50",
      textMain: "text-blue-900",
      textLabel: "text-blue-500",
      subText: "Price Point",
      metric: "+2.4% MoM",
      isPositive: true,
    },
    {
      /* CHANGED: From Out of Stock to Premium Selection */
      label: "Premium Tier",
      value: "12",
      icon: Gem,
      accent: "bg-rose-500",
      cardBg: "bg-rose-50/80 border-rose-100",
      sidebarBg: "bg-rose-100/50",
      textMain: "text-rose-900",
      textLabel: "text-rose-500",
      subText: "High Value",
      metric: "Above $30",
      isPositive: true,
    },
  ];

  return (
    <div className="p-3 pb-1">
      <div className="grid grid-cols-1 bg-white shadow shadow-gray-300 rounded-2xl p-3 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group relative rounded-2xl p-2 pr-5 border transition-all duration-300 shadow hover:translate-y-px flex items-center gap-4 overflow-hidden ${stat.cardBg}`}
          >
            {/* Sidebar Icon Area */}
            <div className={`h-18 w-15 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all `}>
              <stat.icon size={25} strokeWidth={2.2} className={stat.textMain} />
              <div className="flex -space-x-1.5">
                <div className={`h-1.5 w-1.5 rounded-full border border-white ${stat.accent}`} />
                <div className={`h-1.5 w-1.5 rounded-full border border-white ${stat.accent} opacity-60`} />
              </div>
            </div>

            <div className="flex-1 py-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-[8px] font-bold uppercase tracking-widest ${stat.textLabel}`}>
                  {stat.label}
                </p>
              </div>

              <div className="mt-0.5">
                <p className={`text-lg font-black tracking-tighter ${stat.textMain}`}>
                  {stat.value}
                </p>
              </div>

              {/* Flex Between Footer */}
              <div className="mt-4 flex items-center justify-between gap-1">
                <span className={`text-[7px] font-bold uppercase ${stat.textLabel}`}>
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