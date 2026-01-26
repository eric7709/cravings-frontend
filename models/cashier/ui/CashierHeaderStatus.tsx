"use client";

import { useMemo } from "react";
import { useOrderStore } from "@/models/orders/store";
import { Clock, CookingPot, CheckCircle, DollarSign, XCircle } from "lucide-react";

export default function CashierHeaderStatus() {
  const { todayOrderStats, orderStatus, setOrderStatus } = useOrderStore();

  const data = useMemo(() => {
    if (!todayOrderStats) return [];
    return [
      {
        title: "New Orders",
        status: "PENDING",
        count: todayOrderStats.pending,
        bg: "bg-amber-500",
        icon: Clock,
      },
      {
        title: "In Progress",
        status: "PREPARING",
        count: todayOrderStats.preparing,
        bg: "bg-blue-500",
        icon: CookingPot,
      },
      {
        title: "Completed",
        status: "COMPLETED",
        count: todayOrderStats.completed,
        bg: "bg-purple-500",
        icon: CheckCircle,
      },
      {
        title: "Paid",
        status: "PAID",
        count: todayOrderStats.paid,
        bg: "bg-green-500",
        icon: DollarSign,
      },
      {
        title: "Cancelled",
        status: "CANCELLED",
        count: todayOrderStats.cancelled,
        bg: "bg-red-500",
        icon: XCircle,
      },
    ];
  }, [todayOrderStats]);

  if (!todayOrderStats) return null;


  // if (!statsHydrated) return <Loader />



  return (
    <div className="z-40 hidden lg:block relative border-b bg-white/10 backdrop-blur shadow border-gray-300">
      <div className="grid grid-cols-5 relative p-4 pb-3 gap-3">
        {data.map((el) => {
          const Icon = el.icon;
          return (
            <div
              key={el.title}
              onClick={() => setOrderStatus(el.status === orderStatus ? null : el.status)}
              className={`p-5 cursor-pointer rounded-2xl border overflow-hidden border-gray-300 relative shadow-md transition-colors ${orderStatus === el.status ? "text-white" : ""
                }`}
            >
              <div
                className={`duration-300 z-[-1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${orderStatus === el.status
                  ? `h-[120%] w-[120%] ${el.bg}`
                  : "h-0 w-0 rounded-full"
                  }`}
              />
              <p className="font-medium">{el.title}</p>
              <div className="flex mt-5 justify-between items-center">
                <p className="text-3xl font-bold">{el.count}</p>
                <div className={`h-10 w-10 ${el.bg} rounded-full grid place-content-center`}>
                  <Icon className={`w-5 h-5 duration-300 delay-100 text-white ${el.status == orderStatus ? "scale-150" : "scale-100"}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}