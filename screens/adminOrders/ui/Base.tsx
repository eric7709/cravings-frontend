"use client"
import AdminOrderHeader from './AdminOrderHeader'
import MobileHeader from './MobileHeader'
import OrderList from '@/shared/ui/OrderList'

export default function Base() {
    return (
        <div className='flex-1  overflow-y-auto flex flex-col'>
            <AdminOrderHeader />
            <MobileHeader />
            <OrderList />
        </div>
    )
}
