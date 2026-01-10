"use client"
import RecentOrders from "./RecentOrders";
import Statistics from "./Statistics";
import TopCategories from "./TopCategories";
import TopMenuItems from "./TopMenuItems";
import TopTables from "./TopTables";
import { useDashboardOverview, useDashboardStats } from "@/models/dashboard/hooks";
import { useDashboardStore } from "@/models/dashboard/store";
import Loader2 from "@/shared/ui/Loader2";
import Filter from "./Filter";
import MenuItemForm from "@/screens/menuItems/ui/MenuItemForm";
import Overview from "./Overview";

export default function Base() {
  useDashboardStats()
  useDashboardOverview()
  const {hasHydrated, overview} = useDashboardStore()


  if(!hasHydrated) return <Loader2 />

  return (
    <div>
      <Filter />
      <MenuItemForm />
      <Statistics />
      <Overview />
      <RecentOrders />
    </div>
  )
}
