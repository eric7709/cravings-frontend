"use client"
import CustomerFormModal from './CustomerFormModal'
import MenuItemList from './MenuItemList'
import OrderSuccess from './OrderSuccess'
import { useSyncMenuItems } from '@/screens/menuItems/hooks/useSyncMenuItems'
import { useSyncCategories } from '@/screens/categories/hooks/useSyncCategories'
import { useSyncTables } from '@/screens/tables/hooks/useSyncTables'
import TableWrapper from './TableWrapper'
import CartPage from './CartPage'
import { useMenuItemRealtime } from '@/shared/hooks/useMenuItemRealtime'
import { ConfirmOrderModal } from './ConfirmOrderModal'
import { OrderSuccessModal } from './OrderSuccessModal'
import Header from './Header'
import OrderHistory from './OrderHistory'
import { useCustomerOrderRealtime } from '@/shared/hooks/useCustomerRealTimeUpdate'

type Props = {
    tableId: string
}
export default function Base({ tableId }: Props) {
    useSyncMenuItems()
    useSyncCategories()
    useCustomerOrderRealtime()
    useSyncTables()
    useMenuItemRealtime()
    return (
        <TableWrapper tableId={tableId}>
            <div className='bg-gray-100 min-h-screen'>
                <Header />
                <OrderHistory />
                <OrderSuccessModal />
                <MenuItemList />
                <CartPage />
                <ConfirmOrderModal />
                <OrderSuccess />
                <CustomerFormModal />
            </div>
        </TableWrapper>
    )
}
