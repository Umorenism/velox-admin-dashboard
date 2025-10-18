import { apiClient } from "./apiClient";

export const getAllTransactions = async () => {
  const res = await apiClient.get("/api/v1/admin/transactions");
  return res.data;
};

export const getTransactionById = async (id) => {
  const res = await apiClient.get(`/api/v1/admin/transactions/${id}`);
  return res.data;
};

export const filterTransactions = async (params) => {
  const res = await apiClient.get("/api/v1/admin/transactions/filter", { params });
  return res.data;
};
