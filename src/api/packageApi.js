// src/api/packageApi.js
import { apiClient } from "./apiClient";

export const createPackage = async (data) => {
  try {
    const res = await apiClient.post("/api/admin/packages/create", data);
    return res.data;
  } catch (error) {
    console.error(
      "Creating package failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllPackages = async () => {
  try {
    const res = await apiClient.get("/api/admin/packages");
    return res.data; // Expected: [{_id, name, price, image, ...}]
  } catch (error) {
    console.error("Fetching packages failed:", error.response?.data || error.message);
    throw error;
  }
};
