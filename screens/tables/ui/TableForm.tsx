"use client"
import { useTableStore } from "@/models/table/store";
import Backdrop from "@/shared/ui/Backdrop";
import TableFormFooter from "./TableFormFooter";
import TableFormHeader from "./TableFormHeader";
import TableFormInputs from "./TableFormInputs";
import { TableValues } from "@/models/table/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<TableValues>
    errors: FieldErrors<TableValues>
    isPending: boolean
    onSubmit: () => Promise<void>
}

export default function TableForm({ errors, isPending, onSubmit, register }: Props) {
    const { activeModal, closeModal } = useTableStore()
    return (
        <Backdrop modalOpened={activeModal == "create" || activeModal == "update"} closeModal={closeModal}>
            <div className="px-4">
            <div className="w-full lg:w-[450px] bg-white rounded-t-3xl rounded-b-2xl border border-gray-100 shadow-md">
                <TableFormHeader />
                <TableFormInputs register={register} errors={errors} />
                <TableFormFooter activeModal={activeModal} onSubmit={onSubmit} isPending={isPending} />
            </div>

            </div>
        </Backdrop>
    )
}
