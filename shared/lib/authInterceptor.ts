// import axios from "axios";
// import { BASE_URL } from "../constants/BASE_URL";
// import api from "./axios";

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// // REQUEST
// api.interceptors.request.use((config) => {
//   const skip = ["/auth/login", "/auth/signup", "/auth/refresh"];
//   if (!skip.some((url) => config.url?.includes(url))) {
//     const token = localStorage.getItem("accessToken");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // RESPONSE
// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const original = err.config;
//     const skip = ["/auth/login", "/auth/signup", "/auth/refresh"];

//     if (
//       err.response?.status === 401 &&
//       !original._retry &&
//       !skip.some((url) => original.url?.includes(url))
//     ) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           original.headers.Authorization = `Bearer ${token}`;
//           return api(original);
//         });
//       }

//       original._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) throw err;

//         const { data } = await axios.post(
//           `${BASE_URL}/auth/refresh`,
//           { refreshToken },
//           { withCredentials: true }
//         );

//         localStorage.setItem("accessToken", data.accessToken);
//         api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
//         original.headers.Authorization = `Bearer ${data.accessToken}`;

//         processQueue(null, data.accessToken);
//         return api(original);
//       } catch (refreshErr) {
//         processQueue(refreshErr, null);
//         localStorage.clear();

//         if (!window.location.pathname.startsWith("/auth")) {
//           window.location.href = "/auth/login";
//         }

//         return Promise.reject(refreshErr);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(err);
//   }
// );
