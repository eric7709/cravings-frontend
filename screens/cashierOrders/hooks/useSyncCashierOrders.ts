import { useEffect } from "react";
import { useOrders } from "@/models/orders/hooks";
import { useOrderStore } from "@/models/orders/store";

export const useSyncCashierOrders = () => {
  const { setOrders, setTodayOrderStats } = useOrderStore();
  const { data } = useOrders();
  useEffect(() => {
    if (!data?.orders || !data.statusCounts) return;
    setOrders(data.orders.content, data.orders.totalElements, data.orders.totalPages, data.orders.number, data.orders.size);
    setTodayOrderStats(data.statusCounts);
  }, [data, setOrders]);
};
