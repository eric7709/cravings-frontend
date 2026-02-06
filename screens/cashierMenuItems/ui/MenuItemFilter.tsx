"use client";
import { Sparkles } from "lucide-react";
import { MENUITEM_STATUS } from "@/models/menuItems/types";
import { useFilterMenuItems } from "../hooks/useFilterMenuItems";
import { MenuItemSearch } from "./MenuItemSearch";
import MenuItemCategory from "./MenuItemCategory";

export default function MenuItemFilter() {
  const { statusData, setStatus, status } = useFilterMenuItems();
  return (
    <div className="z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="px-4 flex  flex-col md:flex-row pt-4 pb-">
        <div className="flex items-center mb-2 gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="text-lg font-semibold xl:font-bold text-gray-800 uppercase tracking-wider">Quick Filters</h3>
        </div>
        <div className="md:ml-auto ml-0 flex flex-col md:flex-row items-center gap-4">
          <MenuItemSearch />
          <MenuItemCategory />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 pt-2">
        {statusData.map((el) => {
          const Icon = el.icon;
          const isActive = el.value === status;
          return (
            <button
              key={el.value}
              onClick={() => setStatus(el.value as MENUITEM_STATUS)}
              className={`
                group relative cursor-pointer rounded-xl p-4 flex items-center justify-between
                border-[1.5px] transition-all duration-300 overflow-hidden
                ${isActive
                  ? `${el.bg} ${el.border} shadow-lg`
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md active:scale-98"
                }
              `}
            >
              {/* Animated background gradient on hover */}
              <div className={`absolute inset-0 ${el.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''}`} />

              {/* Content */}
              <div className="relative flex items-center gap-3 flex-1">
                {/* Icon Container */}
                <div
                  className={`
                    relative h-9 w-9 rounded-xl grid place-content-center border-2
                    transition-all duration-300
                    ${isActive
                      ? "bg-white/80 border-white/60 shadow-lg scale-110"
                      : "bg-gray-50 border-gray-200 group-hover:bg-gray-100 group-hover:scale-105"
                    }
                  `}
                >
                  <Icon className={`h-4 w-4 transition-colors`} />

                  {/* Pulse effect for active icon */}
                  {isActive && (
                    <div className={`absolute inset-0 rounded-xl opacity-20 animate-ping`} style={{ backgroundColor: 'currentColor' }} />
                  )}
                </div>

                {/* Title */}
                <div className="text-left flex-1">
                  <p className={`text-xs font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-800'
                    }`}>
                    {el.title}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {isActive ? 'Now viewing' : 'Click to filter'}
                  </p>
                </div>
              </div>

              {/* Count */}
              <div className="relative">
                <p className={`text-2xl font-black transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}>
                  {el.count}
                </p>
              </div>

              {/* Active Indicator Bar */}
              {isActive && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${el.bg} opacity-60`} />
              )}

              {/* Corner decoration for active state */}
              {isActive && (
                <>
                  <div className={`absolute top-0 right-0 w-16 h-16 ${el.bg} opacity-30 rounded-bl-full`} />
                  <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${el.bg} animate-pulse`} />
                </>
              )}

              {/* Hover shine effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </button>
          );
        })}
      </div>
    </div>
  );
}