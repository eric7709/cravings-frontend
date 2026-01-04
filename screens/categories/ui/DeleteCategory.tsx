'use client';
import { useDeleteCategory } from "@/models/categories/hook";
import { useCategoryStore } from "@/models/categories/store";
import Backdrop from "@/shared/ui/Backdrop";
import { MdOutlineDelete } from "react-icons/md";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { CancelButton } from "@/shared/ui/CancelButton";

export default function DeleteCategory() {
  const { closeModal, activeModal, selectedCategory, removeCategory } = useCategoryStore();
  const { mutate, isPending } = useDeleteCategory();

  const handleDelete = () => {
    if (!selectedCategory) return;

    mutate(selectedCategory.id, {
      onSuccess: () => {
        removeCategory(selectedCategory.id);
        closeModal();
      },
      onError: console.log,
    });
  };

  return (
    <Backdrop modalOpened={activeModal === "delete"} closeModal={closeModal}>
      <div className="px-2 sm:px-4">
        <div className="w-full sm:w-[380px] bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-b border-red-200 bg-red-50">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-600 grid place-content-center shadow-md">
              <MdOutlineDelete className="text-lg sm:text-2xl text-white" />
            </div>
            <p className="text-md sm:text-lg font-semibold text-red-700">Delete Category</p>
          </div>

          {/* Body */}
          <div className="flex flex-col items-center gap-2 sm:gap-4 px-3 sm:px-6 py-4 sm:py-6 text-center">
            <p className="text-sm sm:text-base text-gray-700 font-medium">
              You are about to <span className="font-semibold text-red-600">delete</span> this category:
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-800 capitalize">
              {selectedCategory?.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">This action cannot be undone.</p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 text-xs sm:text-sm">
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
