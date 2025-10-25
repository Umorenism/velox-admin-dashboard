import { apiClient } from "../api/apiClient";

// ✅ Get all users
export const getUsers = async (params = {}) => {
  try {
    const res = await apiClient.get("/api/admin/users", { params });
    console.log("Fetched Users:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error);
    throw error;
  }
};


// ✅ Activate package
export const activateUserPackage = async (userId) => {
  return await apiClient.post(`/api/admin/users/active-packages`, { userId });
};

// ✅ Fund package
export const fundUserPackage = async (userId, data) => {
  return await apiClient.post(`/api/admin/users/fund`, { userId, ...data });
};

