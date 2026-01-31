"use client";
import Table from './Table';
import DeleteMenuItem from './DeleteMenuItem';
import { useMenuItems } from '@/models/menuItems/hook';
import { useCategories } from '@/models/categories/hook';
import MenuItemSummary from './MenuItemsSummary';
import MenuItemFilter from './MenuItemFilter';
import MenuItemForm from './MenuItemForm';

export default function Base() {
  useCategories()
  useMenuItems()
  return (
    <div className='flex-col flex-1 flex'>
      <MenuItemSummary />
      <MenuItemFilter />
      <Table />
      <MenuItemForm />
      <DeleteMenuItem />
    </div>
  );
}
