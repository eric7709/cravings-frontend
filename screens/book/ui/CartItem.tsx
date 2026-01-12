"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Item } from "../types/types";
import { useBook } from "../store/useBook";
import { formatPrice } from "@/shared/utils/formatPrice";
import { motion } from "framer-motion";

type Props = {
  length: number;
  item: Item;
  current: number;
  index: number;
};

export default function MiniCartItem({ length, current, item, index }: Props) {
  const {
    menuItemId,
    menuItemName,
    price,
    quantity,
    takeOut,
    categoryName,
  } = item;

  const {
    toggleTakeOut,
    increaseQty,
    decreaseQty,
    removeFromCart,
    unavailables,
  } = useBook();

  const isUnavailable = unavailables.includes(menuItemId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.98 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`
        relative flex flex-col rounded-2xl border p-4
        ${isUnavailable ? "border-rose-300 bg-rose-50" : "border-gray-200 bg-white"}
        ${current !== length - 1 ? "mb-3" : ""}
        shadow-sm hover:shadow-md transition
      `}
    >
      {/* Status Badge */}
      {isUnavailable && (
        <div className="absolute top-2 right-2 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow">
          UNAVAILABLE
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-gray-900">{menuItemName}</p>
          <p className="text-xs text-gray-500">{categoryName}</p>
        </div>
        <button
          onClick={() => removeFromCart(menuItemId)}
          className="rounded-full p-2 text-red-500 transition active:scale-90"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Price & Takeout */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-lg font-extrabold text-gray-900">
          <span className="mr-1 text-green-600">₦</span>
          {formatPrice(price * quantity, true)}
        </p>

        <button
          onClick={() => toggleTakeOut(menuItemId)}
          className={`px-3 py-2 text-xs font-semibold uppercase tracking-wide rounded-full shadow-sm transition active:scale-95 ${
            takeOut
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {takeOut ? "Take-out" : "Dine-in"}
        </button>
      </div>

      {/* Quantity Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1 shadow-inner">
          <button
            onClick={() => quantity > 1 && decreaseQty(menuItemId)}
            className="h-8 w-8 grid place-content-center rounded-full text-red-500 hover:bg-white active:scale-90 transition"
          >
            <Minus size={14} />
          </button>

          <span className="w-10 text-center text-sm font-bold text-gray-900">
            {quantity}
          </span>

          <button
            onClick={() => increaseQty(menuItemId)}
            className="h-8 w-8 grid place-content-center rounded-full text-green-500 hover:bg-white active:scale-90 transition"
          >
            <Plus size={14} />
          </button>
        </div>

        <p className="text-xs text-gray-500">
          {quantity} × ₦{formatPrice(price, true)}
        </p>
      </div>
    </motion.div>
  );
}
