"use client";
import Header from './Header';
import Table from './Table';
import Pagination from './Pagination';
import MenuItemForm from './MenuItemForm';
import DeleteMenuItem from './DeleteMenuItem';
import { useSyncCategories } from '@/screens/categories/hooks/useSyncCategories';
import { useSyncMenuItems } from '../hooks/useSyncMenuItems';
import { useMenuItemRealtime } from '../../../shared/hooks/useMenuItemRealtime';

export default function Base() {
  useSyncCategories()
  useSyncMenuItems()
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
