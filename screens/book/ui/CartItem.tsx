"use client";

import { Minus, Plus, Trash2, ShoppingBag, Utensils } from "lucide-react";
import { Item } from "../types/types";
import { useBook } from "../store/useBook";
import { formatPrice } from "@/shared/utils/formatPrice";
import { motion } from "framer-motion";
import { useMenuItemStore } from "@/models/menuItems/store";

type Props = {
  length: number;
  item: Item;
  current: number;
  index: number;
};

export default function CartItem({ length, current, item, index }: Props) {
  const { menuItemId, menuItemName, price, quantity, takeOut, categoryName } = item;
  const { menuItems } = useMenuItemStore()

  const { toggleTakeOut, increaseQty, decreaseQty, removeFromCart } = useBook();

  const isValid = menuItems.find(el => el.id == item.menuItemId)?.status == "AVAILABLE"






  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={`
        relative flex items-center gap-4 p-3 rounded-2xl border-2  transition-all
        ${!isValid ? "bg-slate-50 border-red-500 opacity-60 " : "bg-white border-green-100  shadow-sm"}
        ${current !== length - 1 ? "" : ""}
      `}
    >
      {/* 1. Leading Icon/Status */}
      <div className={`
        relative h-16 w-16 shrink-0 rounded-xl flex items-center justify-center
        ${!isValid ? "bg-slate-200" : "bg-green-50"}
      `}>
        {takeOut ? (
          <ShoppingBag size={24} className="text-green-500" />
        ) : (
          <Utensils size={24} className="text-green-500" />
        )}

        {!isValid && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-2xl">
            <div className="bg-white/90 px-1 py-0.5 rounded text-[8px] font-black text-rose-600 border border-rose-200 uppercase">Void</div>
          </div>
        )}
      </div>

      {/* 2. Info & Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="min-w-0">
            <h4 className={`truncate text-sm ${isValid ? "text-slate-800 " : "text-slate-500"} font-black uppercase tracking-tight leading-none`}>
              {menuItemName}
            </h4>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
              {categoryName}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(menuItemId)}
            className="p-1.5 text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {isValid && <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-0.5">Total</span>
            <p className="text-base font-black text-slate-900 tracking-tighter">
              <span className="text-green-500 mr-0.5">₦</span>
              {formatPrice(price * quantity, true)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Takeout Toggle - Small version */}
            <button
              onClick={() => toggleTakeOut(menuItemId)}
              className={`text-[9px] font-black px-2 py-1.5 rounded-lg border transition-all ${takeOut
                ? "bg-slate-900 border-slate-900 text-white"
                : "bg-white border-slate-200 text-slate-500"
                }`}
            >
              {takeOut ? "PACK" : "STAY"}
            </button>

            {/* Modern Stepper */}
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200/50">
              <button
                onClick={() => quantity > 1 && decreaseQty(menuItemId)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-sm text-slate-400 hover:text-rose-500 transition-all active:scale-90"
              >
                <Minus size={12} strokeWidth={3} />
              </button>
              <span className="w-7 text-center text-[11px] font-black text-slate-800">
                {quantity}
              </span>
              <button
                onClick={() => increaseQty(menuItemId)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-green-500 shadow-md shadow-green-200 text-white transition-all active:scale-90"
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
        }
      </div>
    </motion.div>
  );
}