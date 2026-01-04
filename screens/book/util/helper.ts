import { ORDER_STATUS } from "@/models/orders/types";

export const statusConfig = (status: ORDER_STATUS): Record<string, any> => {
  switch (status) {
    case "PENDING":
      return {
        dot: "bg-amber-500",
        bg: "from-amber-50 to-orange-50",
        border: "border-amber-200",
        button:
          "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
        text: "New Order",
      };
    case "PREPARING":
      return {
        dot: "bg-blue-500",
        bg: "from-blue-50 to-indigo-50",
        border: "border-blue-200",
        button:
          "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
        text: "Preparing",
      };
    case "COMPLETED":
      return {
        dot: "bg-purple-500",
        bg: "from-purple-50 to-emerald-50",
        border: "border-purple-200",
        button:
          "from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600",
        text: "Ready",
      };
    case "PAID":
      return {
        dot: "bg-green-500",
        bg: "from-green-50 to-pink-50",
        border: "border-green-200",
        button: "",
        text: "Completed",
      };
    case "CANCELLED":
      return {
        dot: "bg-red-500",
        bg: "from-red-50 to-pink-50",
        border: "border-red-200",
        button: "",
        text: "Cancelled",
      };
    default:
      return {
        dot: "bg-gray-500",
        bg: "from-gray-50 to-slate-50",
        border: "border-gray-200",
        button: "from-gray-500 to-slate-500",
        text: "Unknown",
      };
  }
};
export const getButtonText = (status: ORDER_STATUS) => {
  if (status === "PENDING") return "Start Preparing";
  if (status === "PREPARING") return "Mark Complete";
  if (status === "COMPLETED") return "Confirm Payment";
  return "Paid";
};

export function getCurrentDateTime(): string {
  return new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
