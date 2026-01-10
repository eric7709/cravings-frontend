import { useMenuItemStore } from "@/models/menuItems/store";
import { useBook } from "../store/useBook";

export const useBookMenuItems = () => {
  const { menuItems: data, hasHydrated } = useMenuItemStore();
  const { category, search } = useBook();
  const normalizedSearch = search.trim().toLowerCase();
  const normalizedCategory = category.toLowerCase();
  const safeMenuItems = Array.isArray(data) ? data : [];
  const menuItems = safeMenuItems.filter((item) => {
    const matchesCategory =
      normalizedCategory === "all" ||
      item.categoryName.toLowerCase() === normalizedCategory;
    const matchesSearch =
      normalizedSearch === "" ||
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.categoryName.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });
  return {
    menuItems,
    length: menuItems.length,
    hasHydrated,
  }
};
