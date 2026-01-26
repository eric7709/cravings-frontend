"use client";
import { useTableStore } from "@/models/table/store";
import Loader from "@/shared/ui/Loader";
import ErrorScreen from "./ErrorScreen";
import { useBook } from "../store/useBook";
import { useEffect } from "react";

type Props = {
  tableId: string;
  children: React.ReactNode;
};

export default function TableWrapper({ tableId, children }: Props) {
  const { tables, hasHydrated } = useTableStore();
  const { setTableId } = useBook()
  const { setTable } = useBook()
  const table = tables.find(t => t.id === Number(tableId));

  useEffect(() => {
    if (table) {
      setTable(table)
      setTableId(tableId)
    }
  }, [table])

  if (!hasHydrated) return <Loader />;

  if (!table || !table.waiterId || !table.cashierId) {
    return (
      <ErrorScreen />
    );
  }

  return <>{children}</>;
}
