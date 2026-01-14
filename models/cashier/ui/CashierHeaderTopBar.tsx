'use client';

import { useUserStore } from '@/models/auth/store';
import { useOrderStore } from '@/models/orders/store';
import { formatPrice } from '@/shared/utils/formatPrice';
import { Bell, Menu, X } from 'lucide-react';
import Search from '@/shared/ui/Search';
import { useState } from 'react';
import DatePillPicker from './DatePillPicker';
import { toLocalDateString } from '@/shared/utils/toLocalDateString';
import { getTodayISODate } from '@/shared/utils/getTodayISODate';
import CashierHeaderTopBarMobile from './CashierHeaderTopBarMobile';
import ProfileDropdown from '@/shared/ui/ProfileDropdown';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useGetRole } from '@/shared/hooks/useGetRole';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCashierPage } from '../hooks/useCashierPage';
import Logo from '@/shared/ui/Logo';

export default function CashierHeaderTopBar() {
    const { search, setSearch, setStartDate, startDate, setEndDate, todayOrderStats } = useOrderStore();
    const [opened, setOpened] = useState(false);
    const { user } = useUserStore();
    const { isOrdersPage } = useCashierPage();
    const role = useGetRole();
    const pathname = usePathname();

    const isActive = (path: string) => pathname.startsWith(path);

    const links = [
        {
            link: "/cashier/orders",
            label: "Orders"
        },
        {
            link: "/cashier/menu-items",
            label: "Menu Items"
        },
    ];

    return (
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
            <div className="flex justify-between items-center px-4 h-20 gap-4">
                {/* Logo & Navigation */}
                <div className="flex items-center gap-3 shrink-0">
                    <Logo />
                    <nav className="hidden xl:flex items-center gap-1 ml-6">
                        {links.map(({ label, link }) => (
                            <Link
                                key={link}
                                href={link}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive(link)
                                        ? 'bg-linear-to-r from-orange-50 to-amber-50 text-orange-600 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Center Search - Desktop */}
                {isOrdersPage && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden xl:block">
                        <Search
                            value={search}
                            className="w-80 [@media(min-width:1600px)]:w-96"
                            placeholder="Search Orders"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                )}

                {/* Right Side Actions - Desktop */}
                <div className="hidden xl:flex items-center gap-4 shrink-0">
                    {/* Revenue Card */}
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-linear-to-br from-green-50 to-emerald-50 border border-green-100 shadow-sm">
                        <div className="flex flex-col">
                            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Revenue</p>
                            <p className="text-lg font-bold text-green-600">{formatPrice(todayOrderStats.total)}</p>
                        </div>
                    </div>

                    {/* Date Picker */}
                    <DatePillPicker
                        value={startDate ?? getTodayISODate()}
                        onChange={(el) => {
                            setStartDate(toLocalDateString(el));
                            setEndDate(toLocalDateString(el));
                        }}
                    />

                    {/* Notification Button */}
                    <button className="h-11 w-11 grid place-content-center rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200 relative group">
                        <Bell className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-orange-500 rounded-full ring-2 ring-white"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <ProfileDropdown>
                        <div className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                            <div className="relative bg-orange-600 text-white font-semibold grid place-content-center text-lg h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 shadow-md group-hover:border-orange-300 transition-colors">
                                <p className='font-semibold'>
                                    {user?.firstName[0]}
                                    {user?.lastName[0]}
                                </p>
                            </div>
                            <div className="leading-tight">
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-xs text-gray-500 text-start capitalize">{role}</p>
                            </div>
                            <TiArrowSortedDown className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                    </ProfileDropdown>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpened(!opened)}
                    className="h-11 w-11 xl:hidden grid place-content-center rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200"
                >
                    {opened ? (
                        <X className="h-5 w-5 text-gray-600" />
                    ) : (
                        <Menu className="h-5 w-5 text-gray-600" />
                    )}
                </button>
            </div>

            {/* Mobile Drawer */}
            <CashierHeaderTopBarMobile setOpened={setOpened} opened={opened} />
        </div>
    );
}