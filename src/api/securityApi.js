import { apiClient } from "./apiClient";

export const updatePassword = async (oldPassword, newPassword) => {
  const res = await apiClient.put("/api/v1/admin/change-password", {
    oldPassword,
    newPassword,
  });
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await apiClient.put("/api/v1/admin/profile", data);
  return res.data;
};

export const getSecurityLogs = async () => {
  const res = await apiClient.get("/api/v1/admin/security-logs");
  return res.data;
};
