import { useCustomers } from "@/models/customer/hooks";
import { useCustomerStore } from "@/models/customer/store";
import { useEffect } from "react";

export const useSyncCustomers = () => {
  const { data } = useCustomers();
  const { setCustomers } = useCustomerStore();

  useEffect(() => {
    if (data) setCustomers(data);
    console.log(data)
  }, [setCustomers, data]);
};
