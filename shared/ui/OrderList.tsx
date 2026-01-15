"use client";

import OrderCard from "@/shared/ui/OrderCard";
import Loader from "@/shared/ui/Loader";
import { PackageSearch } from "lucide-react";
import { useOrders } from "@/models/orders/hooks";
import { useOrderStore } from "@/models/orders/store";
import { useGetRole } from "../hooks/useGetRole";

export default function OrderList() {
  const { data, } = useOrders();
  const { loading, hasHydrated } = useOrderStore()
  const role = useGetRole()
  const rawOrders = data?.orders.content;

  const grid = role=="admin" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4": "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"

  const orders =
    role === "waiter"
      ? rawOrders?.filter((o) => o.orderStatus !== "CANCELLED")
      : rawOrders;

  if (loading) return <Loader />;

  if (hasHydrated && (!orders || orders.length === 0)) {
    return (
      <div className="p-8 flex-1 flex flex-col justify-center items-center text-center text-gray-500">
        <PackageSearch className="w-16 h-16 mb-4 text-gray-400" />
        <p className="text-2xl font-semibold">No orders found</p>
        <p className="text-base mt-2">
          Try adjusting filters or date range
        </p>
      </div>
    );
  }
  if (orders && orders?.length > 0)
    return (
      <div className="flex-1 overflow-y-auto">
        <div className={`grid p-4 grid-cols-1 ${grid} gap-3`}>
          {orders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </div>
      </div>
    );
}
