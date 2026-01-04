import { useOrderStore } from '@/models/orders/store'
import AdjustSearch from '@/shared/ui/AdjustSearch'
import OrderCard from '@/shared/ui/OrderCard'

export default function OrderList() {
    const { orders } = useOrderStore()
    const newOrders = orders.filter(el => el.orderStatus != "CANCELLED")
    if (orders.length === 0) return <AdjustSearch title="Orders" />
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 gap-4'>
            {newOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    )
}
