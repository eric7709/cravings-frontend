"use client";

type CancelButtonProps = {
    text?: string;
    onClick?: () => void;
    className?: string;
    isLoading?: boolean;
};

export function CancelButton({
    text,
    onClick,
    isLoading,
    className = "",
}: CancelButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={`
                flex items-center justify-center gap-2 duration-200 
                py-1.5 px-4 rounded-xl border-b-2 font-bold text-xs
                ${isLoading 
                    ? "cursor-not-allowed text-gray-400 bg-gray-100 border-gray-200" 
                    : "cursor-pointer bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 active:border-b-0 active:translate-y-[1px]"
                }
                ${className}
            `}
        >
            <span>{text ?? "Cancel"}</span>
        </button>
    );
}