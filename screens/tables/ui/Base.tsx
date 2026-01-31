"use client"
import Table from './Table'
import DeleteTable from './DeleteTable'
import { useTableForm } from '../hooks/useTableForm'
import DeallocatWaiter from './DeallocatWaiter'
import TableQRCodeModal from './TableQRCodeModal'
import { useEmployees } from '@/models/employee/hooks'
import { useOrders } from '@/models/orders/hooks'
import { useTables } from '@/models/table/hooks'
import TableSummary from './TableSummary'
import TableFilter from './TableFilter'
import TableForm from './TableForm'

export default function Base() {
  const { errors, isPending, onSubmit, register } = useTableForm()
  useTables()
  useEmployees()
  useOrders()
  return (
    <div className='flex flex-col flex-1'>
      <TableSummary />
      <TableFilter />
      <Table />
      <TableQRCodeModal />
      <TableForm errors={errors} register={register} onSubmit={onSubmit} isPending={isPending} />
      <DeleteTable />
      <DeallocatWaiter />
    </div>
  )
}
