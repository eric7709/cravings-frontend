import { create } from "zustand";
import { storeCustomer } from "@/shared/utils/encryption";
import { Book} from "../types/types";

export const useBook = create<Book>((set, get) => ({
  items: [],
  category: "all",
  search: "",
  customer: null,
  customerOrders: [],
  table: null,
  activeModal: null,
  tableId: null,

  // ---- Logic: Synchronize Availability ----
  

  // ---- Setters ----
  setCategory: (category) => set({ category }),
  setCustomerOrders: (customerOrders) => set({ customerOrders }),
  setSearch: (search) => set({ search }),
  setCustomer: (customer) => {
    storeCustomer(customer);
    set({ customer });
  },
  setTable: (table) => set({ table }),
  setTableId: (tableId) => set({ tableId }),

  // ---- Modal Controls ----
  openCreateCustomerModal: () => set({ activeModal: "customer" }),
  openUnavailableErrorModal: () => set({ activeModal: "error" }),
  openOrderConfirmationModal: () => set({ activeModal: "confirm" }),
  openCartModal: () => set({ activeModal: "cart" }),
  openHistoryModal: () => set({ activeModal: "history" }),
  openOrderClearModal: () => set({ activeModal: "clear" }),
  openOrderSuccessModal: () => set({ activeModal: "success" }),
  closeModal: () => set({ activeModal: null }),

  // ---- Cart Operations ----
  addToCart: (cartItem) => {
    const items = [...get().items];
    const existing = items.find((el) => el.menuItemId === cartItem.menuItemId);
    if (existing) {
      existing.quantity += cartItem.quantity || 1;
    } else {
      items.push({ ...cartItem, quantity: cartItem.quantity || 1 });
    }
    set({ items });
  },

  increaseQty: (id) =>
    set({
      items: get().items.map((el) =>
        el.menuItemId === id ? { ...el, quantity: el.quantity + 1 } : el
      ),
    }),

  decreaseQty: (id) =>
    set({
      items: get()
        .items.map((el) =>
          el.menuItemId === id ? { ...el, quantity: el.quantity - 1 } : el
        )
        .filter((el) => el.quantity > 0),
    }),

  removeFromCart: (id) => {
    const currentItems = get().items.filter((el) => el.menuItemId !== id);
    set({
      items: currentItems,
    });
  },

  resetItems: () => set({ items: []}),

  toggleTakeOut: (id) =>
    set({
      items: get().items.map((el) =>
        el.menuItemId === id ? { ...el, takeOut: !el.takeOut } : el
      ),
    }),

  // ---- Computed ----
  getTotal: () => get().items.reduce((total, el) => total + el.quantity * el.price, 0),
  getTotalQty: () => get().items.reduce((total, el) => total + el.quantity, 0),
}));