import { apiClient } from "./apiClient";

// ✅ Get Promotions
export const getPromotions = async () => {
  try {
    const res = await apiClient.get("/api/v1/admin/promotions");
    return res.data;
  } catch (error) {
    console.error("Fetching promotions failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Create Banner
export const createBanner = async (data) => {
  try {
    const res = await apiClient.post("/api/v1/admin/promotions/banner", data);
    return res.data;
  } catch (error) {
    console.error("Creating banner failed:", error.response?.data || error.message);
    throw error;
  }
};
