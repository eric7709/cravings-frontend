import { useOrderStore } from "@/models/orders/store"
import { Order } from "@/models/orders/types";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti"

export default function AdminHeaderSort() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef as any, () => setOpen(false), open);
  const { sortBy, setSortBy, direction, setDirection } = useOrderStore()
  const sortLabel = data.find(el => el.value == sortBy)
  return (
    <div  className="relative z-20">
      <div ref={dropdownRef} onClick={() => setOpen(!open)} className="px-4 h-11 text-[13px] xl:w-fit duration-300 cursor-pointer font-medium border-2 border-gray-300 text-gray-700 flex items-center gap-2 rounded-xl">
        <span>{sortLabel?.label}</span>
        <TiArrowSortedDown className={`duration-300 ml-auto xl:ml-0 ${open && "-rotate-180"}`}/>
      </div>
      <div className={`absolute top-[110%] left-0  xl:left-auto xl:right-0 duration-300 bg-white  w-full xl:w-64 rounded-xl shadow-md border-2 border-gray-200 ${open ? "opacity-100 visible translate-y-0" : "invisible translate-y-3 opacity-0"}`}>
        <div className="grid gap-3 text-[13px] grid-cols-2 p-3">
          <p onClick={() => setDirection("asc")} className={`flex duration-300 cursor-pointer justify-center border-2 rounded-full py-2 font-medium ${direction == "asc" ? "bg-blue-500 text-white border-blue-700" : "border-gray-200"}`}>ASC</p>
          <p onClick={() => setDirection("desc")} className={`flex duration-300 cursor-pointer justify-center border-2 rounded-full py-2 font-medium ${direction == "desc" ? "bg-blue-500 text-white border-blue-700" : "border-gray-200"}`}>DESC</p>
        </div>
        <div className=" overflow-y-auto">
          {data.map((el) => (
            <div key={el.value} className=" cursor-pointer  duration-300 border-gray-200 text-[13px] font-medium">
              <p onClick={() => setSortBy(el.value)} className={`py-2 px-4 duration-300 ${sortBy == el.value ? "bg-blue-600 font-medium text-white" : "text-gray-900 hover:bg-blue-100 hover:text-black"}`}>{el.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const data: { label: string; value: keyof Order }[] = [
  { label: 'Table Number', value: 'tableNumber' },
  { label: 'Waiter Name', value: 'waiterName' },
  { label: 'Cashier Name', value: 'cashierName' },
  { label: 'Table Name', value: 'tableName' },
  { label: 'Customer Name', value: 'customerName' },
  { label: 'Invoice Number', value: 'invoiceNumber' },
  { label: 'Payment Status', value: 'paymentStatus' },
  { label: 'Order Status', value: 'orderStatus' },
  { label: 'Quantity', value: 'quantity' },
  { label: 'Total', value: 'total' },
  { label: 'Created Date', value: 'createdAt' },
  { label: 'Updated Date', value: 'updatedAt' }
];
