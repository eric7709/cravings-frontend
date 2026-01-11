import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/shared/lib/axios";
import { Category, CategoryPayload } from "./types";
import { useCategoryStore } from "./store";
import { useEffect } from "react";

export const useCategories = () => {
  const {setCategories} = useCategoryStore()
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get<Category[]>("/categories");
      return res.data;
    },
  });
            
  useEffect(() => {
    if(query.data)
      setCategories(query.data)
  }, [query.data, setCategories])
  
  return query;
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (data: CategoryPayload) => {
      const res = await api.post<Category>("/categories", data);
      return res.data;
    },
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: async ({ data, id }: { data: CategoryPayload; id: number }) => {
      const res = await api.put<Category>(`/categories/${id}`, data);
      return res.data;
    },
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/categories/${id}`);
      return id;
    },
  });
};
