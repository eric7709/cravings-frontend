import { useOrders } from "@/models/orders/hooks";
import { useOrderStore } from "@/models/orders/store";
import { useEffect } from "react";

export const useSyncWaiterOrders = () => {
  const { setOrders } = useOrderStore();
  const { data, isLoading } = useOrders();
  useEffect(() => {
    if (data) {
      if (!data?.orders || !data.statusCounts) return;
      setOrders(
        data.orders.content,
        data.orders.totalElements,
        data.orders.totalPages,
        data.orders.number,
        data.orders.size
      );
    }
  }, [data, isLoading]);
};
