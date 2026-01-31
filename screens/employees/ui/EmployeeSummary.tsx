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
        <div className="p-3 pb-1">
            <div className="grid p-3 bg-white rounded-2xl shadow shadow-gray-300 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`group relative rounded-2xl p-2 pr-5 border transition-all duration-300 hover:shadow hover:translate-y-px flex items-center gap-4 overflow-hidden ${stat.cardBg}`}
                    >
                        {/* Identity Styled Sidebar */}
                        <div className={`h-18 w-15 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all `}>
                            <stat.icon size={25} strokeWidth={2.2} className={stat.textMain} />
                            <div className="flex -space-x-1.5">
                                <div className={`h-1.5 w-1.5 rounded-full border border-white ${stat.accent}`} />
                                <div className={`h-1.5 w-1.5 rounded-full border border-white ${stat.accent} opacity-60`} />
                            </div>
                        </div>

                        {/* Employee Info Area */}
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