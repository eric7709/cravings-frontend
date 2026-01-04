"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CustomerValues } from "@/models/customer/type";
import { useCustomerStore } from "@/models/customer/store";
import { useCreateCustomer, useUpdateCustomer } from "@/models/customer/hooks";

export const useCustomerForm = () => {
  const {
    activeModal,
    selectedCustomer,
    closeModal,
    addCustomer,
    updateCustomer,
  } = useCustomerStore();

  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CustomerValues>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  // Prefill on update
  useEffect(() => {
    if (activeModal === "update" && selectedCustomer) {
      reset({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phoneNumber: selectedCustomer.phoneNumber,
      });
      return;
    }

    if (activeModal === null) {
      reset();
    }
  }, [activeModal, selectedCustomer, reset]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (activeModal === "update" && selectedCustomer) {
        const updated = await updateMutation.mutateAsync({
          id: selectedCustomer.id,
          data: values,
        });
        updateCustomer(updated);
      } else {
        const created = await createMutation.mutateAsync(values);
        addCustomer(created);
      }

      reset();
      closeModal();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Something went wrong";

      setError("root", { message });
    }
  });

  return {
    register,
    errors,
    isPending: isSubmitting,
    onSubmit,
  };
};
