"use client"
import { useEffect } from "react";
import { getCustomer } from "@/shared/utils/encryption";
import { useBook } from "@/screens/book/store/useBook";

export default function CartProvider({ children }: { children: React.ReactNode }) {
    const { setCustomer } = useBook();
    useEffect(() => {
        const stored = getCustomer();
        if (stored) setCustomer(stored);
    }, [setCustomer]);
    return <>{children}</>;
}
