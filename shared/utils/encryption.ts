// utils/customerStorage.ts
import { Customer } from "@/models/customer/type";
import CryptoJS from "crypto-js";

const SECRET_KEY = "my_super_secret_key_123"; // move to .env in production


/**
 * Encrypts and stores the customer object in localStorage
 */
export const storeCustomer = (customer: Customer) => {
  try {
    const data = JSON.stringify(customer);
    const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    localStorage.setItem("customer", encrypted);
  } catch (err) {
    console.error("Failed to store customer:", err);
  }
};

/**
 * Retrieves and decrypts the customer object from localStorage
 * Returns Customer object or null if not found / fails
 */
export const getCustomer = (): Customer | null => {
  try {
    const encrypted = localStorage.getItem("customer");
    if (!encrypted) return null;

    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) return null;

    return JSON.parse(decrypted) as Customer;
  } catch (err) {
    console.error("Failed to get customer:", err);
    return null;
  }
};
