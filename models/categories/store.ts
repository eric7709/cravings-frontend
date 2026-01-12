import { create } from "zustand";
import { CategoryStore } from "./types";

export const useCategoryStore = create<CategoryStore>((set) => ({
  sortDir: "asc",
  sort: "",
  filter: "",
  currentPage: 1,
  contentPerPage: 10,
  totalCategory: 0,
  search: "",
  selectedCategory: null,
  activeModal: null,
  hasHydrated: false,
  loading: false,
  categories: [],
  setCategories: (data) =>
    set(() => ({ categories: data, totalCategory: data.length , hasHydrated: true})),

  setLoading: (loading) =>
    set({
      loading,
    }),

  addCategory: (category) =>
    set((state) => {
      const updated = [category, ...state.categories];
      return { categories: updated, totalCategory: updated.length };
    }),

  removeCategory: (id) =>
    set((state) => {
      const updated = state.categories.filter((c) => c.id !== id);
      return { categories: updated, totalCategory: updated.length };
    }),

  updateCategory: (updatedCategory) =>
    set((state) => {
      const updated = state.categories.map((c) =>
        c.id === updatedCategory.id ? updatedCategory : c
      );
      return { categories: updated };
    }),

  setSort: (sort) => set({ sort }),
  setSortDir: (dir) => set({ sortDir: dir }),
  setFilter: (filter) => set({ filter }),
  setSearch: (query) => set({ search: query }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setContentPerPage: (menuItemCount) => set({ contentPerPage: menuItemCount }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  openCreateModal: () =>
    set({
      activeModal: "create",
    }),
  openUpdateModal: () =>
    set({
      activeModal: "update",
    }),
  openDeleteModal: () =>
    set({
      activeModal: "delete",
    }),

  closeModal: () =>
    set({
      activeModal: null,
    }),
}));
