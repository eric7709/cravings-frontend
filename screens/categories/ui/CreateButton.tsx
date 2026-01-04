"use client"
import { useCategoryStore } from '@/models/categories/store'
import { useEmployeeStore } from '@/models/employee/store'
import { BsPlus } from 'react-icons/bs'

export default function CreateButton() {
  const { openCreateModal } = useCategoryStore()
  return (
    <button onClick={openCreateModal} className='h-12 bg-blue-500 text-white rounded-xl  cursor-pointer shadow-md flex items-center gap-1 px-3 font-semibold'>
      <BsPlus className='stroke-1 text-2xl' />
      <p className='font-semibold'>Add Category</p>
    </button>
  )
}
