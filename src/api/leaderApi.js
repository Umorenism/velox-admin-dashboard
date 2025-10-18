import { apiClient } from "./apiClient";

export const getAllLeaders = async () => {
  const res = await apiClient.get("/api/v1/admin/leaders");
  return res.data;
};

export const getLeaderById = async (id) => {
  const res = await apiClient.get(`/api/v1/admin/leaders/${id}`);
  return res.data;
};

export const updateLeader = async (id, data) => {
  const res = await apiClient.put(`/api/v1/admin/leaders/${id}`, data);
  return res.data;
};
