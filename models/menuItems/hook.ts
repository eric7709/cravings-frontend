"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import api from "@/shared/lib/axios";
import { MenuItem, MenuItemPayload } from "./types";
import { useMenuItemStore } from "./store";
import { useEffect } from "react";

export const useMenuItems = () => {
  const { setMenuItems, setLoading } = useMenuItemStore();
  const query = useQuery({
    queryKey: ["menuItems"],
    queryFn: async (): Promise<MenuItem[]> => {
      console.log("🔄 Fetching menu items...");
      const { data } = await api.get<MenuItem[]>("/menu-items");
      console.log("✅ Menu items fetched:", data);
      return data;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    staleTime: 0, 
  });
  useEffect(() => {
    setLoading(!query.data && query.isLoading);
  }, [query.isLoading, query.data, setLoading]);
  useEffect(() => {
    if (query.data) {
      setMenuItems(query.data);
    }
  }, [query.data, setMenuItems]);
  return query;
};

export const useMenuItem = (id: number | string) => {
  return useQuery({
    queryKey: ["menuItems", id],
    queryFn: async (): Promise<MenuItem> => {
      console.log(`🔄 Fetching menu item ${id}...`);
      const { data } = await api.get<MenuItem>(`/menu-items/${id}`);
      console.log(`✅ Menu item ${id} fetched:`, data);
      return data;
    },
    enabled: !!id, // only fetch if id is provided
  });
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: MenuItemPayload) => {
      console.log("📤 Creating menu item:", payload);
      const { data } = await api.post<MenuItem>("/menu-items", payload);
      console.log("✅ Menu item created:", data);
      return data;
    },
    onSuccess: () => {
      // Invalidate menu items list
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
    onError: (error) => {
      console.error("❌ Error creating menu item:", error);
    },
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, id }: { data: MenuItemPayload; id: number }) => {
      console.log(`📤 Updating menu item ${id}:`, data);
      const response = await api.put<MenuItem>(`/menu-items/${id}`, data);
      console.log(`✅ Menu item ${id} updated:`, response.data);
      return response.data;
    },
    onSuccess: (updatedItem) => {
      // Invalidate both the list and the specific item
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      queryClient.invalidateQueries({ queryKey: ["menuItems", updatedItem.id] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
    onError: (error) => {
      console.error("❌ Error updating menu item:", error);
    },
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      console.log(`🗑️ Deleting menu item ${id}...`);
      await api.delete(`/menu-items/${id}`);
      console.log(`✅ Menu item ${id} deleted`);
      return id;
    },
    onSuccess: (deletedId) => {
      // Invalidate the list and the specific item
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      queryClient.invalidateQueries({ queryKey: ["menuItems", deletedId] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
    onError: (error) => {
      console.error("❌ Error deleting menu item:", error);
    },
  });
};