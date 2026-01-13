"use client";

import OrderCard from "@/shared/ui/OrderCard";
import { useOrderStore } from "@/models/orders/store";
import Loader from "@/shared/ui/Loader";
import { PackageSearch } from "lucide-react";

export default function OrderList() {
  const { orders, loading, hasHydrated } = useOrderStore();

  /* -------------------- LOADING -------------------- */
  if (loading) return <Loader />;

  /* -------------------- NO ORDERS -------------------- */
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

  /* -------------------- ORDERS GRID -------------------- */
  return (
    <div className="xl:flex-1 xl:overflow-y-auto">
      <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {orders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </div>
    </div>
  );
}
