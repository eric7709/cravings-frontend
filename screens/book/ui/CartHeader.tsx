"use client";
import { LiaTimesSolid } from "react-icons/lia";
import { Trash2 } from "lucide-react";
import { useBook } from "../store/useBook";

export default function CartHeader() {
    const { closeModal, getTotalQty, resetItems } = useBook();
    const hasItems = getTotalQty() > 0;

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-50 px-6 py-5 flex justify-between items-center">
            
            {/* 1. CLEAR ACTION - Minimalist & Raw */}
            <div className="w-10"> {/* Fixed width container to keep title centered */}
                <button 
                    onClick={resetItems}
                    className={`group flex items-center justify-start transition-all duration-500 
                        ${hasItems ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}
                >
                    <Trash2 
                        size={19} 
                        className="text-rose-500 group-hover:text-rose-600 transition-colors" 
                        strokeWidth={2.5}
                    />
                </button>
            </div>

            {/* 2. CENTER TITLE - "Super-App" Typography */}
            <div className="flex flex-col items-center">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-1">
                    Your Cart
                </span>
                <h1 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">
                    Selections
                </h1>
            </div>

            {/* 3. CLOSE ACTION - Minimalist & Raw */}
            <div className="w-10 flex justify-end">
                <button 
                    onClick={closeModal}
                    className="text-slate-400 hover:text-slate-900 transition-colors active:scale-90"
                >
                    <LiaTimesSolid size={24} />
                </button>
            </div>
            
        </div>
    );
}