import { User } from '@/models/auth/types'
import { useLogout } from '@/shared/hooks/useLogout'
import { Bell, LucideProps, X } from 'lucide-react'
import Link from 'next/link'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'

type Props = {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (e: boolean) => void
  user: User | null
  navLinks: {
    href: string;
    label: string;
  }[]
  isActive: (href: string) => boolean
  role: string
  navDropDownLinks: {
    type: string;
    href: string;
    label: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  }[]


}

export default function WaiterMobileDrawer({ isActive, mobileMenuOpen, navDropDownLinks, navLinks, setMobileMenuOpen, user, role }: Props) {
  const logout = useLogout()
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transition-transform duration-300 ease-out xl:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      <div className="h-full flex flex-col">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="h-10 w-10 grid place-content-center rounded-full hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5 text-gray-600 translate-x-2" />
          </button>
        </div>
        {/* User Profile Section */}
        <div className="px-6 py-4 border-b border-gray-200 bg-linear-to-br from-green-50 to-emerald-50">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-green-600 text-white grid place-content-center font-semibold text-xl shadow-lg">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-600 capitalize">{role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1 mb-6">
            <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Navigation
            </p>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(href)
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Notifications */}
          <div className="mb-6">
            <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Other
            </p>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
              <Bell className="h-5 w-5 text-gray-600" />
              Notifications
            </button>
          </div>

          {/* Dropdown Links */}
          <div>
            <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account
            </p>
            {navDropDownLinks.map(({ type, href, label, icon: Icon }) => {
              if (type === 'link') {
                return (
                  <Link
                    key={label}
                    href={href!}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Icon className="h-5 w-5 text-gray-600" />
                    {label}
                  </Link>
                );
              }

              return (
                <button
                  key={label}
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition"
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
