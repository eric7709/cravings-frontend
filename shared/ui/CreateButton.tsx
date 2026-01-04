import { BsPlus } from "react-icons/bs";

type Props = {
    title: string
    className?: string
    onClick?: () => void
}

export default function CreateButton({ title, onClick, className}: Props) {

    return (
        <button
            onClick={onClick}
            className={`bg-gradient-to-br from-blue-400 via-blue-500 to-blue-500 flex text-sm font-semibold text-white border border-blue-600 items-center gap-1 shadow shadow-gray-400 cursor-pointer duration-300 active:scale-90 hover:bg-blue-600 rounded-full py-2.5 lg:py-3 px-4 ${className}`}
        >
            <BsPlus size={23} className="font-bold hidden lg:block stroke-1" />
            <BsPlus size={20} className="font-bold lg:hidden stroke-1" />
            {title}
        </button>
    );
}
