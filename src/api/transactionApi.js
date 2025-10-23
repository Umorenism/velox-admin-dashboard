import { apiClient } from "./apiClient";

// ✅ Get all transactions
export const getTransactions = async () => {
  try {
    const res = await apiClient.get("/api/admin/transactions");
    return res.data;
  } catch (error) {
    console.error("Fetching transactions failed:", error.response?.data || error.message);
    throw error;
  }
};
