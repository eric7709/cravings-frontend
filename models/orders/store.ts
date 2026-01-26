import { create } from "zustand";
import { OrderStore } from "./types";
import { getTodayISODate } from "@/shared/utils/getTodayISODate";

export const useOrderStore = create<OrderStore>((set) => ({
  sortBy: "createdAt",
  direction: "desc",
  orderStatus: null,
  paymentStatus: null,
  waiterId: null,
  cashierId: null,
  tableId: null,
  minTotal: null,
  maxTotal: null,
  hasHydrated: false,
  startDate: getTodayISODate(),
  endDate: getTodayISODate(),
  search: "",
  loading: false,
  // Pagination
  currentPage: 0,
  contentPerPage: 50,
  totalPages: 0,
  totalOrders: 0,
  todayOrderStats: {
    pending: 0,
    preparing: 0,
    completed: 0,
    paid: 0,
    cancelled: 0,
    total: 0,
  },

  /* ---------------- Loading ---------------- */

  setLoading: (loading) => set({ loading }),
  /* ---------------- Orders ---------------- */
  setPaginationData: (totalElements, totalPages, pageNumber, pageSize) =>
    set({
      totalOrders: totalElements,
      totalPages,
      currentPage: pageNumber,
      contentPerPage: pageSize,
      loading: false,
      hasHydrated: true,
    }),

  setTodayOrderStats: (stats) => set({ todayOrderStats: stats }),
  /* ---------------- Filters (ALL trigger loading) ---------------- */
  reset: () =>
    set({
      sortBy: "createdAt",
      direction: "desc",
      orderStatus: null,
      paymentStatus: null,
      waiterId: null,
      cashierId: null,
      tableId: null,
      minTotal: null,
      maxTotal: null,
      hasHydrated: false,
      startDate: getTodayISODate(),
      endDate: getTodayISODate(),
      search: "",
      loading: false,
      currentPage: 0,
      contentPerPage: 50,
      totalPages: 0,
      totalOrders: 0,
      todayOrderStats: {
        pending: 0,
        preparing: 0,
        completed: 0,
        paid: 0,
        cancelled: 0,
        total: 0,
      },
    }),
  setSearch: (search) => set({ search, loading: true }),
  setSortBy: (sortBy) => set({ sortBy, loading: true }),
  setDirection: (direction) => set({ direction, loading: true }),
  setOrderStatus: (orderStatus) => set({ orderStatus, loading: true }),
  setPaymentStatus: (paymentStatus) => set({ paymentStatus, loading: true }),
  setWaiterId: (waiterId) => set({ waiterId, loading: true }),
  setCashierId: (cashierId) => set({ cashierId, loading: true }),
  setTableId: (tableId) => set({ tableId, loading: true }),
  setMinTotal: (minTotal) => set({ minTotal, loading: true }),
  setMaxTotal: (maxTotal) => set({ maxTotal, loading: true }),
  setStartDate: (startDate) => set({ startDate, loading: true }),
  setEndDate: (endDate) => set({ endDate, loading: true }),
  /* ---------------- Pagination ---------------- */
  setCurrentPage: (currentPage) => set({ currentPage, loading: true }),
  setContentPerPage: (contentPerPage) =>
    set({ contentPerPage, currentPage: 0, loading: true }),
}));
