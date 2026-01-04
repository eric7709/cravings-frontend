"use client";

import { BiSearch } from "react-icons/bi";
import { style } from "../style/style";
import { InputHTMLAttributes } from "react";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  icon?: React.ReactNode;
  center?:boolean
}

export default function Search({
  placeholder = "Search...",
  icon,
  center,
  className = "",
  ...props
}: SearchProps) {
  return (
    <div className={`h-12 relative ${className}`}>
      <div className={`absolute top-1/2 ${center ? "left-1/2 -translate-x-1/2": " left-4"} -translate-y-1/2 pointer-events-none text-xl text-gray-400`}>
        {icon || <BiSearch />}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={`${style} ${center && "text-center"} outline-none pl-11 h-full w-full`}
        {...props}
      />
    </div>
  );
}
