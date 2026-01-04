import { useEffect } from "react";
import { useCategories } from "@/models/categories/hook";
import { useCategoryStore } from "@/models/categories/store";

export const useSyncCategories = () => {
  const { data } = useCategories();
  const { setCategories } = useCategoryStore();

  useEffect(() => {
    if (data) setCategories(data);
  }, [data, setCategories]);
};
