"use client";
import { useMenuItemStore } from '@/models/menuItems/store';
import Backdrop from '@/shared/ui/Backdrop';
import MenuItemFormHeader from './MenuItemFormHeader';
import MenuItemFormFooter from './MenuItemFormFooter';
import MenuItemFormInputs from './MenuItemFormInputs';
import MenuItemImage from './MenuItemImage';


export default function MenuItemForm() {
  const { closeModal, activeModal } = useMenuItemStore();

  return (
    <Backdrop closeModal={closeModal} modalOpened={activeModal === "create" || activeModal === "update"}>
      <div className="px-4">
        <div className="w-full lg:w-[450px] max-h-[80%] flex flex-col bg-white rounded-t-3xl rounded-b-2xl border border-gray-100 shadow-md">
          <MenuItemFormHeader />
          <div className="flex-1 overflow-y-auto">
            <MenuItemImage />
            <MenuItemFormInputs />
          </div>
          <MenuItemFormFooter />
        </div>
      </div>
    </Backdrop>
  );
}
