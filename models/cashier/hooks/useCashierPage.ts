import { usePathname } from "next/navigation";

export const useCashierPage = () => {
  const pathname = usePathname();
  return {
    isProfilePage: pathname.startsWith("/cashier/profile"),
    isOrdersPage: pathname.startsWith("/cashier/orders"),
    isMenuItemsPage: pathname.startsWith("/cashier/menu-items"),
  };
};
