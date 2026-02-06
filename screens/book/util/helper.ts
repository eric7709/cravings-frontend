import { ORDER_STATUS } from "@/models/orders/types";

export const statusConfig = (status: ORDER_STATUS): Record<string, any> => {
  switch (status) {
    case "PENDING":
      return {
        dot: "bg-amber-500",
        bg: "bg-amber-500",
        border: "border-amber-200",
        button:
          "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
        text: "New Order",
      };
    case "PREPARING":
      return {
        dot: "bg-blue-500",
        bg: "bg-blue-600",
        border: "border-blue-200",
        button:
          "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
        text: "Preparing",
      };
    case "COMPLETED":
      return {
        dot: "bg-purple-500",
        bg: "bg-purple-600",
        border: "border-purple-200",
        button:
          "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
        text: "Ready",
      };
    case "PAID":
      return {
        dot: "bg-green-500",
        bg: "bg-green-500",
        border: "border-green-200",
        button: "",
        text: "Completed",
      };
    case "CANCELLED":
      return {
        dot: "bg-red-500",
        bg: "bg-red-500",
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
