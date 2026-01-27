import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Calendar } from "lucide-react"; // Optional icons
import { useDashboardStore } from "@/models/dashboard/store";
import { getRangeDates } from "@/shared/utils/getRangeDates";
import { TiArrowSortedDown } from "react-icons/ti";

const options = [
  "Today", "Yesterday", "This Week", "Last Week", 
  "This Month", "Last Month", "This Year", "Last Year"
];

export const CustomDateDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("This Month");
  const {setStartDate, setEndDate}= useDashboardStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    const { startDate, endDate } = getRangeDates(option);
    setStartDate(startDate)
    setEndDate(endDate)
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full lg:w-fit items-center justify-between px-3 h-12 text-sm font-medium text-gray-700 bg-white border border-blue-300 rounded-xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          {selected}
        </div>
        <TiArrowSortedDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 z-50 mt-2 w-full lg:w-48 origin-top-right bg-white border border-gray-200 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 p-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`
                  flex items-center w-full px-3 py-2 text-[15px] rounded-md transition-colors
                  ${selected === option 
                    ? "bg-indigo-50 text-indigo-700 font-semibold" 
                    : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};