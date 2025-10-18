import { apiClient } from "./apiClient";

export const getAllWithdrawals = async () => {
  const res = await apiClient.get("/api/v1/admin/withdrawals");
  return res.data;
};

export const approveWithdrawal = async (id) => {
  const res = await apiClient.put(`/api/v1/admin/withdrawals/${id}/approve`);
  return res.data;
};

export const rejectWithdrawal = async (id, reason) => {
  const res = await apiClient.put(`/api/v1/admin/withdrawals/${id}/reject`, { reason });
  return res.data;
};
