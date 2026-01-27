import { create } from "zustand";
import { AnalyticsStore } from "./types";
import { getTodayISODate } from "@/shared/utils/getTodayISODate";

export const getFirstDayOfMonth = (): string => {
  const now = new Date();
  // Set to first day of current month at midnight local time
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  return firstDay.toISOString().split('T')[0]; 
};

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  analytics: null,
  isLoading: false,
  startDate: getFirstDayOfMonth(),
  endDate: getTodayISODate(),
  setAnalytics: (data) => set({ analytics: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  reset: () =>
    set({
      analytics: null,
      isLoading: false,
      startDate: getTodayISODate(),
      endDate: getTodayISODate(),
    }),
}));    
