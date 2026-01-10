export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  status: MENUITEM_STATUS;
  imageUrl?: string;
  categoryId: number;
  categoryName: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MenuItemValues = {
  name: string;
  categoryId: string;
  status: MENUITEM_STATUS;
  price: string;
  description: string;
  imageUrl?: string;
};

export type MenuItemPayload = {
  name: string;
  categoryId: number;
  status: MENUITEM_STATUS;
  price: number;
  description: string;
  imageUrl?: string;
};

export type MENUITEM_STATUS = "AVAILABLE" | "UNAVAILABLE" | null;

// Validation error type
export type MenuItemErrors = {
  name?: string;
  categoryId?: string;
  price?: string;
  imageUrl?: string;
  general?: string;
  description?: string;
};

// Modal Types
type MenuItemModal = "create" | "update" | "delete" | null;


// Zustand Store
export type MenuItemStore = {
  // Pagination + filtering
  sortDir: "asc" | "desc";
  hasHydrated: boolean
  sort: string;
  filter: string;
  currentPage: number;
  contentPerPage: number;
  status: MENUITEM_STATUS;
  totalMenuItem: number;
  search: string;

  // Selected
  selectedMenuItem: MenuItem | null;

  // Data
  menuItems: MenuItem[];

  // Modal
  activeModal: MenuItemModal;
  closeModal: () => void;
  openCreateModal: () => void;
  openDeleteModal: () => void;
  openUpdateModal: () => void;
  setStatus: (status: MENUITEM_STATUS) => void
  // CRUD state updates
  setMenuItems: (data: MenuItem[]) => void;
  addMenuItem: (item: MenuItem) => void;
  setSelectedMenuItem: (item: MenuItem | null) => void;
  removeMenuItem: (id: number) => void;
  updateMenuItem: (item: MenuItem) => void;

  // Filtering
  setSort: (sort: string) => void;
  setSortDir: (dir: "asc" | "desc") => void;
  setFilter: (filter: string) => void;
  setSearch: (query: string) => void;

  // Pagination
  setCurrentPage: (page: number) => void;
  setContentPerPage: (count: number) => void;
};
