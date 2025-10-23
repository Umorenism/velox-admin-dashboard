import { apiClient } from "./apiClient";

// ✅ Get All Leaders
export const getAllLeaders = async () => {
  try {
    const res = await apiClient.get("/api/v1/admin/leaders");
    return res.data;
  } catch (error) {
    console.error("Fetching leaders failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Promote Leader
export const promoteLeader = async (id) => {
  try {
    const res = await apiClient.post(`/api/v1/admin/leaders/${id}/promote`);
    return res.data;
  } catch (error) {
    console.error("Promoting leader failed:", error.response?.data || error.message);
    throw error;
  }
};
