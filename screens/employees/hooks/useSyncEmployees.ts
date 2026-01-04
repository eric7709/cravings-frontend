import { useEmployees } from "@/models/employee/hooks";
import { useEmployeeStore } from "@/models/employee/store";
import { useEffect } from "react";

export const useSyncEmployees = () => {
  const { data } = useEmployees();
  const { setEmployees } = useEmployeeStore();

  useEffect(() => {
    if (data) setEmployees(data);
  }, [setEmployees, data]);
};
