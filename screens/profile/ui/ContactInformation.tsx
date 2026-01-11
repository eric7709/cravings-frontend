"use client";
import React from "react";
import { Mail, Phone, CreditCard, MapPin } from "lucide-react";
import { User } from "@/models/auth/types";

type Props = {
    user: User
}

export function ContactInformation({ user }: Props) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
                {/* <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    Edit
                </button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.email && (
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Email Address
                            </p>
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>
                )}

                {user.phoneNumber && (
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Phone Number
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                                {user.phoneNumber}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-50 to-purple-100 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            User ID
                        </p>
                        <p className="text-sm font-mono font-semibold text-gray-900">
                            {user.id}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-50 to-orange-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            Location
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                            N/A
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}