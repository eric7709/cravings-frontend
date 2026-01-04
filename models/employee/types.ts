import { ROLE } from "../auth/types";

export type Employee = {
  id: number;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string
};



export type EmployeeValues = {
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type EmployeePayload = EmployeeValues;

export type EmployeeErrors = {
  role?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};

export type EmployeeStore = {
  sortDir: "asc" | "desc";

  sort: string;
  waiterOptions: { label: string; value: string }[];
  cashierOptions: { label: string; value: string }[];
  filter: string;
  currentPage: number;
  contentPerPage: number;
  totalEmployee: number;
  search: string;
  selectedEmployee: Employee | null;
  activeModal: "create" | "update" | "delete" | null;

  employees: Employee[];

  // actions
  openCreateModal: () => void;
  openUpdateModal: () => void;
  openDeleteModal: () => void;
  closeModal: () => void;
  setEmployees: (data: Employee[]) => void;
  clearEmployee: () => void;
  setSelectedEmployee: (data: Employee) => void;
  addEmployee: (employee: Employee) => void;
  removeEmployee: (id: string | number) => void;
  updateEmployee: (employee: Employee) => void;

  setSort: (sort: string) => void;
  setSortDir: (dir: "asc" | "desc") => void;
  setFilter: (filter: string) => void;
  setSearch: (query: string) => void;

  setCurrentPage: (page: number) => void;
  setContentPerPage: (count: number) => void;
};
