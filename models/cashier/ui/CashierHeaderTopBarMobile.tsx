'use client';

import { useUserStore } from '@/models/auth/store';
import { useOrderStore } from '@/models/orders/store';
import { formatPrice } from '@/shared/utils/formatPrice';
import Search from '@/shared/ui/Search';
import DatePillPicker from './DatePillPicker';
import { toLocalDateString } from '@/shared/utils/toLocalDateString';
import { getTodayISODate } from '@/shared/utils/getTodayISODate';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGetRole } from '@/shared/hooks/useGetRole';
import { Bell, User, Settings, LogOut, ChevronRight } from "lucide-react";
import { useLogout } from '@/shared/hooks/useLogout';
import CashierHeaderStatusMobile from './CashierHeaderStatusMobile';

interface Props {
    opened: boolean;
}

export default function CashierHeaderTopBarMobile({ opened }: Props) {
    const { search, setSearch, setStartDate, startDate, todayOrderStats } = useOrderStore();
    const { user } = useUserStore();
    const pathname = usePathname();
    const role = useGetRole();
    const logout = useLogout();

    const navLinks = [
        { href: '/cashier/orders', label: 'Orders' },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <div className={`xl:hidden bg-gradient-to-b from-white to-gray-50 fixed w-full border-t duration-300 ease-in-out border-gray-200 shadow-2xl ${opened ? "h-[calc(100vh-80px)] opacity-100 visible" : "h-0 opacity-0 invisible"}`}>
            <div className="flex flex-col h-full overflow-y-auto">
                {/* Search Section */}
                <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
                    <div className="p-4 pb-3">
                        <Search
                            value={search}
                            placeholder="Search Orders"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <CashierHeaderStatusMobile />
                </div>

                {/* Navigation Links */}
                <nav className="px-4 py-3 space-y-1.5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                        Menu
                    </p>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-sm transition-all ${isActive(link.href)
                                ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-600 shadow-sm'
                                : 'text-gray-700 hover:bg-gray-100 active:scale-[0.98]'
                                }`}
                        >
                            <span>{link.label}</span>
                            {isActive(link.href) && (
                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Revenue & Date Section */}
                <div className="mx-4 my-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-xs font-medium text-gray-600 mb-1">Today's Revenue</p>
                            <p className="text-2xl font-bold text-green-600">
                                {formatPrice(todayOrderStats.total)}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                        </div>
                    </div>
                    <DatePillPicker
                        right
                        value={startDate ?? getTodayISODate()}
                        onChange={(el) => setStartDate(toLocalDateString(el))}
                    />
                </div>
                {/* Spacer to push profile to bottom */}
                <div className="flex-1" />
                {/* User Profile Section */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200">
                    <div className="p-4">
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-100">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
                                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-gray-900 truncate">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">{role}</p>
                            </div>
                            <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <Bell className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-3 space-y-1">
                            <Link 
                                href="/cashier/profile"
                                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <User className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span>Profile</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </Link>

                            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <Settings className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <span>Settings</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </button>

                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 active:scale-[0.98] transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                                        <LogOut className="h-4 w-4 text-red-600" />
                                    </div>
                                    <span>Logout</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-red-400 group-hover:text-red-600 transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}