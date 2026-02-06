"use client";

import Search from "@/shared/ui/Search";
import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useTableStore } from "@/models/table/store";

export default function TableFilter() {
  const { setSearch, search, openCreateModal } = useTableStore();
  const [opened, setOpen] = useState(false)
  const toggleOpened = () => setOpen(!opened)
  return (
    <div className=" sticky top-16 z-50 backdrop-blur-xl ">
      <div className={`px-4 py-2 hidden lg:block  duration-300 backdrop-blur-xl `}>
        <div className="p-2.5 flex items-center justify-between bg-white rounded-xl shadow shadow-gray-300">
          <div className="">
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="w-48 border border-gray-300 shadow text-xs pl-4 outline-none rounded-lg h-9" placeholder="Search Tables" />
          </div>
            <button onClick={openCreateModal} className="border-2 rounded-xl border-white bg-green-500 text-white font-semibold shadow-md text-xs cursor-pointer duration-300 active:scale-90 hover:bg-green-600 px-3.5 py-2.5">Add Table</button>
        </div>
      </div>
      <div className=" border-y border-gray-300 lg:hidden  p-4">
        <button onClick={toggleOpened} className="flex w-full justify-center items-center rounded-xl shadow-md text-white font-semibold gap-1 py-3 bg-blue-500">
          <p>FILTER</p>
          <TiArrowSortedDown className={`duration-300 ${opened && "rotate-180"}`} />
        </button>
        <div className={`space-y-4 ${opened ? "block mt-4" : "hidden"}`}>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} className="w-full" placeholder="Search Customers..." />
        </div>
      </div>
    </div>
  );
}
