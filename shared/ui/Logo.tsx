"use client";

import Link from "next/link";
import { BiFoodTag } from "react-icons/bi";
import { useGetRole } from "../hooks/useGetRole";

export default function Logo() {
  const role = useGetRole();

  const getRouteByRole = () => {
    switch (role) {
      case "admin":
        return "/admin";
      case "cashier":
        return "/cashier/orders";
      case "waiter":
        return "/waiter/orders";
      default:
        return "/";
    }
  };

  return (
    <Link href={getRouteByRole()} className="inline-block">
      <div className="flex items-center gap-2">
        {/* Icon */}
        <div className="h-8 w-8 rounded-full bg-linear-to-br from-green-400 via-emerald-500 to-green-500 flex items-center justify-center shadow-sm">
          <BiFoodTag className="w-4 h-4 text-white" />
        </div>
        <p className="text-lg font-semibold text-green-600 tracking-tight">
          Cravings
        </p>
      </div>
    </Link>
  );
}
