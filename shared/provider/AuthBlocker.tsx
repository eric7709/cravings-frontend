"use client";

import { useEffect, useMemo } from "react";
import { useUserStore } from "@/models/auth/store";
import Loader from "../ui/Loader";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/models/orders/store";

export default function AuthBlocker({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, hasHydrated } = useUserStore();
  const { setCashierId, setWaiterId } = useOrderStore()

  const decision = useMemo(() => {
    if (!hasHydrated) return "loading";

    // 🚫 If user exists, prevent access to auth pages
    if (user) return "redirect";

    return "allow";
  }, [hasHydrated, user]);

  useEffect(() => {
    if (decision === "redirect" && user) {
      // Redirect based on role
      switch (user.role) {
        case "ROLE_ADMIN":
          router.replace("/admin");
          break;
        case "ROLE_CASHIER":
          setCashierId(user.id)
          router.replace("/cashier/orders");
          break;
        case "ROLE_WAITER":
          setWaiterId(user.id)
          router.replace("/waiter/orders");
          break;
        default:
          router.replace("/"); // fallback
      }
    }
  }, [decision, router, user]);
  if (decision === "loading") return <Loader />;
  if (decision === "redirect") return null;
  return <>{children}</>;
}
