"use client";

type LoadingButtonProps = {
    text?: string;               // normal text
    onClick?: () => void;       // click handler
    className?: string;
    isLoading?: boolean
};

export function CancelButton({
    text,
    onClick,
    isLoading,
    className = "",
}: LoadingButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={` ${isLoading ? "cursor-not-allowed shadow-none text-gray-300 bg-gray-100  border-gray-200" : "cursor-pointer bg-gray-200  border-gray-300 text-gray-600 shadow-md "}
        flex items-center py-2.5 px-5 justify-center gap-2 duration-300 
        rounded-full border-2  font-semibold
        disabled:opacity-80 text-sm lg:text-base 
      `}
        >
            <span>{text ?? "Cancel"}</span>
        </button>
    );
}
