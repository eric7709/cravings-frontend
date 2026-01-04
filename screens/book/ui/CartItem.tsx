"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Item } from "../types/types";
import { useBook } from "../store/useBook";
import { formatPrice } from "@/shared/utils/formatPrice";
import { motion } from "framer-motion";
import { useEffect } from "react";

type Props = {
  length: number;
  item: Item;
  current: number;
  index: number; 
};

export default function MiniCartItem({ length, current, item, index }: Props) {
  const { menuItemId, menuItemName, price, quantity, takeOut, categoryName } = item;
  const { toggleTakeOut, increaseQty, decreaseQty, removeFromCart, unavailables } = useBook();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      className={`p-4 shadow ${!unavailables.includes(item.menuItemId) ? "bg-white": "bg-red-200"} ${current !== length - 1 ? "border-b border-gray-300" : ""} rounded-2xl`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-gray-900">{menuItemName}</p>
          <p className="text-xs text-gray-500">{categoryName}</p>
        </div>

        <button
          onClick={() => removeFromCart(menuItemId)}
          className="p-1 text-red-500 hover:text-red-600 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-4">
        {/* PRICE */}
        <p className="text-sm font-semibold text-gray-900">
          <span className="text-green-500 mr-0.5">₦</span>
          {formatPrice(price * quantity, true)}
        </p>

        <div className="flex items-center gap-3">
          {/* DINE-IN / TAKE-OUT */}
          <button
            onClick={() => toggleTakeOut(menuItemId)}
            className={`h-9 px-4 text-xs font-semibold rounded-full border-2 transition active:scale-95 ${
              takeOut
                ? "bg-green-500 text-white border-green-600"
                : "bg-blue-500 text-white border-blue-600 "
            }`}
          >
            {takeOut ? "Take-out" : "Dine-in"}
          </button>

          {/* QUANTITY */}
          <div className="flex items-center rounded-full  bg-white">
            <button
              onClick={() => quantity > 1 && decreaseQty(menuItemId)}
              className="w-8 h-8 border-2 grid place-content-center rounded-full text-red-500 hover:bg-gray-100 active:scale-90 transition"
            >
              <Minus size={14} />
            </button>

            <span className="w-10 text-center text-sm font-semibold text-gray-800">
              {quantity}
            </span>

            <button
              onClick={() => increaseQty(menuItemId)}
              className="w-8 h-8 grid border-2 place-content-center rounded-full text-green-500 hover:bg-gray-100 active:scale-90 transition"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
