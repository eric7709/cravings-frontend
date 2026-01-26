import { useUserStore } from "@/models/auth/store";
import { useGeneralStore } from "@/shared/store/useGeneralStore";
import { Bell, LogOut, Settings, User } from "lucide-react";

export default function CashierMobileDropdown() {
    const { cashierPanelOpened } = useGeneralStore()
    const { user } = useUserStore()

    return (
        <div className={`lg:h-[calc(100dvh-90px)] fixed lg:hidden top-16 w-full duration-300 z-5000  h-[calc(100dvh-64px)]  p-4 pb-1 flex flex-col  bg-white/50 backdrop-blur-xl ${cashierPanelOpened ? "left-0" : "left-[120vw]"}`}>
            <div className="flex items-center gap-2 mb-3">
                <div className="h-10 w-10 rounded-full border-2"></div>
                <div className="">
                    <p className="text-sm font-semibold">Cashier</p>
                    <p className="text-xs lowercase">{user?.email}</p>
                </div>
            </div>
            <div className="flex py-3 font-medium cursor-pointer gap-2">
                <User className="text-blue-600" size={18}/>
                <p className="text-[15px]">Profile</p>
            </div>
            <div className="flex py-3 font-medium cursor-pointer gap-2">
                <Settings className="text-purple-600" size={18}/>
                <p className="text-[15px]">Settings</p>
            </div>
            <div className="flex py-3 font-medium cursor-pointer gap-2">
                <Bell className="text-amber-400" size={18}/>
                <p className="text-[15px]">Notifications</p>
            </div>
            <div className="flex mt-auto py-3 text-red-600 font-medium gap-2">
                <LogOut />
                <p>Logout</p>
            </div>
        </div>
    )
}
