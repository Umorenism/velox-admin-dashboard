// src/api/leaderApi.js
import { apiClient } from "./apiClient";

// ✅ Get total leaders
export const getTotalLeaders = async () => {
  try {
    const res = await apiClient.get("/api/admin/leaders/total");
    console.log("✅ Total Leaders Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching total leaders:", error.response?.data || error);
    throw error;
  }
};

// ✅ Get total active leaders
export const getActiveLeaders = async () => {
  try {
    const res = await apiClient.get("/api/admin/leaders/active/total");
    console.log("✅ Active Leaders Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching active leaders:", error.response?.data || error);
    throw error;
  }
};

// ✅ Get all users
export const getleaderAllUsers = async () => {
  try {
    const res = await apiClient.get("/api/admin/users");
    console.log("✅ Users Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching users:", error.response?.data || error);
    throw error;
  }
};


// ✅ Send bulk email
export const sendBulkEmail = async (payload) => {
  if (!payload.subject || !payload.message) {
    throw new Error("Subject and message body are required");
  }

  try {
    const res = await apiClient.post("/api/admin/email/bulk", payload);
    console.log("✅ Bulk Email Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error sending bulk email:", error.response?.data || error);
    throw error;
  }
};
