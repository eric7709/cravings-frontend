"use client";

import { LuSearch, LuX } from 'react-icons/lu';
import { useBook } from '../store/useBook';

export default function HeaderSearch() {
    const { search, setSearch } = useBook();

    return (
        <div className="px-4 py-2">
            <div className={`
                relative flex items-center h-12 w-full transition-all duration-300 rounded-2xl border
                ${search 
                    ? "border-orange-400 bg-white shadow-lg shadow-orange-500/10" 
                    : "border-slate-100 bg-slate-50 shadow-sm"
                }
            `}>
                {/* 1. SEARCH ICON - Animates color based on focus */}
                <div className="pl-4 pr-2">
                    <LuSearch 
                        size={18} 
                        className={`transition-colors duration-300 ${search ? "text-orange-500" : "text-slate-400"}`} 
                    />
                </div>

                {/* 2. THE INPUT - Clean & Accessible */}
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    spellCheck={false}
                    className="flex-1 h-full bg-transparent outline-none text-[15px] font-medium text-slate-800 placeholder:text-slate-400 placeholder:font-normal"
                    placeholder="Search your cravings..."
                />

                {/* 3. CLEAR BUTTON - Shows only when typing */}
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="p-2 mr-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-500 transition-all active:scale-90"
                    >
                        <LuX size={16} strokeWidth={3} />
                    </button>
                )}
            </div>
            
            {/* 4. RESULTS HINT - Optional subtle feedback */}
            {search.length > 0 && (
                <div className="mt-2 ml-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 italic">
                        Filtering by: <span className="text-orange-500">{search}</span>
                    </p>
                </div>
            )}
        </div>
    );
}