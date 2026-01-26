"use client"
import Table from './Table'
import DeleteEmployee from './DeleteEmployee'
import { useEmployeeForm } from '../hooks/useEmployeeForm'
import EmployeeForm from './EmployeeForm'
import { useEmployees } from '@/models/employee/hooks'
import EmployeeSummary from './EmployeeSummary'
import EmployeeFilter from './EmployeeFilter'

export default function Base() {
  const { errors, register, onSubmit, isPending } = useEmployeeForm()
  useEmployees()
  return (
    <div className='flex flex-col flex-1 '>
      <EmployeeSummary />
      <EmployeeFilter />
      <Table />
      <EmployeeForm register={register} errors={errors} onSubmit={onSubmit} isPending={isPending} />
      <DeleteEmployee />
    </div>
  )
}
