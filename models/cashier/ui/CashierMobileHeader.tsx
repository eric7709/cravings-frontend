import { useGeneralStore } from "@/shared/store/useGeneralStore";
import LogoNoIcon from "@/shared/ui/LogoNoIcon";
import { Menu, X } from "lucide-react";
import { TiArrowSortedDown } from "react-icons/ti";

export default function CashierHeaderMobile() {
    const { toggleCashierPanel, cashierPanelOpened, toggleSideBar, sideBarOpened } = useGeneralStore()
    return (
        <div className="h-16 top-0 sticky backdrop-blur-2xl bg-white/20 z-5000 px-4 border-b border-gray-200 flex lg:hidden justify-between items-center">
            <div className="flex items-center gap-2">
                {!sideBarOpened && <div className="" onClick={toggleSideBar}>
                    <Menu />
                </div>
                }
                <LogoNoIcon />
            </div>
            {sideBarOpened ?
                <div onClick={toggleSideBar} className="">
                    <X />
                </div>
                :
                <div onClick={toggleCashierPanel} className="flex items-center gap-1">
                    <div className="h-8 w-8 rounded-full border-2"></div>
                    <TiArrowSortedDown className={`text-sm ${cashierPanelOpened ? "-rotate-90" : "rotate-90"} duration-300`} />
                </div>
            }
        </div>
    )
}
