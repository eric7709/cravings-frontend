import FormInput from '@/shared/ui/FormInput'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { CategoryValues } from '@/models/categories/types'
import { motion, AnimatePresence } from 'framer-motion'
import { useCategoryStore } from '@/models/categories/store'

type Props = {
  register: UseFormRegister<CategoryValues>
  errors: FieldErrors<CategoryValues>
}

export default function CategoryFormInput({ register, errors}: Props) {
  const {activeModal} = useCategoryStore()
  return (
    <div className='p-4 space-y-4'>
      <AnimatePresence mode='wait'>
        {activeModal && (
          <>
            <motion.div
              key="name-field"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0 }}
            >
              <FormInput
                label='Category Name'
                capitalize
                {...register('name', {required: "Category name is required"})}
                error={errors.name?.message as string}
              />
            </motion.div>

            <motion.div
              key="description-field"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FormInput
                textarea
                label='Description'
                {...register('description')}
                error={errors.description?.message as string}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}