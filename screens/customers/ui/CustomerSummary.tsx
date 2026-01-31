import { Users, UserPlus, ShieldCheck, Mail } from "lucide-react";
import React from "react";

export default function CustomerSummary() {
    const stats = [
        {
            label: "Total Customers",
            value: "842",
            icon: Users,
            accent: "bg-blue-600",
            cardBg: "bg-blue-50/80 border-blue-100",
            textMain: "text-blue-900",
            textLabel: "text-blue-500",
            subText: "Database Size",
        },
        {
            label: "New Signups",
            value: "12",
            icon: UserPlus,
            accent: "bg-emerald-500",
            cardBg: "bg-emerald-50/80 border-emerald-100",
            textMain: "text-emerald-900",
            textLabel: "text-emerald-500",
            subText: "Growth Rate",
        },
        {
            label: "Verified",
            value: "92%",
            icon: ShieldCheck,
            accent: "bg-purple-600",
            cardBg: "bg-purple-50/80 border-purple-100",
            textMain: "text-purple-900",
            textLabel: "text-purple-500",
            subText: "Data Integrity",
        },
        {
            label: "Contactable",
            value: "760",
            icon: Mail,
            accent: "bg-amber-500",
            cardBg: "bg-amber-50/80 border-amber-100",
            textMain: "text-amber-900",
            textLabel: "text-amber-500",
            subText: "Reachability",
        },
    ];

    return (
        <div className="p-3 pb-1">
            <div className="grid grid-cols-1 p-3 bg-white rounded-2xl shadow shadow-gray-300 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`group relative rounded-2xl p-2 pr-5 border transition-all duration-300 shadow hover:translate-y-0.5 flex items-center gap-4 overflow-hidden ${stat.cardBg}`}
                    >
                        {/* Icon Sidebar */}
                        <div className="h-18 w-15 rounded-3xl flex flex-col items-center justify-center gap-2">
                            <stat.icon size={25} strokeWidth={2.2} className={stat.textMain} />
                            <div className="flex -space-x-1.5">
                                <div className={`h-1.5 w-1.5 rounded-full border border-white ${stat.accent}`} />
                                <div className={`h-1.5 w-1.5 rounded-full border border-white ${stat.accent} opacity-60`} />
                            </div>
                        </div>

                        {/* Content */}
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

                            <div className="mt-4 flex items-center justify-between pt-2">
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
