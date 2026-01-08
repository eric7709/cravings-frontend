"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEmployeeStore } from "@/models/employee/store";
import { useCreateEmployee, useUpdateEmployee } from "@/models/employee/hooks";
import { GENDER, ROLE } from "@/models/auth/types";

export type EmployeeFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: ROLE;
  gender: GENDER
};

export const useEmployeeForm = () => {
  const {
    selectedEmployee,
    activeModal,
    closeModal,
    addEmployee,
    updateEmployee,
  } = useEmployeeStore();
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: null,
      gender: ""
    },
  });

  // Prefill form when editing
  useEffect(() => {
    if (activeModal === "update" && selectedEmployee) {
      reset({
        email: selectedEmployee.email,
        firstName: selectedEmployee.firstName,
        lastName: selectedEmployee.lastName,
        phoneNumber: selectedEmployee.phoneNumber,
        gender: selectedEmployee.gender,
        role: selectedEmployee.role,
      });
    }

    if (activeModal === "create") {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        gender: "",
        role: null,
      });
    }
  }, [activeModal, selectedEmployee, reset]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (activeModal === "create") {
        const created = await createMutation.mutateAsync(values);
        addEmployee(created);
      } else if (activeModal == "update" && selectedEmployee) {
        const created = await updateMutation.mutateAsync({
          id: selectedEmployee.id,
          data: values,
        });
        updateEmployee({ ...selectedEmployee, ...values });
      }

      reset();
      closeModal();
    } catch (err: any) {
      const message = err?.response?.data || "Failed to save employee";
      if (message === "EMAIL_EXISTS") {
        setError("email", { message: "Email already exists" });
      }
      if (message === "PHONE_EXISTS") {
        setError("phoneNumber", { message: "Phone number already exists" });
      }
    }
  });

  return {
    register,
    onSubmit,
    errors,
    isPending: isSubmitting,
  };
};
