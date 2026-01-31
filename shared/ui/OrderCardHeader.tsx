'use client'

import { useUserStore } from '@/models/auth/store';
import { Order } from '@/models/orders/types';
import { formatSmartTime } from '@/shared/utils/formatSmartTime';
import { User } from 'lucide-react';
import { FaUser } from 'react-icons/fa';
import { MdTableBar } from 'react-icons/md';

type Props = {
  order: Order;
  statusConfig: Record<string, string>;
};

export default function OrderCardHeader({ order, statusConfig }: Props) {
  const { user } = useUserStore();
  const isWaiter = user?.role === "ROLE_WAITER";

  return (
    <div className="text-[12px]">
      {/* Customer & Status */}
      <div className="flex items-center gap-1 p-3 border-b border-gray-200">
        <div>
          <p className="font-semibold capitalize">{order.customerTitle} {order.customerName ?? "Unknown"}</p>
          <p className="text-[10px] text-gray-600">{formatSmartTime(order.createdAt)}</p>
          <p className="mt-0.5  text-[10px] font-medium text-gray-700">#{order.invoiceNumber}</p>
        </div>

        <p className={`ml-auto font-semibold px-3 py-1.5 rounded shadow text-[10px] bg-linear-to-tr ${statusConfig.bg} ${statusConfig.border}`}>
          {order.orderStatus}
        </p>
      </div>

      {/* Cashier (admin only) */}
      {user?.role === "ROLE_ADMIN" && (
        <p className="px-2 py-2 select-none text-[11px]">
          Cashier: <b>{order.cashierName}</b>
        </p>
      )}

      {/* Table & Waiter Info */}
      <div className={`grid gap-1  px-2 ${isWaiter ? "grid-cols-1" : "grid-cols-2"}`}>
        <div className="flex items-center justify-center gap-1.5 py-1 bg-gray-100 border border-gray-200 rounded-lg shadow text-xs font-semibold">
          <MdTableBar className="hidden md:block text-base" />
          Table {order.tableNumber ?? "N/A"}
        </div>

        {!isWaiter && (
          <div className="flex items-center justify-center gap-1.5 py-2 bg-gray-100 border border-gray-200 rounded-lg shadow text-xs font-semibold ">
            <FaUser className="hidden md:block text-xs" />
            {order.waiterName ?? "Unknown"}
          </div>
        )}
      </div>
    </div>
  );
}
