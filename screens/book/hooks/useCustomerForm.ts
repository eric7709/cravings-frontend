import { useForm } from "react-hook-form";
import { CustomerValues } from "@/models/customer/type";
import { useCreateCustomer } from "@/models/customer/hooks";
import { useBook } from "../store/useBook";
import { storeCustomer } from "@/shared/utils/encryption";

export const useCustomerForm = () => {
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerValues>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });
  const { closeModal, setCustomer, openCartModal, openOrderConfirmationModal } = useBook();
  const { mutate, isPending } = useCreateCustomer();

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (createdCustomer) => {
        storeCustomer(createdCustomer);
        setCustomer(createdCustomer);
        reset();
        openOrderConfirmationModal();
      },
    });
  });

  return {
    register,
    handleSubmit: onSubmit,
    errors,
    isPending: isPending || isSubmitting,
  };
};
