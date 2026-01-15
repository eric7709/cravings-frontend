import { ORDER_STATUS } from '@/models/orders/types'
import { formatPrice } from '@/shared/utils/formatPrice'
import { useHandleOrder } from '../../screens/adminOrders/hooks/useHandleOrder'
import { Printer } from 'lucide-react'

type Props = {
    showDeleteBtn: boolean
    cancelOrder: () => void
    handlePrint: () => void
    isPending: boolean
    total: number
    status: ORDER_STATUS
    getButtonText: string
    statusConfig: Record<string, string>
    setShowDeleteBtn: (e: boolean) => void
    changeStatus: () => Promise<void>
}

export default function OrderCardAction({ showDeleteBtn, getButtonText, cancelOrder, setShowDeleteBtn, changeStatus, isPending, total, status, statusConfig, handlePrint }: Props) {
    const { canceButtonVisible, showPrinterIcon, showUpdateStatusButton, canceButtonVisibleForMobile } = useHandleOrder({ showDeleteBtn, status })

    return (
        <div className="mt-auto border-t border-gray-200">
            <div className="grid grid-cols-3 p-4 px-5 relative border-gray-200  items-center mt-auto">
                <p className='font-medium text-sm'>Total</p>
                <div className="flex justify-center">
                    <div onClick={handlePrint} className={`h-8 w-8 group hover:scale-105 active:scale-100 hover:border-blue-600 duration-200 ${showPrinterIcon ? "" : "hidden"} border border-gray-500 cursor-pointer grid place-content-center rounded-full`}>
                        <Printer size={18} className='group-hover:text-blue-600 duration-200' />
                    </div>
                </div>
                <p className="font-bold sm:text-base mt-auto text-[15px] text-end">
                    {formatPrice(total)}
                </p>
            </div>
            <div className={`px-4 grid duration-300 ${showUpdateStatusButton ? "mb-3 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className=" overflow-hidden">
                    <button onClick={changeStatus} className={`${statusConfig.button} text-sm bg-linear-to-r w-full shadow-md rounded-full mt-auto cursor-pointer  text-white font-semibold py-4`}>
                        {getButtonText}
                    </button>
                </div>
            </div>
            <div className={`hidden lg:grid ${canceButtonVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} duration-300`}>
                <div className={`overflow-hidden text-sm cursor-pointer duration-300 font-semibold w-full bg-white  grid grid-cols-2 gap-2 `}>
                    <button onClick={() => setShowDeleteBtn(false)} className={`bg-slate-100 p-4 border-t-2 border-r-2 cursor-pointer ${statusConfig.border}  rounded-tr-2xl`}>Close</button>
                    <button onClick={() => {
                        cancelOrder()
                        setShowDeleteBtn(false)
                    }} className={`bg-red-500   ${statusConfig.border} p-4 border-t-2 border-l-2  cursor-pointer text-white rounded-tl-2xl`}>Cancel Order</button>
                </div>
            </div>
            <div className={`lg:hidden ${canceButtonVisibleForMobile ? "grid" : "hidden"}  duration-300`}>
                <div className={`overflow-hidden grid-cols-1 grid text-sm cursor-pointer  duration-300 font-semibold w-full bg-white gap-2 `}>
                    <button onClick={() => {
                        cancelOrder()
                        setShowDeleteBtn(false)
                    }} className={`bg-gray-200  ${statusConfig.border} p-4 border-t-2  border-l-2  cursor-pointer text-red-600`}>Cancel Order</button>
                </div>
            </div>
        </div>
    )
}
