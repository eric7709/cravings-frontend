import { MenuItem } from '@/models/menuItems/types';
import { formatPrice } from '@/shared/utils/formatPrice';
import { useBook } from '../store/useBook';
import { Ban, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

type Props = {
    menuItem: MenuItem;
};
export default function MenuItemCard({ menuItem }: Props) {
    const { addToCart, items, removeFromCart, search } = useBook();
    const cartItem = items.find((item) => item.menuItemId === menuItem.id);
    const showAddButton = !cartItem && menuItem.status == "AVAILABLE"
    const showRemoveButton = cartItem && menuItem.status == "AVAILABLE"
    const isAvailable = menuItem.status == "UNAVAILABLE"

    const handleAddToCart = () => {
        if (menuItem.status === "AVAILABLE") {
            addToCart({
                menuItemId: menuItem.id,
                menuItemName: menuItem.name,
                quantity: 1,
                takeOut: false,
                categoryName: menuItem.categoryName,
                price: menuItem.price,
            });
        }
    }

    return (
        <div className='text-sm '>
            <div className="border bg-white border-gray-200 shadow-md rounded-2xl ">
                <div className="h-52 shrink-0 rounded-xl overflow-hidden border-gray-200 border">
                    <Image src={"/rice.jpg"} className='object-cover h-full w-full' alt="" />
                    {/* <Image src={menuItem.imageUrl} className='object-cover h-full w-full' alt="" /> */}
                </div>
                <div className="p-4 flex flex-col">
                    <p className={`font-semibold duration-500 ${menuItem.name.toLowerCase().includes(search.toLowerCase().trim()) && search.trim() ? "text-orange-600" : "text-gray-500"} text-[15px] capitalize`}>{menuItem.name}</p>
                    <p className={`italic duration-500 ${menuItem.categoryName.toLowerCase().includes(search.toLowerCase().trim()) && search.trim() ? "text-orange-600" : "text-gray-500"} text-xs  mt-1 capitalize`}>{menuItem.categoryName}</p>
                    <p className={`line-clamp-2 mt-2 ${menuItem.description.toLowerCase().includes(search.toLowerCase().trim()) && search.trim() && search.trim().length > 3 ? "text-orange-600" : "text-gray-500"} mb-3 text-gray-700`}>{menuItem.description}</p>
                    <div className="flex uppercase mt-auto relative justify-between items-center">
                        <p className='font-bold text-[18px] text-shadow-black'>{formatPrice(menuItem.price)}</p>
                        <p onClick={handleAddToCart} className={`absolute items-center gap-1 ${showAddButton ? "px-3 h-10 translate-y-0 translate-x-0 opacity-100 visible" : "px-0 h-0 -translate-y-2 opacity-0 invisible translate-x-3"} right-0 border-2 rounded-full flex text-xs border-green-600 cursor-pointer duration-300 active:scale-90 bg-green-500 text-white font-semibold shadow-md`}>
                            <Plus className='' size={20} />
                            Add Item
                        </p>
                        <p onClick={() => removeFromCart(menuItem.id)}
                            className={`absolute items-center gap-1.5 right-0 border-2 flex ${showRemoveButton ? "px-3 h-10 translate-y-0 opacity-100 visible translate-x-0" : "px-0 h-0 translate-y-2 opacity-0 invisible"} rounded-full text-xs shadow-md border-red-600 cursor-pointer font-semibold duration-300 active:scale-90 bg-red-500 text-white -translate-x-10`}>
                            <Trash2 size={18} />
                            Remove Item
                        </p>
                        <p className={`absolute flex items-center gap-1 right-0 border-2  ${isAvailable ? "px-3 h-10 translate-y-0 opacity-100 visible" : "px-0 h-0 translate-y-2 opacity-0 invisible"} rounded-full text-xs border-gray-300  font-semibold  duration-300  bg-gray-200 text-gray-400 `}>
                            <Ban size={18} />
                            Unavailable</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

