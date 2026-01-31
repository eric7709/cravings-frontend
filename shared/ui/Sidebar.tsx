"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../constants/NAV_ITEMS";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-dvh hidden overflow-y-auto lg:block sticky top-0 w-52 border-r bg-white border-slate-200/80 transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="px-4 h-16 border-b border-gray-200 flex items-center">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="px-2.5 mt-3.5 space-y-1">
        {NAV_ITEMS.map(({ name, href, icon: Icon }, idx) => {
          const isActive =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

          return (
            <Link key={name} href={href} className="group block relative">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.035 }}
                whileHover={{ x: 3 }}
                className={`relative flex items-center py-1.5 gap-2 rounded-lg transition-all duration-200 px-2.5 ${
                  isActive
                    ? "bg-white shadow-sm border border-slate-200"
                    : "hover:bg-slate-50"
                }`}
              >
                {/* Icon */}
                <div className="relative z-10 w-8 flex justify-center">
                  <div
                    className={`h-7 w-7 rounded-md flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? "bg-linear-to-br from-green-400 via-emerald-500 to-green-500 shadow-sm"
                        : "bg-slate-100 group-hover:bg-slate-200"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive
                          ? "text-white"
                          : "text-slate-600 group-hover:text-slate-700"
                      }`}
                      {...(isActive ? { fill: "white" } : {})}
                    />
                  </div>
                </div>

                {/* Text + Active Dot */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isActive ? "active" : "inactive"}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="relative z-10 flex items-center justify-between w-full"
                  >
                    <span
                      className={`text-[11px] font-semibold tracking-tight ${
                        isActive
                          ? "text-slate-800"
                          : "text-slate-600 group-hover:text-slate-700"
                    }`}
                    >
                      {name}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-green-500"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
