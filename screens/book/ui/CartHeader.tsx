"use client";
import { LiaTimesSolid } from "react-icons/lia";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useBook } from "../store/useBook";

export default function CartHeader() {
    const {openOrderClearModal, closeModal} = useBook()
    return (
        <div className="fixed top-0 w-full left-0  flex justify-between items-center px-4 py-5 z-40 bg-white/0 border-b border-gray-200 backdrop-blur">
            <IoIosRemoveCircleOutline onClick={openOrderClearModal} className="text-2xl cursor-pointer invisible text-gray-700"/>
            <p className="uppercase font-bold ">Your SELECTIONS</p>
            <LiaTimesSolid onClick={closeModal} className="text-xl cursor-pointer stroke-1 text-gray-700"/>
        </div>
    );
}
