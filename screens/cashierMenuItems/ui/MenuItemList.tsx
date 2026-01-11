"use client"
import MenuItemCard from './MenuItemCard'
import { useFilterMenuItems } from '../hooks/useFilterMenuItems'
import AdjustSearch from '@/shared/ui/AdjustSearch'
import Loader from '@/shared/ui/Loader'

export default function MenuItemList() {
  const { menuItems, length, hasHydrated} = useFilterMenuItems()

  if(!hasHydrated) return <Loader />
  
  if (length === 0) return <AdjustSearch subTitle='Try adjusting the filters' title="Menu Items" />

  return (
    <div className='p-4 overflow-y-auto grid  grid-cols-1 sm:grid-cols-1 gap-3'>
      {menuItems.map((menuItem) => (
        <MenuItemCard key={menuItem.id} menuItem={menuItem} />
      ))}
    </div>
  )
}
