"use client";

import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/models/auth/store";
import { useMe } from "@/models/auth/hooks";
import { useOrderStore } from "@/models/orders/store";

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const { setCashierId, setWaiterId } = useOrderStore();
  const { setUser, setLoading } = useUserStore();
  const { data, isLoading, isError } = useMe();

  useEffect(() => {
    // ---------------------------
    // Load user data
    // ---------------------------
    setLoading(isLoading);
    if (data) {
      setUser(data);
      if (data.role === "ROLE_CASHIER") setCashierId(data.id);
      if (data.role === "ROLE_WAITER") setWaiterId(data.id);
    }
    if (isError) setUser(null);
  }, [data, isError, isLoading, setUser, setLoading]);

  return <>{children}</>;
};
