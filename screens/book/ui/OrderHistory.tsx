import { useCustomerOrdersToday } from "@/models/orders/hooks";
import { useBook } from "../store/useBook";
import { X, Package } from "lucide-react";
import type { ORDER_STATUS } from "@/models/orders/types";
import { statusConfig } from "../util/helper";
import { formatPrice } from "@/shared/utils/formatPrice";

export default function OrderHistory() {
  const { data, isError } = useCustomerOrdersToday();
  const { activeModal, closeModal } = useBook();

  if (isError) return <p className="p-3 text-sm text-red-600">Failed to load</p>;

  return (
    <div
      className={`fixed inset-0 z-500 bg-gray-50 overflow-y-auto transition-all duration-300 ${activeModal === "history" ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-bold">Order History</h2>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Orders */}
      <div className="px-3 pt-3 space-y-3 pb-8">
        {data?.length === 0 ? (
          <p className="text-center text-gray-500 py-12 text-sm">No orders today</p>
        ) : (
          data?.map((order) => {
            const config = statusConfig(order.orderStatus as ORDER_STATUS);
            return (
              <div
                key={order.invoiceNumber}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Header */}
                <div className={`bg-linear-to-r ${config.bg} px-4 py-2`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                      <p className="font-bold text-sm">#{order.invoiceNumber}</p>
                    </div>
                    <p className="font-bold text-base">
                      ₦{order.total.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs font-medium mt-1 ml-5">{config.text}</p>
                </div>
                {/* Items */}
                <div className="p-3 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2.5"
                    >
                      <div className="flex-1 flex">
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-900">
                          <span>x{item.quantity}</span>
                          {item.takeOut && (
                            <span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                              <Package size={12} />
                              Takeout
                            </span>
                          )}
                          <p className="font-medium text-sm">{item.menuItemName}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-xs">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}