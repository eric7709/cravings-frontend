'use client';
import { useRef, useState } from 'react';
import { useOrderStore } from '@/models/orders/store';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useClickOutside } from '@/shared/hooks/useClickOutside';


export default function AdminHeaderStatus() {
  const { orderStatus, setOrderStatus, todayOrderStats } = useOrderStore();
  const totalCount = todayOrderStats.cancelled + todayOrderStats.completed + todayOrderStats.paid + todayOrderStats.pending + todayOrderStats.preparing
  const OPTIONS = [
    { label: 'All', value: null, color: 'text-slate-400', count: totalCount },
    { label: 'Pending', value: 'PENDING', color: 'text-amber-500', count: todayOrderStats.pending },
    { label: 'Preparing', value: 'PREPARING', color: 'text-blue-500', count: todayOrderStats.preparing },
    { label: 'Completed', value: 'COMPLETED', color: 'text-green-500', count: todayOrderStats.completed },
    { label: 'Paid', value: 'PAID', color: 'text-emerald-500', count: todayOrderStats.paid },
    { label: 'Cancelled', value: 'CANCELLED', color: 'text-red-500', count: todayOrderStats.cancelled },
  ];
  const selectedStatus = OPTIONS.find(el => el.value == orderStatus)
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  useClickOutside(ref as any, () => setOpen(false), open)

  return (
    <div className="relative z-50">
      <div ref={ref} onClick={() => setOpen(!open)} className="h-11 flex border-2 items-center xl:w-fit px-3 cursor-pointer duration-300 border-gray-200 rounded-xl shadow gap-3 text-[13px] text-gray-600 font-medium">
        <p>{selectedStatus?.label ?? "All"}</p>
        <TiArrowSortedDown className={`duration-300 ml-auto xl:ml-0 ${open && "-rotate-180"}`} />
      </div>
      <div className={`absolute bg-white right-0 w-full  xl:w-40 shadow-md top-[110%] duration-300 border-2 border-gray-200  overflow-hidden rounded-xl gap-3 ${open ? "translate-y-0 opacity-100 visible" : "opacity-0 translate-y-3 invisible"}`}>
        {OPTIONS.map((el) => (
          <div key={el.value} className={`text-[13px] flex justify-between items-center cursor-pointer duration-300 font-medium  ${el.value == orderStatus ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-blue-100 border-gray-200"} px-4 py-2 `} onClick={() => setOrderStatus(el.value)}>
            <p>{el.label}</p>
            <p>{el.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
