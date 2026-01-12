"use client";
import Header from './Header';
import Table from './Table';
import Pagination from './Pagination';
import { useCategoryForm } from '../hooks/useCategoryForm';
import CategoryForm from './CategoryForm';
import DeleteModal from './DeleteCategory';
import { useCategories } from '@/models/categories/hook';

export default function Base() {
  const { onSubmit, isPending, errors, register } = useCategoryForm();
  useCategories()
  return (
    <div className='flex-1 overflow-y-auto flex flex-col'>
      <Header />
      <Table />
      <CategoryForm
        isPending={isPending}
        errors={errors}
        register={register}
        onSubmit={onSubmit}
      />
      <DeleteModal />
      <Pagination />
    </div>
  );
}
