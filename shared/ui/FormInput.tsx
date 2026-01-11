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
      <label style={{color: labelColor}} className="text-gray-800 text-sm font-medium capitalize lg:text-base mb-1">{label}</label>

      {isSelect ? (
        <select
          {...commonProps}
          className={`
            h-10 lg:h-12 w-full text-sm lg:text-base ${capitalize ? "capitalize" : ""} rounded-xl border border-gray-300 px-2
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500" : ""}
            transition
          `}
        >
          <option value="">{rest.placeholder || "Select an option"}</option>
          {options!.map((opt) => (
            <option className="capitalize" key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          {...commonProps}
          className={`
            min-h-[80px] text-sm lg:text-base lg:min-h-[100px] w-full ${capitalize ? "capitalize" : ""} rounded-xl border border-gray-300 p-2
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500" : ""}
            transition
          `}
        />
      ) : (
        <input
          {...commonProps}
          className={`
            h-10 lg:h-12 w-full text-sm lg:text-base ${capitalize ? "capitalize" : ""} rounded-xl border border-gray-300 px-2
            focus:outline-none focus:ring-2 focus:ring-blue-500
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
