import { Customer } from "@/models/customer/type";
import { MenuItem } from "@/models/menuItems/types";
import { CustomerOrderDTO } from "@/models/orders/types";
import { Table } from "@/models/table/types";

export type Item = {
  menuItemId: number;
  menuItemName: string;
  categoryName: string;
  quantity: number;
  takeOut: boolean;
  price: number;
};

export type Book = {
  items: Item[];
  tableId: null | string | number
  category: string;
  search: string;
  customerOrders: CustomerOrderDTO[]
  activeModal: "customer" | "confirm" | "success" | "clear" | "cart"| "history" | "error" | null;
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  table: Table | null;
  setTable: (table: Table) => void;
  setCustomerOrders: (orders: CustomerOrderDTO[]) => void;
  resetItems: () => void;
  // ---- Setters ----
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setTableId: (tableId: string | number) => void;

  openCreateCustomerModal: () => void;
  openUnavailableErrorModal: () => void;
  openHistoryModal: () => void;
  openOrderConfirmationModal: () => void;
  openCartModal: () => void;
  openOrderClearModal: () => void;
  openOrderSuccessModal: () => void;
  closeModal: () => void;

  // ---- Cart Operations ----
  addToCart: (item: Item) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeFromCart: (id: number) => void;
  toggleTakeOut: (id: number) => void;

  // ---- Computed ----
  getTotal: () => number;
  getTotalQty: () => number;
};
