import { useUserStore } from "@/models/auth/store";

export const useGetRole = () => {
  const { user } = useUserStore();
  const role = user?.role;
  function getRole() {
    if (role == "ROLE_ADMIN") return "admin";
    else if (role == "ROLE_CASHIER") return "cashier";
    else if (role == "ROLE_WAITER") return "waiter";
    else {
      return "";
    }
  }
  return getRole()
};


export const useGetDepartment = () => {
  const { user } = useUserStore();
  const role = user?.role;
  function getRole() {
    if (role == "ROLE_ADMIN") return "admin";
    else if (role == "ROLE_CASHIER") return "front desk";
    else if (role == "ROLE_WAITER") return "service";
    else if (role == "ROLE_CHEF" || role == "ROLE_COOK") return "kitchen";
    else {
      return "";
    }
  }
  return getRole()
};
