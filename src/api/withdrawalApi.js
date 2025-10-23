import { apiClient } from "./apiClient";

// ✅ Get All Withdrawals
export const getWithdrawals = async () => {
  try {
    const res = await apiClient.get("/api/v1/admin/withdrawals");
    return res.data;
  } catch (error) {
    console.error("Fetching withdrawals failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Approve Withdrawal
export const approveWithdrawal = async (id) => {
  try {
    const res = await apiClient.post(`/api/v1/admin/withdrawals/${id}/approve`);
    return res.data;
  } catch (error) {
    console.error("Approving withdrawal failed:", error.response?.data || error.message);
    throw error;
  }
};
