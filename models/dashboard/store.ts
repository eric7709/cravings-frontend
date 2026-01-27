  import { create } from "zustand";
  import { DashboardStore } from "./types";


  const today = new Date();
  const endDate = today.toISOString().split("T")[0];
  const startDate = endDate.slice(0, 7) + "-01";
  // Take the YYYY-MM from today's string and just append "-01"

  export const useDashboardStore = create<DashboardStore>((set) => ({
    startDate: startDate,
    endDate: endDate,
    stats: null,
    hasHydrated: false,
    overview: null,
    setOverview: (overview) => set({ overview, hasHydrated: true }),
    setStats: (stats) => set({ stats, hasHydrated: true }),
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),
  }));
