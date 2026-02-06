import { useUserStore } from "@/models/auth/store";
import { ORDER_STATUS } from "@/models/orders/types";

type Props = {
  showDeleteBtn: boolean;
  status: ORDER_STATUS;
};

export const useHandleOrder = ({ showDeleteBtn, status }: Props) => {
  const { user } = useUserStore();
  const isWaiter = user?.role == "ROLE_WAITER";
  const isCashier = user?.role == "ROLE_CASHIER";
  const isAdmin = user?.role == "ROLE_ADMIN";
  const showUpdateStatusButton =
    isCashier && status != "CANCELLED" && status != "PAID";
  const showPrinterIcon =
    (isCashier || isAdmin) && status != "CANCELLED" && status != "PENDING";
  const canceButtonVisible =
    status != "CANCELLED" &&
    status != "PAID" &&
    user?.role == "ROLE_ADMIN" &&
    showDeleteBtn;
  const canceButtonVisibleForMobile =
    status != "CANCELLED" && status != "PAID" && user?.role == "ROLE_ADMIN";

  return {
    isWaiter,
    isAdmin,
    isCashier,
    canceButtonVisible,
    showPrinterIcon,
    showUpdateStatusButton,
    canceButtonVisibleForMobile,
  };
};
