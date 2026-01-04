import { Home } from 'lucide-react';
import { OrderItemWithID } from '@/models/orders/types';
import { formatPrice } from '@/shared/utils/formatPrice';

type Props = {
  items: OrderItemWithID[]
}

export default function OrderCardItems({ items }: Props) {
  return (
    <div className="">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-3 px-4 py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-150 rounded"
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            {/* Quantity badge - minimal circle */}
            <b className='text-base'><span className='text-xs mr-0.5'>X</span>{item.quantity}</b>

            {/* Item name */}
            <span className="text-sm font-medium text-gray-700 truncate">
              {item.menuItemName}
            </span>
            {item.takeOut && (
              <div className="flex items-center gap-1 text-green-600">
                <Home className="w-[18px] h-[18px]" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Takeout badge - minimal */}


            {/* Price */}
            <span className="text-sm font-semibold text-gray-800">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}