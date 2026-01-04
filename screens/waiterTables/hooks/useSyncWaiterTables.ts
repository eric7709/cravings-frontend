import { useUserStore } from "@/models/auth/store";
import { useTables } from "@/models/table/hooks";
import { useTableStore } from "@/models/table/store";
import { useEffect } from "react";

export const useSyncWaiterTables = () => {
  const { user } = useUserStore();
  const { setTables } = useTableStore();
  const { data } = useTables();
  useEffect(() => {
    if (data)
      setTables(user ? data.filter((el) => el.waiterId == user.id) : []);
  }, [data, setTables]);
};
