import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  process.env.NEXT_PUBLIC_ENVIRONMENT == "DEVELOPMENT"
    ? process.env.NEXT_PUBLIC_BACKEND_DEV_URL
    : process.env.NEXT_PUBLIC_BACKEND_PRO_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const PUBLIC_ROUTES = ["/book", "/auth/signup", "/auth/login", "/auth"];

const isPublicRoute = () => {
  if (typeof window === "undefined") return false;
  const currentPath = window.location.pathname;
  return PUBLIC_ROUTES.some((route) => currentPath.startsWith(route));
};

const isPublicRequest = (url?: string) => {
  if (!url) return false;
  return (
    url.includes("/auth/login") ||
    url.includes("/auth/signup") ||
    url.includes("/auth/refresh") ||
    url.includes("/auth/verify")
  );
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// --- REQUEST INTERCEPTOR ---
api.interceptors.request.use(
  (config) => {
    if (isPublicRequest(config.url)) return config;

    // ✅ Switch: localStorage -> Cookies
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (isPublicRoute() || isPublicRequest(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // ✅ Switch: localStorage -> Cookies
      const refreshToken = localStorage.getItem("refreshToken"); 
      // Note: Keeping refresh token in localStorage is often okay for security, 
      // but you can move it to an HttpOnly cookie on the backend for max security.

      if (!refreshToken) {
        isRefreshing = false;
        processQueue(new Error("No refresh token"), null);
        
        // ✅ Cleanup
        Cookies.remove("accessToken");
        Cookies.remove("userRole");
        localStorage.removeItem("refreshToken");

        if (!isPublicRoute()) window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;

        // ✅ Switch: Set new access token in Cookies
        Cookies.set("accessToken", newAccessToken, { expires: 7 });

        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // ✅ Cleanup
        Cookies.remove("accessToken");
        Cookies.remove("userRole");
        localStorage.removeItem("refreshToken");
        
        delete api.defaults.headers.common["Authorization"];
        
        if (!isPublicRoute()) window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;