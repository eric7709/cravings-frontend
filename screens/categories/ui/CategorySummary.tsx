import { Tags, Utensils, LayoutGrid, PieChart, ChevronRight, ArrowUpRight, Plus, Activity } from "lucide-react";

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
        <div className="p-3 pb-1">
            <div className="grid grid-cols-1  p-3 bg-white rounded-2xl shadow shadow-gray-300 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`group relative rounded-2xl p-2 pr-5 border transition-all duration-300 shadow hover:translate-y-0.5 flex items-center gap-4 overflow-hidden ${stat.cardBg}`}
                    >
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
                                <p className={`text-lg font-black tracking-tight ${stat.textMain} truncate`}>
                                    {stat.value}
                                </p>
                            </div>
                            {/* The "Flex Between" Context Section */}
                            <div className="mt-4 flex items-center justify-between  pt-2">
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