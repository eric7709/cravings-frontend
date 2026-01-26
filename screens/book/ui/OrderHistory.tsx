"use client";

import { useCustomerOrdersToday } from "@/models/orders/hooks";
import { useBook } from "../store/useBook";
import { X, Package } from "lucide-react";
import type { ORDER_STATUS } from "@/models/orders/types";
import { statusConfig } from "../util/helper";
import { formatPrice } from "@/shared/utils/formatPrice";

export default function OrderHistory() {
  const { data, isError } = useCustomerOrdersToday();
  const { activeModal, closeModal } = useBook();

  if (isError) return (
    <div className="p-10 text-center text-[9px] font-black uppercase text-rose-500 tracking-[0.2em]">
      System Error
    </div>
  );

  return (
    <div
      className={`fixed inset-0 z-100 bg-white transition-all duration-500 ease-in-out ${activeModal === "history" ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* 1. HEADER */}
      <div className="flex items-center  justify-between px-6 py-5 border-b border-slate-200">
        <div>
          <h2 className="text-[15px] font-black text-slate-900 uppercase tracking-tight">Activity</h2>
          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.3em]">Today</p>
        </div>
        <button onClick={closeModal} className="text-slate-900 active:scale-90 transition-all">
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* 2. THE FEED */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] no-scrollbar pt-4 px-4 pb-10">
        {data?.length === 0 ? (
          <div className="py-20 text-center opacity-20 text-[10px] font-black uppercase tracking-widest">No Activity</div>
        ) : (
          <div className="flex flex-col gap-3">
            {data?.map((order) => {
              const config = statusConfig(order.orderStatus as ORDER_STATUS);

              return (
                <div key={order.invoiceNumber} className="flex flex-col p-5 rounded-xl border-2 border-slate-100 bg-white">

                  {/* TOP ROW: Metadata */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                        REF #{order.invoiceNumber}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${config.dot} animate-pulse shadow-sm shadow-current/40`} />
                        <span className={`text-[11px] font-black uppercase tracking-widest ${config.text}`}>
                          {config.text}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-black text-slate-900 tracking-tighter leading-none">
                        <span className="text-emerald-600 text-[13px] mr-0.5 font-black">₦</span>
                        {formatPrice(order.total, true)}
                      </p>
                    </div>
                  </div>

                  {/* ITEM LIST: Tight and Aligned */}
                  <div className="space-y-3 pt-3 border-t border-slate-50">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-black text-green-500 tabular-nums">
                            {item.quantity}×
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-slate-800 uppercase tracking-tight leading-none">
                              {item.menuItemName}
                            </span>

                            {/* INLINE TAKEOUT TAG */}
                            {item.takeOut && (
                              <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded text-slate-400">
                                <Package size={10} />
                                <span className="text-[7px] font-black uppercase tracking-widest">Pack</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-[11px] font-bold text-slate-400 tabular-nums">
                          {formatPrice(item.price * item.quantity, true)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}