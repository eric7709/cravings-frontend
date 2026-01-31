import { FieldErrors, UseFormRegister } from 'react-hook-form'
import FormInput from '@/shared/ui/FormInput';
import { useEmployeeStore } from '@/models/employee/store';
import { TableValues } from '@/models/table/types';
import { useTableStore } from '@/models/table/store';


type Props = {
    register: UseFormRegister<TableValues>
    errors: FieldErrors<TableValues>
    isPending: boolean
    onSubmit: () => Promise<void>
}

export default function TableForm({ errors, onSubmit, isPending, register }: Props) {
    const { waiterOptions, cashierOptions } = useEmployeeStore(); // ✅ waiter options
    const { closeModal, activeModal } = useTableStore()
    const submitText = activeModal === "create" ? "Create" : "Update"
    const loadingText = activeModal === "create" ? "Creating..." : "Updating..."
    const title = activeModal == "create" ? "Create Table" : activeModal == "update" ? "Update Table" : ""
    const isOpen = activeModal == "create" || activeModal == "update"
    return (
        <div className={`fixed bg-black/20 z-20000 grid grid-cols-[1fr_auto] inset-0 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} duration-300`}>
            <div className="" onClick={closeModal}></div>
            <div className={`bg-white flex border-l border-gray-100 flex-col ${isOpen ? "w-84" : "w-0"} h-dvh duration-300 `}>
                <div className="text-[15px] px-4 flex items-center h-12 border-b border-gray-200 shadow shadow-gray-100 font-semibold">
                    <p>{title}</p>
                </div>
                <div
                    key="employee-form"
                    className="space-y-4 p-4 flex-1 overflow-y-auto"
                >
                    <FormInput
                        label="Table Name"
                        {...register("tableName", { required: "Table name is required" })}
                        placeholder="Arkansas"
                        error={errors.tableName?.message}
                    />
                    <FormInput
                        label="Table Number"
                        {...register("tableNumber")}
                        placeholder="3"
                        error={errors.tableNumber?.message}
                    />
                    <FormInput
                        label="Status"
                        {...register("status")}
                        options={availabilityOptions}
                        error={errors.status?.message}
                    />

                    <FormInput
                        label="Capacity"
                        {...register("capacity")}
                        placeholder="4"
                        error={errors.capacity?.message}
                    />

                    <FormInput
                        label="Waiter"
                        {...register("waiterId")}
                        placeholder="Select a Waiter"
                        options={waiterOptions}
                    />
                    <FormInput
                        label="Cashier"
                        {...register("cashierId")}
                        placeholder="Select a Cashier"
                        options={cashierOptions}
                    />
                </div>
                <div className='px-4 py-1.5 flex justify-end gap-2 border-t border-gray-200'>
                    <button onClick={closeModal} className='px-5 duration-300 active:scale-90 cursor-pointer py-2.5 font-semibold text-xs bg-red-600 hover:bg-red-700 rounded-full shadow-md border-2 text-white'>Cancel</button>
                    <button onClick={onSubmit} className='px-5 duration-300 active:scale-90 cursor-pointer py-2.5 font-semibold text-xs bg-blue-600 hover:bg-blue-700 rounded-full shadow-md border-2 text-white'>{isPending ? loadingText : submitText}</button>
                </div>
            </div>
        </div>
    )
}


const availabilityOptions = [
    { label: "Available", value: "AVAILABLE" },
    { label: "Unavailable", value: "UNAVAILABLE" },
];