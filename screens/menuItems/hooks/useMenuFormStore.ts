// store.ts
import { create } from "zustand";
import type { MenuItemValues } from "@/models/menuItems/types";

type Errors = Partial<Record<keyof MenuItemValues, string>>;

type MenuItemStore = {
  values: MenuItemValues;
  isPending: boolean;
  errors: Errors;
  image: File | null;
  setIsPendingTrue: () => void;
  setIsPendingFalse: () => void;
  clearImage: () => void;
  setImage: (image: File) => void;
  setField: <K extends keyof MenuItemValues>(
    field: K,
    value: MenuItemValues[K]
  ) => void;

  setValues: (values: MenuItemValues) => void;
  setErrors: (errors: Errors) => void;
  clearError: (field: keyof MenuItemValues) => void;
  reset: () => void;
};

const initialValues: MenuItemValues = {
  name: "",
  categoryId: "",
  status: "AVAILABLE",
  price: "",
  description: "",
  imageUrl: "",
};

export const useMenuItemFormStore = create<MenuItemStore>((set) => ({
  values: initialValues,
  isPending: false,
  errors: {},
  setImage: (image) => {
    set({ image });
  },
  clearImage: () => {
    set({ image: null });
  },
  image: null,
  setIsPendingTrue: () => set({ isPending: true }),
  setIsPendingFalse: () => set({ isPending: false }),

  setField: (field, value) =>
    set((state) => ({
      values: { ...state.values, [field]: value },
      errors: { ...state.errors, [field]: undefined },
    })),

  setValues: (values) => set({ values }),

  setErrors: (errors) => set({ errors }),
  clearError: (field) =>
    set((state) => ({
      errors: { ...state.errors, [field]: undefined },
    })),

  reset: () => set({ values: initialValues, errors: {} }),
}));
