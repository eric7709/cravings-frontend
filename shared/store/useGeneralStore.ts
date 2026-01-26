import { create } from "zustand";
import { GeneralStore } from "../types/store";

export const useGeneralStore = create<GeneralStore>((set, get) => ({
  darkMode: false,
  sideBarOpened: false,
  adminPanelOpened: false,
  cashierPanelOpened: false,
  toggleSideBar: () => set({ sideBarOpened: !get().sideBarOpened  }),
  toggleAdminPanel: () => set({ adminPanelOpened: !get().adminPanelOpened }),
  toggleCashierPanel: () => set({ cashierPanelOpened: !get().cashierPanelOpened }),
  openSideBar: () => set({ sideBarOpened: true }),
  closeSideBar: () => set({ sideBarOpened: false }),
  closeAdminPanel: () => set({ adminPanelOpened: false }),
  closeCashierPanel: () => set({ cashierPanelOpened: false }),
  setDarkMode: () => {
    set({ darkMode: true });
    localStorage.setItem("mode", "dark");
  },
  setLightMode: () => {
    set({ darkMode: false });
    localStorage.setItem("mode", "light");
  },
  toggleDarkMode: () => {
    const newMode = !get().darkMode;
    set({ darkMode: newMode });
    localStorage.setItem("mode", newMode ? "dark" : "light");
  },
}));