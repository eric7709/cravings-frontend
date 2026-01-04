"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  quantity: number | undefined;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function MenuItemQuantityControl({ quantity, onIncrease, onDecrease }: Props) {
  return (
    <div className={`flex duration-300 items-center gap-3 bg-gray-100   border border-gray-200 p-1.5 rounded-full justify-between ${quantity ? "opacity-100 visible translate-x-0" : "invisible opacity-0 -translate-x-3"}`}>
      {/* Minus */}
      <button
        onClick={onDecrease}
        className="h-8 w-8 flex active:scale-90 duration-300 text-red-600 items-center justify-center bg-white rounded-full shadow font-bold hover:bg-gray-100 transition"
        disabled={quantity === 1}
      >
        <Minus strokeWidth={3}  size={15}/>
      </button>

      {/* Quantity */}
      <span className="min-w-[15px] text-center font-semibold text-gray-800">
        {quantity}
      </span>

      {/* Plus */}
      <button
        onClick={onIncrease}
        className="h-8 w-8 flex active:scale-90 duration-300 text-green-600 items-center justify-center bg-white rounded-full shadow  font-bold hover:bg-gray-100  transition"
      >
        <Plus strokeWidth={3} size={15}/>
      </button>
    </div>
  );
}
