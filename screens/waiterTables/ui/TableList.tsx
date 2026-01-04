import TableCard from './TableCard'
import { useTableStore } from '@/models/table/store'

export default function TableList() {
  const { tables } = useTableStore()

  const sortedTables = [...tables].sort((a, b) => a.tableNumber - b.tableNumber);
  return (
    <div className='p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid gap-5'>
      {sortedTables.map((table) => (
        <TableCard table={table} key={table.id} />
      ))}
    </div>
  )
}
