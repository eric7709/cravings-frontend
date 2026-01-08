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
    setOrders,
    setTodayOrderStats,
    stopLoading
  } = useOrderStore();

  return useQuery({
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
      if (data?.orders && data?.statusCounts) {
        setOrders(
          data.orders.content,
          data.orders.totalElements,
          data.orders.totalPages,
          data.orders.number,
          data.orders.size
        );
        setTodayOrderStats(data.statusCounts);
      }
      stopLoading()
      return data;
    },
    placeholderData: keepPreviousData, // prevents UI flicker when changing filters/pagination
  });
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
      queryClient.invalidateQueries(["orders", "customer-orders-today", "dashboardStats"] as any);
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
  const {customer} = useBook()
  return useQuery({
    queryKey: ["customer-orders-today", customer?.id],
    queryFn: async () => {
      const { data } = await api.get<CustomerOrderDTO[]>(`/orders/customer/1`);
      return data;
    },
    enabled: !!customer?.id,
  });
};