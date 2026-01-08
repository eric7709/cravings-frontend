import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_ENVIRONMENT == "DEVELOPMENT"
    ? process.env.NEXT_PUBLIC_BACKEND_DEV_URL
    : process.env.NEXT_PUBLIC_BACKEND_PRO_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// List of public routes that don't require authentication
const PUBLIC_ROUTES = ["/book", "/auth/signup", "/auth/login", "/auth"];

// Helper function to check if current path is public
const isPublicRoute = () => {
  if (typeof window === "undefined") return false;
  const currentPath = window.location.pathname;
  return PUBLIC_ROUTES.some((route) => currentPath.startsWith(route));
};

// Helper to check if the request URL is public
const isPublicRequest = (url?: string) => {
  if (!url) return false;
  return (
    url.includes("/auth/login") ||
    url.includes("/auth/signup") ||
    url.includes("/auth/refresh") ||
    url.includes("/auth/verify")
  ); // Add any other auth endpoints
};

// Track if we're currently refreshing to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor - Add access token to every request
api.interceptors.request.use(
  (config) => {
    // Don't add token to public requests
    if (isPublicRequest(config.url)) {
      return config;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // ✅ Don't handle 401 for public routes or public requests
    if (isPublicRoute() || isPublicRequest(originalRequest.url)) {
      return Promise.reject(error);
    }

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we're already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        // No refresh token, clear and redirect
        isRefreshing = false;
        processQueue(new Error("No refresh token"), null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        if (!isPublicRoute()) {
          window.location.href = "/auth/login";
        }
        return Promise.reject(error);
      }

      try {
        // Call your refresh token endpoint using plain axios to avoid interceptor loop
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;

        // Save new access token
        localStorage.setItem("accessToken", newAccessToken);

        // If new refresh token is returned, save it too
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        // Update the authorization header
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Process queued requests
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry original request with new token
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        processQueue(refreshError, null);
        isRefreshing = false;

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Clear the authorization header
        delete api.defaults.headers.common["Authorization"];
        // ✅ Only redirect if not already on public route
        if (!isPublicRoute()) {
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
