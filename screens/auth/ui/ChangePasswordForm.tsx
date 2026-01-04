"use client";

import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useChangePassword } from "@/models/auth/hooks";
import Backdrop from "@/shared/ui/Backdrop";
import { useUserStore } from "@/models/auth/store";

interface FormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function ChangePasswordForm() {
    const { mutateAsync, isPending } = useChangePassword();
    const [show, setShow] = useState(false);
    const { activeModal, closeModal } = useUserStore()

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (values: FormValues) => {
        if (values.newPassword !== values.confirmPassword) {
            setError("confirmPassword", { message: "Passwords do not match" });
            return;
        }
        try {
            await mutateAsync({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            });

            reset();
            closeModal()
        } catch (err: any) {
            const message = err?.response?.data;

            if (message === "INVALID_CURRENT_PASSWORD") {
                setError("currentPassword", { message: "Current password is incorrect" });
            } else if (message === "NEW_PASSWORD_SAME_AS_OLD") {
                setError("newPassword", { message: "New password must be different" });
            } else {
                setError("currentPassword", { message: "Failed to change password" });
            }
        }
    };

    return (
        <Backdrop closeModal={closeModal} modalOpened={activeModal == "change-password"}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl w-full sm:w-96 shadow-lg border border-gray-100 p-6 space-y-5"
            >
                <h2 className="text-xl font-bold text-gray-900">Change Password</h2>

               

                {/* Current Password */}
                <div>
                    <label className="block text-sm font-medium mb-1">Current Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            type={show ? "text" : "password"}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
                            {...register("currentPassword", { required: "Required" })}
                        />
                    </div>
                    {errors.currentPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.currentPassword.message}</p>
                    )}
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input
                        type={show ? "text" : "password"}
                        className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
                        {...register("newPassword", {
                            required: "Required",
                            minLength: { value: 6, message: "Minimum 6 characters" },
                        })}
                    />
                    {errors.newPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                        type={show ? "text" : "password"}
                        className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
                        {...register("confirmPassword", { required: "Required" })}
                    />
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* Toggle Show/Hide */}
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="text-sm text-blue-600 flex items-center gap-1"
                >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    {show ? "Hide passwords" : "Show passwords"}
                </button>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
                >
                    {isPending ? "Updating..." : "Update Password"}
                </button>
            </form>
        </Backdrop>

    );
}
