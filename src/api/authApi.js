import { apiClient } from "./apiClient";

// ✅ Admin Login
export const loginAdmin = async ({ username, password }) => {
  try {
    const payload = { email: username, password };
    const res = await apiClient.post("/api/v1/admin/loginAdmin", payload);
    return res.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Forgot Password
export const sendResetEmail = async (email) => {
  try {
    const payload = { email };
    const res = await apiClient.post("/moonspot/auth/request-password-reset", payload);
    return res.data;
  } catch (error) {
    console.error("Forgot password failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Reset Password
export const resetPassword = async (token, newPassword) => {
  try {
    const payload = { token, newPassword };
    const res = await apiClient.post("/moonspot/auth/reset-password", payload);
    return res.data;
  } catch (error) {
    console.error("Reset password failed:", error.response?.data || error.message);
    throw error;
  }
};
