"use client";

import { MenuItem } from '@/models/menuItems/types';
import { formatPrice } from '@/shared/utils/formatPrice';
import { useBook } from '../store/useBook';
import { Ban, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

type Props = {
    menuItem: MenuItem;
};

export default function MenuItemCard({ menuItem }: Props) {
    const { addToCart, items, removeFromCart } = useBook();
    const cartItem = items.find((item) => item.menuItemId === menuItem.id);
    
    const isAvailable = menuItem.status === "AVAILABLE";
    const isInCart = !!cartItem;

    const handleAction = () => {
        if (!isAvailable) return;
        if (isInCart) {
            removeFromCart(menuItem.id);
        } else {
            addToCart({
                menuItemId: menuItem.id,
                menuItemName: menuItem.name,
                quantity: 1,
                takeOut: false,
                categoryName: menuItem.categoryName,
                price: menuItem.price,
            });
        }
    };

    return (
        <div className={`
            group relative flex flex-row items-stretch bg-white rounded-2xl overflow-hidden 
            border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300
            ${!isAvailable ? 'opacity-70' : ''}
        `}>
            
            {/* 1. SIDE IMAGE SECTION */}
            <div className="relative w-32 sm:w-44 shrink-0 overflow-hidden bg-slate-50">
                {menuItem.imageUrl ? (
                    <Image 
                        fill 
                        src={menuItem.imageUrl} 
                        alt={menuItem.name} 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                ) : (
                    <div className="h-full w-full grid place-content-center text-4xl opacity-30">🍽️</div>
                )}
                
                {!isAvailable && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] grid place-content-center p-2 text-center">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">Unavailable</span>
                    </div>
                )}
            </div>

            {/* 2. CONTENT SECTION */}
            <div className="flex-1 py-3 px-4 sm:p-5 flex flex-col justify-between min-w-0">
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                            {/* Category Label: Constant Slate-400 */}
                            <p className="text-[9px] font-black uppercase tracking-[0.15em] mb-1 text-slate-400">
                                {menuItem.categoryName}
                            </p>
                            {/* Title: Constant Black */}
                            <h3 className="text-[15px] font-black leading-tight truncate text-slate-900">
                                {menuItem.name}
                            </h3>
                        </div>
                    </div>
                    {/* Description: Constant Slate-500 */}
                    <p className="text-[11px] leading-snug line-clamp-2 mt-2 text-slate-500">
                        {menuItem.description}
                    </p>
                </div>

                {/* 3. FOOTER: PRICE & DYNAMIC ACTION */}
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <p className="text-base font-black text-slate-900 tracking-tighter">
                            <span className="text-emerald-600 mr-0.5 font-bold">₦</span>
                            {formatPrice(menuItem.price, true)}
                        </p>
                    </div>

                    <button
                        disabled={!isAvailable}
                        onClick={handleAction}
                        className={`
                            relative h-9 w-9 grid place-content-center rounded-full font-black text-[10px] uppercase tracking-widest transition-all
                            ${!isAvailable 
                                ? "bg-slate-100 text-slate-400" 
                                : isInCart 
                                    ? "bg-rose-500 text-white shadow-lg shadow-rose-100 active:scale-95" 
                                    : "bg-slate-900 text-white shadow-lg shadow-slate-100 active:scale-95 hover:bg-black"}
                        `}
                    >
                        <div className="flex items-center gap-2">
                            {isInCart ? (
                                <>
                                    <Trash2 size={16} />
                                </>
                            ) : !isAvailable ? (
                                <Ban size={16} />
                            ) : (
                                <>
                                    <Plus size={16} />
                                </>
                            )}
                        </div>
                    </button>
                </div>
            </div>

            {/* In-Cart Indicator Dot */}
            {isInCart && isAvailable && (
                <div className="absolute top-3 right-3 h-2 w-2 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]" />
            )}
        </div>
    );
}