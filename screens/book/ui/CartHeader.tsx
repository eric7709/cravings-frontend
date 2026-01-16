"use client";
import { LiaTimesSolid } from "react-icons/lia";
import { Trash2 } from "lucide-react"; // Using a cleaner trash icon
import { useBook } from "../store/useBook";

export default function CartHeader() {
    const { openOrderClearModal, closeModal, getTotalQty,resetItems } = useBook();
    const hasItems = getTotalQty() > 0;

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-5 py-4 flex justify-between items-center">
            {/* 1. Clear Cart Action */}
            <button 
                onClick={resetItems}
                className={`flex items-center gap-2 transition-all duration-300 ${hasItems ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                <div className="h-8 w-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 hover:bg-rose-100 transition-colors">
                    <Trash2 size={16} />
                </div>
            </button>

            {/* 2. Center Title - matching your new text scales */}
            <div className="flex flex-col items-center">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 leading-none mb-1">
                    Review
                </p>
                <h1 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                    Your Selection
                </h1>
            </div>

            {/* 3. Close Action */}
            <button 
                onClick={closeModal}
                className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-500 transition-colors"
            >
                <LiaTimesSolid className="text-xl" />
            </button>
            
        </div>
    );
}