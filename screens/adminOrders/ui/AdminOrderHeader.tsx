'use client';

import { useOrderStore } from '@/models/orders/store';
import AdminHeaderCounts from './AdminHeaderCounts';
import AdminHeaderSearch from './AdminHeaderSearch';
import AdminHeaderStatus from './AdminHeaderStatus';
import AdminHeaderPagination from './AdminHeaderPagination';
import AdminHeaderDateRange from './AdminDateRangeHeader';
import AdminHeaderSort from './AdminHeaderSort';

export default function AdminOrderHeader() {
  const { todayOrderStats } = useOrderStore();

  return (
    <div className="hidden lg:flex flex-col">
      <div className="flex p-4 pb-0 flex-wrap justify-center gap-3">
        <AdminHeaderSearch />
        <AdminHeaderStatus />
        <AdminHeaderDateRange />
        <AdminHeaderSort />
        <AdminHeaderPagination />
      </div>
      <AdminHeaderCounts todayOrderStats={todayOrderStats} />
    </div>
  );
}
