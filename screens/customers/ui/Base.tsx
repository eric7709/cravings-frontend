"use client"
import { useSyncCustomers } from '../hooks/useSyncCustomers'
import CustomerFilter from './CustomerFilter'
import CustomerSummary from './CustomerSummary'
import Table from './Table'

export default function Base() {
  useSyncCustomers()
  return (
    <div className='flex-1 relative flex flex-col'>
      <CustomerSummary />
      <CustomerFilter />
      <Table />
    </div>
  )
}
