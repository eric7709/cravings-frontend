'use client';

import { useUserStore } from '@/models/auth/store';
import { useOrderStore } from '@/models/orders/store';
import { formatPrice } from '@/shared/utils/formatPrice';
import { Bell } from 'lucide-react';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import Search from '@/shared/ui/Search';
import { useState } from 'react';
import DatePillPicker from './DatePillPicker';
import { toLocalDateString } from '@/shared/utils/toLocalDateString';
import { getTodayISODate } from '@/shared/utils/getTodayISODate';
import CashierHeaderTopBarMobile from './CashierHeaderTopBarMobile';
import { FaTimes } from 'react-icons/fa';
import ProfileDropdown from '@/shared/ui/ProfileDropdown';
import { TiArrowSortedDown } from 'react-icons/ti';
import { LiaTimesSolid } from "react-icons/lia";

import { usePathname } from 'next/navigation';
import { useGetRole } from '@/shared/hooks/useGetRole';
import { RxHamburgerMenu } from "react-icons/rx";
import Image from 'next/image';

export default function CashierHeaderTopBar() {
    const { search, setSearch, setStartDate, startDate, todayOrderStats } = useOrderStore();
    const [opened, setOpened] = useState(false);
    const { user } = useUserStore();
    const role = useGetRole()
    const pathname = usePathname();

    const navLinks = [
        { href: '/cashier/orders', label: 'Orders' },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <div className="bg-gradient-to-r relative h-20 z-50 ">
            <div className="flex justify-between items-center px-4 h-full gap-4">
                {/* Logo */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden xl:block h-12 w-12 rounded-full border-2" />
                    <p className="font-bold uppercase text-lg">Cravings</p>
                </div>
                <div className="absolute -translate-x-44 [@media(min-width:1600px)]:-translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2">
                    <Search
                        value={search}

                        className='w-64 [@media(min-width:1600px)]:w-72 hidden xl:block'
                        placeholder="Search Orders"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {/* Right Side Actions - Desktop */}
                <div className="hidden xl:flex items-center gap-5 shrink-0">
                    <div className="flex items-center gap-2 text-[15px] font-medium uppercase">
                        <p>Revenue:</p>
                        <p className="text-xl font-bold text-green-600">{formatPrice(todayOrderStats.total)}</p>
                    </div>
                    <DatePillPicker value={startDate ?? getTodayISODate()} onChange={(el) => setStartDate(toLocalDateString(el))} />
                    <div className="grid h-12 w-12 shrink-0 place-content-center rounded-full border border-gray-600 hover:bg-white/50 cursor-pointer transition-colors">
                        <Bell className="h-5 w-5" />
                    </div>
                    <ProfileDropdown>
                        <div className="flex cursor-pointer items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="grid h-12 w-12 shrink-0 overflow-hidden place-content-center rounded-full border border-gray-600">
                                <Image src="/cashier.webp" className='h-full w-full ' alt="" />
                            </div>
                            <div>
                                <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                                <p className="text-xs text-start capitalize">{role}</p>
                            </div>
                            <TiArrowSortedDown className="ml-1 text-lg" />
                        </div>
                    </ProfileDropdown>
                </div>
                <div
                    onClick={() => setOpened(!opened)}
                    className="h-10 w-10 border border-gray-400 rounded-md xl:hidden grid place-content-center relative cursor-pointer hover:bg-white/50 transition-colors"
                >
                    <RxHamburgerMenu className={`text-xl absolute top-1/2 -translate-y-1/2 -translate-x-1/2 duration-300 left-1/2 ${!opened ? "opacity-100 visible " : " invisible opacity-0"}`} />
                    <LiaTimesSolid className={`text-xl absolute top-1/2 -translate-x-1/2 duration-300 -translate-y-1/2 left-1/2 ${opened ? "opacity-100 visible " : " invisible opacity-0"}`} />
                </div>
            </div>
            <CashierHeaderTopBarMobile opened={opened} />
        </div>
    );
}