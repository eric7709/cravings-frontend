import { useBook } from '../store/useBook'
import { BsCart3 } from "react-icons/bs";
import { formatPrice } from '@/shared/utils/formatPrice'
import { useMenuItemStore } from '@/models/menuItems/store';
import { useEffect, useState } from 'react';

export default function CartFooter() {
    const { table, customer, openCreateCustomerModal, openOrderConfirmationModal, getTotal, getTotalQty, items } = useBook()
    const { menuItems } = useMenuItemStore()
    const [isValid, setIsValid] = useState(true)
    const [singular, setSingular] = useState(true)

    const book = () => {
        if (!customer) {
            openCreateCustomerModal()
            return
        }
        if (table && table.waiterId)
            openOrderConfirmationModal()
    }


    useEffect(() => {
        const unavailableIDs = menuItems.filter(el => el.status == "UNAVAILABLE").map(el => el.id)
        if (items.some(el => unavailableIDs.includes(el.menuItemId))) {
            setIsValid(false)
            setSingular(items.filter(el => unavailableIDs.includes(el.menuItemId)).length == 1)
        } else {
            setIsValid(true)
        }
    }, [menuItems, items.length])

    return (
        <div className={`flex ${isValid ? "py-3" : "py-1.5"} w-full relative  bg-white/0 border-t border-gray-200 duration-300 backdrop-blur items-center gap-5 justify-between px-4 ${getTotal() > 0 ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            {!isValid && <div className="h-full z-30 absolute inset-0  bg-white text-red-600 grid place-content-center font-medium  ">{singular ? "The Item" : "Items"} marked red {singular ? "is" : "are"} unavailable</div>}
            <div className="flex gap-4 items-center">
                <div className="relative w-fit">
                    <BsCart3 className='text-2xl' />
                    <div className="h-4 w-4 absolute -top-1 -right-2 grid place-content-center rounded-full bg-green-500 text-white text-xs">
                        <p>{getTotalQty()}</p>
                    </div>
                </div>
                <div className="leading-none">
                    <p className='text-[11px] font-medium'>TOTAL AMOUNT </p>
                    <p className='text-lg font-bold'>{formatPrice(getTotal()) ?? "3,400"}</p>
                </div>
            </div>
            <button className={`px-6 py-3 font-semibold  text-sm text-white rounded-full border-2 cursor-pointer duration-300  ${!isValid ? "bg-gray-300" : "shadow-md active:scale-90 bg-green-500 hover:bg-green-600 shadow-gray-400"}`} onClick={book} disabled={!isValid}>Check out</button>
        </div>
    )
}
