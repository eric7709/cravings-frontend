import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { Filter } from "lucide-react";
import { useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useFilterMenuItems } from "../hooks/useFilterMenuItems";

export default function MenuItemCategory() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef as any, () => setOpen(false), open);
    const {categories, selectedCategory, setSelectedCategory} = useFilterMenuItems()
    
    return (
        <div className="z-40 relative w-full xl:w-fit">
            <div ref={dropdownRef} onClick={() => setOpen(!open)} className="flex cursor-pointer items-center gap-2 border-2 relative rounded-xl border-gray-200 px-4 h-12 w-full xl:w-fit shadow-md">
                <p className="capitalize font-medium text-[15px]">{selectedCategory?.name} </p>
                <TiArrowSortedDown className="ml-auto xl:ml-0"/>
                <div className={` overflow-y-auto flex flex-col text-sm w-full xl:w-52 rounded-xl border-gray-200 shadow-md right-0 border-2 origin-center bg-white absolute duration-300 ${open ? "top-[120%] translate-y-0 h-60 opacity-100 visible" : "opacity-0 invisible h-0 top-[120%] translate-y-3"}`}>
                    <div onClick={(e) => e.stopPropagation()} className="px-4 py-3 gap-2 items-center border-b border-gray-200 font-medium flex">
                        <Filter size={18}/>
                        <p>Filter by Category</p>
                    </div>
                    {categories.map((category) => (
                        <div onClick={() => setSelectedCategory(category)} className={`p-2 duration-300 cursor-pointer hover:bg-blue-100 ${selectedCategory?.id == category.id ? "bg-blue-200" : ""}`} key={category.id}>
                            <p className="capitalize">{category.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
