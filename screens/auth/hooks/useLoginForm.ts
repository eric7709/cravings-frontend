"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/models/auth/hooks";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/models/auth/store";
import { useOrderStore } from "@/models/orders/store";

export type LoginFormValues = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const router = useRouter();
  const loginMutation = useLogin();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const {setWaiterId, setCashierId} = useOrderStore()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setUser } = useUserStore();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await loginMutation.mutateAsync(values);
      setUser(response.data.user);
      if (response.data.user.role === "ROLE_ADMIN") {
        router.push("/admin");
      }
      if (response.data.user.role === "ROLE_WAITER") {
        setWaiterId(response.data.user.id)
        router.push("/waiter/orders");
      }
      if (response.data.user.role === "ROLE_CASHIER") {
        setCashierId(response.data.user.id)
        router.push("/cashier/orders");
      }
      // Reset form on success
      setIsRedirecting(true);
      reset();
    } catch (err: any) {
      setError("root", {
        message: err?.response?.data?.message ?? "Login failed",
      });
    }
  });

  return {
    register,
    errors,
    isPending: isSubmitting,
    isSuccess: isSubmitSuccessful,
    onSubmit,
    isRedirecting,
  };
};
