"use client";

import Backdrop from "@/shared/ui/Backdrop";
import FormInput from "@/shared/ui/FormInput";
import { useBook } from "../store/useBook";
import { useCustomerForm } from "../hooks/useCustomerForm";

const TITLE_OPTIONS = [
  { label: "Mr", value: "MR" },
  { label: "Mrs", value: "MRS" },
  { label: "Miss", value: "MISS" },
  { label: "Chief", value: "CHIEF" },
];

export default function CustomerFormModal() {
  const { activeModal, closeModal } = useBook();
  const { register, handleSubmit, errors, isPending } = useCustomerForm();

  return (
    <Backdrop modalOpened={activeModal === "customer"} closeModal={closeModal}>
      <form
        onSubmit={handleSubmit}
        className="w-87.5 rounded-3xl flex flex-col shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="text-center p-4 bg-orange-500">
          <h2 className="text-xl font-bold text-white">
            Customer Information
          </h2>
          <p className="text-orange-100 text-sm mt-1">
            Please provide your details to complete the order.
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-6 py-6 bg-white">
          <FormInput
            label="Title"
            placeholder="Select title"
            options={TITLE_OPTIONS}
            {...register("title")}
            error={errors.title?.message}
          />

          <FormInput
            label="Name"
            placeholder="Enter full name"
            {...register("name", { required: "Full name is required" })}
            error={errors.name?.message}
          />

          <FormInput
            label="Phone Number (optional)"
            placeholder="Enter phone number"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />
        </div>

        {/* Footer */}
        <div className=" p-4 bg-white">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-semibold hover:bg-orange-600 transition shadow-md"
          >
            {isPending ? "Submitting..." : "Confirm Details"}
          </button>
        </div>
      </form>
    </Backdrop>
  );
}
