'use client';
import { useRef, useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useMenuItemStore } from '@/models/menuItems/store';
import { MENUITEM_STATUS } from '@/models/menuItems/types';

const OPTIONS = [
  { label: 'All', value: null, color: 'text-slate-400' },
  { label: 'Available', value: 'AVAILABLE', color: 'text-amber-500' },
  { label: 'Unavailable', value: 'UNAVAILABLE', color: 'text-blue-500' },
];

export default function MenuItemStatus() {
  const { setStatus } = useMenuItemStore();
  const [activeStatus, setActiveStatus] = useState<MENUITEM_STATUS>(null)
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const statusText = activeStatus == null ? "All" : activeStatus == "AVAILABLE" ? "Available" : "Unavailable"
  useClickOutside(ref as any, () => setOpen(false), open);
  return (
    <div className="relative z-50">
      <div
        ref={ref}
        onClick={() => setOpen(!open)}
        className="h-12 flex border-2 items-center xl:w-fit px-5 cursor-pointer duration-300 border-gray-200 rounded-xl shadow gap-3 text-sm font-medium"
      >
        <p>{statusText}</p>
        <TiArrowSortedDown
          className={`duration-300 ml-auto xl:ml-0 ${open && '-rotate-180'}`}
        />
      </div>
      <div
        className={`absolute bg-white right-0 w-full xl:w-40 shadow-md top-[110%] duration-300 border-2 border-gray-200 overflow-hidden rounded-xl ${open ? 'translate-y-0 opacity-100 visible' : 'opacity-0 translate-y-3 invisible'}`}
      >
        {OPTIONS.map((el) => (
          <div
            key={el.value}
            className={`text-[13px] cursor-pointer duration-300 font-medium px-4 py-2 ${el.value === activeStatus
                ? 'bg-blue-600 text-white'
                : `${el.color} hover:bg-blue-50`
              }`}
            onClick={() => {
              setActiveStatus(el.value as MENUITEM_STATUS)
              setStatus(el.value as MENUITEM_STATUS);
              setOpen(false);
            }}
          >
            <p>{el.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}