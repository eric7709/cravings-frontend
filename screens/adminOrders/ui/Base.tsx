"use client"
import OrderList from '@/shared/ui/OrderList'
import AdminOrderFilter from './AdminOrderFilter'
import OrderSummary from './OrderSummary'

export default function Base() {
    return (
        <div className='flex-1  flex flex-col'>
            <OrderSummary />
            <AdminOrderFilter />
            <OrderList />
        </div>
    )
}