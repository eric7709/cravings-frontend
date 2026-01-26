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
    <div className="hidden z-5000 top-0 sticky bg-white/20 backdrop-blur-lg lg:block ">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 h-22.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <p className="text-[27px] font-bold">
              {getPageTitle(page)?.title}
            </p>
            <p className="text-[13px]">
              {getPageTitle(page)?.subTitle}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-5">
          <div className="grid h-12 w-12 text-gray-500 place-content-center rounded-full border-2 ">
            <Bell />
          </div>
          <ProfileDropdown>
            <div className="flex cursor-pointer items-center gap-2">
              <div className="relative bg-green-600 text-white font-semibold grid place-content-center text-lg h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-green-500 shadow-md group-hover:border-green-300 transition-colors">
                <p className='font-semibold'>
                  {user?.firstName[0]}
                  {user?.lastName[0]}
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-start capitalize">{role}</p>
              </div>
              <TiArrowSortedDown className="ml-3 text-xl" />
            </div>
          </ProfileDropdown>
        </div>
      </div>
    </div>
  );
}