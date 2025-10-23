import { apiClient } from "./apiClient";

// ✅ Get All Users
export const getAllUsers = async () => {
  try {
    const res = await apiClient.get("/api/v1/admin/users");
    return res.data;
  } catch (error) {
    console.error("Fetching users failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get User by ID
export const getUserById = async (id) => {
  try {
    const res = await apiClient.get(`/api/v1/admin/users/${id}`);
    return res.data;
  } catch (error) {
    console.error("Fetching user failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Create User
export const createUser = async (data) => {
  try {
    const res = await apiClient.post("/api/v1/admin/users", data);
    return res.data;
  } catch (error) {
    console.error("Creating user failed:", error.response?.data || error.message);
    throw error;
  }
};
export const exportUser = async (data) => {
  try {
    const res = await apiClient.post("/api/admin/users/export", data);
    return res.data;
    console.log(res.data);
  } catch (error) {
    console.error("Creating user failed:", error.response?.data || error.message);
    throw error;
  }
};
