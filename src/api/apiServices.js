import axios from "axios";

const base_url = "https://ridecartserver.pinnaclebeacon.com/";

// Base configuration for all API requests
export const apiClient = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor for adding the token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ============ AUTH APIs ============ */

// ✅ Login
// apiServices.js
export const loginAdmin = async (credentials) => {
  try {
    // Map frontend's "username" to backend's "email"
    const payload = { 
      email: credentials.username, 
      password: credentials.password 
    };

    const response = await apiClient.post("/api/v1/admin/loginAdmin", payload);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Forgot Password (Send Reset Email)
export const sendResetEmail = async (email) => {
  try {
    const payload = { email };
    const response = await apiClient.post(
      "/moonspot/auth/request-password-reset",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Forgot password failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Reset Password (Create New Password)
export const resetPassword = async (token, newPassword) => {
  try {
    const payload = { token, newPassword };
    const response = await apiClient.post(
      "/moonspot/auth/reset-password",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Reset password failed:", error.response?.data || error.message);
    throw error;
  }
};
