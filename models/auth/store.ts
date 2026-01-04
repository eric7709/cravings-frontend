import { create } from "zustand";
import { UserState } from "./types";

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isHydrated: false,
  activeModal: null,
  loading: false,
  openChangePasswordModal: () =>
    set({
      activeModal: "change-password",
    }),
  closeModal: () =>
    set({
      activeModal: null,
    }),
  setUser: (user) => {
    set({ user, isHydrated: true });
  },
  updateUser: (updated) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updated } : null,
    })),
  clearUser: () => set({ user: null }),
  setLoading: (value: boolean) => set({ loading: value }),
}));
