'use client';

import { Calendar } from '@/components/ui/calendar';
import {  useRef, useState } from 'react';
import { getFullDateParts } from '@/shared/utils/getFullDateParts';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

type Props = {
  value: string;
  onChange: (date: Date | undefined) => void;
  className?: string
};

export function CompactDatePicker({ value, onChange, className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const date = new Date(value);
  const { date: d, month, year } = getFullDateParts(value);
  useClickOutside(ref as any, () => setOpen(false), open)


  return (
    <div
      ref={ref}
      className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex h-11 items-center cursor-pointer gap-3 rounded-xl border-2 border-gray-200 bg-white px-3 min-w-32 shadow-sm hover:bg-slate-50"
      >
        <div className="flex gap-2">
          <p className="text-3xl font-semibold text-slate-900">{d}</p>
          <p className="text-[11px] flex flex-col items-start text-gray-600">
            <span>{month}</span>
            <span>{year}</span>
          </p>
        </div>
        <TiArrowSortedDown className={`h-4 w-4 ml-auto  transition ${open && 'rotate-180'}`} />
      </div>
      <div className={`absolute ${className} z-50 top-[110%]  duration-300 rounded-2xl border border-slate-200 bg-white shadow-xl ${open ? "opacity-100 visible translate-y-0" : "translate-y-3 invisible opacity-0"}`}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            onChange(d);
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
}
