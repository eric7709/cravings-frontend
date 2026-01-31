"use client";
import React from "react";

type Option = { label: string; value: string };

type FormInputProps = {
  label: string;
  error?: string;
  textarea?: boolean;
  options?: Option[];
  capitalize?: boolean;
  labelColor?: string
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export default function FormInput({
  label,
  error,
  textarea = false,
  options,
  labelColor,
  className = "",
  capitalize,
  ...rest
}: FormInputProps) {
  const isSelect = !!options?.length;

  // Prevent browser autofill/autocomplete
  const preventAutofillProps = {
    autoComplete: "off",
    "data-lpignore": "true", // LastPass
    "data-form-type": "other", // Some password managers
  };

  const commonProps = {
    ...rest,
    ...preventAutofillProps,
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label style={{color: labelColor}} className="text-gray-800 text-xs font-medium capitalize mb-1">{label}</label>

      {isSelect ? (
        <select
          {...commonProps}
          className={`
            h-9 w-full text-xs  ${capitalize ? "capitalize" : ""} rounded-xl border-[1.5px] border-gray-300 px-2
            focus:border-green-500
            ${error ? "border-red-500" : ""}
            transition
          `}
        >
          <option value="" className="text-xs">{rest.placeholder || "Select an option"}</option>
          {options!.map((opt) => (
            <option className="capitalize text-xs" key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          {...commonProps}
          className={`
            min-h-20 text-xs  lg:min-h-25 w-full ${capitalize ? "capitalize" : ""} rounded-xl border-[1.5px] border-gray-300 p-2
            focus:border-green-500
            ${error ? "border-red-500" : ""}
            transition
          `}
        />
      ) : (
        <input
          {...commonProps}
          className={`
            h-9 w-full text-xs  ${capitalize ? "capitalize" : ""} rounded-xl border-[1.5px] border-gray-300 px-2
            outline-none focus:border-green-500
            ${error ? "border-red-500" : ""}
            transition
          `}
        />
      )}

      <div
        className={`grid duration-300 ${error ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden pt-1">
          <p className="text-red-500 text-xs lg:text-sm">{error}</p>
        </div>
      </div>
    </div>
  );
}
