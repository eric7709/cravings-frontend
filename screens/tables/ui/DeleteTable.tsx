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
      <div className="px-4">
        {/* Reduced max-width from w-80 to w-72 for a tighter feel */}
        <div className="w-full sm:w-72 bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header - Reduced padding and font sizes */}
          <div className="flex items-center justify-between px-4 py-2 bg-red-50 border-b border-red-100">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-red-600 text-white grid place-content-center shadow-sm">
                <FaTrashAlt className="text-xs" />
              </div>
              <p className="text-sm font-bold text-red-700">Delete Table</p>
            </div>
            <LiaTimesSolid
              onClick={closeModal}
              className="text-lg cursor-pointer text-red-400 hover:text-red-600 transition-colors"
            />
          </div>

          {/* Body - Tightened spacing */}
          <div className="px-5 py-5 text-center flex flex-col items-center gap-3">
            <p className="text-gray-600 text-xs font-medium">
              Are you sure you want to <span className="text-red-600">delete</span>:
            </p>

            <div className="flex items-center gap-3 py-1">
              <div className="h-9 w-9 border-2 border-red-500 grid place-content-center text-base font-bold text-red-600 rounded-full">
                {selectedTable?.tableNumber}
              </div>
              <p className="text-lg uppercase font-bold text-gray-800 tracking-tight">
                {selectedTable?.tableName}
              </p>
            </div>

            <p className="text-[11px] text-gray-400">
              This action is permanent.
            </p>
          </div>

          {/* Footer - Reduced height and button scaling */}
          <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50/50 border-t border-gray-100">
            <div className="scale-90 origin-right flex gap-2">
                <CancelButton onClick={closeModal} />
                <LoadingButton
                  isDelete
                  text="Delete"
                  loadingText="..."
                  isLoading={isPending}
                  onClick={handleDelete}
                  className="px-4 py-1.5 rounded-lg bg-red-600 text-white font-semibold text-xs shadow-sm hover:bg-red-700"
                />
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}