// api/trainingApi.js

import { apiClient } from "../api/apiClient";

export const getAdminCourses = async () => {
  const res = await apiClient.get("/api/users/training/admin/courses");
  return res.data;
};

// ✅ Fix: Ensure this is spelled "createCourse"
export const createCourse = async (courseData) => {
  const res = await apiClient.post("/api/users/training/courses", courseData);
  return res.data;
};

export const updateCourse = async (courseId, updateData) => {
  const res = await apiClient.put(`/api/users/training/courses/${courseId}`, updateData);
  return res.data;
};

export const deleteCourse = async (courseId) => {
  const res = await apiClient.delete(`/api/users/training/courses/${courseId}`);
  return res.data;
};



// Upload a new video to a course
// trainingApi.js
export const uploadVideo = async (courseId, formData) => {
  const res = await apiClient.post(
    `/api/users/training/courses/${courseId}/videos`, 
    formData,
    {
      
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return res.data;
};

// Update video details
export const updateVideo = async (courseId, videoId, updateData) => {
  const res = await apiClient.put(`/api/users/training/courses/${courseId}/videos/${videoId}`, updateData);
  return res.data;
};

// Delete a video
export const deleteVideo = async (courseId, videoId) => {
  const res = await apiClient.delete(`/api/users/training/courses/${courseId}/videos/${videoId}`);
  return res.data;
};