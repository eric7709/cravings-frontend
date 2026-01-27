"use client"
import { useOrderRealtime } from "../hooks/useOrderRealTime";
import { useMenuItemRealtime } from "../hooks/useMenuItemRealtime";
import { usePendingOrderBeep } from "../hooks/usePendingOrderBeep";

export default function RealTimeProvider({ children }: { children: React.ReactNode }) {
  useOrderRealtime();
  useMenuItemRealtime();
  usePendingOrderBeep();
  return <>{children}</>;
}
