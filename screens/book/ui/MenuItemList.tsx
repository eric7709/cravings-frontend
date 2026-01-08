import { useBook } from '../store/useBook'
import { useMenuItemStore } from '@/models/menuItems/store'
import MenuItemCard from './MenuItemCard'

export default function MenuItemList() {
    const { menuItems } = useMenuItemStore()
    const { category, search } = useBook()
    const normalizedSearch = search.trim().toLowerCase()
    const normalizedCategory = category.toLowerCase()
    const safeMenuItems = Array.isArray(menuItems) ? menuItems : [];
    const filteredMenuItems = safeMenuItems.filter((item) => {
        const matchesCategory =
            normalizedCategory === 'all' ||
            item.categoryName.toLowerCase() === normalizedCategory
        const matchesSearch =
            normalizedSearch === '' ||
            item.name.toLowerCase().includes(normalizedSearch) ||
            item.categoryName.toLowerCase().includes(normalizedSearch) ||
            item.description.toLowerCase().includes(normalizedSearch)
        return matchesCategory && matchesSearch
    })

    if (filteredMenuItems.length == 0) return <div className="flex-1 flex flex-col justify-center items-center text-center text-xl font-semibold">
        <p>No Items found</p>
        <p className='text-base font-normal text-gray-700'>Try adjusting your search</p>
    </div>

    return (
        <div className="space-y-3 p-4 pt-2">
            {filteredMenuItems?.map((menuItem) => (
                <MenuItemCard
                    key={menuItem.id}
                    menuItem={menuItem}
                />
            ))}
        </div>
    )
}
