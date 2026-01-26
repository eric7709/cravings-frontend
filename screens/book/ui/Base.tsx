"use client"
import CustomerFormModal from './CustomerFormModal'
import MenuItemList from './MenuItemList'
import TableWrapper from './TableWrapper'
import CartPage from './CartPage'
import { OrderSuccessModal } from './OrderSuccessModal'
import Header from './Header'
import OrderHistory from './OrderHistory'
import { useMenuItems } from '@/models/menuItems/hook'
import { ConfirmOrderModal } from './ConfirmOrderModal'
import { useCategories } from '@/models/categories/hook'
import { useTables } from '@/models/table/hooks'
import { UnavailableErrorModal } from './UnavailableErrorModal'

type Props = {
    tableId: string
}
export default function Base({ tableId }: Props) {
    useMenuItems()
    useCategories()
    useTables()
    return (
        <TableWrapper tableId={tableId}>
            <div className='flex flex-col overflow-y-auto h-dvh'>
                <Header />
                <MenuItemList />
                <CartPage />
                <OrderHistory />
                <OrderSuccessModal />
                <ConfirmOrderModal />
                <UnavailableErrorModal />
                <CustomerFormModal />
            </div>
        </TableWrapper>
    )
}
