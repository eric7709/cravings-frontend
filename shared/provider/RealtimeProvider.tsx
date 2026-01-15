"use client"
import { useOrderRealtime } from "../hooks/useOrderRealTime";
import { useMenuItemRealtime } from "../hooks/useMenuItemRealtime";
import { useCustomerOrderRealtime } from "../hooks/useCustomerRealTimeUpdate";
import { usePendingOrderBeep } from "../hooks/usePendingOrderBeep";

export default function RealTimeProvider({ children }: { children: React.ReactNode }) {
    useOrderRealtime()
    useMenuItemRealtime()
    useCustomerOrderRealtime()
    usePendingOrderBeep()
    return <>{children}</>;
}
