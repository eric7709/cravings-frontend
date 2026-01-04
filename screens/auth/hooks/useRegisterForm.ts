"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "@/models/auth/hooks";
import { ROLE } from "@/models/auth/types";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/models/auth/store";

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
};

export const useRegisterForm = () => {
  const router = useRouter();
  const registerMutation = useRegister();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await registerMutation.mutateAsync(values);

      setUser(response.data.user);
      if (response.data.user.role === "ROLE_ADMIN") {
        router.push("/admin");
      }
      if (response.data.user.role === "ROLE_WAITER") {
        router.push("/waiter/orders");
      }
      if (response.data.user.role === "ROLE_CASHIER") {
        router.push("/cashier/orders");
      }
      // Reset form on success
      setIsRedirecting(true);
      reset();
    } catch (err: any) {
      const message = err?.response?.data;
      if (message === "Phone number already exists") {
        setError("phoneNumber", { message });
      } else if (message === "Email already exists") {
        setError("email", { message });
      } else {
        setError("root", { message: err?.message ?? "Sign up failed" });
      }
    }
  });

  return {
    register,
    errors,
    isPending: isSubmitting,
    isSuccess: isSubmitSuccessful,
    isRedirecting,
    onSubmit,
  };
};
