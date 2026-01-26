"use client"
import CashierHeaderStatus from '@/models/cashier/ui/CashierHeaderStatus'
import CashierHeaderStatusMobile from '@/models/cashier/ui/CashierHeaderStatusMobile'
import OrderList from '@/shared/ui/OrderList'

export default function Base() {

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <CashierHeaderStatus />
            <CashierHeaderStatusMobile />
            <OrderList />
        </div>
    )
}