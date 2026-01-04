import CashierHeaderTopBar from "@/models/cashier/ui/CashierHeaderTopBar";
import Blocker from "@/shared/provider/Blocker";

export default function CashierLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Blocker>
            <div className="h-screen flex flex-col">
                <CashierHeaderTopBar />
                <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
            </div>
        </Blocker>
    )
}