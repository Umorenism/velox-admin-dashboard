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





export const freezeUserWithdrawal = async (userId, reason) => {
  const response = await apiClient.post('/api/admin/users/freeze-withdrawal', {
    userId,
    reason
  });
  return response.data;
};

export const unfreezeUserWithdrawal = async (userId) => {
  const response = await apiClient.post('/api/admin/users/unfreeze-withdrawal', {
    userId
  });
  return response.data;
};