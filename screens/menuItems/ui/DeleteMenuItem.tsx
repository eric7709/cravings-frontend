'use client';
import { useDeleteMenuItem } from "@/models/menuItems/hook";
import { useMenuItemStore } from "@/models/menuItems/store";
import Backdrop from "@/shared/ui/Backdrop";
import { FaTrashAlt } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { CancelButton } from "@/shared/ui/CancelButton";

export default function DeleteMenuItem() {
  const { activeModal, closeModal, selectedMenuItem, removeMenuItem } = useMenuItemStore();
  const { mutate, isPending } = useDeleteMenuItem();

  const handleDelete = () => {
    if (selectedMenuItem) {
      mutate(selectedMenuItem.id, {
        onSuccess: () => {
          removeMenuItem(selectedMenuItem.id);
          closeModal();
        },
        onError: console.error
      });
    }
  };

  return (
    <Backdrop modalOpened={activeModal === "delete"} closeModal={closeModal}>
      <div className="px-4">
        {/* Width reduced from 380px to 288px (w-72) */}
        <div className="w-full sm:w-72 bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Header - Tightened layout and icon size */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-red-100 bg-red-50">
            <div className="h-7 w-7 rounded-full bg-red-600 grid place-content-center shadow-sm">
              <FaTrashAlt className="text-xs text-white" />
            </div>
            <p className="text-sm font-bold text-red-700">Delete Item</p>
            <LiaTimesSolid
              onClick={closeModal}
              className="text-lg cursor-pointer text-red-400 hover:text-red-600 transition-colors ml-auto"
            />
          </div>

          {/* Body - Reduced gaps and font sizes */}
          <div className="flex flex-col items-center gap-2 px-5 py-5 text-center">
            <p className="text-xs font-medium text-gray-600">
              Confirm deletion of:
            </p>
            <p className="text-lg font-bold text-gray-800 leading-tight">
              {selectedMenuItem?.name}
            </p>
            <p className="text-[11px] text-gray-400">
              This action is permanent.
            </p>
          </div>

          {/* Footer - Scaled down to match 150% display density */}
          <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-50 bg-gray-50/30">
            <div className="scale-90 origin-right flex gap-2">
              <CancelButton onClick={closeModal} />
              <LoadingButton
                text="Delete"
                isDelete
                loadingText="..."
                isLoading={isPending}
                onClick={handleDelete}
                className="px-4 py-1.5 rounded-lg bg-red-600 text-white font-semibold text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}