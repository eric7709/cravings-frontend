import { useTables } from "@/models/table/hooks";
import { useTableStore } from "@/models/table/store";
import { useEffect } from "react";

export const useSyncTables = () => {
  const { setTables } = useTableStore();
  const { data } = useTables();

  useEffect(() => {
    if (data) setTables(data);
  }, [data, setTables]);
};
