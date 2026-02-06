import { PackageSearch } from 'lucide-react'

type Props = {
    title: string
    subTitle?: string
}

export default function AdjustSearch({ title, subTitle = "Try adjusting filters or date range" }: Props) {

    return (
        <div className="p-8 flex-1 flex  flex-col justify-center items-center text-center text-gray-500">
            <PackageSearch className="w-13 h-13 mb-2 text-gray-400" />
            <p className="text-[15px] font-semibold">No {title} found</p>
            <p className="text-[13px] mt-2">
                {subTitle}
            </p>
        </div>
    )
}
