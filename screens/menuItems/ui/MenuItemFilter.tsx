import { useMenuItemStore } from '@/models/menuItems/store';
import Search from '@/shared/ui/Search'
import Status from './Status';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useState } from 'react';

export default function MenuItemFilter() {
  const { setSearch, search, openCreateModal } = useMenuItemStore();
  const [opened, setOpen] = useState(false)
  const toggleOpened = () => setOpen(!opened)
  return (
    <div className=" sticky top-16 lg:top-22.5 z-50 backdrop-blur-xl ">
      <div className={`hidden lg:block p-4 py-3 duration-300`}>
        <div className="p-4 bg-white flex justify-between rounded-2xl shadow shadow-gray-300">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} className="w-56" placeholder="Search Employees..." />
          <div className="flex items-center gap-3">
            <Status />
            <button onClick={openCreateModal} className='border-2 bg-linear-to-br from-green-400 via-emerald-500 to-green-500 duration-300 cursor-pointer  text-white  font-semibold shadow-md px-4 py-3 rounded-2xl active:scale-90'>Create Menu-Item</button>
          </div>
        </div>
      </div>
      <div className=" border-y border-gray-300 lg:hidden  p-4">
        <button onClick={toggleOpened} className="flex w-full justify-center items-center rounded-xl shadow-md text-white font-semibold gap-1 py-3 bg-blue-500">
          <p>FILTER</p>
          <TiArrowSortedDown className={`duration-300 ${opened && "rotate-180"}`} />
        </button>
        <div className={`space-y-4 ${opened ? "block mt-4" : "hidden"}`}>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} className="w-full" placeholder="Search Employees..." />
          <button onClick={openCreateModal} className='border-2 bg-linear-to-br from-green-400 via-emerald-500 to-green-500 duration-300 cursor-pointer  text-white  font-semibold shadow-md px-4 py-3 rounded-2xl active:scale-90'>Create Menu-Item</button>
        </div>
      </div>
    </div>
  )
}
