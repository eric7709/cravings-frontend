import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineTableBar } from "react-icons/md";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { Calendar } from "@/components/ui/calendar";
import { useDashboardStore } from "@/models/dashboard/store";
import { getRangeDates } from "@/shared/utils/getRangeDates";
import { toLocalDateString } from "@/shared/utils/toLocalDateString";
import { useRouter } from "next/navigation";
import { useMenuItemStore } from "@/models/menuItems/store";
import { TiArrowSortedDown } from "react-icons/ti";

const rangeOptions = [
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "This Year",
    "Last Year",
];

export default function Filter() {
    const { setStartDate, setEndDate } = useDashboardStore();
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [rangeOpen, setRangeOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState("This Week");
    const calendarRef = useRef<HTMLDivElement>(null);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const rangeRef = useRef<HTMLDivElement>(null);
    const { openCreateModal } = useMenuItemStore()
    useClickOutside(calendarRef as any, () => setCalendarOpen(false), calendarOpen);
    useClickOutside(rangeRef as any, () => setRangeOpen(false), rangeOpen);
    const router = useRouter()

    return (
        <div className="flex flex-col lg:flex-row items-center mt-3 mb-2 pt-1 px-4 gap-4 relative">
            {/* Calendar Dropdown */}
            <div className="flex w-full gap-2">
                <div
                    ref={calendarRef}
                    className="w-12 lg:h-14 h-12 lg:w-14 cursor-pointer grid place-content-center shadow-md border border-gray-200 bg-white rounded-full relative"
                    onClick={() => setCalendarOpen(true)}
                >
                    <CalendarIcon />

                    {calendarOpen && (
                        <div
                            className="absolute z-50 left-0 lg:left-auto top-[110%] bg-white border-2 border-gray-300 rounded-2xl shadow-lg"
                            onClick={(e) => e.stopPropagation()} // 🛑 IMPORTANT
                        >
                            <Calendar
                                mode="single"
                                required
                                selected={date}
                                onSelect={(d) => {
                                    if (!d) return;
                                    setDate(d); // ✅ THIS WAS MISSING
                                    setStartDate(toLocalDateString(d) as string);
                                    setEndDate(toLocalDateString(d) as string);
                                    setCalendarOpen(false);
                                }}
                            />
                        </div>
                    )}
                </div>


                {/* Range Dropdown */}

                <div
                    ref={rangeRef}
                    className="h-12 lg:h-14 border flex-1 lg:flex-none text-[15px] shadow-md gap-3 cursor-pointer flex items-center px-3 border-gray-200 duration-300 rounded-full relative"
                    onClick={() => setRangeOpen(!rangeOpen)}
                >
                    <p>{selectedRange}</p>
                    <TiArrowSortedDown className={`ml-auto text-lg lg:ml-0 duration-300 ${rangeOpen && "rotate-180"}`} />
                    <div className={`absolute z-50 left-0 duration-300 border-2 bg-white overflow-hidden border-gray-300 rounded-2xl shadow-lg w-52 ${rangeOpen ? "opacity-100 top-[110%] visible" : "opacity-0 invisible top-3"}`}>
                        {rangeOptions.map((option) => (
                            <div
                                key={option}
                                className="px-4 py-2.5 text-sm font-medium cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    setSelectedRange(option);
                                    setRangeOpen(false);
                                    const { startDate, endDate } = getRangeDates(option);
                                    setStartDate(startDate);
                                    setEndDate(endDate);
                                }}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:ml-auto w-full lg:w-fit flex flex-col lg:flex-row items-center gap-2 text-gray-600">
                <div onClick={() => router.push("/admin/tables")} className="h-12 lg:h-14 border-2 bg-red-500 text-white cursor-pointer flex items-center gap-2 w-full font-semibold justify-center shadow-md px-4 duration-300 rounded-full lg:w-fit text-nowrap">
                    <MdOutlineTableBar className="text-lg lg:text-xl" />
                    <p className=" text-[15px] lg:text-base">Manage Tables</p>
                </div>
                <div onClick={openCreateModal} className="h-12 lg:h-14 w-full lg:w-fit text-nowrap justify-center border-2 cursor-pointer bg-blue-600 text-white flex items-center gap-2 font-semibold shadow-md px-4 duration-300 rounded-full">
                    <BiFoodMenu className="text-lg lg:text-xl" />
                    <p className="text-[15px] lg:text-base">Create Menu Item</p>
                </div>
            </div>
        </div>
    );
}
