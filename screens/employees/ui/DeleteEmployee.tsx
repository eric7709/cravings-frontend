'use client';
import { useEmployeeStore } from "@/models/employee/store";
import Backdrop from "@/shared/ui/Backdrop";
import { MdOutlineDelete } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { useDeleteEmployee } from "@/models/employee/hooks";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { CancelButton } from "@/shared/ui/CancelButton";

export default function DeleteEmployee() {
  const { activeModal, closeModal, selectedEmployee, removeEmployee } = useEmployeeStore();
  const { mutate, isPending } = useDeleteEmployee();

  const handleDelete = () => {
    if (selectedEmployee) {
      mutate(selectedEmployee.id, {
        onSuccess: () => {
          removeEmployee(selectedEmployee.id);
          closeModal();
        },
        onError: console.error
      });
    }
  };

  return (
    <Backdrop modalOpened={activeModal === "delete"} closeModal={closeModal}>
      <div className="px-4">
        {/* Adjusted width to 72 (288px) and rounded to 2xl */}
        <div className="w-full sm:w-72 bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Header - Scaled down height and padding */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-red-100 bg-red-50">
            <div className="h-7 w-7 rounded-full bg-red-600 grid place-content-center shadow-sm">
              <MdOutlineDelete className="text-sm text-white" />
            </div>
            <p className="text-sm font-bold text-red-700">Delete Employee</p>
            <LiaTimesSolid
              onClick={closeModal}
              className="text-lg cursor-pointer text-red-400 hover:text-red-600 transition-colors ml-auto"
            />
          </div>

          {/* Body - Condensed spacing for 150% zoom */}
          <div className="flex flex-col items-center gap-2 px-5 py-5 text-center">
            <p className="text-xs font-medium text-gray-600">
              Confirm deletion of:
            </p>
            <p className="text-lg font-bold text-gray-800 leading-tight">
              {selectedEmployee?.firstName} {selectedEmployee?.lastName}
            </p>
            <p className="text-[11px] text-gray-400">
              This action cannot be undone.
            </p>
          </div>

          {/* Footer - Consistent with LoadingButton scaling */}
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