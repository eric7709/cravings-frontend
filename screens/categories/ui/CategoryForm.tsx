"use client"

import { useCategoryStore } from '@/models/categories/store'
import Backdrop from '@/shared/ui/Backdrop'
import React from 'react'
import CategoryFormHeader from './CategoryFormHeader'
import CategoryFormFooter from './CategoryFormFooter'
import CategoryFormInput from './CategoryFormInput'
import { FieldErrors } from 'react-hook-form'
import { CategoryValues } from '@/models/categories/types'

type Props = {
  errors: FieldErrors<CategoryValues>
  register: any
  isPending: boolean
  onSubmit: () => void
}

export default function CategoryForm({ errors, register, onSubmit, isPending }: Props) {

  const { activeModal, closeModal } = useCategoryStore()

  return (
    <Backdrop modalOpened={activeModal === "create" || activeModal === "update"} closeModal={closeModal}>
      <div className="px-4  ">
        <div className="w-full lg:w-[450px] bg-white rounded-t-3xl rounded-b-2xl border border-gray-100 shadow-md">
          <CategoryFormHeader />
          <CategoryFormInput errors={errors} register={register} />
          <CategoryFormFooter isPending={isPending} onSubmit={onSubmit} />
        </div>
      </div>
    </Backdrop>
  )
}
