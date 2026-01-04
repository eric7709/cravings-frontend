"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { TiArrowSortedDown } from "react-icons/ti";
import { toLocalDateString } from "../utils/toLocalDateString";

export interface ReusableCalendarProps {
  label?: string;
  value?: Date | undefined | null;
  onChange: (date: string | null) => void;
  className?: string;
  placeholder?: string;
}

export default function ReusableCalendar({
  label,
  value,
  onChange,
  className = "w-44",
  placeholder = "Select date",
}: ReusableCalendarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close calendar if clicked outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayValue = value
    ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(
        value.getDate()
      ).padStart(2, "0")}`
    : "";

  return (
    <div className={`relative flex flex-col ${className}`} ref={containerRef}>
      {label && <label className="mb-1 text-sm font-medium text-gray-600">{label}</label>}

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-2.5 cursor-pointer bg-white z-10 relative"
      >
        <span className={`text-gray-700 font-medium  ${!displayValue ? "text-gray-400" : ""}`}>
          {displayValue || placeholder}
        </span>
        <TiArrowSortedDown className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </div>

      {/* Dropdown calendar */}
      <div
        className={`absolute left-0 top-full mt-2 z-50 bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-200 ease-in-out transform origin-top ${
          isOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
        }`}
      >
        <Calendar
          mode="single"
          selected={value as any}
          onSelect={(date) => {
            onChange(toLocalDateString(date))
            setIsOpen(false);
          }}
          className="w-64"
          captionLayout="dropdown"
        />
      </div>
    </div>
  );
}
