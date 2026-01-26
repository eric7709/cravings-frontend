import { useUserStore } from "@/models/auth/store";
import { useOrderStore } from "@/models/orders/store";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { setUser } = useUserStore();
  const {reset} = useOrderStore()
  const router = useRouter();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    reset()
    router.push("/auth/login");
  };
  return logout;
};
