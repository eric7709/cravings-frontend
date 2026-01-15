"use client";

import Backdrop from "@/shared/ui/Backdrop";
import { useBook } from "../store/useBook";
import { useCreateOrder } from "@/models/orders/hooks";
import { useMenuItemStore } from "@/models/menuItems/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AlertCircle, Send, ArrowLeft, ShieldCheck } from "lucide-react";
import { VscLoading } from "react-icons/vsc";

export function ConfirmOrderModal() {
  const router = useRouter();
  const { mutate, isPending } = useCreateOrder();
  const { menuItems } = useMenuItemStore();

  const {
    items,
    table,
    customer,
    openCreateCustomerModal,
    resetItems,
    activeModal,
    openOrderSuccessModal,
    openCartModal,
    closeModal,
    setUnavailables,
    unavailableError,
    unavailableErrorTrue,
    unavailableErrorFalse,
  } = useBook();

  useEffect(() => {
    if (activeModal !== "confirm") return;
    const currentUnavailables = items
      .map(item => menuItems.find(el => el.id === item.menuItemId))
      .filter(menuItem => menuItem?.status === "UNAVAILABLE")
      .map(menuItem => menuItem!.id);

    if (currentUnavailables.length === 0) {
      unavailableErrorFalse();
      setUnavailables([]);
    } else {
      setUnavailables(currentUnavailables);
      unavailableErrorTrue();
    }
  }, [items, activeModal]);

  const onConfirm = () => {
    if (!customer) return openCreateCustomerModal();
    if (!table || !table.waiterId) {
      localStorage.removeItem("customer");
      router.refresh();
      return;
    }

    mutate(
      {
        customerId: customer.id,
        customerName: customer.name,
        customerPhoneNumber: customer.phoneNumber ?? "",
        customerTitle: customer.title.toLowerCase(),
        cashierId: table.cashierId,
        items,
        orderStatus: "PENDING",
        paymentStatus: "PENDING",
        tableId: table.id,
        waiterId: table.waiterId,
      },
      {
        onSuccess: () => {
          resetItems();
          unavailableErrorFalse();
          setUnavailables([]);
          openOrderSuccessModal();
        },
        onError: () => {
          localStorage.removeItem("customer");
          router.refresh();
        },
      }
    );
  };

  const close = () => (unavailableError ? openCartModal() : closeModal());

  return (
    <Backdrop modalOpened={activeModal === "confirm"} closeModal={close}>
      <div className="w-[90%] max-w-xl mx-auto rounded-[28px] overflow-hidden bg-white border border-slate-100 shadow-sm">
        
        {/* SLIM ACCENT BAR */}
        <div className={`h-1.5 w-full ${unavailableError ? "bg-rose-500" : "bg-emerald-500"}`} />

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* ICON: Scaled down to match Success Modal */}
            <div className={`shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center ${unavailableError ? "bg-rose-50" : "bg-emerald-50"}`}>
              {unavailableError ? (
                <AlertCircle size={28} className="text-rose-600" />
              ) : (
                <ShieldCheck size={28} className="text-emerald-600" />
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              {/* Title reduced to text-lg */}
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                {unavailableError ? "Action Required" : "Send for Approval"}
              </h2>
              
              {/* Body text reduced to text-sm */}
              <p className="mt-3 text-sm font-medium text-slate-500 leading-relaxed">
                {unavailableError 
                  ? "Some items in your cart are no longer available. Please update your selection to continue." 
                  : "Your order will be sent to the cashier for final verification. Once approved, it will be dispatched to the kitchen."}
              </p>

              {/* ACTION BUTTONS: text-[10px] to match Success Modal button */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={unavailableError ? openCartModal : onConfirm}
                  disabled={isPending}
                  className={`group w-full sm:w-auto px-10 py-3.5 rounded-xl text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3
                    ${unavailableError ? "bg-slate-900" : "bg-orange-500 hover:bg-orange-600"}
                  `}
                >
                  {isPending ? (
                    <VscLoading className="animate-spin" size={16} />
                  ) : (
                    <>
                      {unavailableError ? "Edit My Cart" : "Send Request"}
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                <button
                  onClick={close}
                  className="w-full sm:w-auto px-8 py-3.5 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={14} />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}