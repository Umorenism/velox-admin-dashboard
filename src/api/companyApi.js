import { apiClient } from "./apiClient";

export const companyProfileApi = {
  get: async () => {
    try {
      const res = await apiClient.get("/api/admin/settings/company");
      return res.data; // { message, settings }
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data || "Failed to fetch company profile";
      throw new Error(message);
    }
  },
  post: async (formData) => {
    try {
      const res = await apiClient.post("/api/admin/settings/company", formData);
      return res.data; // { message, settings }
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data || "Failed to update company profile. Please check server configuration.";
      throw new Error(message);
    }
  },
};