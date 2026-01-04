import { create } from "zustand";
import { MenuItemStore } from "./types";

export const useMenuItemStore = create<MenuItemStore>((set, get) => ({
  sortDir: "asc",
  sort: "",
  filter: "",
  currentPage: 1,
  contentPerPage: 10,
  totalMenuItem: 0,
  search: "",
  activeModal: null,
  selectedMenuItem: null,
  menuItems: [],
  setSelectedMenuItem: (selectedMenuItem) =>
    set({
      selectedMenuItem,
    }),
  closeModal: () => set({ activeModal: null }),
  openCreateModal: () => set({ activeModal: "create" }),
  openDeleteModal: () => set({ activeModal: "delete" }),
  openUpdateModal: () => set({ activeModal: "update" }),
  setMenuItems: (data) =>
    set(() => ({ menuItems: data, totalMenuItem: data.length })),
  addMenuItem: (item) => {
    const menuItems = get().menuItems;
    if (get().menuItems.find((el) => el.id == item.id)) {
      set({ menuItems });
    } else {
      const updated = [...menuItems, item];
      set({ menuItems: updated, totalMenuItem: updated.length });
    }
  },
  removeMenuItem: (id) =>
    set((state) => {
      const updated = state.menuItems.filter((m) => m.id !== id);
      return { menuItems: updated, totalMenuItem: updated.length };
    }),
  updateMenuItem: (updatedItem) =>
    set((state) => {
      const updated = state.menuItems.map((m) =>
        m.id === updatedItem.id ? updatedItem : m
      );
      return { menuItems: updated };
    }),

  setSort: (sort) => set({ sort }),
  setSortDir: (dir) => set({ sortDir: dir }),
  setFilter: (filter) => set({ filter }),
  setSearch: (query) => set({ search: query }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setContentPerPage: (count) => set({ contentPerPage: count }),
}));
