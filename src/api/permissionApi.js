import { apiClient } from "./apiClient";

// ✅ Get Roles
export const getRoles = async () => {
  try {
    const res = await apiClient.get("/api/v1/admin/roles");
    return res.data;
  } catch (error) {
    console.error("Fetching roles failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update Role Permissions
export const updateRolePermissions = async (roleId, data) => {
  try {
    const res = await apiClient.put(`/api/v1/admin/roles/${roleId}`, data);
    return res.data;
  } catch (error) {
    console.error("Updating role permissions failed:", error.response?.data || error.message);
    throw error;
  }
};
