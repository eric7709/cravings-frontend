"use client";

import Backdrop from "@/shared/ui/Backdrop";
import { useBook } from "../store/useBook";
import { CheckCircle } from "lucide-react";

export function OrderSuccessModal() {
  const { activeModal, closeModal, table } = useBook();
  const waiterName = table?.waiterName?.split(" ")[0];

  return (
    <Backdrop modalOpened={activeModal === "success"} closeModal={closeModal}>
      <div className="w-[95%] max-w-sm mx-auto bg-white rounded-3xl p-7 shadow-xl text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
            <CheckCircle size={36} className="text-orange-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900">
          Order Placed Successfully 🎉
        </h2>

        {/* Message */}
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          Your order has been sent to the kitchen and is being prepared.
        </p>

        <p className="mt-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{waiterName}</span>{" "}
          will be with you shortly to serve your order 🍽️
        </p>

        {/* Button */}
        <button
          onClick={closeModal}
          className="mt-6 w-full py-3 rounded-full bg-orange-600 text-white font-semibold
                     hover:bg-orange-700 active:scale-95 transition-all duration-200"
        >
          Thank you
        </button>
      </div>
    </Backdrop>
  );
}
