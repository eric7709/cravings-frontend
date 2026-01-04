"use client"
import { useSyncCustomers } from '../hooks/useSyncCustomers'
import Header from './Header'
import Table from './Table'

export default function Base() {
  useSyncCustomers()
  return (
    <div className=' flex-1 overflow-y-auto flex flex-col'>
      <Header />
      <Table />
    </div>
  )
}
