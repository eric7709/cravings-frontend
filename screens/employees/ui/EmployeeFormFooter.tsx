import { useEmployeeStore } from '@/models/employee/store'
import { CancelButton } from '@/shared/ui/CancelButton'
import { LoadingButton } from '@/shared/ui/LoadingButton'
import React from 'react'

type Props = {
    isPending: boolean
    onSubmit: () => Promise<void>
}

export default function EmployeeFormFooter({ onSubmit, isPending }: Props) {
    const { closeModal, activeModal } = useEmployeeStore()

    const submitText = activeModal === "create" ? "Create" : "Update"
    const loadingText = activeModal === "create" ? "Creating..." : "Updating..."

    return (
        <div className='px-4 py-2.5 flex justify-end gap-2 border-t border-gray-200'>
            <CancelButton onClick={closeModal} />
            <LoadingButton
                text={submitText}
                loadingText={loadingText}
                isLoading={isPending}
                onClick={onSubmit}
                className='h-12 w-28 bg-blue-600 border border-blue-600 text-white shadow-md'
            />
        </div>
    )
}
