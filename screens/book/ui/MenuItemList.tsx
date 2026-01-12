"use client";

import MenuItemCard from './MenuItemCard'
import { useBookMenuItems } from '../hooks/useBookMenuItems'
import { motion, Variants } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function MenuItemList() {
  const { hasHydrated, length, menuItems } = useBookMenuItems()

  if (length === 0 && hasHydrated)
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center text-xl font-semibold">
        <p>No Items found</p>
        <p className="text-base font-normal text-gray-700">
          Try adjusting your search
        </p>
      </div>
    )

  return (
    <div className="space-y-3 flex-1 flex flex-col overflow-y-auto p-4 pt-2">
      {menuItems?.map((menuItem) => (
        <motion.div key={menuItem.id} variants={itemVariants}>
          <MenuItemCard menuItem={menuItem} />
        </motion.div>
      ))}
    </div>
  )
}
