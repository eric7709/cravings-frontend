"use client";

import { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Order } from "@/models/orders/types";
import { useUpdateTime } from "@/shared/hooks/useUpdateTime";
import OrderCardHeader from "./OrderCardHeader";
import OrderCardItems from "./OrderCardItems";
import OrderCardAction from "./OrderCardAction";
import { useOrderStatus } from "@/shared/hooks/useOrderStatus";
import Invoice from "@/shared/ui/Invoice";
import { getCurrentDateTime } from "@/screens/book/util/helper";
import { useReactToPrint } from "react-to-print";

type Props = {
  order: Order;
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1], // ✅ easeOut-style cubic bezier
    },
  },
};

export default function OrderCard({ order }: Props) {
  const {
    statusConfig,
    cancelOrder,
    isPending,
    getButtonText,
    changeStatus,
  } = useOrderStatus(order);

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: "Invoice",
  });

  useUpdateTime();

  return (
    <motion.div
      variants={cardVariants}
      onDoubleClick={() => setShowDeleteBtn((prev) => !prev)}
      className={`select-none ${showDeleteBtn ? "overflow-hidden" : "overflow-y-auto"} shrink-0 flex flex-col gap-3 rounded-3xl border-2 shadow-md text-sm bg-white/20 ${statusConfig.border}`}
      whileHover={{ scale: 1.015 }}
    >
      <OrderCardHeader order={order} statusConfig={statusConfig} />
      <OrderCardItems items={order.items} />
      <OrderCardAction
        handlePrint={handlePrint}
        getButtonText={getButtonText}
        statusConfig={statusConfig}
        setShowDeleteBtn={setShowDeleteBtn}
        cancelOrder={cancelOrder}
        changeStatus={changeStatus}
        status={order.orderStatus}
        isPending={isPending}
        showDeleteBtn={showDeleteBtn}
        total={order.total}
      />
      {/* Hidden Invoice */}
      <div style={{ display: "none" }}>
        <Invoice
          ref={invoiceRef}
          order={order}
          currentDateTime={getCurrentDateTime()}
        />
      </div>
    </motion.div>
  );
}
