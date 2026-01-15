export type ORDER_STATUS =
  | "PENDING"
  | "PREPARING"
  | "COMPLETED"
  | "CANCELLED"
  | "PAID";

export type PAYMENT_STATUS =
  | "UNPAID"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export type OrderItem = {
  menuItemName: string;
  menuItemId: number;
  quantity: number;
  takeOut: boolean;
  price: number;
}

export interface OrderItemWithID extends OrderItem {
  id: number;
}

export type Order = {
  id: number;
  waiterName: string;
  waiterId: number;
  cashierName: string;
  cashierId: number;
  tableId: number;
  tableNumber: number;
  tableName: string;
  customerName: string;
  customerId: number;
  customerTitle: string;
  invoiceNumber: string;
  paymentStatus: PAYMENT_STATUS;
  orderStatus: ORDER_STATUS;
  items: OrderItemWithID[];
  quantity: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export type CustomerOrderDTO = {
  items: OrderItemWithID[];
  total: number;
  quantity: number;
  invoiceNumber: string;
  paymentStatus: PAYMENT_STATUS;
  orderStatus: ORDER_STATUS;

}


export type OrdersResponse = {
  orders: {
    content: Order[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: { sorted: boolean; empty: boolean; unsorted: boolean };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: { sorted: boolean; empty: boolean; unsorted: boolean };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  }
  statusCounts: TodayOrderStats
};

export type OrderPayload = {
  tableId: number;
  waiterId: number;
  cashierId: number;
  paymentStatus: PAYMENT_STATUS;
  orderStatus: ORDER_STATUS;
  items: OrderItem[];
  customerId: number;
  customerName: string;
  customerTitle: string;
  customerPhoneNumber: string;
};

export type TodayOrderStats = {
  pending: number;
  preparing: number;
  completed: number;
  paid: number;
  cancelled: number;
  total: number;
};

export type UseOrdersParams = {
  orderStatus?: string;
  paymentStatus?: string;
  waiterId?: number;
  cashierId?: number;
  tableId?: number;
  search?: string;
  minTotal?: number;
  maxTotal?: number;
  startDate?: string | null;
  endDate?: string | null;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "asc" | "desc";
};

export type UpdateOrderInput = {
  id: number;
  payload: { orderStatus: ORDER_STATUS; paymentStatus: PAYMENT_STATUS };
}

export type OrderStore = {
  sortBy: string;
  direction: "asc" | "desc";
  hasHydrated: boolean,
  orderStatus: string | null;
  loading: boolean
  paymentStatus: string | null;
  waiterId: number | null;
  cashierId: number | null;
  tableId: number | null;
  minTotal: number | null;
  maxTotal: number | null;
  startDate: string | null;
  endDate: string | null;
  search: string;

  // Pagination
  currentPage: number; // zero-based index
  contentPerPage: number;
  totalPages: number;
  totalOrders: number;

  todayOrderStats: TodayOrderStats;
  setPaginationData: (totalElements: number, totalPages: number, pageNumber: number, pageSize: number) => void;
  setLoading: (loading: boolean) => void;
  setTodayOrderStats: (stats: TodayOrderStats) => void;

  setSearch: (value: string) => void;

  setSortBy: (sortBy: string) => void;
  setDirection: (direction: "asc" | "desc") => void;
  setOrderStatus: (status: string | null) => void;
  setPaymentStatus: (status: string) => void;
  setWaiterId: (id: number | null) => void;
  setCashierId: (id: number | null) => void;
  setTableId: (id: number | null) => void;
  setMinTotal: (total: number | null) => void;
  setMaxTotal: (total: number | null) => void;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;

  setCurrentPage: (page: number) => void;
  setContentPerPage: (count: number) => void;
};
