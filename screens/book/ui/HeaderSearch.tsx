"use client";

import { LuSearch, LuX } from 'react-icons/lu';
import { useBook } from '../store/useBook';

export default function HeaderSearch() {
    const { search, setSearch } = useBook();

    return (
        <div className="px-4 py-2">
            <div className={`
                relative flex items-center h-12 w-full transition-all duration-300 rounded-xl border-2 border-green-500
                ${search
                    ? "border-green-400 bg-white shadow-lg shadow-green-500/10"
                    : "border-slate-200 bg-slate-50 shadow-sm"
                }
            `}>
                {/* 1. SEARCH ICON - Animates color based on focus */}
                <div className="pl-4 pr-2">
                    <LuSearch
                        size={18}
                        className={`transition-colors duration-300 ${search ? "text-green-500" : "text-slate-400"}`}
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
                        className=" absolute right-2.5 rounded-xl  text-slate-500  transition-all active:scale-90"
                    >
                        <LuX size={16} strokeWidth={3} />
                    </button>
                )}
            </div>

            {/* 4. RESULTS HINT - Optional subtle feedback */}
            {search.length > 0 && (
                <div className="mt-2 ml-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                        Filtering by: <span className="text-green-500">{search}</span>
                    </p>
                </div>
            )}
        </div>
    );
}