import { LuSearch } from 'react-icons/lu'
import { useBook } from '../store/useBook'

export default function HeaderSearch() {
    const { search, setSearch } = useBook()
    return (
        <div className="h-11 border shadow border-gray-200 rounded-full relative bg-gray-100 mx-4">
            <LuSearch className="absolute top-3 left-4" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="outline-none text-sm w-full h-full border-none pl-10" placeholder="Search food" />
        </div>

    )
}
