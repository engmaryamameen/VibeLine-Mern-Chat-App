import axios from "axios";

// Axios instance that automatically injects the user's bearer token
const apiClient = axios.create({
  // baseURL is optional; CRA proxy will forward relative paths in dev
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("userInfo");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
  } catch (_) {}
  return config;
});

export default apiClient;

