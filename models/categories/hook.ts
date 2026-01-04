import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/shared/lib/axios";
import { Category, CategoryPayload } from "./types";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get<Category[]>("/categories");
      return res.data;
    },
  });
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
