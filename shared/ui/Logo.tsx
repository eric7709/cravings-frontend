import { BiFoodTag } from 'react-icons/bi'

export default function Logo() {
    return (
        <div className="relative  flex items-center gap-2">
            <div className="h-9 w-9 xl:h-11 xl:w-11 rounded-full bg-linear-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center shadow-md shadow-blue-500/30">
                <BiFoodTag className="w-5 h-5 xl:w-6 xl:h-6 text-white" fill="white" />
            </div>
            <p className="text-xl xl:text-2xl text-orange-600 font-semibold xl:font-bold  tracking-tight">
                Cravings
            </p>
        </div>
    )
}
