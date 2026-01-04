"use client"
import React, { useState } from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'
import AdminHeaderSearch from './AdminHeaderSearch'
import AdminHeaderStatus from './AdminHeaderStatus'
import AdminHeaderDateRange from './AdminDateRangeHeader'
import AdminHeaderSort from './AdminHeaderSort'
import AdminHeaderPagination from './AdminHeaderPagination'

export default function MobileHeader() {
    const [opened, setOpened] = useState(false)

    return (
        <div className='lg:hidden'>
            <div className="">
                <button onClick={() => setOpened(!opened)} className='bg-blue-600  flex items-center gap-3 w-full py-3 text-white text-sm font-semibold duration-300 active:scale-95 cursor-pointer shadow-md hover:bg-blue-700 rounded-3xl justify-center '>
                    Search & FIlter <TiArrowSortedDown className={`duration-300 ${opened ? "-rotate-180" : ""}`} />
                </button>
            </div>
            <div className={` space-y-4 duration-300 ${opened ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                <AdminHeaderSearch />
                <AdminHeaderStatus />
                <AdminHeaderDateRange />
                <AdminHeaderSort />
                <AdminHeaderPagination />
            </div>
        </div>
    )
}
