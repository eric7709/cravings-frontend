// src/hooks/useCategory.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/shared/lib/axios";
import { Table, TablePayload } from "./types";

// ==============================
// Get all categories
// ==============================
export const useTables = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await api.get<Table[]>("/tables");
      return res.data;
    },
  });
};

export const useTable = (id: number | string) => {
  return useQuery({
    queryKey: ["tables", id],
    queryFn: async () => {
      const res = await api.get<Table>(`/tables/${id}`);
      return res.data;
    },
  });
};

// ==============================
// Create Category
// ==============================
export const useCreateTable = () => {
  return useMutation({
    mutationFn: async (data: TablePayload) => {
      const res = await api.post<Table>("/tables", data);
      return res.data;
    },
  });
};

// ==============================
// Update Category
// ==============================
export const useUpdateTable = () => {
  return useMutation({
    mutationFn: async ({ data, id }: { data: TablePayload; id: number }) => {
      const res = await api.put<Table>(`/tables/${id}`, data);
      return res.data;
    },
  });
};

// ==============================
// Delete Category
// ==============================
export const useDeleteTable = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/tables/${id}`);
      return id;
    },
  });
};
