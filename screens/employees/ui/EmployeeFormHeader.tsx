"use client"
import { BsPencil, BsPlus } from 'react-icons/bs'
import { useEmployeeStore } from '@/models/employee/store';
import { LiaTimesSolid } from 'react-icons/lia';

export default function EmployeeFormHeader() {
    const { activeModal, closeModal } = useEmployeeStore()
    const isCreate = activeModal === "create";

    return (
        <div className='flex border-b border-gray-300 px-4 py-3 items-center gap-3'>
            <div className="h-12 w-12 rounded-full bg-blue-50 border-2 border-blue-300 grid place-content-center">
                {isCreate ? (
                    <BsPlus className='text-2xl lg:text-3xl text-blue-600' />
                ) : (
                    <BsPencil className='text-lg lg:text-xl text-blue-600' />
                )}
            </div>

            <div>
        <p className="text-base sm:text-lg md:text-xl font-semibold">
                    {isCreate ? "Create Employee" : "Update Employee"}
                </p>

                <p className="text-xs lg:text-sm text-gray-600">
                    {isCreate
                        ? "Provide employee information"
                        : "Modify employee details"}
                </p>
            </div>

            <LiaTimesSolid
                onClick={closeModal}
                className="text-xl lg:text-2xl stroke-1 cursor-pointer duration-300 hover:scale-105 text-red-600 ml-auto mr-2"
            />
        </div>
    )
}
