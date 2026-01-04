"use client";

import { useCustomer } from '@/models/customer/hooks';
import { useCustomerStore } from '@/models/customer/store';
import CreateButton from '@/shared/ui/CreateButton';
import Search from '@/shared/ui/Search';
import { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';

export default function CustomerHeader() {
  const { search, setSearch } = useCustomerStore()
  const [opened, setOpened] = useState(false);

  return (
    <div className="px-4 py-3 bg-white border-b border-gray-100">
      {/* Desktop */}
      <div className='hidden lg:flex bg-white items-center justify-between py-4 px-3 border border-gray-100 rounded-2xl shadow shadow-gray-200'>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Customers...' className='w-56' />
        <div className="gap-3 items-center flex">
          <CreateButton title='Create Customer' />
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpened(!opened)}
          className="bg-blue-600 flex items-center gap-3 w-full py-3 text-white text-sm font-semibold duration-300 active:scale-95 cursor-pointer shadow-md hover:bg-blue-700 rounded-3xl justify-center"
        >
          Options <TiArrowSortedDown className={`duration-300 ${opened ? "-rotate-180" : ""}`} />
        </button>
        <div className={`space-y-3 ${opened ? "max-h-[600px] mt-3" : "max-h-0"} duration-300 overflow-hidden`}>
          <Search placeholder='Search Customers...' className='w-full' />
          <CreateButton className='w-full justify-center' title='Create Customer' />
        </div>
      </div>
    </div>
  );
}
