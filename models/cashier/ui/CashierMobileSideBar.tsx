"use client"
import { NAV_ITEMS } from "@/shared/constants/NAV_ITEMS"
import { useGeneralStore } from "@/shared/store/useGeneralStore";
import { Book, Pen } from "lucide-react";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function CashierMobileSideBar() {
  const pathname = usePathname();
  const { sideBarOpened, toggleSideBar, closeCashierPanel } = useGeneralStore()

  const links = [
    {
      href: "/cashier/orders",
      name: "Orders",
      icon: Book
    },
    {
      href: "/cashier/menu-items",
      name: "Menu Items",
      icon: Pen
    },
  ];

  useEffect(() => {
    if (sideBarOpened)
      closeCashierPanel()

  }, [sideBarOpened])

  return (
    <div className={`h-[calc(100dvh-64px)] fixed top-16 z-6000 w-full lg:hidden p-4 bg-white/50 backdrop-blur-xl duration-300 ${sideBarOpened ? "left-0" : "-left-[120vw]"}`}>
      {links.map(({ icon: Icon, name, href }) => {
        const isActive =
          href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link key={href} href={href} onClick={toggleSideBar} className={`flex py-3 gap-2 ${isActive ? "text-green-500 font-bold stroke-1" : ""}`}>
            <Icon size={18} />
            <p className="text-sm">{name}</p>
          </Link>
        )
      })
      }
    </div>
  )
}
