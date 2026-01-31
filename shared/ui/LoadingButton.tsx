"use client";

import { VscLoading } from "react-icons/vsc";

type LoadingButtonProps = {
  text: string;
  loadingText?: string;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;    
  isDelete?: boolean;
};

export function LoadingButton({
  text,
  loadingText,
  isLoading = false,
  isDelete,
  onClick,
  className = "",
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        flex items-center justify-center gap-1.5 duration-200 text-white
        py-1.5 px-4 rounded-xl border-b-2 font-bold text-xs tracking-tight
        ${isDelete 
          ? "bg-red-600 border-red-800 hover:bg-red-700 active:border-b-0 active:translate-y-[1px]" 
          : "bg-blue-600 border-blue-800 hover:bg-blue-700"
        } 
        shadow-sm disabled:opacity-70 disabled:cursor-not-allowed ${className}
      `}
    >
      {isLoading && <VscLoading className="animate-spin text-white text-xs" />}
      <span>{isLoading ? (loadingText ?? text) : text}</span>
    </button>
  );
}