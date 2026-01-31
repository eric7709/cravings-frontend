import { EmployeeFormValues } from '../hooks/useEmployeeForm'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import FormInput from '@/shared/ui/FormInput';
import { useEmployeeStore } from '@/models/employee/store';

type Props = {
    register: UseFormRegister<EmployeeFormValues>
    errors: FieldErrors<EmployeeFormValues>
    isPending: boolean
    onSubmit: () => Promise<void>
}

export default function EmployeeForm({ errors, onSubmit, isPending, register }: Props) {
    const { closeModal, activeModal } = useEmployeeStore()
    const submitText = activeModal === "create" ? "Create" : "Update"
    const loadingText = activeModal === "create" ? "Creating..." : "Updating..."
    const title = activeModal == "create" ? "Create Employee" : activeModal == "update" ? "Update Employee": "" 
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
                        label="First Name"
                        capitalize
                        placeholder="Samuel"
                        {...register("firstName", { required: "First name is required" })}
                        error={errors.firstName?.message}
                    />
                    {/* Last Name */}
                    <FormInput
                        label="Last Name"
                        capitalize
                        placeholder="Johnson"
                        {...register("lastName", { required: "Last name is required" })}
                        error={errors.lastName?.message}
                    />

                    {/* Email */}
                    <FormInput
                        label="Email Address"
                        placeholder="samuel@example.com"
                        autoComplete="off"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        error={errors.email?.message}
                    />

                    {/* Phone Number */}
                    <FormInput
                        label="Phone Number"
                        placeholder="09012345678"
                        {...register("phoneNumber", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10,15}$/,
                                message: "Invalid phone number",
                            },
                        })}
                        error={errors.phoneNumber?.message}
                    />

                    {/* Gender */}
                    <FormInput
                        label="Gender"
                        options={[
                            { label: "Male", value: "MALE" },
                            { label: "Female", value: "FEMALE" },
                        ]}
                        {...register("gender", { required: "Gender is required" })}
                        error={errors.gender?.message}
                    />
                    {/* Role */}
                    <FormInput

                        label="Role"
                        options={[
                            { label: "Waiter", value: "ROLE_WAITER" },
                            { label: "Chef", value: "ROLE_CHEF" },
                            { label: "Cashier", value: "ROLE_CASHIER" },
                            { label: "Manager", value: "ROLE_MANAGER" },
                        ]}
                        {...register("role", { required: "Role is required" })}
                        error={errors.role?.message}
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
