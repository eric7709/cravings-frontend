"use client";

import { useGetRole } from "@/shared/hooks/useGetRole";
import Loader from "@/shared/ui/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const role = useGetRole(); // "admin" | "cashier" | "waiter" | null
  const router = useRouter();

  useEffect(() => {
    if (!role) return; // wait until role is loaded

    switch (role) {
      case "admin":
        router.push("/admin");
        break;
      case "cashier":
        router.push("/cashier/orders");
        break;
      case "waiter":
        router.push("/waiter/orders");
        break;
      default:
        // Optional: fallback route for unknown role
        router.push("/login");
        break;
    }
  }, [role, router]);

  return <Loader />;
}
