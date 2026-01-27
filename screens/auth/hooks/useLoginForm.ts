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
  const { setWaiterId, setCashierId } = useOrderStore();
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await loginMutation.mutateAsync(values);
    const user = response.data.user;

    setUser(user);

    // Set IDs for roles that track specific tasks
    if (user.role === "ROLE_WAITER") setWaiterId(user.id);
    if (user.role === "ROLE_CASHIER") setCashierId(user.id);

    setIsRedirecting(true);

    // 1. Create a strictly typed map for specific redirects
    const roleRedirects: Record<string, string> = {
      ROLE_ADMIN: "/admin",
      ROLE_MANAGER: "/admin", // Managers usually share the admin view
      ROLE_WAITER: "/waiter/orders",
      ROLE_CASHIER: "/cashier/orders",
      ROLE_CHEF: "/kitchen",  // Example path for chefs/cooks
      ROLE_COOK: "/kitchen",
      ROLE_BAKER: "/kitchen",
    };

    // 2. Use a fallback (default) if the role isn't in the list
    // This prevents the "Property does not exist" error
const destination = roleRedirects[user.role ?? ""] || "/";
    router.replace(destination);
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
    isPending: isSubmitting || isRedirecting, // Show loading state during redirect
    isSuccess: isSubmitSuccessful,
    onSubmit,
    isRedirecting,
  };
};