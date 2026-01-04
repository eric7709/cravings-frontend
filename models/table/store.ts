import { create } from "zustand";
import { TableStore } from "./types";

export const useTableStore = create<TableStore>((set, get) => ({
  sortDir: "asc",
  sort: "",
  filter: "",
  currentPage: 1,
  contentPerPage: 10,
  totalTable: 0,
  search: "",
  tables: [],
  selectedTable: null,
  hasHydrated: false,
  activeModal: null,
  openCreateModal: () => set({ activeModal: "create" }),
  openUpdateModal: () => set({ activeModal: "update" }),
  openDeleteModal: () => set({ activeModal: "delete" }),
  openAllocateModal: () => set({ activeModal: "allocate" }),
  openDeallocateModal: () => set({ activeModal: "deallocate" }),
  openQRCodeModal: () => set({ activeModal: "qrcode" }),
  closeModal: () => set({ activeModal: null }),

  setTables: (data) => set(() => ({ tables: data, totalTable: data.length, hasHydrated: true })),
  setSelectedTable: (selectedTable) => set(() => ({ selectedTable })),

  addTable: (table) =>
    set((state) => {
      const updated = [...state.tables, table];
      return { tables: updated, totalTable: updated.length };
    }),

  removeTable: (id) =>
    set((state) => {
      const updated = state.tables.filter((t) => t.id !== id);
      return { tables: updated, totalTable: updated.length };
    }),

  getTable: (id: number | string) => {
  return get().tables.find((el) => el.id === Number(id)) ?? null;
},

  updateTable: (updatedTable) =>
    set((state) => {
      const updated = state.tables.map((t) =>
        t.id === updatedTable.id ? updatedTable : t
      );
      return { tables: updated };
    }),

  setSort: (sort) => set({ sort }),
  setSortDir: (dir) => set({ sortDir: dir }),
  setFilter: (filter) => set({ filter }),
  setSearch: (query) => set({ search: query }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setContentPerPage: (count) => set({ contentPerPage: count }),
}));
