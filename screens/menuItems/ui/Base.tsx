"use client";
import Header from './Header';
import TableHeader from './TableHeader';
import Table from './Table';
import Filter from './Filter';
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
    <div className='flex-1 flex-col flex'>
      <Header />
      <Table />
      <MenuItemForm />
      <DeleteMenuItem />
      <Pagination />
    </div>
  );
}
