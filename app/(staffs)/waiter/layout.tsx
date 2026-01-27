"use client"
import WaiterHeader from "@/models/waiter/ui/WaiterHeader";
import { usePendingOrderBeepGlobal } from "@/shared/hooks/usePendingOrderBeepGlobal";

export default function WaiterLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    usePendingOrderBeepGlobal()
    return (
        <div className="flex flex-col h-dvh ">
            <WaiterHeader />
            <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
        </div>
    )
}
