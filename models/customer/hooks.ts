import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/shared/lib/axios";
import { Customer, CustomerPayload } from "./type";
import { useEffect } from "react";
import { useCustomerStore } from "./store";

export const useCustomer = (id: number) => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await api.get<Customer[]>(`/customers/${id}`);
      return res.data;
    },
  });
};

export const useCustomers = () => {
  const { setCustomers, setLoading } = useCustomerStore();
  const query = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await api.get<Customer[]>("/customers");
      return res.data;
    },
  });
  useEffect(() => {
    setLoading(query.isLoading)
  }, [query.isLoading]);

  useEffect(() => {
    if (query.data) setCustomers(query.data);
  }, [query.data]);
  return query;
};

export const useCreateCustomer = () => {
  return useMutation({
    mutationFn: async (data: CustomerPayload) => {
      const res = await api.post<Customer>("/customers", data);
      return res.data;
    },
  });
};

export const useUpdateCustomer = () => {
  return useMutation({
    mutationFn: async ({ data, id }: { data: CustomerPayload; id: number }) => {
      const res = await api.put<Customer>(`/customers/${id}`, data);
      return res.data;
    },
  });
};

export const useDeleteCustomer = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/customers/${id}`);
      return id;
    },
  });
};
