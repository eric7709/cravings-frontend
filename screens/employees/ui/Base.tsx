"use client"
import Header from './Header'
import Table from './Table'
import DeleteEmployee from './DeleteEmployee'
import { useEmployeeForm } from '../hooks/useEmployeeForm'
import EmployeeForm from './EmployeeForm'
import { useSyncEmployees } from '../hooks/useSyncEmployees'

export default function Base() {
  const { errors, register, onSubmit, isPending } = useEmployeeForm()
  useSyncEmployees()
  return (
    <div className='flex flex-col flex-1 overflow-y-auto'>
        <Header />
        <Table />
        <EmployeeForm register={register} errors={errors} onSubmit={onSubmit} isPending={isPending}/>
        <DeleteEmployee />
    </div>
  )
}
