import { apiClient } from "./apiClient";

// ✅ Fetch all transactions
export const getTransactions = async () => {
  try {
    const res = await apiClient.get("/api/admin/transactions");

    console.log("✅ [GET TRANSACTIONS SUCCESS]");
    console.log("Status:", res.status);
    console.log("Headers:", res.headers);
    console.log("Data:", res.data);

    return res.data;
  } catch (error) {
    console.error("❌ [GET TRANSACTIONS FAILED]");
    console.error("Status:", error.response?.status);
    console.error("Error Data:", error.response?.data || error.message);
    throw error;
  }
};
