"use client"
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/shared/lib/axios";
import { MenuItem, MenuItemPayload } from "./types";
import { useMenuItemStore } from "./store";
import { useEffect } from "react";

export const useMenuItems = () => {
  const { setMenuItems } = useMenuItemStore();
  const query = useQuery({
    queryKey: ["menu-items"],
    queryFn: async () => {
      const res = await api.get<MenuItem[]>("/menu-items");
      return res.data;
    },
  });
  useEffect(() => {
    if (query.data) {
      setMenuItems(query.data);
    }
  }, [query.data, setMenuItems]);

  return query;
};

export const useMenuItem = (id: number | string) => {
  return useQuery({
    queryKey: ["menu-item", id],
    queryFn: async () => {
      const res = await api.get<MenuItem>(`/menu-items/${id}`);
      return res.data;
    },
    enabled: !!id, // only fetch if id is provided
  });
};

export const useCreateMenuItem = () => {
  return useMutation({
    mutationFn: async (data: MenuItemPayload) => {
      const res = await api.post<MenuItem>("/menu-items", data);
      return res.data;
    },
  });
};

export const useUpdateMenuItem = () => {
  return useMutation({
    mutationFn: async ({ data, id }: { data: MenuItemPayload; id: number }) => {
      const res = await api.put<MenuItem>(`/menu-items/${id}`, data);
      return res.data;
    },
  });
};

export const useDeleteMenuItem = () => {
  return useMutation({
    mutationFn: async (id: number | string) => {
      await api.delete(`/menu-items/${id}`);
      return id;
    },
  });
};
