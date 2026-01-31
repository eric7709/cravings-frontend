import { FieldErrors, UseFormRegister } from 'react-hook-form'
import FormInput from '@/shared/ui/FormInput';
import { CategoryValues } from '@/models/categories/types';
import { useCategoryStore } from '@/models/categories/store';

type Props = {
    register: UseFormRegister<CategoryValues>
    errors: FieldErrors<CategoryValues>
    isPending: boolean
    onSubmit: () => Promise<void>
}

export default function CategoryForm({ errors, onSubmit, isPending, register }: Props) {
    const { closeModal, activeModal } = useCategoryStore()
    const submitText = activeModal === "create" ? "Create" : "Update"
    const loadingText = activeModal === "create" ? "Creating..." : "Updating..."
    const title = activeModal == "create" ? "Create Category" : activeModal == "update" ? "Update Category" : ""
    const isOpen = activeModal == "create" || activeModal == "update"
    return (
        <div className={`fixed bg-black/50 z-20000 grid grid-cols-[1fr_auto] inset-0 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} duration-300`}>
            <div className="" onClick={closeModal}></div>
            <div className={`bg-white flex border-l border-gray-100 flex-col ${isOpen ? "w-84" : "w-0"} h-dvh duration-300 `}>
                <div className="text-[15px] px-4 flex items-center h-12 border-b border-gray-200 shadow shadow-gray-100 font-semibold">
                    <p>{title}</p>
                </div>
                <div
                    key="category-form"
                    className="space-y-4 p-4 flex-1 overflow-y-auto"
                >
                    <FormInput
                        label='Category Name'
                        capitalize
                        {...register('name', { required: "Category name is required" })}
                        error={errors.name?.message as string}
                    />
                    <FormInput
                        textarea
                        label='Description'
                        {...register('description')}
                        error={errors.description?.message as string}
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
