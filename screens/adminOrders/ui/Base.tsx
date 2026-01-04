"use client"
import { useOrderRealtime } from '@/shared/hooks/useOrderRealTime'
import Header from './Header'
import OrderList from './OrderList'
import { useOrders } from '@/models/orders/hooks'

export default function Base() {
    useOrders()
    useOrderRealtime()
    return (
        <div className=' flex-1  overflow-y-auto flex flex-col'>
            <Header />
            <OrderList />
        </div>
    )
}
