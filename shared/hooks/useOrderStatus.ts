import { Order, ORDER_STATUS, PAYMENT_STATUS } from "@/models/orders/types";
import { getButtonText, statusConfig } from "../../screens/book/util/helper";
import { useUpdateOrder } from "@/models/orders/hooks";

export function useOrderStatus(order: Order) {
  const { mutate, isPending } = useUpdateOrder();
  const cancelOrder = () => {
    mutate(
      {
        id: order.id,
        payload: { orderStatus: "CANCELLED", paymentStatus: "CANCELLED" },
      },
    );
  };

  const changeStatus = async () => {
    const currentStatus = order.orderStatus;
    let orderStatus: ORDER_STATUS;
    if (currentStatus === "PENDING") orderStatus = "PREPARING";
    else if (currentStatus === "PREPARING") orderStatus = "COMPLETED";
    else if (currentStatus === "COMPLETED") orderStatus = "PAID";
    else return;
    let paymentStatus: PAYMENT_STATUS =
      currentStatus == "PENDING"
        ? "UNPAID"
        : orderStatus == "PAID"
        ? "PAID"
        : "UNPAID";
    mutate({
      id: order.id,
      payload: { paymentStatus, orderStatus },
    });
  };
  return {
    changeStatus,
    statusConfig: statusConfig(order.orderStatus),
    getButtonText: getButtonText(order.orderStatus),
    isPending,
    cancelOrder,
    status: order.orderStatus,
  };
}
