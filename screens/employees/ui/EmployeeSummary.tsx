import { UserCog, Briefcase, Fingerprint, History, ChevronRight, ArrowUpRight } from "lucide-react";
import React from "react";

export default function EmployeeSummary() {
    const stats = [
        {
            label: "Total Staff",
            value: "24",
            icon: UserCog,
            accent: "bg-indigo-600",
            cardBg: "bg-indigo-50/80 border-indigo-100",
            sidebarBg: "bg-indigo-100/50",
            textMain: "text-indigo-900",
            textLabel: "text-indigo-500",
            subText: "Active Roster",
            metric: "7 Roles",
            isPositive: true,
        },
        {
            label: "Kitchen Team",
            value: "09", // Chefs, Cooks, Bakers
            icon: Briefcase,
            accent: "bg-green-500",
            cardBg: "bg-green-50/80 border-green-100",
            sidebarBg: "bg-green-100/50",
            textMain: "text-green-900",
            textLabel: "text-green-500",
            subText: "Back of House",
            metric: "Full Shift",
            isPositive: true,
        },
        {
            label: "Security",
            value: "100%",
            icon: Fingerprint,
            accent: "bg-emerald-600",
            cardBg: "bg-emerald-50/80 border-emerald-100",
            sidebarBg: "bg-emerald-100/50",
            textMain: "text-emerald-900",
            textLabel: "text-emerald-500",
            subText: "Email Verified",
            metric: "Secure",
            isPositive: true,
        },
        {
            label: "New Hires",
            value: "03",
            icon: History,
            accent: "bg-blue-500",
            cardBg: "bg-blue-50/80 border-blue-100",
            sidebarBg: "bg-blue-100/50",
            textMain: "text-blue-900",
            textLabel: "text-blue-500",
            subText: "This Month",
            metric: "Onboarding",
            isPositive: true,
        },
    ];

    return (
        <div className="p-4 pb-1 mb-3 lg:mb-0">

            <div className="grid p-5 bg-white rounded-3xl shadow shadow-gray-300 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`group relative rounded-3xl p-2 pr-5 border transition-all duration-300 hover:shadow-xl hover:translate-y-px flex items-center gap-4 overflow-hidden ${stat.cardBg}`}
                    >
                        {/* Identity Styled Sidebar */}
                        <div className={`h-24 w-20 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all group-hover:rotate-2 ${stat.sidebarBg}`}>
                            <stat.icon size={26} strokeWidth={2.2} className={stat.textMain} />
                            <div className="flex gap-1 items-center justify-center">
                                <div className={`h-1 w-3 rounded-full ${stat.accent}`} />
                                <div className={`h-1 w-1 rounded-full ${stat.accent} opacity-40`} />
                            </div>
                        </div>

                        {/* Employee Info Area */}
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

                            {/* Flex Between Context Footer */}
                            <div className="mt-4 flex items-center justify-between gap-1">
                                <span className={`text-[9px] font-bold uppercase ${stat.textLabel}`}>
                                    {stat.subText}
                                </span>

                                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-black ${stat.textMain} bg-white/60 border border-white/40 shadow-sm`}>
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