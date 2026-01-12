export type Customer = {
  id: number;
  name: string;
  title: string;
  phoneNumber?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CustomerValues = {
  name: string;
  email?: string;
  phoneNumber?: string;
  title: string;
};

export type CustomerErrors = {
  name?: string;
  phoneNumber?: string;
  title?: string;
  email?: string;
  general?: string;
};

export type CustomerPayload = CustomerValues;

export type CustomerModal = "create" | "update" | "delete" | null;

export type CustomerStore = {
  // Pagination + filtering
  sortDir: "asc" | "desc";
  sort: string;
  loading: boolean 
  hasHydrated: boolean
  filter: string;
  currentPage: number;
  contentPerPage: number;
  totalCustomer: number;
  search: string;

  // Selected
  selectedCustomer: Customer | null;

  // Data
  customers: Customer[];

  // Modal
  activeModal: CustomerModal;
  closeModal: () => void;
  openCreateModal: () => void;
  openDeleteModal: () => void;
  openUpdateModal: () => void;
  setLoading: (loading: boolean) => void

  // CRUD state updates
  setCustomers: (data: Customer[]) => void;
  addCustomer: (customer: Customer) => void;
  setSelectedCustomer: (customer: Customer | null) => void;
  removeCustomer: (id: number) => void;
  updateCustomer: (customer: Customer) => void;

  // Filtering
  setSort: (sort: string) => void;
  setSortDir: (dir: "asc" | "desc") => void;
  setFilter: (filter: string) => void;
  setSearch: (query: string) => void;

  // Pagination
  setCurrentPage: (page: number) => void;
  setContentPerPage: (count: number) => void;
};