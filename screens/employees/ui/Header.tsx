import CreateButton from '@/shared/ui/CreateButton'
import { useEmployeeStore } from '@/models/employee/store'
import Search from '@/shared/ui/Search'
import { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';

export default function Header() {
  const { openCreateModal, search, setSearch } = useEmployeeStore()
  const [opened, setOpened] = useState(false);

  return (
    <div className="px-4 py-3 bg-white border-b border-gray-100">
      <div className='hidden lg:flex bg-white items-center justify-between py-4 px-3 border border-gray-100 rounded-2xl shadow shadow-gray-200'>
        <Search placeholder='Search Employees...' className='w-56' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <div className="gap-3 items-center flex">
          <CreateButton onClick={openCreateModal} title='Create Employee' />
        </div>
      </div>
      <div className="lg:hidden">
        <button
          onClick={() => setOpened(!opened)}
          className="bg-blue-600 flex items-center gap-3 w-full py-3 text-white text-sm font-semibold duration-300 active:scale-95 cursor-pointer shadow-md hover:bg-blue-700 rounded-3xl justify-center"
        >
          Options <TiArrowSortedDown className={`duration-300 ${opened ? "-rotate-180" : ""}`} />
        </button>
        <div className={`space-y-3 ${opened ? "max-h-[600px] mt-3" : "max-h-0"} duration-300 overflow-hidden`}>
          <Search placeholder='Search Employees...' className='w-full' />
          <CreateButton className='w-full justify-center' onClick={openCreateModal} title='Create Employee' />
        </div>
      </div>

    </div>
  )
}
