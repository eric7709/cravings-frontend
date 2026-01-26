"use client";

import { useMemo, useState } from "react";
import { useOrderStore } from "@/models/orders/store";
import {
  Clock,
  CookingPot,
  CheckCircle,
  DollarSign,
  XCircle,
} from "lucide-react";
import { useCashierPage } from "../hooks/useCashierPage";
import { TiArrowSortedDown } from "react-icons/ti";
import DatePillPicker from "./DatePillPicker";
import { getTodayISODate } from "@/shared/utils/getTodayISODate";
import { toLocalDateString } from "@/shared/utils/toLocalDateString";


export default function CashierHeaderStatusMobile() {
  const { todayOrderStats, orderStatus, setOrderStatus, setStartDate, startDate, setEndDate } = useOrderStore();
  const { isOrdersPage } = useCashierPage()

  const [opened, setOpen] = useState(false)

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

  if (!isOrdersPage) return

  return (
    <div className="xl:hidden">
      <div onClick={() => setOpen(!opened)} className="flex bg-blue-600 mx-4 mt-4 rounded-lg justify-center items-center text-white font-semibold gap-1 shadow-md py-3 ">
        <p>Filter</p>
        <TiArrowSortedDown />
      </div>
      <div className={` border-b px-4 border-gray-200 bg-white ${opened ? "h-fit" : "h-0"} overflow-hidden`}>
        <div className=" gap-3 py-3 flex flex-col overflow-x-auto scrollbar-hide">
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
                className={`shrink-0 w-full px-4 py-3 rounded-2xl border
                flex  justify-between items-center gap-3 transition-all
                ${active
                    ? `${el.bg} text-white border-transparent`
                    : "bg-white border-gray-300 text-gray-700"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <p className="text-xl font-bold leading-none">
                    {el.count}
                  </p>
                  <p className="text-xs font-medium opacity-80">
                    {el.title}
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
          <DatePillPicker
            value={startDate ?? getTodayISODate()}
            onChange={(el) => {
              setStartDate(toLocalDateString(el));
              setEndDate(toLocalDateString(el));
            }}
          />
        </div>
      </div>
    </div>
  );
}
