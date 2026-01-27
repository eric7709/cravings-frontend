import { useUserStore } from "@/models/auth/store";
import { useOrderStore } from "@/models/orders/store";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const { setUser } = useUserStore();
  const { reset } = useOrderStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    // 1. Clear State
    setUser(null);
    reset();
    queryClient.clear();
    // 2. Clear Cookies (This is the primary source now)
    Cookies.remove("accessToken", { path: '/' });
    Cookies.remove("refreshToken", { path: '/' });
    Cookies.remove("userRole", { path: '/' });

    // 3. Clear LocalStorage (Just to be safe/clean)
    localStorage.clear();
    // 4. Redirect
    router.replace("/auth/login");
  };
  return logout;
};