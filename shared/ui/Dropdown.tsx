"use client";

import React, { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  className?: string;
  dropdownClassName?: string;
  value: string | null;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function Dropdown({
  label,
  options,
  className = "",
  dropdownClassName = "",
  value,
  placeholder = "Select...",
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Main dropdown toggle */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between border gap-2 border-gray-300 rounded-full px-4 py-3 lg:py-2.5 cursor-pointer bg-white"
      >
        <span className="truncate text-sm lg:text-base">{value ? options.find((o) => o.value === value)?.label : placeholder}</span>
        <TiArrowSortedDown className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </div>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-1 ${dropdownClassName} bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {options.map((el) => (
          <div
            key={el.value}
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent toggle
              onChange(el.value);
              setIsOpen(false);
            }}
            className={`px-4 py-2 text-sm lg:text-base hover:bg-blue-600 cursor-pointer `}
          >
            {el.label}
          </div>
        ))}
      </div>
    </div>
  );
}
