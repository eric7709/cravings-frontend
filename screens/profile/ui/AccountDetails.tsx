"use client";
import { useGetDepartment, useGetRole } from "@/shared/hooks/useGetRole";
import React from "react";

export function AccountDetails() {
    const role = useGetRole()
    const department = useGetDepartment()
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Account Details
            </h2>

            <div className="space-y-4">
                {/* Account Status */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Account Status
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Your staff account is currently active
                        </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        Active
                    </span>
                </div>

                {/* Role */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Role
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Defines your access and responsibilities
                        </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 capitalize">
                        {role}
                    </span>
                </div>

                {/* Department */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Department
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Your primary working area
                        </p>
                    </div>
                    <span className="text-sm font-medium capitalize text-gray-800">
                        {department}
                    </span>
                </div>

                {/* Shift Status */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Shift Status
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Indicates if you are currently on duty
                        </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        On Duty
                    </span>
                </div>

                {/* System Notifications */}
                <div className="flex items-center justify-between py-3">
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            System Notifications
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Receive alerts for orders, tasks, and updates
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                            peer-checked:after:translate-x-full">
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}
