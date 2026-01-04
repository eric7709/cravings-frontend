"use client";

import { useEffect, useMemo } from "react";
import { useUserStore } from "@/models/auth/store";
import Loader from "../ui/Loader";
import { usePathname, useRouter } from "next/navigation";

export default function Blocker({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isHydrated } = useUserStore();

  const decision = useMemo(() => {
    if (!isHydrated) return "loading";

    const segments = pathname.split("/").filter(Boolean);
    const isAuthPage = segments[0] === "auth";
    const isBookPage = segments.includes("book");

    // ✅ Auth & book pages are ALWAYS allowed
    if (isAuthPage || isBookPage) return "allow";

    // 🚫 Not logged in
    if (!user) return "login";

    const role = user.role;

    if (segments.includes("admin") && role !== "ROLE_ADMIN")
      return "unauthorized";

    if (segments.includes("cashier") && role !== "ROLE_CASHIER")
      return "unauthorized";

    if (segments.includes("waiter") && role !== "ROLE_WAITER")
      return "unauthorized";

    return "allow";
  }, [isHydrated, user, pathname]);

  useEffect(() => {
    if (decision === "login") {
      router.replace("/auth/login");
    }

    if (decision === "unauthorized") {
      router.replace("/unauthorized");
    }
  }, [decision, router]);

  // ✅ Only show loader while hydrating
  if (decision === "loading") {
    return <Loader />;
  }

  // 🚫 While redirecting, render nothing
  if (decision !== "allow") {
    return null;
  }

  return <>{children}</>;
}
