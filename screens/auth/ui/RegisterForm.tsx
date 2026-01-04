"use client";

import { useRegisterForm } from "../hooks/useRegisterForm";

export default function RegisterForm() {
  const { register, errors, onSubmit, isPending } = useRegisterForm();
  const roles = [
    { label: "Waiter", value: "ROLE_WAITER" },
    { label: "Cashier", value: "ROLE_CASHIER" },
    { label: "Admin", value: "ROLE_ADMIN" },
    { label: "Manager", value: "ROLE_MANAGER" },
  ];

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-50 rounded-3xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
        Create Staff Account
      </h2>

      {/* General error */}
      {errors.root?.message && (
        <p className="text-red-600 mb-4 text-center font-medium">
          {errors.root.message}
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName")}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            {...register("phoneNumber")}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
            placeholder="+234 800 000 0000"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            {...register("role")}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
          >
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
        >
          {isPending ? "Registering..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
