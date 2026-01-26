"use client";

import { AlertCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import Backdrop from "@/shared/ui/Backdrop";
import { useBook } from "../store/useBook";

export function UnavailableErrorModal() {
    const { activeModal, openCartModal } = useBook();
    return (
        <Backdrop modalOpened={activeModal == "error"} closeModal={openCartModal}>
            <div className="w-[90%] max-w-xl mx-auto rounded-[28px] overflow-hidden bg-white border border-slate-100 shadow-xl">
                <div className="h-1.5 w-full bg-rose-500" />

                <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center bg-rose-50">
                            <AlertCircle size={28} className="text-rose-600" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">
                                Action Required
                            </h2>
                            <p className="mt-3 text-sm font-medium text-slate-500 leading-relaxed">
                                Some items in your cart are no longer available. Please update your selection to continue with your order.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                                <button
                                    onClick={openCartModal}
                                    className="group w-full sm:w-auto px-10 py-3.5 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3"
                                >
                                    Edit My Cart
                                    <ShoppingCart size={14} />
                                </button>
                                <button
                                    onClick={openCartModal}
                                    className="w-full sm:w-auto px-8 py-3.5 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-slate-600 transition-all flex items-center justify-center gap-2"
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