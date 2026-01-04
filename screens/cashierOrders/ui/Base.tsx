"use client"
import OrderList from './OrderList'
import CashierHeaderStatus from '@/models/cashier/ui/CashierHeaderStatus'
import { useOrderRealtime } from '@/shared/hooks/useOrderRealTime'
import { useOrders } from '@/models/orders/hooks'

export default function Base() {
    useOrders()
    useOrderRealtime()
    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <CashierHeaderStatus />
            <OrderList />
        </div>
    )
}