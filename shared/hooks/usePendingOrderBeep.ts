"use client";

import { useEffect, useRef } from "react";
import { useOrderStore } from "@/models/orders/store";
import { useUserStore } from "@/models/auth/store";
import { playBeep } from "../lib/playBeep";
import { useOrders } from "@/models/orders/hooks";

export function usePendingOrderBeep() {
  const { data } = useOrders();
  const orders = data?.orders.content;
  const user = useUserStore((state) => state.user);

  const hasBeepedRef = useRef(false);

  useEffect(() => {
    if (!user) return;

    const isAllowedRole =
      user.role === "ROLE_WAITER" || user.role === "ROLE_CASHIER";

    if (!isAllowedRole) return;
    const hasRelevantPendingOrder = orders?.some((order) => {
      if (order.orderStatus !== "PENDING") return false;

      if (user.role === "ROLE_WAITER") {
        return order.waiterId === user.id;
      }
      if (user.role === "ROLE_CASHIER") {
        return order.cashierId === user.id;
      }
      return false;
    });

    if (hasRelevantPendingOrder && !hasBeepedRef.current) {
      playBeep({
        frequency: 880,
        duration: 350,
        volume: 0.25,
      });

      hasBeepedRef.current = true;
    }

    if (!hasRelevantPendingOrder) {
      hasBeepedRef.current = false;
    }
  }, [orders, user]);
}
