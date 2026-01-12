export type LoginValues = {
  email: string;
  password: string;
};
export type LoginErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
// types/user.ts
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  gender: string;
  role: ROLE; // or enum if you have one in frontend
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type GENDER = "FEMALE" | "MALE" | "";

export type ROLE =
  | "ROLE_ADMIN"
  | "ROLE_CHEF"
  | "ROLE_COOK"
  | "ROLE_BAKER"
  | "ROLE_WAITER"
  | "ROLE_CASHIER"
  | "ROLE_MANAGER"
  | null;

export type UserState = {
  user: User | null;
  activeModal: "change-password" | null;
  loading: boolean;
  hasHydrated: boolean;
  setUser: (user: User | null) => void;
  openChangePasswordModal: () => void;
  closeModal: () => void;
  updateUser: (updated: Partial<User>) => void;
  clearUser: () => void;
  setLoading: (value: boolean) => void;
};
