import { apiClient } from "./apiClient";

export const getWithdrawals = async () => {
  try {
    const res = await apiClient.get("/api/admin/withdrawals");
    console.log("✅ [GET WITHDRAWALS SUCCESS]", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ [GET WITHDRAWALS FAILED]", error.response?.data || error);
    throw error;
  }
};
