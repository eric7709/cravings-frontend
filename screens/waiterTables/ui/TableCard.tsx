'use client';

import React from 'react';
import { Users, User, Check, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Table, TABLE_STATUS } from '@/models/table/types';



type Props = { table: Table };

const statusConfig: Record<TABLE_STATUS, {
  color: string;
  bgColor: string;
  borderColor: string;
  icon: any;
  label: string;
  gradient: string;
}> = {
  AVAILABLE: {
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    icon: Check,
    label: 'Available',
    gradient: 'from-emerald-500 to-teal-500'
  },
  OCCUPIED: {
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    icon: XCircle,
    label: 'Occupied',
    gradient: 'from-rose-500 to-pink-500'
  },
  RESERVED: {
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: Clock,
    label: 'Reserved',
    gradient: 'from-amber-500 to-orange-500'
  },
  UNAVAILABLE: {
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    icon: AlertCircle,
    label: 'Unavailable',
    gradient: 'from-slate-500 to-gray-500'
  },
};

export default function TableCard({ table }: Props) {
  const { color, bgColor, borderColor, icon: StatusIcon, label, gradient } = statusConfig[table.status];

  return (
    <div className={`group relative overflow-hidden rounded-2xl border-2 ${borderColor} bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
      {/* Gradient accent bar */}
      <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

      <div className="p-5">
        {/* Header section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-3xl font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
                {table.tableNumber}
              </span>
              <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                Table
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 truncate">
              {table.tableName}
            </h3>
          </div>

          {/* Status badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${bgColor} border ${borderColor}`}>
            <StatusIcon className={`w-4 h-4 ${color}`} />
            <span className={`text-xs font-semibold ${color} uppercase tracking-wide`}>
              {label}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4" />

        {/* Info section */}
        <div className="space-y-3">
          {/* Capacity */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Capacity
              </p>
              <p className="text-sm font-bold text-slate-800">
                {table.capacity} {table.capacity === 1 ? 'seat' : 'seats'}
              </p>
            </div>
          </div>

          {/* Cashier info */}
          {table.cashierName && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Cashier
                </p>
                <p className="text-sm font-bold text-slate-800 truncate">
                  {table.cashierName}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}