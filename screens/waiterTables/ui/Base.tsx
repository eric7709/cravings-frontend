"use client"
import TableList from './TableList'
import { useSyncWaiterTables } from '../hooks/useSyncWaiterTables'

export default function Base() {
    useSyncWaiterTables()
    return <TableList />
}
