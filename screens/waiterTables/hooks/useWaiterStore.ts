import { create } from "zustand";

type WaiterStore = {
  activeLink: "tables" | "orders";
  setTablesAsActive: () => void;
  setOrdersAsActive: () => void;
};

export const useWaiterStore = create<WaiterStore>((set) => ({
  activeLink: "orders",
  setOrdersAsActive: () => {
    set({ activeLink: "orders" });
  },
  setTablesAsActive: () => {
    set({ activeLink: "tables" });
  },
}));
