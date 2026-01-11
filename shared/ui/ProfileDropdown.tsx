import React, { ReactNode, useEffect, useRef, useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { useLogout } from "@/shared/hooks/useLogout";
import { useUserStore } from "@/models/auth/store";
import Link from "next/link";

// Mock hooks for demo - replace with your actual imports


interface Props {
  children: ReactNode;
}

export default function ProfileDropdown({ children }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const logout = useLogout();
  const { user } = useUserStore();
  
  const route = 
    user?.role === "ROLE_ADMIN" ? "/admin/profile" : 
    user?.role === "ROLE_CASHIER" ? "/cashier/profile" : 
    user?.role === "ROLE_WAITER" ? "/waiter/profile" : 
    "/";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* <div className="h-screen w-full grijll223333333333d place-content-center fixed top-0 left-0 bg-red-500"></div> */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none"
      >
        {children}
      </button>

        <div className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50  duration-300 ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-3"}`}>
          {/* User Info Section */}
          {user && (
            <div className="px-4 py-3.5 bg-linear-to-br from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-sm">
                  {user.firstName.charAt(0) || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.firstName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Menu Items */}
          <div className="py-1.5">
            <Link
              href={route}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-medium">Profile</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                <Settings className="w-4 h-4 text-purple-600" />
              </div>
              <span className="font-medium">Settings</span>
            </Link>
          </div>

          {/* Logout Section */}
          <div className="border-t border-gray-100 py-1.5">
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="flex items-center cursor-pointer gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 w-full"
            >
              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-red-600" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
    </div>
  );
}

// Demo Usage