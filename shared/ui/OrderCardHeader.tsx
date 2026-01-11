import { useUserStore } from '@/models/auth/store'
import { Order } from '@/models/orders/types'
import { formatSmartTime } from '@/shared/utils/formatSmartTime'
import { User } from 'lucide-react'
import { MdTableBar } from 'react-icons/md'

type Props = {
    order: Order
    statusConfig: Record<string, string>
}

export default function OrderCardHeader({ order, statusConfig }: Props) {
    const { user } = useUserStore()
    const isWaiter = user?.role == "ROLE_WAITER"
    return (
        <div className=''>
            <div className="flex py-3 px-3 sm:py-4 sm:px-4 border-b border-gray-200 items-center gap-2 sm:gap-3">
                <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-base capitalize">{order.customerTitle} {order.customerName ?? "Unknown"}</p>
                    <p className="text-[11px]">{formatSmartTime(order.createdAt)}</p>
                    <p className='text-xs text-gray-700 font-medium mt-1'>#{order.invoiceNumber}</p>
                </div>
                <p
                    className={`ml-auto capitalize font-semibold border-2 px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg shadow text-[11px] bg-linear-to-tr ${statusConfig.bg} ${statusConfig.border}`}
                >
                    {order.orderStatus}
                </p>
            </div>
            <div className={`grid mt-2 sm:mt-3 px-3 sm:px-4 ${isWaiter ? "grid-cols-1" : "grid-cols-2"} relative gap-2 text-xs sm:text-xs`}>
                <div
                    className={`flex text-base gap-1 sm:gap-2 py-2 sm:py-3 justify-center items-center bg-gray-100 border-2 ${statusConfig.border} rounded-xl shadow`}
                >
                    <MdTableBar className='md:block hidden' />
                    <p className="font-semibold text-[13px]">Table {order.tableNumber ?? "N/A"}</p>
                </div>
                {!isWaiter && <div
                    className={`flex gap-1 sm:gap-2 py-2 sm:py-3 justify-center items-center bg-gray-100 border-2 ${statusConfig.border} rounded-xl shadow`}
                >
                    <User size={16} className='md:block hidden' />
                    <p className="font-semibold text-[13px]">{order.waiterName ?? "Unknown"}</p>
                </div>
                }
            </div>
        </div>
    )
}
