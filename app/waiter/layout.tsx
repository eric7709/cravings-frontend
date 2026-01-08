"use client"
import WaiterHeader from "@/models/waiter/ui/WaiterHeader";
import { usePendingOrderBeepGlobal } from "@/shared/hooks/usePendingOrderBeepGlobal";
import Blocker from "@/shared/provider/Blocker";

export default function WaiterLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    usePendingOrderBeepGlobal()
    return (
        <Blocker>
            <div className="flex flex-col h-screen ">
                <WaiterHeader />
                <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
            </div>
        </Blocker>
    )
}
