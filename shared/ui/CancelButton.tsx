"use client";

import { VscLoading } from "react-icons/vsc";

type LoadingButtonProps = {
    text?: string;               // normal text
    onClick?: () => void;       // click handler
    className?: string;
};

export function CancelButton({
    text,
    onClick,
    className = "",
}: LoadingButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
        flex items-center py-2.5 px-5 justify-center gap-2 duration-300 
        rounded-full border-2 bg-gray-200 text-gray-600 border-gray-300 shadow-md disabled:shadow-none cursor-pointer font-semibold
        disabled:opacity-80 text-sm lg:text-base disabled:cursor-not-allowed
      `}
        >
            <span>{text ?? "Cancel"}</span>
        </button>
    );
}
