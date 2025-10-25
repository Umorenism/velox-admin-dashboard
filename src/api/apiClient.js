import axios from "axios";

const base_url = "https://velox-n3kv.onrender.com";


// ✅ Create a base Axios instance
export const apiClient = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ❌ Only add JSON header when NOT uploading files
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);
