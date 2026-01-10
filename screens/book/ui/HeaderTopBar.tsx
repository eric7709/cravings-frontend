import React from 'react'
import { TbShoppingBag } from 'react-icons/tb'
import { useBook } from '../store/useBook'
import { BsClockHistory } from "react-icons/bs";
import { getGreeting } from '@/shared/utils/getGreeting';
import { useCustomerOrdersToday } from '@/models/orders/hooks';
import Image from 'next/image';

export default function HeaderTopBar() {
    const { items, customer, openHistoryModal, openCartModal } = useBook()
    const { data } = useCustomerOrdersToday();
    const pendingOrders = data?.filter(el => el.orderStatus == "PENDING").length ?? 0
    const cartEmpty = items.length == 0
    return (
        <div className="flex px-3 py-3 items-center gap-3 ">
            <div className="h-11 bg-blue-50 relative overflow-hidden shadow w-11 border-2 border-orange-600 rounded-full">
                <Image src="/guy.png" fill alt="" className="h-full w-full absolute object-cover rounded-full" />
            </div>
            <div className="leading-none">
                <p className='text-[15px] mb-0.5 font-semibold'>Hello {customer?.name.split(" ")[0] ?? "and Welcome"} 👋</p>
                <p className='text-xs text-gray-700 italic'>{getGreeting()}</p>
            </div>
            <div onClick={openHistoryModal} className={`h-11 w-11 ml-auto rounded-full  bg-gray-100 shadow cursor-pointer border border-gray-200 grid place-content-center`}>
                <div className='relative'>
                    <BsClockHistory />
                    <div className={`duration-700 rounded-full  ${pendingOrders == 0 ? "h-0 w-0 opacity-0 invisible" : "opacity-100 visible w-4 h-4"} absolute -top-2 -right-2  text-xs text-white font-semibold bg-red-600 grid place-content-center`}>
                        <p>{pendingOrders}</p>
                    </div>
                </div>
            </div>
            <div onClick={openCartModal} className="h-11 w-11  rounded-full  bg-gray-100 shadow cursor-pointer border border-gray-200 grid place-content-center">
                <div className='relative'>
                    <TbShoppingBag className='text-xl' />
                    <div className={`duration-700 rounded-full  ${cartEmpty ? "h-0 w-0 opacity-0 invisible" : "opacity-100 visible w-4 h-4"} absolute -top-1 -right-1  text-xs text-white font-semibold bg-red-600 grid place-content-center`}>
                        <p>{items.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
