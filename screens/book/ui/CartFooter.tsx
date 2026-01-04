import { useBook } from '../store/useBook'
import { BsCart3 } from "react-icons/bs";
import { formatPrice } from '@/shared/utils/formatPrice'

export default function CartFooter() {
    const { table, customer, openCreateCustomerModal, openOrderConfirmationModal, getTotal, getTotalQty, unavailableError } = useBook()
    const book = () => {
        if (!customer) {
            openCreateCustomerModal()
            return
        }
        if (table && table.waiterId)
            openOrderConfirmationModal()
    }
    return (
        <div className={`flex fixed bottom-0 left-0 w-full py-3 bg-white/0 border-t border-gray-200 duration-300 backdrop-blur items-center gap-5 justify-between px-4 ${getTotal() > 0 ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div className="flex gap-4 items-center">
                <div className="relative w-fit">
                    <BsCart3 className='text-2xl' />
                    <div className="h-4 w-4 absolute -top-1 -right-2 grid place-content-center rounded-full bg-orange-500 text-white text-xs">
                        <p>{getTotalQty()}</p>
                    </div>
                </div>
                <div className="leading-none">
                    <p className='text-[11px] font-medium'>TOTAL AMOUNT </p>
                    <p className='text-lg font-bold'>{formatPrice(getTotal()) ?? "3,400"}</p>
                </div>
            </div>
            <button className={`px-6 py-3 font-semibold  text-sm text-white rounded-full  cursor-pointer duration-300  ${unavailableError ? "bg-gray-300" : "shadow-md active:scale-90 bg-rose-600 hover:bg-blue-700 shadow-gray-400"}`} onClick={book} disabled={unavailableError}>Check out</button>
        </div>
    )
}
