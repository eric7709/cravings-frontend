"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/shared/lib/axios";
import Cookies from "js-cookie";
import {
  AuthResponse,
  ChangePasswordPayload,
  LoginValues,
  User,
} from "@/models/auth/types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginValues) =>
      api.post<AuthResponse>("/auth/login", data),
    onSuccess: (response) => {
      const { accessToken, refreshToken, user } = response.data;
      // 1. Keep localStorage for your current logic
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // 2. Set Cookies for the Middleware (Server-side)
      // 'expires: 7' means 7 days. Adjust based on your JWT expiry.
      Cookies.set("accessToken", accessToken, { expires: 7, path: '/' });
      Cookies.set("userRole", user.role as string, { expires: 7, path: '/' });
    },
  });
};


export const useMe = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data;
    },
    retry: false, // don't retry if unauthenticated
    staleTime: 5 * 60 * 1000,
  });
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  const { data } = await api.put("/auth/change-password", payload);
  return data;
};
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
  });
};
