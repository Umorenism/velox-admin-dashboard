import { apiClient } from "./apiClient";

// ✅ Fetch Dashboard Overview
export const getDashboardOverview = async () => {
  try {
    const res = await apiClient.get("/api/v1/admin/dashboard");
    return res.data;
  } catch (error) {
    console.error("Fetching dashboard overview failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch stats
export const getStats = async () => {
  try {
    const res = await apiClient.get("/api/admin/stats/users");
    return res.data;
    console.log(res);
  } catch (error) {
    console.error("Fetching stats  failed:", error.response?.data || error.message);
    throw error;
  }
};
