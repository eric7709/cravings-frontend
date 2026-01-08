import { create } from "zustand";
import { DashboardStore } from "./types";

const today = new Date().toISOString().split("T")[0];


export const useDashboardStore = create<DashboardStore>((set) => ({
  startDate: today,
  endDate: today,
  stats: null,
  hasHydrated: false,
  overview: null,
  setOverview: (overview) => set({ overview, hasHydrated: true }),
  setStats: (stats) => set({ stats, hasHydrated: true }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));
