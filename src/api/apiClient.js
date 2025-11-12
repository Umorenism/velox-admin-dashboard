import axios from "axios";

const base_url = "https://backend.veloxcapitalmarkets.ai"; // ✅ your backend

export const apiClient = axios.create({
  baseURL: base_url,
});

// ✅ Attach token dynamically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🧠 Let Axios handle Content-Type automatically for FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);
