'use client'

import Link from 'next/link'
import { BiFoodTag } from 'react-icons/bi'
import { useGetRole } from '../hooks/useGetRole'

export default function Logo() {
  const role = useGetRole()

  const getRouteByRole = () => {
    switch (role) {
      case 'admin':
        return '/admin'
      case 'cashier':
        return '/cashier/orders'
      case 'waiter':
        return '/waiter/orders'
      default:
        return '/'
    }
  }

  return (
    <Link href={getRouteByRole()} className="inline-block">
      <div className="relative flex items-center gap-2 cursor-pointer">
        <div className="h-9 w-9 xl:h-11 xl:w-11 rounded-full bg-linear-to-br from-green-400 via-emerald-500 to-green-500 flex items-center justify-center shadow-md shadow-blue-500/30">
          <BiFoodTag className="w-5 h-5 xl:w-6 xl:h-6 text-white" />
        </div>

        <p className="text-xl xl:text-2xl text-green-600 font-semibold xl:font-bold tracking-tight">
          Cravings
        </p>
      </div>
    </Link>
  )
}
