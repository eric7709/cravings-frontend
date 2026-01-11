"use client";
import { User, Settings, LogOut } from "lucide-react";
import { useUserStore } from "@/models/auth/store";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useGetRole } from "@/shared/hooks/useGetRole";
import { useLogout } from "@/shared/hooks/useLogout";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

export const useWaiterHeader = () => {
  const { user } = useUserStore();
  const role = useGetRole();
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef as any, () => setOpened(false), opened);
  const navLinks = [
    { href: "/waiter/orders", label: "Orders" },
    { href: "/waiter/tables", label: "Tables" },
  ];

  const navDropDownLinks = [
    {
      type: "link",
      href: "/waiter/profile",
      label: "Profile",
      icon: User,
    },
    {
      type: "link",
      href: "/waiter/settings",
      label: "Settings",
      icon: Settings,
    },
    {
      type: "action",
      label: "Logout",
      icon: LogOut,
      href: "#",
    },
  ] ;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return {
    role,
    user,
    ref: dropdownRef,
    navDropDownLinks,
    opened,
    navLinks,
    setOpened,
    isActive,
  };
};
