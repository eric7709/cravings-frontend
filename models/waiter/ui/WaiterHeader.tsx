'use client';

import { useUserStore } from '@/models/auth/store';
import { Bell, User, Settings, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ProfileDropdown from '@/shared/ui/ProfileDropdown';
import { useGetRole } from '@/shared/hooks/useGetRole';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useLogout } from '@/shared/hooks/useLogout';
import { RxHamburgerMenu } from 'react-icons/rx';
import { LiaTimesSolid } from 'react-icons/lia';

export default function WaiterHeader() {
  const { user } = useUserStore();
  const role = useGetRole();
  const logout = useLogout();
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);

  const navLinks = [
    { href: '/waiter/orders', label: 'Orders' },
    { href: '/waiter/tables', label: 'Tables' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Main Header */}
      <div className="bg-gradient-to-r h-20 sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center px-4 h-full gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden xl:block h-12 w-12 rounded-full border-2 border-gray-400" />
            <p className="font-bold uppercase text-lg">Cravings</p>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden xl:flex items-center gap-1 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${isActive(link.href)
                    ? 'bg-white/90 text-green-600 shadow-sm'
                    : 'text-gray-700 hover:bg-white/50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1 hidden xl:block" />

          {/* Right Side Actions - Desktop */}
          <div className="hidden xl:flex items-center gap-5 shrink-0">
            <div className="grid h-12 w-12 shrink-0 place-content-center rounded-full border border-gray-600 hover:bg-white/50 cursor-pointer transition-colors">
              <Bell className="h-5 w-5" />
            </div>
            <ProfileDropdown>
              <div className="flex cursor-pointer items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="grid h-12 w-12 shrink-0 place-content-center rounded-full border border-gray-600" />
                <div>
                  <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-start capitalize">{role}</p>
                </div>
                <TiArrowSortedDown className="ml-1 text-lg" />
              </div>
            </ProfileDropdown>
          </div>

          {/* Mobile Menu Toggle */}
          <div
            onClick={() => setOpened(!opened)}
            className="h-10 w-10 border border-gray-500 rounded-md xl:hidden grid place-content-center cursor-pointer hover:bg-white/50 transition-colors"
          >
            {!opened ? <RxHamburgerMenu className="text-xl" /> : <LiaTimesSolid className="text-xl" />}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`xl:hidden bg-gradient-to-b from-white to-gray-50 fixed w-full top-20 border-b border-gray-200 shadow-2xl z-[45] duration-300 ease-in-out ${opened ? 'max-h-[calc(100vh-80px)] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {/* Navigation Links */}
            <nav className="px-4 py-4 space-y-1.5 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                Menu
              </p>
              <Link
                href="/waiter/orders"
                onClick={() => setOpened(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-sm transition-all ${pathname.includes('/waiter/orders')
                    ? 'bg-gradient-to-r from-green-50 to-green-100/50 text-green-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 active:scale-[0.98]'
                  }`}
              >
                <span>Orders</span>
                {pathname.includes('/waiter/orders') && (
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                )}
              </Link>
              <Link
                href="/waiter/tables"
                onClick={() => setOpened(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-sm transition-all ${pathname.includes('/waiter/tables')
                    ? 'bg-gradient-to-r from-green-50 to-green-100/50 text-green-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 active:scale-[0.98]'
                  }`}
              >
                <span>Tables</span>
                {pathname.includes('/waiter/tables') && (
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                )}
              </Link>
            </nav>
          </div>

          {/* User Profile Section - Sticky at Bottom */}
          <div className="bg-white border-t border-gray-200 mt-auto">
            <div className="p-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-green-50/30 rounded-xl border border-gray-100">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold shadow-md">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
                <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Bell className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 space-y-1">
                <Link
                  href="/waiter/profile"
                  onClick={() => setOpened(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Profile</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </Link>

                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                      <Settings className="h-4 w-4 text-purple-600" />
                    </div>
                    <span>Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>

                <button
                  onClick={() => {
                    setOpened(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 active:scale-[0.98] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                      <LogOut className="h-4 w-4 text-red-600" />
                    </div>
                    <span>Logout</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-red-400 group-hover:text-red-600 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}