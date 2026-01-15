"use client"
import CashierHeaderTopBar from "@/models/cashier/ui/CashierHeaderTopBar";
import { usePendingOrderBeepGlobal } from "@/shared/hooks/usePendingOrderBeepGlobal";
import Blocker from "@/shared/provider/Blocker";

export default function CashierLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    usePendingOrderBeepGlobal()
    return (
        <Blocker>
            <div className="h-dvh flex flex-col">
                <CashierHeaderTopBar />
                <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
            </div>
        </Blocker>
    )
}