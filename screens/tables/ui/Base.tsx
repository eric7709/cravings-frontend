"use client"
import Header from './Header'
import Table from './Table'
import DeleteTable from './DeleteTable'
import TableForm from './TableForm'
import { useTableForm } from '../hooks/useTableForm'
import DeallocatWaiter from './DeallocatWaiter'
import TableQRCodeModal from './TableQRCodeModal'
import { useEmployees } from '@/models/employee/hooks'
import { useOrders } from '@/models/orders/hooks'
import { useTables } from '@/models/table/hooks'

export default function Base() {
  const { errors, isPending, onSubmit, register } = useTableForm()
  useTables()
  useEmployees()
  useOrders()
  return (
    <div className='flex flex-col flex-1 overflow-y-auto'>
      <Header />
      <Table />
      <TableQRCodeModal />
      <TableForm errors={errors} register={register} onSubmit={onSubmit} isPending={isPending} />
      <DeleteTable />
      <DeallocatWaiter />
    </div>
  )
}
