'use client';
import { useDeleteTable } from "@/models/table/hooks";
import { useTableStore } from "@/models/table/store";
import Backdrop from "@/shared/ui/Backdrop";
import { CancelButton } from "@/shared/ui/CancelButton";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { FaTrashAlt } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";

export default function DeleteTable() {
  const { activeModal, closeModal, selectedTable, openDeleteModal, removeTable } = useTableStore();
  const { mutate, isPending } = useDeleteTable();

  const handleDelete = () => {
    openDeleteModal();
    if (selectedTable) {
      mutate(selectedTable.id, {
        onSuccess: (data) => {
          removeTable(data);
          closeModal();
        }
      });
    }
  };

  return (
    <Backdrop modalOpened={activeModal === "delete"} closeModal={closeModal}>
      <div className="px-2 sm:px-4">
        <div className="w-full sm:w-[380px] bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 bg-red-50 border-b border-red-200">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-600 text-white grid place-content-center shadow-md">
                <FaTrashAlt className="text-lg sm:text-xl" />
              </div>
              <p className="text-md sm:text-lg font-semibold text-red-700">Delete Table</p>
            </div>
            <LiaTimesSolid
              onClick={closeModal}
              className="text-lg sm:text-xl stroke-1 cursor-pointer text-red-600 hover:scale-110 duration-200"
            />
          </div>

          {/* Body */}
          <div className="px-4 sm:px-6 py-6 sm:py-8 text-center flex flex-col items-center gap-3 sm:gap-4">
            <p className="text-gray-700 text-sm sm:text-base font-medium">
              You are about to <span className="font-semibold text-red-600">delete</span> this table:
            </p>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="h-11 w-11 border-2 border-red-500 grid place-content-center text-xl font-bold text-red-600 rounded-full">
                <p> {selectedTable?.tableNumber}</p>
              </div>
              <p className="text-lg sm:text-xl uppercase font-bold text-gray-800">{selectedTable?.tableName}</p>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              This action cannot be undone.
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end text-xs sm:text-sm gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
            <CancelButton onClick={closeModal} />
            <LoadingButton
              isDelete
              text="Delete"
              loadingText="Deleting..."
              isLoading={isPending}
              onClick={handleDelete}
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-red-600 text-white shadow-md hover:bg-red-700 font-semibold text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>
    </Backdrop>
  );
}
