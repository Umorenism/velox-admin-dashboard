import { apiClient } from "./apiClient";

// ✅ Get all users
export const getAllUsers = async () => {
  const res = await apiClient.get("/api/v1/admin/users");
  return res.data;
};

// ✅ Get a single user
export const getUserById = async (userId) => {
  const res = await apiClient.get(`/api/v1/admin/users/${userId}`);
  return res.data;
};

// ✅ Update user info
export const updateUser = async (userId, data) => {
  const res = await apiClient.put(`/api/v1/admin/users/${userId}`, data);
  return res.data;
};

// ✅ Delete user
export const deleteUser = async (userId) => {
  const res = await apiClient.delete(`/api/v1/admin/users/${userId}`);
  return res.data;
};
