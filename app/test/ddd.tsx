import React from 'react'
import SeatContainer from './SeatsContainer'
import { ArrowRight } from 'lucide-react'

export default function page() {
  return (
    <div className='flex p-4 gap-3 flex-col'>
      <p className='flex items-center justify-between font-bold gap-3 text-2xl text-center'>LAGOS <ArrowRight /> AWKA</p>
      <p className='text-2xl text-center mb-2 font-bold'>$5,000.00</p>
      <div className="flex justify-between font-semibold text-sm flex-wrap">
        <div className="flex items-center gap-2 font-semibold">
          <div className="h-4 w-6 rounded-sm bg-red-300 border border-red-500"></div>
          <p>OCCUPIED</p>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <div className="h-4 w-6 rounded-sm bg-green-300 border border-green-500"></div>
          <p>AVAILABLE</p>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <div className="h-4 w-6 rounded-sm bg-gray-300 border border-gray-500"></div>
          <p>SELECTED</p>
        </div>
      </div>
      <SeatContainer />
    </div>
  )
}
