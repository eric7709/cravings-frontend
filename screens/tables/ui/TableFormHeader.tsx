"use client"
import { BsPencil, BsPlus } from 'react-icons/bs'
import { LiaTimesSolid } from 'react-icons/lia'
import { useTableStore } from '@/models/table/store';

export default function TableFormHeader() {
    const { activeModal, closeModal } = useTableStore()
    const isCreate = activeModal === "create";

    return (
        <div className='flex border-b border-gray-300 px-2 sm:px-4 py-2 sm:py-3 items-center gap-2 sm:gap-3'>
            
            {/* Icon Circle */}
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-50 border-2 border-blue-300 grid place-content-center">
                {isCreate ? (
                    <BsPlus className='text-2xl sm:text-3xl text-blue-600' />
                ) : (
                    <BsPencil className='text-lg sm:text-xl text-blue-600' />
                )}
            </div>

            {/* Text */}
            <div>
        <p className="text-base sm:text-lg md:text-xl font-semibold">
                    {isCreate ? "Create Table" : "Update Table"}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                    {isCreate
                        ? "Provide table information"
                        : "Modify table details"}
                </p>
            </div>

            {/* Close Button */}
            <LiaTimesSolid
                onClick={closeModal}
                className="text-xl sm:text-2xl stroke-1 cursor-pointer duration-300 hover:scale-105 text-red-600 ml-auto mr-1 sm:mr-2"
            />
        </div>
    )
}
