"use client";

import { useUserStore } from "@/models/auth/store";
import { useOrderStore } from "@/models/orders/store";
import OrderCard from "@/shared/ui/OrderCard";
import { PackageSearch } from "lucide-react";
import { motion } from "framer-motion";
import Loader from "@/shared/ui/Loader";
import AdjustSearch from "@/shared/ui/AdjustSearch";
import { useOrders } from "@/models/orders/hooks";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function OrderList() {
  const { orders, hasHydrated, loading } = useOrderStore();
  const { user } = useUserStore();

  
  
  if (!user) return

  if (!hasHydrated || loading) {
    return <Loader />;
  }

  if (orders.length === 0) return <AdjustSearch title="Orders" />
  
  return (
    <div
      className="grid grid-cols-1 bg-gray-100 flex-1 auto-rows-max overflow-y-auto
                 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 p-4"
    >
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
