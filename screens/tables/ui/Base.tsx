"use client"
import Header from './Header'
import Table from './Table'
import DeleteTable from './DeleteTable'
import TableForm from './TableForm'
import { useTableForm } from '../hooks/useTableForm'
import DeallocatWaiter from './DeallocatWaiter'
import { useSyncTables } from '@/screens/tables/hooks/useSyncTables'
import { useSyncEmployees } from '@/screens/employees/hooks/useSyncEmployees'
import TableQRCodeModal from './TableQRCodeModal'
import { useSyncAdminOrders } from '@/screens/adminOrders/hooks/useSyncAdminOrders'

export default function Base() {
  const {errors, isPending, onSubmit,register} = useTableForm()
  useSyncTables()
  useSyncEmployees()
  useSyncAdminOrders()
  return (
    <div className='flex flex-col flex-1 overflow-y-auto'>
        <Header />
        <Table />
        <TableQRCodeModal />
        <TableForm errors={errors} register={register} onSubmit={onSubmit} isPending={isPending}/>
        <DeleteTable />
        <DeallocatWaiter />
    </div>
  )
}
