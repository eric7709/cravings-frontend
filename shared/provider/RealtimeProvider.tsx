"use client"
import { useOrderRealtime } from "../hooks/useOrderRealTime";
import { useMenuItemRealtime } from "../hooks/useMenuItemRealtime";
import { useCustomerOrderRealtime } from "../hooks/useCustomerRealTimeUpdate";
import { usePendingOrderBeep } from "../hooks/usePendingOrderBeep";

// In your RealTimeProvider
export default function RealTimeProvider({ children }: { children: React.ReactNode }) {
    console.log("Environment:", process.env.NEXT_PUBLIC_ENVIRONMENT);
    console.log("WS URL:", process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" 
      ? process.env.NEXT_PUBLIC_BACKEND_PRO_URL 
      : process.env.NEXT_PUBLIC_BACKEND_DEV_URL);
    
    useOrderRealtime();
    useMenuItemRealtime();
    useCustomerOrderRealtime();
    usePendingOrderBeep();
    
    return <>{children}</>;
}
