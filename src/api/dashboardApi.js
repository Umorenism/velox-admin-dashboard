import { apiClient } from "./apiClient";

export const getDashboardStats = async () => {
  const res = await apiClient.get("/api/v1/admin/dashboard-stats");
  return res.data;
};

export const getRecentActivity = async () => {
  const res = await apiClient.get("/api/v1/admin/recent-activity");
  return res.data;
};
