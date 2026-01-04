import { Plus } from "lucide-react";
import { useTableStore } from "@/models/table/store";
import { BsPlus } from "react-icons/bs";

export default function CreateTableButton() {
  const { openCreateModal } = useTableStore();

  return (
    <button
      onClick={openCreateModal}
      className="bg-blue-500 flex font-semibold text-white border border-blue-700 items-center gap-1 shadow-md shadow-gray-400 cursor-pointer duration-300 active:scale-90 hover:bg-blue-600 rounded-full py-3 px-4"
    >
      <BsPlus size={23} className="font-bold stroke-1" />
      Create Table
    </button>
  );
}
