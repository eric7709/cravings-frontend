"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/shared/utils/formatPrice";
import { useLastOrders } from "@/models/dashboard/hooks";
import { useEffect, useState } from "react";
import { Order } from "@/models/orders/types";
import Loader2 from "@/shared/ui/Loader2";
import { formatHumanTime } from "@/shared/utils/formatHumanTime";

const idColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-green-500 to-red-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-blue-600",
  "from-amber-500 to-green-600",
  "from-fuchsia-500 to-pink-600",
];

export default function RecentOrders() {
  const { data, isLoading } = useLastOrders()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (data)
      setOrders(data)
      console.log(data, "RECENT")
  }, [isLoading, orders])

  if (isLoading) return <Loader2 />

  if (!orders?.length) return null;

  return (
    <div className="p-4 pt-0">
      <div className="flex-1 border border-gray-200 overflow-y-auto p-4 bg-white shadow shadow-gray-200 rounded-2xl overflow-x-auto">
        <p className="font-semibold text-2xl xl:text-3xl mb-4">Recent Orders</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/80 border border-gray-200/60 rounded-2xl overflow-x-auto"
        >
          <table className="w-full min-w-225 border-collapse">
            <thead>
              <tr className="border-b border-gray-200/60 bg-linear-to-r from-gray-50/50 to-gray-100/30">
                <th className="p-5 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                  Customer
                </th>

                <th className="p-5 text-center text-xs font-bold uppercase tracking-widest text-gray-500">
                  Waiter
                </th>
                <th className="p-5 text-center text-xs font-bold uppercase tracking-widest text-gray-500">
                  Cashier
                </th>
                <th className="p-5 text-center text-xs font-bold uppercase tracking-widest text-gray-500">
                  Table Number
                </th>
                <th className="p-5 text-center text-xs font-bold uppercase tracking-widest text-gray-500">
                  Amount
                </th>
                <th className="p-5 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => {
                const firstLetter = order.customerName?.[0]?.toUpperCase();
                return (
                  <motion.tr
                    key={order.id || idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, type: "spring", stiffness: 120, damping: 15 }}
                    className="group border-b border-gray-100/50 hover:bg-linear-to-r hover:from-indigo-50/40 hover:via-purple-50/30 hover:to-pink-50/40"
                  >
                    {/* Customer */}
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-12 w-12 rounded-full bg-linear-to-br ${idColors[idx % idColors.length]
                            } flex items-center justify-center text-white font-bold text-base group-hover:shadow-md transition-shadow`}
                        >
                          {firstLetter}
                        </div>
                        <span className="font-bold text-gray-900 text-base tracking-tight">
                          {order.customerName}
                        </span>
                      </div>
                    </td>

                    {/* Waiter */}
                    <td className="p-4 text-center text-gray-700 font-medium">{order.waiterName}</td>

                    {/* Cashier */}
                    <td className="p-4 text-center text-gray-700 font-medium">{order.cashierName}</td>

                    {/* Table */}
                    <td className="p-4 text-center text-gray-700 font-medium">{order.tableNumber}</td>

                    {/* Amount */}
                    <td className="p-4 text-center font-bold text-gray-900">{formatPrice(order.total)}</td>
                    {/* Date */}
                    <td className="p-4 ">
                      <p className="text-sm">{formatHumanTime(order.createdAt)}</p>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
