"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useUserStore } from "@/models/auth/store";
import ProfileDropdown from "@/shared/ui/ProfileDropdown";
import { getPageTitle } from "@/shared/lib/getPageTitle";
import { useGetRole } from "@/shared/hooks/useGetRole";

export default function AdminHeader() {
  const pathname = usePathname();
  const page = pathname.split("/").at(-1) ?? "";
  const { user } = useUserStore();
  const role = useGetRole();

  return (
    <div className="hidden z-[5000] top-0 sticky bg-white/70 backdrop-blur-md lg:block">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 h-16">
        {/* Page Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <p className="text-[17px] font-semibold leading-tight">
              {getPageTitle(page)?.title}
            </p>
            <p className="text-[11px] text-slate-500">
              {getPageTitle(page)?.subTitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="grid h-8 w-8 text-gray-500 place-content-center rounded-full border-[1.5px] border-gray-300 hover:bg-gray-100 transition">
            <Bell size={18} />
          </div>

          {/* Profile */}
          <ProfileDropdown>
            <div className="flex cursor-pointer items-center gap-2">
              {/* Avatar */}
              <div className="relative bg-green-600 text-white font-semibold grid place-content-center text-xs h-8 w-8 shrink-0 overflow-hidden rounded-full border border-green-500 shadow-sm">
                <p>
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </p>
              </div>

              {/* Name + Role */}
              <div className="leading-tight">
                <p className="text-xs font-semibold">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[11px] text-start text-slate-500 capitalize">{role}</p>
              </div>

              <TiArrowSortedDown className="ml-1 text-base text-slate-600" />
            </div>
          </ProfileDropdown>
        </div>
      </div>
    </div>
  );
}
