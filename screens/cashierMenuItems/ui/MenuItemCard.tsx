"use client";
import { Power, PowerOff, DollarSign } from "lucide-react";
import { useUpdateMenuItem } from "@/models/menuItems/hook";
import { useMenuItemStore } from "@/models/menuItems/store";
import { MenuItem } from "@/models/menuItems/types";
import { formatPrice } from "@/shared/utils/formatPrice";
import Image from "next/image";

type Props = {
  menuItem: MenuItem;
};

export default function MenuItemCard({ menuItem }: Props) {
  const { updateMenuItem } = useMenuItemStore();
  const { mutate } = useUpdateMenuItem();

  const isAvailable = menuItem.status === "AVAILABLE";

  const toggleStatus = () => {
    mutate(
      {
        id: menuItem.id,
        data: { ...menuItem, status: isAvailable ? "UNAVAILABLE" : "AVAILABLE" },
      },
      { onSuccess: updateMenuItem }
    );
  };
  return (
    <div
      className={`relative rounded-2xl border bg-white p-3 shadow-sm transition ${isAvailable
        ? "border-slate-200 hover:shadow-md"
        : "border-slate-300 bg-slate-50"
        }`}
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden bg-slate-100 border-gray-300 border">
          {menuItem.imageUrl ? (
            <Image
              fill
              src={menuItem.imageUrl}
              alt={menuItem.name}
              className="object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-content-center text-3xl">
              🍽️
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-slate-900">
                {menuItem.name}
              </h3>

              {/* Status Chip */}
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${isAvailable
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
                  }`}
              >
                {isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {menuItem.categoryName}
            </p>
          </div>
          {/* Bottom */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-emerald-600">
              {formatPrice(menuItem.price)}
            </span>
            {/* Toggle */}
            <button
              onClick={toggleStatus}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 cursor-pointer text-sm font-semibold transition active:scale-95 ${isAvailable
                ? "bg-rose-600 hover:bg-rose-700 text-white"     // Disable = RED
                : "bg-emerald-600 hover:bg-emerald-700 text-white" // Enable = GREEN
                }`}
            >
              {isAvailable ? (
                <>
                  <PowerOff className="h-4 w-4" />
                  Disable
                </>
              ) : (
                <>
                  <Power className="h-4 w-4" />
                  Enable
                </>
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
