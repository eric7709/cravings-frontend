"use client"
import Backdrop from '@/shared/ui/Backdrop'
import { useEmployeeStore } from '@/models/employee/store'
import EmployeeFormHeader from './EmployeeFormHeader'
import EmployeeFormFooter from './EmployeeFormFooter'
import EmployeeFormInputs from './EmployeeFormInputs'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { EmployeeFormValues } from '../hooks/useEmployeeForm'

type Props = {
  register: UseFormRegister<EmployeeFormValues>
  errors: FieldErrors<EmployeeFormValues>
  isPending: boolean
  onSubmit: () => Promise<void>
}

export default function EmployeeForm({ errors, onSubmit, isPending, register }: Props) {
  const { activeModal, closeModal } = useEmployeeStore()
  return (
    <Backdrop modalOpened={activeModal == "create" || activeModal == "update"} closeModal={closeModal}>
      <div className="px-4">
        <div className="w-full  lg:w-[450px] bg-white rounded-t-3xl rounded-b-2xl border border-gray-100 shadow-md">
          <EmployeeFormHeader />
          <EmployeeFormInputs register={register} errors={errors} />
          <EmployeeFormFooter onSubmit={onSubmit} isPending={isPending} />
        </div>
      </div>
    </Backdrop>
  )
}
