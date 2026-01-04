"use client"
import { useOrderRealtime } from '@/shared/hooks/useOrderRealTime'
import OrderList from './OrderList'
import { useOrders } from '@/models/orders/hooks'

export default function Base() {
    useOrders()
    useOrderRealtime()
    return <OrderList />
}
