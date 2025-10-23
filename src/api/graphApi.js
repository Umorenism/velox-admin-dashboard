import { apiClient } from "./apiClient";


export const adminGraphy = async () => {
  try {
    const res = await apiClient.get("api/admin/graph/deposits");
    return res.data;
  } catch (error) {
    console.error("Fetching graphy history failed:", error.response?.data || error.message);
    throw error;
  }
};
export const packageGraphy = async () => {
  try {
    const res = await apiClient.get("api/admin/graph/packages");
    return res.data;
  } catch (error) {
    console.error("Fetching packaging graphy history failed:", error.response?.data || error.message);
    throw error;
  }
};
export const leaderGraphy = async () => {
  try {
    const res = await apiClient.get("api/admin/packages");
    return res.data;
  } catch (error) {
    console.error("Fetching packaging graphy history failed:", error.response?.data || error.message);
    throw error;
  }
};