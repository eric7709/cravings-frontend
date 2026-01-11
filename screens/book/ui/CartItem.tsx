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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className={`
        relative rounded-2xl p-4
        ${isUnavailable ? "bg-rose-50 border border-rose-200" : "bg-white"}
        ${current !== length - 1 ? "mb-3" : ""}
        shadow-sm hover:shadow-md transition
      `}
    >
      {/* Unavailable badge */}
      {isUnavailable && (
        <span className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
          Unavailable
        </span>
      )}

      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {menuItemName}
          </p>
          <p className="text-xs text-gray-500">{categoryName}</p>
        </div>

        <button
          onClick={() => removeFromCart(menuItemId)}
          className="rounded-full p-2 text-red-500 hover:bg-red-50 active:scale-90 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* FOOTER */}
      <div className="mt-4 flex items-center justify-between">
        {/* PRICE */}
        <p className="text-base font-bold text-gray-900">
          <span className="text-green-600 mr-1">₦</span>
          {formatPrice(price * quantity, true)}
        </p>

        <div className="flex items-center gap-3">
          {/* DINE / TAKEOUT */}
          <button
            onClick={() => toggleTakeOut(menuItemId)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition active:scale-95 ${
              takeOut
                ? "bg-emerald-500 text-white"
                : "bg-orange-500 text-white"
            }`}
          >
            {takeOut ? "Take-out" : "Dine-in"}
          </button>

          {/* QUANTITY */}
          <div className="flex items-center rounded-full border border-gray-300 bg-white shadow-inner">
            <button
              onClick={() => quantity > 1 && decreaseQty(menuItemId)}
              className="h-8 w-8 grid place-content-center text-red-500 hover:bg-gray-100 active:scale-90 transition rounded-full"
            >
              <Minus size={14} />
            </button>

            <span className="w-8 text-center text-sm font-semibold">
              {quantity}
            </span>

            <button
              onClick={() => increaseQty(menuItemId)}
              className="h-8 w-8 grid place-content-center text-green-500 hover:bg-gray-100 active:scale-90 transition rounded-full"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
