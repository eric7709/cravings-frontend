"use client"
import RecentOrders from "./RecentOrders";
import Statistics from "./Statistics";
import { useDashboardOverview, useDashboardStats } from "@/models/dashboard/hooks";
import { useDashboardStore } from "@/models/dashboard/store";
import Loader2 from "@/shared/ui/Loader2";
import MenuItemForm from "@/screens/menuItems/ui/MenuItemForm";
import Overview from "./Overview";
import Header from "./Header";

export default function Base() {
  useDashboardStats()
  useDashboardOverview()
  const { hasHydrated } = useDashboardStore()

  if (!hasHydrated) return <Loader2 />

  return (
    <div>
      <Header />
      <MenuItemForm />
      <Statistics />
      <MenuItemForm />
      <Overview />
      <RecentOrders />
    </div>
  )
}
