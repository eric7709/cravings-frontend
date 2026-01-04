"use client";

import Backdrop from "@/shared/ui/Backdrop";
import { useBook } from "../store/useBook";
import { useCreateOrder } from "@/models/orders/hooks";
import { useMenuItemStore } from "@/models/menuItems/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function ConfirmOrderModal() {
  const router = useRouter();
  const { mutate } = useCreateOrder();
  const { menuItems } = useMenuItemStore();

  const {
    items,
    table,
    customer,
    openCreateCustomerModal,
    resetItems,
    activeModal,
    openOrderSuccessModal,
    openCartModal,
    closeModal,
    setUnavailables,
    unavailables: unavailItemsIds,
    unavailableError,
    unavailableErrorTrue,
    unavailableErrorFalse,
  } = useBook();

  let unavailables: number[] = [];

  useEffect(() => {
    items.forEach((item) => {
      const menuItem = menuItems.find((el) => el.id === item.menuItemId);
      if (menuItem?.status === "UNAVAILABLE") {
        unavailables.push(menuItem.id);
      }
    });

    if (unavailables.length === 0) {
      unavailableErrorFalse();
      setUnavailables([]);
    }
  }, [items]);

  const onConfirm = () => {
    if (!customer) {
      openCreateCustomerModal();
      return;
    }

    if (!table || !table.waiterId) {
      localStorage.removeItem("customer");
      router.refresh();
      return;
    }

    items.forEach((item) => {
      const menuItem = menuItems.find((el) => el.id === item.menuItemId);
      if (menuItem?.status === "UNAVAILABLE") {
        unavailables.push(menuItem.id);
      }
    });

    if (unavailables.length > 0) {
      setUnavailables(unavailables);
      unavailableErrorTrue();
      return;
    }

    console.log(table, "DHDHDHDHDH")
    

    mutate(
      {
        customerId: customer.id,
        customerName: customer.name,
        customerPhoneNumber: customer.phoneNumber ?? "",
        customerTitle: customer.title,
        cashierId: table.cashierId,
        items,
        orderStatus: "PENDING",
        paymentStatus: "PENDING",
        tableId: table.id,
        waiterId: table.waiterId,
      },
      {
        onSuccess: () => {
          resetItems();
          unavailableErrorFalse();
          setUnavailables([]);
          openOrderSuccessModal();
        },
        onError: () => {
          localStorage.removeItem("customer");
          router.refresh();
        },
      }
    );
  };

  const close = () => {
    unavailableError ? openCartModal() : closeModal();
  };

  return (
    <Backdrop modalOpened={activeModal === "confirm"} closeModal={close}>
      <div className="w-[92%] max-w-sm mx-auto bg-white rounded-3xl p-7 shadow-xl">
        
        {/* ---------- UNAVAILABLE STATE ---------- */}
        {unavailableError ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={30} className="text-red-600" />
              </div>
            </div>

            <h2 className="text-lg font-bold text-red-600">
              Some items are unavailable
            </h2>

            <p className="mt-2 text-sm text-gray-700">
              Please remove the
              <span className="font-semibold text-red-600">
                {" "}
                {unavailItemsIds.length === 1 ? "item" : "items"}{" "}
              </span>
              marked in red before proceeding.
            </p>

            <button
              onClick={openCartModal}
              className="mt-6 w-full py-3 rounded-full border border-red-500 text-red-600
                         font-semibold hover:bg-red-50 transition"
            >
              Review Cart
            </button>
          </div>
        ) : (
          /* ---------- CONFIRM STATE ---------- */
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 size={30} className="text-green-600" />
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-900">
              Confirm Order
            </h2>

            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
              Once confirmed, your order will be sent to the kitchen and
              preparation will begin immediately.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={openCartModal}
                className="flex-1 py-3 rounded-full border border-gray-300
                           text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 py-3 rounded-full bg-green-600 text-white
                           font-semibold hover:bg-green-700 active:scale-95 transition-all"
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </Backdrop>
  );
}
