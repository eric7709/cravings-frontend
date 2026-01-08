import Image from 'next/image';
import React from 'react'
type Props = {
    status: "available" | "occupied" | "selected" | "driver";
    seatNumber?: number
    className?: string
};

export const BusSeat = ({ status, seatNumber, className }: Props) => {
    const bg = status == "available" ? "bg-green-300" : status == "occupied" ? "bg-red-300" : status == "driver" ? "bg-blue-300" : "bg-gray-300"
    const border = status == "available" ? "border-green-500" : status == "occupied" ? "border-red-500" : status == "driver" ? "border-blue-500" : "border-gray-500"
    return (
        <div className={`${className}`}>
            <div className=" h-14 w-[72px] bg-gray-600 relative flex items-end p-[7px] justify-center rounded-3xl rounded-t-sm ">
                {status == "driver" && <Image src="/driver.png" alt="" className='absolute shadow-lg rounded-full z-20 h-10 w-10 -top-8 ' />}
                <div className={`h-[60px] border w-full ${border} relative grid rounded-t-lg place-content-center rounded-2xl ${bg}`}>
                    {status != "driver" &&
                        <p className='font-bold '>{seatNumber}</p>
                    }
                    <div className="absolute -bottom-0.5 left-1/2 bg-gray-600 -translate-x-1/2 w-9 h-2.5 rounded-t-md shadow-inner" />
                </div>
            </div>
        </div>
    )
}
