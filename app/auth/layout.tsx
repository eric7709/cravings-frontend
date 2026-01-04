"use client";

import AuthBlocker from "@/shared/provider/AuthBlocker";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthBlocker>
            {children}
        </AuthBlocker>
    );
}
