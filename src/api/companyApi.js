import { apiClient } from "./apiClient";

// ✅ Get Company Profile
export const getCompanyProfile = async () => {
  try {
    const res = await apiClient.get("/api/v1/admin/company");
    return res.data;
  } catch (error) {
    console.error("Fetching company profile failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update Company Profile
export const updateCompanyProfile = async (data) => {
  try {
    const res = await apiClient.put("/api/v1/admin/company", data);
    return res.data;
  } catch (error) {
    console.error("Updating company profile failed:", error.response?.data || error.message);
    throw error;
  }
};
