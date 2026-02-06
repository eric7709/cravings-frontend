import { Home } from 'lucide-react';
import { OrderItemWithID } from '@/models/orders/types';
import { formatPrice } from '@/shared/utils/formatPrice';

type Props = {
  items: OrderItemWithID[]
}

export default function OrderCardItems({ items }: Props) {
  return (
    <div className="max-h-60 select-none overflow-y-auto">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors border border-slate-100/50"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Quantity badge */}
            <div className="h-5 w-5 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-[11px] shadow-sm">
              {item.quantity}
            </div>

            {/* Item name */}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[10px] font-semibold text-slate-900 truncate">
                {item.menuItemName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Takeout badge */}
            {item.takeOut && (
              <p className=" items-center h-6 grid place-content-center w-6 rounded-full border text-xs font-semibold bg-emerald-50 text-emerald-700">
                <Home className="w-3.5 h-3.5" />
              </p>
            )}
            {/* Price */}
            <span className="text-[11px] font-bold text-slate-900 min-w-17.5 text-right">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}