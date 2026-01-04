"use client";
import { BsPencil, BsPlus } from "react-icons/bs";
import { useMenuItemStore } from "@/models/menuItems/store";
import { LiaTimesSolid } from "react-icons/lia";

export default function MenuItemFormHeader() {
  const { activeModal, closeModal } = useMenuItemStore();
  const isCreate = activeModal === "create";

  return (
    <div className="flex border-b border-gray-300 px-3 py-2 items-center gap-2">
      <div className="h-10 w-10 sm:h-8 sm:w-8 rounded-full bg-blue-50 border-2 border-blue-300 grid place-content-center">
        {isCreate ? (
          <BsPlus className="text-2xl sm:text-xl text-blue-600" />
        ) : (
          <BsPencil className="text-lg sm:text-base text-blue-600" />
        )}
      </div>

      <div className="flex flex-col">
        <p className="text-base sm:text-lg md:text-xl font-semibold">
          {isCreate ? "Create Menu Item" : "Update Menu Item"}
        </p>

        <p className="text-xs sm:text-[10px] text-gray-600">
          {isCreate
            ? "Fill in the menu item details"
            : "Edit the menu item information"}
        </p>
      </div>

      <LiaTimesSolid
        onClick={closeModal}
        className="text-xl sm:text-lg stroke-1 cursor-pointer duration-300 hover:scale-105 text-red-600 ml-auto mr-2"
      />
    </div>
  );
}
