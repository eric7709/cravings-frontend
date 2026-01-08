"use client"
import { useOrderRealtime } from '@/shared/hooks/useOrderRealTime'
import OrderList from './OrderList'
import { useOrders } from '@/models/orders/hooks'
import AdminOrderHeader from './AdminOrderHeader'
import MobileHeader from './MobileHeader'

export default function Base() {
    useOrders()
    useOrderRealtime()
    return (
        <div className='flex-1  overflow-y-auto flex flex-col'>
            <AdminOrderHeader />
            <MobileHeader />
            <OrderList />
        </div>
    )
}
