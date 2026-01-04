"use client";
import React from "react";
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
        className="w-[350px] bg-white rounded-t-3xl rounded-b-2xl flex flex-col gap-6 shadow-md"
      >
        {/* Header */}
        <div className="text-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">
            Let’s get you started!
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Just a few details to prepare your order
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 px-6">
          <FormInput
            label="Title"
            placeholder="Select title"
            options={TITLE_OPTIONS}
            {...register("title")}
            error={errors.title?.message}
          />

          <FormInput
            label="Name"
            placeholder="Your name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />

          <FormInput
            label="Phone (optional)"
            placeholder="Your phone number"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            {isPending ? "Almost there..." : "Let’s go 🚀"}
          </button>
        </div>
      </form>
    </Backdrop>
  );
}
