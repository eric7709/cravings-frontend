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
            item.name.toLowerCase().includes(normalizedSearch)
        return matchesCategory && matchesSearch
    })

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
