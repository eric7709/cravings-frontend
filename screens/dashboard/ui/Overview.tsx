import TopCategories from './TopCategories'
import TopMenuItems from './TopMenuItems'
import TopTables from './TopTables'
import { useDashboardStore } from '@/models/dashboard/store'

export default function Overview() {
    const { overview } = useDashboardStore()

    return (
        <div className='mt-1'>
            {overview?.topCategories && overview.topCategories.length > 0 ?
                <div className="grid  p-4 gap-4 xl:grid-cols-3">
                    <TopCategories />
                    <TopMenuItems />
                    <TopTables />
                </div>
                :
                <div className='mb-5'></div>
            }
        </div>
    )
}
