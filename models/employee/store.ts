import { create } from "zustand";
import { EmployeeStore } from "./types";

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  // VALUES
  sort: "",
  sortDir: "asc",
  filter: "",
  currentPage: 1,
  contentPerPage: 10,
  totalEmployee: 0,
  search: "",
  employees: [],
  activeModal: null,
  loading: false,
  waiterOptions: [],
  cashierOptions: [],
  hasHydrated: false,
  selectedEmployee: null,

  // METHODS

  setSelectedEmployee(selectedEmployee) {
    set({ selectedEmployee });
  },

  clearEmployee() {
    set({ selectedEmployee: null });
  },
  setLoading: (loading) => set({ loading }),
  openCreateModal() {
    set({ activeModal: "create" });
  },
  openUpdateModal() {
    set({ activeModal: "update" });
  },
  openDeleteModal() {
    set({ activeModal: "delete" });
  },

  closeModal() {
    set({ activeModal: null });
  },
  setEmployees: (data) => {
    set({
      employees: data,
      totalEmployee: data.length,
      hasHydrated: true,
      waiterOptions: data
        .filter((e) => e.role === "ROLE_WAITER")
        .map((e) => ({
          label: `${e.firstName} ${e.lastName}`,
          value: e.id.toString(),
        })),
      cashierOptions: data
        .filter((e) => e.role === "ROLE_CASHIER")
        .map((e) => ({
          label: `${e.firstName} ${e.lastName}`,
          value: e.id.toString(),
        })),
    });
  },

  addEmployee: (employee) =>
    set((state) => {
      const updated = [...state.employees, employee];
      return {
        employees: updated,
        totalEmployee: updated.length,
      };
    }),

  removeEmployee: (id) =>
    set((state) => {
      const updated = state.employees.filter((e) => e.id !== id);
      return {
        employees: updated,
        totalEmployee: updated.length,
      };
    }),

  updateEmployee: (updatedEmployee) =>
    set((state) => {
      const updated = state.employees.map((e) =>
        e.id === updatedEmployee.id ? updatedEmployee : e
      );
      return { employees: updated };
    }),

  // =============================
  // SORTING / FILTERING / SEARCH
  // =============================

  setSort: (sort) => set({ sort }),
  setSortDir: (dir) => set({ sortDir: dir }),
  setFilter: (filter) => set({ filter }),
  setSearch: (query) => set({ search: query }),

  // =============================
  // PAGINATION
  // =============================

  setCurrentPage: (page) => set({ currentPage: page }),
  setContentPerPage: (count) => set({ contentPerPage: count }),
}));
