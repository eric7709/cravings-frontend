"use client";

import { VscLoading } from "react-icons/vsc";

type LoadingButtonProps = {
  text: string;               // normal text
  loadingText?: string;       // optional text while loading
  isLoading?: boolean;        // loading state
  onClick?: () => void;       // click handler
  className?: string;    
  isDelete?: boolean     // optional Tailwind classes
};

export function LoadingButton({
  text,
  loadingText,
  isLoading = false,
  isDelete ,
  onClick,
  className = "",
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        flex items-center py-2.5 ${isLoading ? "px-4": "px-5"} justify-center gap-2 duration-300 text-white
        rounded-full border-2 ${isDelete ? "bg-red-500  border-red-600" : "bg-blue-500 border-blue-700 hover:bg-blue-600"} shadow-md disabled:shadow-none cursor-pointer font-semibold
        disabled:opacity-80 text-sm lg:text-base disabled:cursor-not-allowed
      `}
    >
      {isLoading && <VscLoading className="animate-spin text-white stroke-1 text-xl" />}
      <span>{isLoading ? loadingText ?? text : text}</span>
    </button>
  );
}
