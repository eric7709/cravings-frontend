// constant.ts
import { ORDER_STATUS } from "./types";

export const ORDER_STATUS_CONFIG: Record<
  ORDER_STATUS,
  { label: string; badge: string; dot: string }
> = {
  PENDING: { label: "New", badge: "bg-blue-200 text-blue-600 border-blue-600", dot: "bg-blue-500" },
  PREPARING: { label: "Preparing", badge: "bg-yellow-200 text-yellow-600 border-yellow-600", dot: "bg-yellow-500" },
  COMPLETED: { label: "Completed", badge: "bg-green-200 text-green-600 border-green-600", dot: "bg-green-500" },
  PAID: { label: "Paid", badge: "bg-purple-200 text-purple-600 border-purple-600", dot: "bg-purple-500" },
  CANCELLED: { label: "Cancelled", badge: "bg-red-200 text-red-600 border-red-600", dot: "bg-red-500" },
};
