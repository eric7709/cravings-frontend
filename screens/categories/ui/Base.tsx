"use client";
import Table from './Table';
import { useCategoryForm } from '../hooks/useCategoryForm';
import CategoryForm from './CategoryForm';
import DeleteModal from './DeleteCategory';
import { useCategories } from '@/models/categories/hook';
import CategorySummary from './CategorySummary';
import CategoryFilter from './CategoryFilter';

export default function Base() {
  const { onSubmit, isPending, errors, register } = useCategoryForm();
  useCategories()
  return (
    <div className=' flex flex-col relative'>
      <CategorySummary />
      <CategoryFilter />
      <Table />
      <CategoryForm
        isPending={isPending}
        errors={errors}
        register={register}
        onSubmit={onSubmit}
      />
      <DeleteModal />
    </div>
  );
}
