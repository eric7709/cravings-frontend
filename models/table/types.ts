export type Table = {
  id: number;
  tableName: string;
  tableNumber: number;
  status: TABLE_STATUS;
  capacity: number;
  waiterName: string;
  waiterId: number;
  cashierName: string;
  cashierId: number;
};

export type TablePayload = {
  tableName: string;
  tableNumber: number;
  waiterId: number | null;
  cashierId: number | null;
  status: TABLE_STATUS;
  capacity: number;
};

export type TableValues = {
  tableName: string;
  tableNumber: string;
  waiterId: string;
  cashierId: string;
  status: TABLE_STATUS;
  capacity: string;
};

export type TableErrors = {
  tableName?: string;
  tableNumber?: string;
  waiterId?: string;
  general?: string;
  status?: string;
  capacity?: string;
};
export type TABLE_STATUS =
  | "AVAILABLE"
  | "OCCUPIED"
  | "RESERVED"
  | "UNAVAILABLE";

export type TableModal =
  | "create"
  | "update"
  | "delete"
  | "allocate"
  | "deallocate"
  | "qrcode"
  | null;

export type TableStore = {
  sortDir: "asc" | "desc";
  sort: string;
  loading: boolean;
  hasHydrated: boolean;
  filter: string;
  currentPage: number;
  contentPerPage: number;
  totalTable: number;
  search: string;
  tables: Table[];
  selectedTable: Table | null;
  activeModal: TableModal;
  openUpdateModal: () => void;
  openCreateModal: () => void;
  openQRCodeModal: () => void;
  openDeallocateModal: () => void;
  openAllocateModal: () => void;
  openDeleteModal: () => void;
  getTable: (id: number | string) => Table | null;
  setLoading: (loading: boolean) => void;
  closeModal: () => void;

  setTables: (data: Table[]) => void;
  setSelectedTable: (table: Table) => void;
  addTable: (table: Table) => void;
  removeTable: (id: string | number) => void;
  updateTable: (table: Table) => void;

  setSort: (sort: string) => void;
  setSortDir: (dir: "asc" | "desc") => void;
  setFilter: (filter: string) => void;
  setSearch: (query: string) => void;

  setCurrentPage: (page: number) => void;
  setContentPerPage: (count: number) => void;
};
