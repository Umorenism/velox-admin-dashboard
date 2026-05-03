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





export const getUsersForAdmin = async () => {
  // This endpoint should return the list of users with withdrawalFrozen status
  const response = await apiClient.get('/api/admin/users');
  return response.data;
};

export const freezeUserWithdrawal = async (userId, reason) => {
  const response = await apiClient.post(
    `/api/admin/users/${userId}/freeze`,
    { reason }
  );
  return response.data;
};

export const unfreezeUserWithdrawal = async (userId) => {
  const response = await apiClient.post(
    `/api/admin/users/${userId}/freeze`
  );
  return response.data;
};

// --- Restriction ---
export const restrictUser = async (userId, reason) => {
  const response = await apiClient.post(
    `/api/admin/users/${userId}/restrict`,
    { reason }
  );
  return response.data;
};

export const unrestrictUser = async (userId) => {
  const response = await apiClient.post(
    `/api/admin/users/${userId}/restrict`
  );
  return response.data;
};


export const getAdminWithdrawals = async () => {
  try {
    const res = await apiClient.get("/api/admin/withdrawals");
    console.log("✅ [GET WITHDRAWALS SUCCESS]", res.data);
    return res.data; // Returns { withdrawals: [], totals: {} }
  } catch (error) {
    console.error("❌ [GET WITHDRAWALS FAILED]", error.response?.data || error);
    throw error;
  }
};

export const approveWithdrawal = async (transactionId) => {
  try {
    const res = await apiClient.post("/api/admin/withdrawals/approve", { transactionId });
    return res.data;
  } catch (error) {
    console.error("❌ [APPROVE FAILED]", error.response?.data || error);
    throw error;
  }
};

export const rejectWithdrawal = async (transactionId, rejectionReason) => {
  try {
    const res = await apiClient.post("/api/admin/withdrawals/reject", { 
      transactionId, 
      rejectionReason 
    });
    return res.data;
  } catch (error) {
    console.error("❌ [REJECT FAILED]", error.response?.data || error);
    throw error;
  }
};