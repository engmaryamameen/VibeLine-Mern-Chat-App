import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});

let isShowingAuthError = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.config?.url?.includes("/auth/check")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !isShowingAuthError) {
      isShowingAuthError = true;
      if (!error.config?.url?.includes("/auth/check")) {
        toast.error(error.response?.data?.message || "Unauthorized");
      }
      setTimeout(() => {
        isShowingAuthError = false;
      }, 2000);
    }

    return Promise.reject(error);
  }
);
