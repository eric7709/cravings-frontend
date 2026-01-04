import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// List of public routes that don't require authentication
const PUBLIC_ROUTES = ["/book", "/auth/signup", "/auth/login"];
// Helper function to check if current path is public
const isPublicRoute = () => {
  if (typeof window === "undefined") return false;
  return PUBLIC_ROUTES.some(route => window.location.pathname.startsWith(route));
};

// Request interceptor - Add access token to every request
api.interceptors.request.use(
  (config) => {
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

    // If on a public route, don't try to refresh or redirect
    if (isPublicRoute()) {
      return Promise.reject(error);
    }

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (!refreshToken) {
          // No refresh token, redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }

        // Call your refresh token endpoint
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`, // Adjust this endpoint to match your API
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

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;