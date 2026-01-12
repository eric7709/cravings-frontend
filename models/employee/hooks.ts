import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/lib/axios";
import { Employee, EmployeePayload } from "./types";
import { useEmployeeStore } from "./store";
import { useEffect } from "react";

export const useEmployees = () => {
  const { setEmployees, setLoading } = useEmployeeStore();
  const query = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await api.get<Employee[]>("/employees");
      return res.data;
    },
  });
  useEffect(() => {
    setLoading(query.isLoading || query.isFetching);
  }, [query.isLoading, query.isFetching, setLoading]);
  useEffect(() => {
    if (query.data) setEmployees(query.data);
  }, [query.data, query.isLoading]);

  return query.data;
};

// Create a new employee
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EmployeePayload) => {
      const res = await api.post<Employee>("/employees", data);
      return res.data;
    },
    onSuccess: (data) => {
      // Update the employees list in cache
      queryClient.setQueryData<Employee[]>(["employees"], (old = []) => [
        ...old,
        data,
      ]);
    },
  });
};

// Update an existing employee
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: EmployeePayload }) => {
      const res = await api.put<Employee>(`/employees/${id}`, data);
      return res.data;
    },
    onSuccess: (updatedEmployee) => {
      queryClient.setQueryData<Employee[]>(["employees"], (old = []) =>
        old.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        )
      );
    },
  });
};

// Delete an employee
export const useDeleteEmployee = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/employees/${id}`);
      return id;
    },
  });
};
