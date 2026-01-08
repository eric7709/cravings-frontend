import { useCategoryStore } from '@/models/categories/store';
import { useBook } from '../store/useBook';

export default function HeaderCategory() {
    const { category, setCategory } = useBook()
    const { categories: data } = useCategoryStore()
    const categories = data.map(el => {
        return {
            name: el.name,
            id: el.id
        }
    })
    categories.unshift({ name: "all", id: 0 })
    return (
        <div className="overflow-x-auto mx-4 py-3">
            <div className="flex gap-3 text-[13px]">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setCategory(cat.name)}
                        className={`
              text-nowrap border-2 capitalize px-5 active:scale-90 duration-300 py-2 rounded-full font-medium
              ${category === cat.name
                                ? 'bg-gradient-to-r border-red-300 from-orange-400  to-orange-600 text-white shadow-lg'
                                : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                            }
            `}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

        </div>
    )
}
