'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../constants/NAV_ITEMS";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        h-dvh hidden lg:block sticky top-0
        w-72
         border-r border-slate-200/80
        transition-all duration-500 ease-in-out
      "
    >
      <div className="px-4 py-6">
        <Logo />
      </div>
      <nav className="px-3 mt-3 space-y-1.5">
        {NAV_ITEMS.map(({ name, href, icon: Icon }, idx) => {
          const isActive =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

          return (
            <Link key={name} href={href} className="group block relative">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ x: 6 }}
                className={`
                  relative flex items-center py-2.5 gap-2 rounded-xl transition-all duration-300 px-3
                  ${isActive
                    ? "bg-white shadow-md shadow-slate-200/80 border border-slate-200"
                    : "hover:bg-slate-50 hover:shadow-sm"
                  }
                `}
              >
                {/* ICON */}
                <div className="relative z-10 w-10 flex justify-center">
                  <div
                    className={`
                      h-9 w-9 rounded-lg flex items-center justify-center transition-all duration-300
                      ${isActive
                        ? "bg-linear-to-br from-orange-400 via-red-500 to-pink-500 shadow-md shadow-blue-500/30"
                        : "bg-slate-100 group-hover:bg-slate-200"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-600 group-hover:text-slate-700"}`}
                      {...(isActive ? { fill: "white" } : {})}
                    />
                  </div>
                </div>

                {/* TEXT + ACTIVE DOT */}
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="relative z-10 flex items-center justify-between w-full pl-1"
                  >
                    <span
                      className={`
                        text-sm font-bold tracking-tight
                        ${isActive ? "text-slate-800" : "text-slate-600 group-hover:text-slate-700"}
                      `}
                    >
                      {name}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-linear-to-br from-orange-400 via-red-500 to-pink-500"
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
