import { create } from "zustand";
import { CustomerStore } from "./type";

export const useCustomerStore = create<CustomerStore>((set) => ({
  sortDir: "asc",
  sort: "",
  filter: "",
  currentPage: 1,
  contentPerPage: 10,
  totalCustomer: 0,
  search: "",

  customers: [],
  selectedCustomer: null,
  activeModal: null,

  // --------------------
  // MODAL ACTIONS
  // --------------------
  closeModal: () => set({ activeModal: null }),
  openCreateModal: () => set({ activeModal: "create" }),
  openDeleteModal: () => set({ activeModal: "delete" }),
  openUpdateModal: () => set({ activeModal: "update" }),

  // --------------------
  // CRUD
  // --------------------
  setCustomers: (data) =>
    set(() => ({
      customers: data,
      totalCustomer: data.length,
    })),

  addCustomer: (customer) =>
    set((state) => {
      const updated = [...state.customers, customer];
      return {
        customers: updated,
        totalCustomer: updated.length,
      };
    }),

  setSelectedCustomer: (customer) =>
    set(() => ({ selectedCustomer: customer })),

  removeCustomer: (id) =>
    set((state) => {
      const updated = state.customers.filter((c) => c.id !== id);
      return {
        customers: updated,
        totalCustomer: updated.length,
      };
    }),

  updateCustomer: (updatedCustomer) =>
    set((state) => {
      const updated = state.customers.map((c) =>
        c.id === updatedCustomer.id ? updatedCustomer : c
      );
      return { customers: updated };
    }),

  // --------------------
  // FILTERING
  // --------------------
  setSort: (sort) => set({ sort }),
  setSortDir: (dir) => set({ sortDir: dir }),
  setFilter: (filter) => set({ filter }),
  setSearch: (query) => set({ search: query }),

  // --------------------
  // PAGINATION
  // --------------------
  setCurrentPage: (page) => set({ currentPage: page }),
  setContentPerPage: (count) => set({ contentPerPage: count }),
}));