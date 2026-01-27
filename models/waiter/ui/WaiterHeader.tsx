'use client';
import { Bell, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Logo from '@/shared/ui/Logo';
import { useWaiterHeader } from '../hooks/useWaiterHeader';
import WaiterDropdown from './WaiterDropdown';
import WaiterMobileDrawer from './WaiterMobileDrawer';

export default function WaiterHeader() {
  const { isActive, navLinks, role, user, ref, setOpened, opened, navDropDownLinks } = useWaiterHeader();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="h-20 px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo />
            <nav className="hidden xl:flex gap-1 ml-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${isActive(href)
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-4">
            <button className="h-11 w-11 grid place-content-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div ref={ref}>
              <div
                onClick={() => setOpened(!opened)}
                className="flex items-center relative gap-3 cursor-pointer"
              >
                <div className="h-11 w-11 rounded-full bg-green-600 text-white grid place-content-center font-semibold shadow">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
              </div>
              <WaiterDropdown opened={opened} />
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden h-11 w-11 grid place-content-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </header>
      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 xl:hidden ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <WaiterMobileDrawer mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} navLinks={navLinks} isActive={isActive} navDropDownLinks={navDropDownLinks} role={role} />
    </>
  );
}