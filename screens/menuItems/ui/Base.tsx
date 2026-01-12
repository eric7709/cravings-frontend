"use client";
import Header from './Header';
import Table from './Table';
import Pagination from './Pagination';
import MenuItemForm from './MenuItemForm';
import DeleteMenuItem from './DeleteMenuItem';
import { useMenuItemRealtime } from '../../../shared/hooks/useMenuItemRealtime';
import { useMenuItems } from '@/models/menuItems/hook';
import { useCategories } from '@/models/categories/hook';

export default function Base() {
  useCategories()
  useMenuItems()
  useMenuItemRealtime()
  return (
    <div className='flex-1 overflow-y-auto flex-col flex'>
      <Header />
      <Table />
      <MenuItemForm />
      <DeleteMenuItem />
      <Pagination />
    </div>
  );
}
