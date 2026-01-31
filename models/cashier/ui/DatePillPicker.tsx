"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { getFullDateParts } from "@/shared/utils/getFullDateParts";

type Props = {
  value: string;
  onChange: (date: Date | undefined) => void;
  right?: boolean
};

export default function DatePillPicker({ value, onChange, right }: Props) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const date = new Date();
  const { date: hookDate, month, year } = getFullDateParts(value)


  return (
    <div className="relative " ref={ref}>
      <div
        onClick={() => setOpen((p) => !p)}
        className="h-9 px-4 gap-2 flex items-center min-w-28 rounded-full border shadow border-gray-200 cursor-pointer hover:bg-gray-50"
      >
        <p className="text-2xl font-semibold leading-none">{hookDate}</p>
        <div className="text-[10px] leading-tight">
          <p>{month}</p>
          <p>{year}</p>
        </div>
      </div>
      {/* Dropdown */}
      <div className={`absolute top-full ${right ? "right-0" : "left-0"} mt-2 z-50 lg:right-auto lg:left-auto duration-300 bg-white border border-gray-300 rounded-md shadow-lg ${open ? "opacity-100 visible translate-y-0" : "translate-y-3 opacity-0 invisible"}`}>
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
