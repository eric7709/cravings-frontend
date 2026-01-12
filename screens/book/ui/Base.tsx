"use client"
import CustomerFormModal from './CustomerFormModal'
import MenuItemList from './MenuItemList'
import TableWrapper from './TableWrapper'
import CartPage from './CartPage'
import { useMenuItemRealtime } from '@/shared/hooks/useMenuItemRealtime'
import { OrderSuccessModal } from './OrderSuccessModal'
import Header from './Header'
import OrderHistory from './OrderHistory'
import { useCustomerOrderRealtime } from '@/shared/hooks/useCustomerRealTimeUpdate'
import { useMenuItems } from '@/models/menuItems/hook'
import { ConfirmOrderModal } from './ConfirmOrderModal'
import { useCategories } from '@/models/categories/hook'
import { useTables } from '@/models/table/hooks'

type Props = {
    tableId: string
}
export default function Base({ tableId }: Props) {
    useMenuItems()
    useCategories()
    useCustomerOrderRealtime()
    useTables()
    useMenuItemRealtime()
    return (
        <TableWrapper tableId={tableId}>
            <div className='flex flex-col overflow-y-auto h-screen'>
                <Header />
                <MenuItemList />
                <CartPage />
                <OrderHistory />
                <OrderSuccessModal />
                <ConfirmOrderModal />
                <CustomerFormModal />
            </div>
        </TableWrapper>
    )
}
