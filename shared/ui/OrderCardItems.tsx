import { Home } from 'lucide-react';
import { OrderItemWithID } from '@/models/orders/types';
import { formatPrice } from '@/shared/utils/formatPrice';

type Props = {
  items: OrderItemWithID[]
}

export default function OrderCardItems({ items }: Props) {
  return (
    <div className="max-h-60 select-none overflow-y-auto space-y-2">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors border border-slate-100/50"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Quantity badge */}
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {item.quantity}
            </div>

            {/* Item name */}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">
                {item.menuItemName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Takeout badge */}
            {item.takeOut && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20">
                <Home className="w-3.5 h-3.5" />
                Takeout
              </span>
            )}

            {/* Price */}
            <span className="text-sm font-bold text-slate-900 min-w-[70px] text-right">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}