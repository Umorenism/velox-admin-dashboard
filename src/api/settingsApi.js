import { apiClient } from "./apiClient";

// ✅ Get Security Logs
export const getActivityLogs = async () => {
  try {
    const res = await apiClient.get("/api/v1/admin/settings/logs");
    return res.data;
  } catch (error) {
    console.error("Fetching logs failed:", error.response?.data || error.message);
    throw error;
  }
};
