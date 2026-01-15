"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useGeneralStore } from "@/shared/store/useGeneralStore";
import { NAV_ITEMS } from "@/shared/constants/NAV_ITEMS";
import Logo from "@/shared/ui/Logo";

export default function MobileSidebar() {
  const pathname = usePathname();

  const { sideBarOpened, toggleSideBar } = useGeneralStore();

  return (
    <AnimatePresence>
      {sideBarOpened && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSideBar}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />

          {/* SIDEBAR */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="
              fixed top-0 left-0 z-50
              h-dvh w-72
              bg-white
              border-r border-slate-200
              lg:hidden
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <Logo />

              <button
                onClick={toggleSideBar}
                className="p-2 rounded-lg border border-gray-300 bg-white shadow-sm"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* NAV */}
            <nav className="px-3 py-4 space-y-1.5">
              {NAV_ITEMS.map(({ name, href, icon: Icon }) => {
                const isActive =
                  href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(href);

                return (
                  <Link
                    key={name}
                    href={href}
                    onClick={toggleSideBar}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-xl
                      transition
                      ${isActive
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-slate-100 text-slate-700"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-semibold text-sm">{name}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
