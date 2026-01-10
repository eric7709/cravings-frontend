"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu } from "lucide-react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useUserStore } from "@/models/auth/store";
import ProfileDropdown from "@/shared/ui/ProfileDropdown";
import { useGeneralStore } from "@/shared/store/useGeneralStore";
import { getPageTitle } from "@/shared/lib/getPageTitle";
import MobileSidebar from "./MobileSidenav";
import { useGetRole } from "@/shared/hooks/useGetRole";
import Image from "next/image";

export default function AdminHeader() {
  const pathname = usePathname();
  const page = pathname.split("/").at(-1) ?? "";
  const { user } = useUserStore();
  const { toggleSideBar } = useGeneralStore();
  const role = useGetRole();

  return (
    <>
      {/* DESKTOP HEADER */}
      <div className="hidden lg:block z-30 relative">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          {/* Left */}
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

          {/* Right */}
          <div className="flex items-center gap-5">
            <div className="grid h-12 w-12 text-gray-600 place-content-center rounded-full border-2 border-orange-500">
              <Bell />
            </div>
            <ProfileDropdown>
              <div className="flex cursor-pointer items-center gap-2">
                <div className="h-12 w-12 rounded-full border-2 relative overflow-hidden border-orange-400">
                  <Image
                    src="/admin.png"
                    height={48}
                    width={48}
                    className="h-full w-full object-contain absolute"
                    alt=""
                  />
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

      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-gray-200 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSideBar}
            className="p-1.5 rounded-lg border border-orange-400 bg-white shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </button>

          <p className="text-lg font-black tracking-tight">
            Bite<span className="text-blue-600">Buzz</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-content-center rounded-full border border-gray-300">
            <Bell className="w-4 h-4 text-gray-500" />
          </div>
          <ProfileDropdown>
            <div className="h-10 w-10 rounded-full border relative border-gray-300 cursor-pointer hover:opacity-80 transition-opacity">
              <Image
                src="/image.png"
                className="object-cover rounded-full absolute h-full w-full"
                fill
                alt=""
              />
            </div>
          </ProfileDropdown>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <MobileSidebar />
    </>
  );
}