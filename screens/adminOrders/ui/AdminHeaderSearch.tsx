import { useOrderStore } from "@/models/orders/store";
import { SearchIcon } from "lucide-react";

export default function AdminHeaderSearch() {
  const { search, setSearch } = useOrderStore();
  return (
    <div className="h-11 xl:w-64 rounded-full shadow border-2 border-gray-200 relative">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="outline-none border-none pl-10 text-sm w-full h-full " placeholder="Search Orders..." />
      <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={20} />
    </div>
  );
}
