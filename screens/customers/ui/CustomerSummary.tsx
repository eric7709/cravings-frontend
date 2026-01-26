import { Users, UserPlus, ShieldCheck, Mail, ChevronRight, ArrowUpRight } from "lucide-react";
import React from "react";

export default function CustomerSummary() {
    const stats = [
        {
            label: "Total Customers",
            value: "842",
            icon: Users,
            accent: "bg-blue-600",
            cardBg: "bg-blue-50/80 border-blue-100",
            sidebarBg: "bg-blue-100/50",
            textMain: "text-blue-900",
            textLabel: "text-blue-500",
            subText: "Database Size",
            metric: "+24 this week",
            isPositive: true,
        },
        {
            label: "New Signups",
            value: "12",
            icon: UserPlus,
            accent: "bg-emerald-500",
            cardBg: "bg-emerald-50/80 border-emerald-100",
            sidebarBg: "bg-emerald-100/50",
            textMain: "text-emerald-900",
            textLabel: "text-emerald-500",
            subText: "Growth Rate",
            metric: "14% Increase",
            isPositive: true,
        },
        {
            label: "Verified",
            value: "92%",
            icon: ShieldCheck,
            accent: "bg-purple-600",
            cardBg: "bg-purple-50/80 border-purple-100",
            sidebarBg: "bg-purple-100/50",
            textMain: "text-purple-900",
            textLabel: "text-purple-500",
            subText: "Data Integrity",
            metric: "KYC Complete",
            isPositive: true,
        },
        {
            label: "Contactable",
            value: "760",
            icon: Mail,
            accent: "bg-amber-500",
            cardBg: "bg-amber-50/80 border-amber-100",
            sidebarBg: "bg-amber-100/50",
            textMain: "text-amber-900",
            textLabel: "text-amber-500",
            subText: "Reachability",
            metric: "Email & Phone",
            isPositive: true,
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
                        {/* Circular Profile-Style Sidebar */}
                        <div className={`h-24 w-20 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all group-hover:bg-white/40 ${stat.sidebarBg}`}>
                            <stat.icon size={26} strokeWidth={2.2} className={stat.textMain} />
                            <div className="flex -space-x-1.5">
                                <div className={`h-1.5 w-1.5 rounded-full border border-white ${stat.accent}`} />
                                <div className={`h-1.5 w-1.5 rounded-full border border-white ${stat.accent} opacity-60`} />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 py-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${stat.textLabel}`}>
                                    {stat.label}
                                </p>
                                <ChevronRight size={12} className={`${stat.textLabel} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                            </div>

                            <div className="mt-0.5">
                                <p className={`text-3xl font-black tracking-tighter ${stat.textMain}`}>
                                    {stat.value}
                                </p>
                            </div>

                            {/* Flex Between Footer */}
                            <div className="mt-4 flex items-center justify-between gap-1">
                                <span className={`text-[9px] font-bold uppercase ${stat.textLabel}`}>
                                    {stat.subText}
                                </span>

                                <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-[9px] font-black ${stat.textMain} bg-white/50 border border-white/40 shadow-sm`}>
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