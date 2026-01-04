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
      <div className="px-2 sm:px-4">
        <div className="w-full sm:w-[380px] bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-b border-red-200 bg-red-50">
            <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-red-600 grid place-content-center shadow-md">
              <FaTrashAlt className="text-lg sm:text-2xl text-white" />
            </div>
            <p className="text-md sm:text-xl font-semibold text-red-700">Delete Menu Item</p>
            <LiaTimesSolid
              onClick={closeModal}
              className="text-lg sm:text-2xl stroke-1 cursor-pointer text-red-600 hover:scale-110 duration-200 ml-auto"
            />
          </div>

          {/* Body */}
          <div className="flex flex-col items-center gap-2 sm:gap-4 px-3 sm:px-6 py-4 sm:py-6 text-center">
            <p className="text-sm sm:text-base text-gray-700 font-medium">
              You are about to <span className="font-semibold text-red-600">delete</span> this menu item:
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-800">
              {selectedMenuItem?.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 text-xs sm:text-sm">
            <CancelButton onClick={closeModal}/>
            <LoadingButton
              text="Delete"
              isDelete
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
