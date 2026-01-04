import { useEffect } from "react";
import { useMenuItems } from "@/models/menuItems/hook";
import { useMenuItemStore } from "@/models/menuItems/store";

export const useSyncMenuItems = () => {
  const { data } = useMenuItems();
  const { setMenuItems } = useMenuItemStore();

  useEffect(() => {
    if (data) setMenuItems(data);

  }, [data, setMenuItems]);
};
