import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import api from "@/shared/lib/axios";
import {
  CustomerOrderDTO,
  Order,
  OrderPayload,
  OrdersResponse,
  UpdateOrderInput,
} from "./types";
import { useOrderStore } from "./store";
import { useBook } from "@/screens/book/store/useBook";
import { useEffect } from "react";
import { useUserStore } from "../auth/store";

export const useOrders = () => {
  const {
    sortBy,
    direction,
    orderStatus,
    waiterId,
    cashierId,
    tableId,
    search,
    minTotal,
    maxTotal,
    startDate,
    endDate,
    currentPage,
    contentPerPage,
    setTodayOrderStats,
    setLoading,
    setPaginationData,
  } = useOrderStore();
  
  const { hasHydrated, loading: userLoading } = useUserStore();

  // 1. Hook must always be called, even if data isn't ready
  const query = useQuery({
    queryKey: [
      "orders",
      {
        cashierId,
        sortBy,
        direction,
        orderStatus,
        waiterId,
        tableId,
        search,
        minTotal,
        maxTotal,
        startDate,
        endDate,
        page: currentPage,
        size: contentPerPage,
      },
    ],
    queryFn: async (): Promise<OrdersResponse> => {
      console.log("🔄 Fetching orders...");
      const { data } = await api.get<OrdersResponse>("/orders", {
        params: {
          cashierId,
          sortBy,
          direction,
          orderStatus,
          waiterId,
          tableId,
          search,
          minTotal,
          maxTotal,
          startDate,
          endDate,
          page: currentPage,
          size: contentPerPage,
        },
      });
      return data;
    },
    // 2. CRITICAL FIX: Only run this query when user details are loaded/hydrated
    enabled: hasHydrated && !userLoading, 
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  // Sync Global Loading State
  useEffect(() => {
    // We are loading if the user is loading OR the query is fetching
    setLoading(userLoading || query.isLoading);
  }, [query.isLoading, userLoading, setLoading]);

  // Sync Pagination and Stats
  useEffect(() => {
    if (query.data) {
      const { orders, statusCounts } = query.data;
      setPaginationData(
        orders.totalElements,
        orders.totalPages,
        orders.number,
        orders.size,
      );
      setTodayOrderStats(statusCounts);
    }
  }, [query.data, setPaginationData, setTodayOrderStats]);

  return query;
};
export const useOrder = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get<Order>(`/orders/${id}`);
      return data;
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: OrderPayload) => {
      const { data } = await api.post<Order>("/orders", payload);
      return data;
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({
        queryKey: ["customer-orders-today", order.customerId],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboardStats"],
      });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<Order, Error, UpdateOrderInput>({
    mutationFn: async ({ id, payload }) => {
      const { data } = await api.patch<Order>(`/orders/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "orders",
        "customer-orders-today",
        "dashboardStats",
      ] as any);
    },
  });
};

export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/orders/${id}`);
    },
  });
};

export const useCustomerOrdersToday = () => {
  const { customer } = useBook();
  return useQuery({
    queryKey: ["customer-orders-today", customer?.id],
    queryFn: async () => {
      const { data } = await api.get<CustomerOrderDTO[]>(
        `/orders/customer/${customer?.id}`,
      );
      return data;
    },
    enabled: !!customer?.id,
  });
};
