'use client';

import { Calendar } from '@/components/ui/calendar';
import { useRef, useState } from 'react';
import { getFullDateParts } from '@/shared/utils/getFullDateParts';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { ChevronDown } from 'lucide-react';

type Props = {
  value: string;
  onChange: (date: Date | undefined) => void;
  className?: string;
};

export function CompactDatePicker({ value, onChange, className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const date = new Date(value);
  const { date: d, month, year } = getFullDateParts(value);
  
  const shortYear = year.toString().slice(-2);

  useClickOutside(ref as any, () => setOpen(false), open);

  return (
    <div ref={ref} className="relative h-8">
      {/* Reduced padding and removed the calendar icon to save width */}
      <div
        onClick={() => setOpen(!open)}
        className="flex h-full items-center gap-1.5 cursor-pointer rounded-full border border-slate-200 bg-white px-2.5 shadow-sm hover:border-slate-300 transition-all"
      >
        <div className="flex items-center gap-1 leading-none">
          <span className="text-[13px] font-black text-slate-900 tracking-tighter">
            {d}
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
            {month.substring(0, 3)}
          </span>
          <span className="text-[10px] font-black text-slate-300 mx-0.5">/</span>
          <span className="text-[10px] font-bold text-slate-500">
            {shortYear}
          </span>
        </div>

        <ChevronDown 
          size={12} 
          className={`text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} 
        />
      </div>

      {/* Popover remains standard for usability */}
      <div className={`
        absolute z-50 top-[110%] right-0 duration-200 rounded-xl border border-slate-200 bg-white shadow-xl p-1
        ${className} 
        ${open ? "opacity-100 visible translate-y-0" : "translate-y-1 invisible opacity-0"}
      `}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            onChange(selectedDate);
            setOpen(false);
          }}
          className="p-0"
        />
      </div>
    </div>
  );
}