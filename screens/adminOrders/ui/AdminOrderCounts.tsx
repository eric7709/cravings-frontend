'use client';

import { useOrderStore } from '@/models/orders/store';
import { TodayOrderStats } from '@/models/orders/types';
import { formatPrice } from '@/shared/utils/formatPrice';

type Props = { todayOrderStats: TodayOrderStats };

export default function AdminOrderCounts({ todayOrderStats }: Props) {
  const totalOrders =
    todayOrderStats.pending +
    todayOrderStats.preparing +
    todayOrderStats.completed +
    todayOrderStats.paid +
    todayOrderStats.cancelled;

  const cards = [
    {
      label: 'Revenue',
      value: formatPrice(todayOrderStats.total),
      bg: 'bg-green-100',
      border: 'border-green-300',
      text: 'text-green-700',
      icon: '💵',
    },
    {
      label: 'Total Orders',
      value: totalOrders,
      bg: 'bg-blue-100',
      border: 'border-blue-300',
      text: 'text-blue-700',
      icon: '🧾',
    },
    {
      label: 'Completed',
      value: todayOrderStats.paid,
      bg: 'bg-purple-100',
      border: 'border-purple-300',
      text: 'text-purple-700',
      icon: '✔️',
    },
    {
      label: 'Cancelled',
      value: todayOrderStats.cancelled,
      bg: 'bg-red-100',
      border: 'border-red-300',
      text: 'text-red-700',
      icon: '❌',
    },
  ];

  return (
    <div className="grid grid-cols-2 border-b border-gray-200 gap-4 p-4 xl:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`flex h-28 flex-col justify-between rounded-2xl ${c.bg} ${c.border} border-2 px-5 py-4 shadow-sm`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {c.label}
          </p>
          <div className="flex items-end justify-between">
            <p className={`text-2xl font-bold ${c.text}`}>{c.value}</p>
            <span className="text-2xl">{c.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}