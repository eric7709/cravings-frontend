"use client"

import AdminHeaderSearch from './AdminOrderSearch'
import AdminHeaderStatus from './AdminOrderStatus'
import AdminHeaderDateRange from './AdminDateRangeHeader'
import AdminHeaderSort from './AdminOrderSort'
import { TiArrowSortedDown } from 'react-icons/ti'
import { useState } from 'react'
import AdminOrderPagination from './AdminOrderPagination'

export default function AdminOrderFilter() {
    const [opened, setOpen] = useState(false)
    const toggleOpened = () => setOpen(!opened)
    return (
        <div className=" sticky top-14 z-50">
            <div className={`hidden lg:block px-4 py-2 mt-2 duration-300 backdrop-blur-xl `}>
                <div className="p-3 gap-2 bg-white items-center flex justify-between rounded-xl shadow shadow-gray-300">
                    <AdminHeaderSearch />
                    <AdminHeaderStatus />
                    <AdminHeaderDateRange />
                    <AdminHeaderSort />
                    <AdminOrderPagination />
                </div>
            </div>
            <div className="bg-white lg:hidden p-4 ">
                <div onClick={toggleOpened} className="flex w-full justify-center items-center rounded-xl shadow-md text-white font-semibold gap-1 py-3 bg-blue-500">
                    <p>FILTER</p>
                    <TiArrowSortedDown className={`duration-300 ${opened && "rotate-180"}`} />
                </div>
                <div className={`space-y-4 ${opened ? "block mt-4" : "hidden"}`}>
                    <AdminHeaderSearch />
                    <AdminHeaderStatus />
                    <AdminHeaderDateRange />
                    <AdminHeaderSort />
                </div>
            </div>
        </div>
    )
}