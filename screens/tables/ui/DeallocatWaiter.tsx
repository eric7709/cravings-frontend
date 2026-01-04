"use client";

import { useUpdateTable } from "@/models/table/hooks";
import { useTableStore } from "@/models/table/store";
import Backdrop from "@/shared/ui/Backdrop";
import { BsPersonXFill } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";
import { VscLoading } from "react-icons/vsc";

export default function DeallocateWaiter() {
  const { activeModal, closeModal, selectedTable, updateTable } = useTableStore();
  const { mutate, isPending } = useUpdateTable()
  const deallocate = () => {
    if (selectedTable) {
      mutate({ data: { ...selectedTable, waiterId: null }, id: selectedTable.id }, {
        onSuccess: (data) => {
          updateTable(data)
          closeModal()
        }
      })
    }
  }


  return (
    <Backdrop closeModal={closeModal} modalOpened={activeModal === "deallocate"}>
      <div className="w-[420px] bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-red-50 border-b border-red-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-red-600 text-white grid place-content-center shadow-md">
              <BsPersonXFill className="text-2xl" />
            </div>
            <p className="text-xl font-semibold text-red-700">Deallocate Waiter</p>
          </div>
          <LiaTimesSolid
            onClick={closeModal}
            className="text-2xl stroke-1 cursor-pointer text-red-600 hover:scale-110 duration-200 ml-auto"
          />
        </div>

        {/* Body */}
        <div className="px-6 py-8 text-center">
          <p className="text-gray-700 text-base">
            You are about to <span className="font-semibold text-red-600">deallocate</span>{" "}
            <b>{selectedTable?.waiterName}</b> from Table{" "}
            <b>{selectedTable?.tableNumber}</b>.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This action can be undone by re-allocating a waiter to this table later.
          </p>
        </div>

        {/* Footer / Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={closeModal}
            className="px-5 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 font-semibold transition"
          >
            Cancel
          </button>
          <button onClick={deallocate} className="px-5 py-2 rounded-xl bg-red-600 text-white shadow-md hover:bg-red-700 font-semibold transition">
            {isPending ? <VscLoading />
              :
              "Continue"
            }
          </button>
        </div>

      </div>
    </Backdrop>
  );
}
