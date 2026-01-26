"use client";

import { useRouter } from "next/navigation";
import { Send, ArrowLeft, ShieldCheck } from "lucide-react";
import { VscLoading } from "react-icons/vsc";
import { toast } from 'react-hot-toast';
import Backdrop from "@/shared/ui/Backdrop";
import { useBook } from "../store/useBook";
import { useCreateOrder } from "@/models/orders/hooks";
import { useMenuItemStore } from "@/models/menuItems/store";

export function ConfirmOrderModal() {
  const { menuItems } = useMenuItemStore()
  const { mutate, isPending } = useCreateOrder();
  const {
    items, table, customer, activeModal,
    openCreateCustomerModal, resetItems, openOrderSuccessModal, openCartModal
    , closeModal, openUnavailableErrorModal
  } = useBook();

  const onConfirm = () => {
    const unavailableIDs = menuItems.filter(el => el.status == "UNAVAILABLE").map(el => el.id)
    if (items.some(el => unavailableIDs.includes(el.menuItemId))) {
      openUnavailableErrorModal()
      return
    }
    if (!customer) {
      openCreateCustomerModal()
      return
    }
    if (!table) {
      toast.error("Something went wrong ")
      return
    }
    mutate({
      cashierId: table?.cashierId,
      customerId: customer?.id,
      customerName: customer?.name,
      customerPhoneNumber: customer?.phoneNumber ?? '',
      customerTitle: customer?.title,
      items: items,
      orderStatus: "PENDING",
      paymentStatus: "PENDING",
      tableId: table?.id,
      waiterId: table?.waiterId,
    }, {
      onSuccess: () => {
        resetItems()
        openOrderSuccessModal()
      }
    })
  };

  return (
    <Backdrop modalOpened={activeModal == "confirm"} closeModal={openCartModal}>
      <div className="w-[90%] max-w-xl mx-auto rounded-[28px] overflow-hidden bg-white border border-slate-100 shadow-sm">
        <div className="h-1.5 w-full bg-emerald-500" />

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center bg-emerald-50">
              <ShieldCheck size={28} className="text-emerald-600" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">
                Send for Approval
              </h2>
              <p className="mt-3 text-sm font-medium text-slate-500 leading-relaxed">
                Your order will be sent to the cashier for final verification. Once approved, it will be dispatched to the kitchen.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onConfirm}
                  disabled={isPending}
                  className="group w-full sm:w-auto px-10 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-green-100"
                >
                  {isPending ? <VscLoading className="animate-spin" size={16} /> : (
                    <>
                      Send Request
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
                <button
                  onClick={closeModal}
                  className="w-full sm:w-auto px-8 py-3.5 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-slate-600 rounded-xl transition-all flex items-center justify-center gap-2"
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