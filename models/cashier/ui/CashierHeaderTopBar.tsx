'use client';
import { useUserStore } from '@/models/auth/store';
import { useOrderStore } from '@/models/orders/store';
import { Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import DatePillPicker from './DatePillPicker';
import { toLocalDateString } from '@/shared/utils/toLocalDateString';
import { getTodayISODate } from '@/shared/utils/getTodayISODate';
import ProfileDropdown from '@/shared/ui/ProfileDropdown';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useGetRole } from '@/shared/hooks/useGetRole';
import { useCashierPage } from '../hooks/useCashierPage';
import Logo from '@/shared/ui/Logo';
import { formatPrice } from '@/shared/utils/formatPrice';

export default function CashierHeaderTopBar() {
    const { search, setSearch, setStartDate, startDate, setEndDate, todayOrderStats } = useOrderStore();
    const [opened, setOpened] = useState(false);
    const { user } = useUserStore();
    const { isOrdersPage } = useCashierPage();
    const role = useGetRole();
    return (
        <div className="hidden lg:block sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
            <div className="flex justify-between items-center px-4 h-15 ">
                <div className="flex items-center gap-3 shrink-0">
                    <Logo />
                    {isOrdersPage && (
                        <div className="">
                            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className='h-9 rounded-full w-52 border border-gray-200 shadow pl-4 text-xs outline-none' placeholder='Search orders' />
                        </div>
                    )}
                </div>
                <div className="flex items-center  gap-2  font-semibold">
                    <p className='text-xs text-gray-600 mb-0.5'>Revenue:</p>
                    <p className='text-green-600 text-[17px] font-bold'>{formatPrice(todayOrderStats.total)}</p>
                </div>
                <div className="hidden xl:flex items-center shrink-0 gap-4">
                    <DatePillPicker
                        value={startDate ?? getTodayISODate()}
                        onChange={(el) => {
                            setStartDate(toLocalDateString(el));
                            setEndDate(toLocalDateString(el));
                        }}
                    />
                    <button className="h-9 w-9 grid place-content-center rounded-full border border-gray-200 hover:bg-gray-100 transition-all duration-200 shadow relative group">
                        <Bell className="h-4 w-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                        <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-green-500 rounded-full "></span>
                    </button>
                    <ProfileDropdown>
                        <div className="flex cursor-pointer  items-center gap-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                            <div className="relative bg-green-600 text-white font-semibold grid place-content-center text-base h-9 w-9 shrink-0 overflow-hidden rounded-full  border border-green-200 shadow group-hover:border-green-300 transition-colors">
                                <p className='font-semibold'>
                                    {user?.firstName[0]}
                                    {user?.lastName[0]}
                                </p>
                            </div>
                            <div className="leading-tight">
                                <p className="text-[13px] font-semibold text-gray-800 group-hover:text-gray-900">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-[11px] text-gray-500 text-start capitalize">{role}</p>
                            </div>
                            <TiArrowSortedDown className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                    </ProfileDropdown>
                </div>
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
        </div>
    );
}