"use client"
import CashierHeaderTopBar from "@/models/cashier/ui/CashierHeaderTopBar";
import CashierMobileDropdown from "@/models/cashier/ui/CashierMobileDropdown";
import CashierMobileHeader from "@/models/cashier/ui/CashierMobileHeader";
import CashierMobileSideBar from "@/models/cashier/ui/CashierMobileSideBar";
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
                <CashierMobileHeader />
                <CashierMobileDropdown />
                <CashierMobileSideBar />
                <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
            </div>
        </Blocker>
    )
}