"use client"
import Table from './Table'
import DeleteEmployee from './DeleteEmployee'
import { useEmployeeForm } from '../hooks/useEmployeeForm'
import { useEmployees } from '@/models/employee/hooks'
import EmployeeSummary from './EmployeeSummary'
import EmployeeFilter from './EmployeeFilter'
import EmployeeForm from './EmployeeForm'

export default function Base() {
  const { errors, register, onSubmit, isPending } = useEmployeeForm()
  useEmployees()
  return (
    <div className='flex flex-col flex-1 '>
      <EmployeeSummary />
      <EmployeeFilter />
      <EmployeeForm register={register} errors={errors} onSubmit={onSubmit} isPending={isPending} />
      <Table />
      <DeleteEmployee />
    </div>
  )
}
