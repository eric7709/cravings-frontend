export type Category = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  status: string;
  menuItemCount: number;
};

export type CategoryValues = {
  name: string;
  description?: string;
};

export type CategoryErrors = {
  name?: string;
  description?: string;
};

export type CategoryPayload = CategoryValues


export type CategoryStore = {
  sortDir: "asc" | "desc";
  sort: string;
  filter: string;
  currentPage: number;
  contentPerPage: number;
  totalCategory: number;
  search: string;
  categories: Category[];
  selectedCategory: Category | null;

  activeModal: null | "create" | "update" | "delete";
  openCreateModal: () => void;
  closeModal: () => void;
  openUpdateModal: () => void;
  openDeleteModal: () => void;

  setCategories: (data: Category[]) => void;
  setSelectedCategory: (data: Category) => void;
  addCategory: (category: Category) => void;
  removeCategory: (id: string | number) => void;
  updateCategory: (category: Category) => void;

  setSort: (sort: string) => void;
  setSortDir: (dir: "asc" | "desc") => void;
  setFilter: (filter: string) => void;
  setSearch: (query: string) => void;

  setCurrentPage: (page: number) => void;
  setContentPerPage: (count: number) => void;
};
