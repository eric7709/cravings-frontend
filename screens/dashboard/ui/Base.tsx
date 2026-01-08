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

export default function Base() {
  useDashboardStats()
  useDashboardOverview()
  const {hasHydrated} = useDashboardStore()


  if(!hasHydrated) return <Loader2 />

  return (
    <div>
      <Filter />
      <MenuItemForm />
      <Statistics />
      <div className="grid mt-1 p-4 gap-4 xl:grid-cols-3">
        <TopCategories />
        <TopMenuItems />
        <TopTables />
      </div>
      <RecentOrders />
    </div>
  )
}
