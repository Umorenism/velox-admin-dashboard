import { apiClient } from "./apiClient";

export const fetchCompanyProfile = async () => {
  try {
    const res = await apiClient.get("/api/admin/settings/company");
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching company profile:", err);
    throw err;
  }
};
