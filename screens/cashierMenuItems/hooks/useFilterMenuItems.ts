import { useCategoryStore } from "@/models/categories/store";
import { useMenuItemStore } from "@/models/menuItems/store";
import { Package, Check, X } from "lucide-react";


export const useFilterMenuItems = () => {
  const {
    selectedCategory,
    status,
    setStatus,
    search,
    menuItems: data,
    hasHydrated,
    setSelectedCategory,
  } = useMenuItemStore();
  const menuItems = data.filter((el) => {
    const categoryMatch =
      el.categoryName.toLowerCase() == selectedCategory?.name.toLowerCase() ||
      selectedCategory?.name == "all";
    const menuItemMatch =
      el.name.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
      search.trim() == "";
    const statusMatch =
      status == null ||
      (el.status && el.status.trim().toLowerCase() == status?.toLowerCase());
    return categoryMatch && menuItemMatch && statusMatch;
  });
  const { categories } = useCategoryStore();
  const newCategories = categories.map((el) => {
    return {
      name: el.name,
      id: el.id,
    };
  });
  const allCategories = [{ name: "all", id: 0 }, ...newCategories];

  const statusData = [
    {
      title: "total items",
      value: null,
      count: data.length,
      bg: "bg-blue-200",
      border: "border-blue-400",
      icon: Package
    },
    {
      title: "Unavailable",
      value: "UNAVAILABLE",
      count: data.filter((el) => el.status == "UNAVAILABLE").length,
      bg: "bg-red-200",
      border: "border-red-400",
      icon: X
    },
    {
      title: "Available",
      value: "AVAILABLE",
      count: data.filter((el) => el.status == "AVAILABLE").length,
      bg: "bg-green-200",
      border: "border-green-400",
      icon: Check

    },
  ];

 
  return {
    menuItems,
    categories: allCategories,
    statusData,
    status,
    length: menuItems.length,
    setStatus,
    hasHydrated,
    selectedCategory,
    setSelectedCategory,
  };
};
