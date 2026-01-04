import { PackageSearch } from 'lucide-react'

type Props = {
    title: string
}

export default function AdjustSearch({ title }: Props) {

    return (
        <div className="p-8 flex-1 flex  flex-col justify-center items-center text-center text-gray-500">
            <PackageSearch className="w-14 lg:w-16 h-14 lg:h-16 mb-4 text-gray-400" />
            <p className="text-xl lg:text-2xl font-semibold">No {title} found</p>
            <p className="text-base mt-2">
                Try adjusting filters or date range
            </p>
        </div>
    )
}
