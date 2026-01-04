import { useUserStore } from "@/models/auth/store";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/auth/login");
  };
  return logout;
};
