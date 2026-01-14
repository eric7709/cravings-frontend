"use client";

import { useMemo } from "react";
import { useOrderStore } from "@/models/orders/store";
import {
  Clock,
  CookingPot,
  CheckCircle,
  DollarSign,
  XCircle,
} from "lucide-react";
import { useCashierPage } from "../hooks/useCashierPage";

type Props = {
  close: () => void
}

export default function CashierHeaderStatusMobile({ close }: Props) {
  const { todayOrderStats, orderStatus, setOrderStatus } = useOrderStore();
  const {isOrdersPage} = useCashierPage()

  
  const data = useMemo(() => {
    if (!todayOrderStats) return [];
    return [
      {
        title: "New",
        status: "PENDING",
        count: todayOrderStats.pending,
        bg: "bg-amber-500",
        icon: Clock,
      },
      {
        title: "Preparing",
        status: "PREPARING",
        count: todayOrderStats.preparing,
        bg: "bg-blue-500",
        icon: CookingPot,
      },
      {
        title: "Done",
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

  if(!isOrdersPage) return

  return (
    <div className="xl:hidden border-b px-4 border-gray-200 bg-white">
      <div className="flex md:grid md:grid-cols-5 gap-3 py-3 overflow-x-auto scrollbar-hide">
        {data.map((el) => {
          const Icon = el.icon;
          const active = orderStatus === el.status;

          return (
            <button
              key={el.status}
              onClick={() => {

                setOrderStatus(active ? null : el.status)
                close()
              }
              }
              className={`shrink-0 min-w-22.7 px-4 py-3 rounded-2xl border
                flex items-center justify-between gap-3 transition-all
                ${active
                  ? `${el.bg} text-white border-transparent`
                  : "bg-white border-gray-300 text-gray-700"
                }`}
            >
              <div>
                <p className="text-xs font-medium opacity-80">
                  {el.title}
                </p>
                <p className="text-xl font-bold leading-none">
                  {el.count}
                </p>
              </div>

              <div
                className={`h-9 w-9 rounded-full grid place-content-center
                  ${active
                    ? "bg-white/20"
                    : `${el.bg}`
                  }`}
              >
                <Icon
                  className={`h-5 w-5 ${active ? "text-white" : "text-white"
                    }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
