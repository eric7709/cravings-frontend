"use client";

import React from 'react';
import { useBook } from '../store/useBook';
import { useCustomerOrdersToday } from '@/models/orders/hooks';
import { History, ShoppingBag } from 'lucide-react';

export default function HeaderTopBar() {
    const { items, customer, openHistoryModal, openCartModal } = useBook();
    const { data } = useCustomerOrdersToday();
    
    const pendingOrders = data?.filter(el => el.orderStatus === "PENDING").length ?? 0;
    const cartEmpty = items.length === 0;

    return (
        <div className="flex px-4 py-4 items-center gap-3 bg-white">
            
            {/* 1. COMPACT AVATAR */}
            <div className="h-10 w-10 shrink-0 rounded-xl bg-orange-500 text-white flex items-center justify-center text-lg font-black shadow-sm overflow-hidden">
                {customer?.name[0] || "C"}
            </div>

            {/* 2. TYPOGRAPHY */}
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 leading-none mb-1">
                    Welcome
                </p>
                <h2 className="text-sm font-black text-slate-900 leading-none truncate">
                    Hey, {customer?.name.split(" ")[0] ?? "Friend"} 👋
                </h2>
            </div>

            {/* 3. MINIMALIST ACTION ICONS */}
            <div className="flex items-center gap-4 pr-1">
                {/* History Icon */}
                <button 
                    onClick={openHistoryModal} 
                    className="relative flex items-center justify-center text-slate-900 hover:text-orange-500 transition-colors"
                >
                    <History size={22} strokeWidth={2.2} />
                    <div className={`
                        duration-700 rounded-full bg-rose-500 absolute -top-1.5 -right-1.5 text-[9px] text-white font-black flex items-center justify-center border-2 border-white
                        ${pendingOrders === 0 ? "h-0 w-0 opacity-0 invisible" : "opacity-100 visible w-4.5 h-4.5"}
                    `}>
                        {pendingOrders}
                    </div>
                </button>

                {/* Cart Icon - No background, just the icon */}
                <button 
                    onClick={openCartModal} 
                    className="relative flex items-center justify-center text-slate-900 hover:text-orange-500 transition-colors"
                >
                    <ShoppingBag size={22} strokeWidth={2.2} />
                    <div className={`
                        duration-700 rounded-full bg-orange-500 absolute -top-1.5 -right-1.5 text-[9px] text-white font-black flex items-center justify-center border-2 border-white
                        ${cartEmpty ? "h-0 w-0 opacity-0 invisible" : "opacity-100 visible w-4.5 h-4.5"}
                    `}>
                        {items.length}
                    </div>
                </button>
            </div>
        </div>
    );
}