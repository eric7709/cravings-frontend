"use client";

import { useDashboardStore } from "@/models/dashboard/store";
import { TrendingDown, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CARD_BGS = [
  "bg-linear-to-tl from-purple-200 to-purple-50",
  "bg-linear-to-tl from-yellow-200 to-yellow-50",
  "bg-linear-to-tl from-blue-200 to-blue-50",
  "bg-linear-to-tl from-red-200 to-red-50",
  "bg-linear-to-tl from-green-200 to-green-50",
];

const CARD_BGS2 = [
  "bg-linear-to-tr from-purple-400 to-purple-700",
  "bg-linear-to-tr from-yellow-400 to-yellow-700",
  "bg-linear-to-tr from-blue-400 to-blue-700",
  "bg-linear-to-tr from-red-400 to-red-700",
  "bg-linear-to-tr from-green-400 to-green-700",
];



export default function Statistics() {
  const { stats: data, startDate, endDate } = useDashboardStore();

  if (!data) return null;

  const dashboardStats = [
    {
      label: "Total Order",
      value: data.todaysOrders.value,
      percentage: data.todaysOrders.percentageChange,
      footer: "Total Orders Count",
    },
    {
      label: "Pending Orders",
      value: data.pendingOrders.value,
      percentage: data.pendingOrders.percentageChange,
      footer: "Awaiting approval",
    },
    {
      label: "Completed Orders",
      value: data.completedOrders.value,
      percentage: data.completedOrders.percentageChange,
      footer: "Delivered to customers",
    },
    {
      label: "Cancelled Orders",
      value: data.cancelledOrders.value,
      percentage: data.cancelledOrders.percentageChange,
      footer: "Cancelled Orders",
    },
    {
      label: "Total Revenue",
      value: data.totalRevenue.value,
      percentage: data.totalRevenue.percentageChange,
      footer: "Accumulated earning",
      isMoney: true,
    },
  ];

  return (
    <div className="grid mt-3 grid-cols-5 gap-2 px-4">
      {dashboardStats.map((item, idx) => {
        const trend = item.percentage >= 0 ? "up" : "down";
        const bgClass = CARD_BGS[idx]; // cycle backgrounds
        const bgClass2 = CARD_BGS2[idx]; // cycle backgrounds

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`p-3 rounded-2xl group  ${bgClass} shadow border hover:text-white hover:scale-105 duration-300 relative overflow-hidden border-gray-200 `}

          >
            <div className={`h-full w-full ${bgClass} absolute top-0 left-0 -z-2`} />
            <div className={`h-0 w-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full group-hover:rounded-none group-hover:w-[120%] group-hover:h-[120%] ${bgClass2} duration-300 bg-red-500 absolute top-0 left-0 -z-1`} />
            {/* Header */}
            <div className="flex items-center gap-3">
              <p className="font-semibold text-[10.5px]">{item.label}</p>
              <div
                className={`flex rounded-full font-semibold px-1.5 py-1 text-[8px] items-center gap-1 ml-auto
                ${trend === "up"
                    ? "border border-green-500 bg-green-100 text-green-600"
                    : "border border-red-500 bg-red-100 text-red-600"
                  }`}
              >
                <p>{Math.abs(item.percentage).toFixed(1)}%</p>
                {trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              </div>
            </div>

            {/* Number */}
            <AnimatePresence mode="popLayout">
              <motion.p
                key={item.value}
                className="text-xl font-bold mt-3 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {item.isMoney
                  ? `₦${Number(item.value).toLocaleString()}`
                  : item.value}
              </motion.p>
            </AnimatePresence>

            <p className="text-[10px] text-gray-600 group-hover:text-white duration-300 group-hover:font-medium">{item.footer}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
