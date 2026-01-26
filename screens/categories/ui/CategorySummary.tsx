import { Tags, Utensils, LayoutGrid, PieChart, ChevronRight, ArrowUpRight, Plus, Activity } from "lucide-react";
import React from "react";

export default function CategorySummary() {
    const stats = [
        {
            label: "Total Categories",
            value: "08",
            icon: LayoutGrid,
            accent: "bg-indigo-600",
            cardBg: "bg-indigo-50/80 border-indigo-100",
            sidebarBg: "bg-indigo-100/50",
            textMain: "text-indigo-900",
            textLabel: "text-indigo-500",
            subText: "Inventory",
            metric: "Active Now",
            isPositive: true,
        },
        {
            label: "Menu Items",
            value: "124",
            icon: Utensils,
            accent: "bg-rose-500",
            cardBg: "bg-rose-50/80 border-rose-100",
            sidebarBg: "bg-rose-100/50",
            textMain: "text-rose-900",
            textLabel: "text-rose-500",
            subText: "Average/Cat",
            metric: "15.5 Items",
            isPositive: true,
        },
        {
            label: "Top Performer",
            value: "Beverage",
            icon: Tags,
            accent: "bg-cyan-500",
            cardBg: "bg-cyan-50/80 border-cyan-100",
            sidebarBg: "bg-cyan-100/50",
            textMain: "text-cyan-900",
            textLabel: "text-cyan-500",
            subText: "Highest Sales",
            metric: "42% Share",
            isPositive: true,
        },
        {
            /* NEW: Category Spread / Diversity */
            label: "Menu Balance",
            value: "High",
            icon: PieChart,
            accent: "bg-emerald-500",
            cardBg: "bg-emerald-50/80 border-emerald-100",
            sidebarBg: "bg-emerald-100/50",
            textMain: "text-emerald-900",
            textLabel: "text-emerald-500",
            subText: "Diversity",
            metric: "Well Spread",
            isPositive: true,
        },
    ];

    return (
        <div className="p-4 pb-1">
            <div className="grid grid-cols-1  p-5 bg-white rounded-3xl shadow shadow-gray-300 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`group relative rounded-3xl p-2 pr-5 border transition-all duration-300 hover:shadow-xl hover:translate-y-0.5 flex items-center gap-4 overflow-hidden ${stat.cardBg}`}
                    >
                        {/* Sidebar Section */}
                        <div className={`h-24 w-20 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all group-hover:bg-white/60 ${stat.sidebarBg}`}>
                            <stat.icon size={26} strokeWidth={2.2} className={stat.textMain} />
                            <div className={`h-1.5 w-4 rounded-full ${stat.accent} opacity-40 group-hover:w-8 transition-all`} />
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 py-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${stat.textLabel}`}>
                                    {stat.label}
                                </p>
                            </div>

                            <div className="mt-0.5">
                                <p className={`text-2xl font-black tracking-tight ${stat.textMain} truncate`}>
                                    {stat.value}
                                </p>
                            </div>
                            {/* The "Flex Between" Context Section */}
                            <div className="mt-4 flex items-center justify-between  pt-2">
                                <span className={`text-[9px] font-bold uppercase ${stat.textLabel}`}>
                                    {stat.subText}
                                </span>

                                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black ${stat.textMain} bg-white/40 shadow-sm`}>
                                    {stat.isPositive ? (
                                        <Activity size={10} strokeWidth={3} />
                                    ) : (
                                        <Plus size={8} strokeWidth={4} />
                                    )}
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