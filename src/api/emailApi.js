import { apiClient } from "./apiClient";

// ✅ Send Broadcast Email
export const sendBroadcastEmail = async (data) => {
  try {
    const res = await apiClient.post("/api/v1/admin/email/broadcast", data);
    return res.data;
  } catch (error) {
    console.error("Sending broadcast failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch Email History
export const getEmailHistory = async () => {
  try {
    const res = await apiClient.get("/api/v1/admin/email/history");
    return res.data;
  } catch (error) {
    console.error("Fetching email history failed:", error.response?.data || error.message);
    throw error;
  }
};
