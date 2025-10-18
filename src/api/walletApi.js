import { apiClient } from "./apiClient";

export const getWalletSummary = async () => {
  const res = await apiClient.get("/api/v1/admin/wallet-summary");
  return res.data;
};

export const getUserWallet = async (userId) => {
  const res = await apiClient.get(`/api/v1/admin/wallet/${userId}`);
  return res.data;
};

export const updateWalletBalance = async (userId, amount) => {
  const res = await apiClient.put(`/api/v1/admin/wallet/${userId}`, { amount });
  return res.data;
};
