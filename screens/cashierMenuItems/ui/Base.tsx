"use client"
import { useMenuItems } from "@/models/menuItems/hook";
import MenuItemList from "./MenuItemList";
import { useCategories } from "@/models/categories/hook";
import MenuItemFilter from "./MenuItemFilter";

export default function Base() {
  useMenuItems()
  useCategories()
  return (
    <div className="flex-1 flex xl:overflow-y-auto flex-col">
      <MenuItemFilter />
      <MenuItemList />
    </div>
  )
}
