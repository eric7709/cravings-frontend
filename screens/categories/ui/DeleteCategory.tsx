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
    });
  };

  return (
    <Backdrop modalOpened={activeModal === "delete"} closeModal={closeModal}>
      <div className="px-4">
        {/* Width reduced to w-72 (288px) to match other modals */}
        <div className="w-full sm:w-72 bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Header - Scaled down padding and icon */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-red-100 bg-red-50">
            <div className="h-7 w-7 rounded-full bg-red-600 grid place-content-center shadow-sm">
              <MdOutlineDelete className="text-sm text-white" />
            </div>
            <p className="text-sm font-bold text-red-700">Delete Category</p>
          </div>

          {/* Body - Tighter vertical spacing */}
          <div className="flex flex-col items-center gap-2 px-5 py-5 text-center">
            <p className="text-xs font-medium text-gray-600">
              Confirm deletion of:
            </p>
            <p className="text-lg font-bold text-gray-800 capitalize leading-tight">
              {selectedCategory?.name}
            </p>
            <p className="text-[11px] text-gray-400">
              This action is permanent.
            </p>
          </div>

          {/* Footer - Scaled down buttons */}
          <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-50 bg-gray-50/30">
            <div className="scale-90 origin-right flex gap-2">
              <CancelButton onClick={closeModal} />
              <LoadingButton
                isDelete
                text="Delete"
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