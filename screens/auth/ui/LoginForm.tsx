"use client";

import Loader from "@/shared/ui/Loader";
import { useLoginForm } from "../hooks/useLoginForm";
import FormInput from "@/shared/ui/FormInput";
import { VscLoading } from "react-icons/vsc";
import Logo from "@/shared/ui/Logo";

export default function LoginForm() {
  const { register, errors, onSubmit, isPending, isRedirecting } =
    useLoginForm();

  if (isRedirecting) return <Loader />;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-[#0f172a] via-[#020617] to-black px-4">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-100 w-100 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-75 w-75 rounded-full bg-red-500/20 blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-sm">
        <div className="space-y-6 rounded-3xl bg-white/95 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] backdrop-blur-xl">

          {/* Brand */}
          <div className="flex flex-col items-center gap-3">
            <Logo />
            <p className="text-sm mt-1 text-gray-500">
              Staff Management Portal
            </p>
          </div>

          {/* Error */}
          {errors.root?.message && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-center text-sm text-red-600">
                {errors.root.message}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <FormInput
              label="Email address"
              type="email"
              placeholder="staff@cravings.com"
              {...register("email")}
              error={errors.email?.message}
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-orange-600 transition hover:text-orange-700 cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <>
                  <VscLoading className="h-5 w-5 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
