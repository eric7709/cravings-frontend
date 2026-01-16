import { useCategoryStore } from "@/models/categories/store";
import { useBook } from "../store/useBook";

export default function HeaderCategory() {
    const { category, setCategory } = useBook();
    const { categories: data } = useCategoryStore();
    
    // Use useMemo to prevent re-mapping on every render
    const categories = [
        { name: "all", id: 0 },
        ...data.map(el => ({ name: el.name, id: el.id }))
    ];

    return (
        <div className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-30">
            {/* 1. whitespace-nowrap: Prevents children from breaking lines
               2. scrollbar-hide: Keeps it clean (requires tailwind-scrollbar-hide plugin)
            */}
            <div className="flex overflow-x-auto whitespace-nowrap px-4 py-4 gap-3 no-scrollbar scroll-smooth">
                {categories.map((cat) => {
                    const isActive = category === cat.name;
                    
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.name)}
                            className={`
                                /* Shape & Spacing */
                                inline-flex items-center justify-center
                                px-6 py-2.5 rounded-full text-[13px] font-bold 
                                transition-all duration-300 active:scale-95
                                
                                /* Text Handling */
                                capitalize whitespace-nowrap shrink-0
                                
                                /* Interactive States */
                                ${isActive
                                    ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20 ring-2 ring-orange-500 ring-offset-2'
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                                }
                            `}
                        >
                            {cat.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}