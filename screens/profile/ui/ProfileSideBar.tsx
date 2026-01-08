"use client";
import React from "react";
import { User, Calendar, MapPin, Shield, Edit2 } from "lucide-react";
import { useUserStore } from "@/models/auth/store";
import { formatInstantToDate } from "@/shared/utils/formatInstantToDate";



export function ProfileSidebar() {
    const { user } = useUserStore()
    if (!user) return
    const { openChangePasswordModal } = useUserStore()
    const getRoleDisplay = (role: string) => {
        const roleMap: Record<string, string> = {
            ROLE_ADMIN: "Administrator",
            ROLE_CASHIER: "Cashier",
            ROLE_WAITER: "Waiter",
            ROLE_MANAGER: "Manager"
        };
        return roleMap[role] || role;
    };

    const getRoleColor = (role: string) => {
        const colorMap: Record<string, string> = {
            ROLE_ADMIN: "from-purple-500 to-purple-600",
            ROLE_CASHIER: "from-blue-500 to-blue-600",
            ROLE_WAITER: "from-green-500 to-green-600",
            ROLE_MANAGER: "from-orange-500 to-orange-600"
        };
        return colorMap[role] || "from-gray-500 to-gray-600";
    };

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Avatar Section */}
                <div className="relative pt-8 pb-6 px-6 text-center">
                    <div className="relative inline-block">
                        <div className={`w-32 h-32 bg-gradient-to-br ${getRoleColor(user.role as string)} rounded-full flex items-center justify-center shadow-xl ring-4 ring-white`}>
                            <User size={64} className="text-white" />
                        </div>
                        <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>

                    <h1 className="mt-4 text-2xl font-bold text-gray-900">
                        {user.firstName} {user.lastName}
                    </h1>

                    <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">
                            {getRoleDisplay(user.role as string)}
                        </span>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Joined</span>
                        </div>
                        <span className="font-semibold text-gray-900">{formatInstantToDate(user.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-3">
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>Location</span>
                        </div>
                        <span className="font-semibold text-gray-900">N/A</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 px-2">Quick Actions</h3>
                <div className="space-y-1">
                    <button className="w-full cursor-pointer hover:text-blue-600 duration-300 text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        Edit Profile
                    </button>
                    <button onClick={openChangePasswordModal} className="w-full cursor-pointer hover:text-blue-600 duration-300 text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        Change Password
                    </button>
                    <button className="w-full cursor-pointer hover:text-blue-600 duration-300 text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        Privacy Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
