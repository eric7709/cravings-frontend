"use client";

import Backdrop from "@/shared/ui/Backdrop";
import { useBook } from "../store/useBook";
import { PartyPopper, ChevronRight, ClipboardCheck } from "lucide-react";

export function OrderSuccessModal() {
  const { activeModal, closeModal, table } = useBook();
  const waiterName = table?.waiterName?.split(" ")[0] || "Your waiter";

  return (
    <Backdrop modalOpened={activeModal === "success"} closeModal={closeModal}>
      <div className="w-[90%] max-w-xl mx-auto bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">

        {/* TOP ACCENT BAR */}
        <div className="h-1.5 w-full bg-emerald-500" />

        <div className="p-8 md:p-10"> {/* Slightly reduced padding */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            {/* ICON AREA */}
            <div className="shrink-0 relative">
              <div className="h-16 w-16 rounded-2xl bg-emerald-50 flex items-center justify-center rotate-3">
                <ClipboardCheck size={32} className="text-emerald-600" />
              </div>
              <div className="absolute -top-1.5 -right-1.5 h-7 w-7 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm">
                <PartyPopper size={14} className="text-green-500" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              {/* Title size reduced from text-xl to text-lg */}
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Order Received!
              </h2>

              <div className="mt-3 space-y-3">
                {/* Body size reduced from text-[15px] to text-sm */}
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  Your request has been sent to the <span className="text-slate-900 font-bold">Cashier</span> for verification.
                  Once approved, the kitchen will begin preparation immediately.
                </p>

                {/* Badge text reduced to text-[9px] */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Waiter: {waiterName}
                  </p>
                </div>
              </div>

              {/* ACTION: Kept the large padding for the button but reduced font size slightly */}
              <div className="mt-8 flex justify-center md:justify-start">
                <button
                  onClick={closeModal}
                  className="group px-10 py-3.5 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-slate-200"
                >
                  Return to Menu
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}