// src/api/bannerApi.js
import { apiClient } from "../api/apiClient";

// ✅ Create Banner
// ✅ Create Banner (multipart upload)
export const createBanner = async (bannerData) => {
  const res = await apiClient.post("/api/admin/banners", bannerData, {
    headers: {
      "Content-Type": "multipart/form-data", // 👈 override JSON
    },
  });
  console.log("Create Banner Response:", res.data);
  return res.data;
};


// ✅ Get All Banners
export const getBanners = async () => {
  const res = await apiClient.get("/api/admin/banners");
  console.log("Get Banners Response:", res.data); // Debug log
  return res.data;
};

// ✅ Update Banner
export const updateBanner = async (id, updatedData) => {
  const res = await apiClient.put(`/api/admin/banners/${id}`, updatedData);
  console.log("Update Banner Response:", res.data); // Debug log
  return res.data;
};

// ✅ Delete Banner
export const deleteBanner = async (id) => {
  const res = await apiClient.delete(`/api/admin/banners/${id}`);
    console.log("Delete Banner Response:", res.data); // Debug log
  return res.data;
};
