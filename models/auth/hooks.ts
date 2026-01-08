"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/shared/lib/axios";
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
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
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
