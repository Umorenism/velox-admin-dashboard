




// // import React, { useEffect, useState } from "react";
// // import { apiClient } from "../../api/apiClient";
// // import { toast } from "react-toastify";

// // export default function AdminUploadCourse() {
// //   const [courses, setCourses] = useState([]);
// //   const [selectedCourseId, setSelectedCourseId] = useState("");
// //   const [videos, setVideos] = useState([]);
// //   const [selectedVideo, setSelectedVideo] = useState(null);

// //   const [loadingCourses, setLoadingCourses] = useState(false);
// //   const [loadingVideos, setLoadingVideos] = useState(false);
// //   const [uploading, setUploading] = useState(false);
// //   const [uploadProgress, setUploadProgress] = useState(0);

// //   // New Course Form
// //   const [newCourse, setNewCourse] = useState({
// //     title: "",
// //     description: "",
// //     thumbnail: "",
// //     order: 1,
// //     isActive: true,
// //   });

// //   // New Video Form
// //   const [newVideo, setNewVideo] = useState({
// //     title: "",
// //     description: "",
// //     order: 1,
// //     isFree: false,
// //     videoFile: null,
// //   });

// //   // Edit Video Form
// //   const [editVideo, setEditVideo] = useState({
// //     title: "",
// //     isFree: false,
// //   });

// //   // FETCH COURSES
// //   const fetchCourses = async () => {
// //     setLoadingCourses(true);
// //     try {
// //       const res = await apiClient.get("/api/users/training/admin/courses");

// //       // Handle both direct array and { data: [...] } responses
// //       let coursesList = [];
// //       if (Array.isArray(res.data)) {
// //         coursesList = res.data;
// //       } else if (res.data?.data && Array.isArray(res.data.data)) {
// //         coursesList = res.data.data;
// //       } else if (res.data && typeof res.data === "object") {
// //         coursesList = res.data.courses || res.data.results || [];
// //       }

// //       setCourses(coursesList);
// //     } catch (err) {
// //       console.error("Error fetching courses:", err);
// //       toast.error("Failed to load courses");
// //     } finally {
// //       setLoadingCourses(false);
// //     }
// //   };

// //   // FETCH VIDEOS FOR SELECTED COURSE
// //   const fetchVideos = async (courseId) => {
// //   if (!courseId) {
// //     setVideos([]);
// //     setSelectedVideo(null);
// //     return;
// //   }

// //   setLoadingVideos(true);
// //   try {
// //     const res = await apiClient.get(`/api/users/training/courses/${courseId}/videos`);

// //     const videoList = Array.isArray(res.data)
// //       ? res.data
// //       : res.data?.data || res.data?.videos || [];

// //     console.log(`Videos loaded (${videoList.length}):`, videoList);

// //     setVideos(videoList);
// //   } catch (err) {
// //     console.error("Videos fetch error:", err.response?.data || err);
// //     toast.error("Failed to load videos");
// //     setVideos([]);
// //   } finally {
// //     setLoadingVideos(false);
// //   }
// // };

// //   useEffect(() => {
// //     fetchCourses();
// //   }, []);

// //   useEffect(() => {
// //     fetchVideos(selectedCourseId);
// //   }, [selectedCourseId]);

// //   // CREATE COURSE
// //   const createCourse = async (e) => {
// //     e.preventDefault();
// //     if (!newCourse.title.trim()) return toast.error("Course title is required");

// //     try {
// //       await apiClient.post("/api/users/training/courses", newCourse);
// //       toast.success("Course created successfully");
// //       setNewCourse({ title: "", description: "", thumbnail: "", order: 1, isActive: true });
// //       fetchCourses();
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Failed to create course");
// //     }
// //   };

// //   // DELETE COURSE
// //   const deleteCourse = async (courseId) => {
// //     if (!window.confirm("Delete this course and all its videos?")) return;
// //     try {
// //       await apiClient.delete(`/api/users/training/courses/${courseId}`);
// //       toast.success("Course deleted");
// //       fetchCourses();
// //       if (selectedCourseId === courseId) setSelectedCourseId("");
// //     } catch (err) {
// //       toast.error("Failed to delete course");
// //     }
// //   };

// //   // UPLOAD VIDEO
// //   const uploadVideo = async (e) => {
// //     e.preventDefault();
// //     if (!selectedCourseId) return toast.error("Please select a course first");
// //     if (!newVideo.videoFile) return toast.error("Please select a video file");
// //     if (!newVideo.title.trim()) return toast.error("Video title is required");

// //     if (newVideo.videoFile.size > 600 * 1024 * 1024) {
// //       return toast.error("Video file is too large (max 600MB)");
// //     }

// //     setUploading(true);
// //     setUploadProgress(0);

// //     try {
// //       const formData = new FormData();
// //       formData.append("title", newVideo.title);
// //       formData.append("description", newVideo.description || "");
// //       formData.append("order", newVideo.order);
// //       formData.append("isFree", newVideo.isFree);
// //       formData.append("video", newVideo.videoFile);

// //       await apiClient.post(`/api/users/training/courses/${selectedCourseId}/videos`, formData, {
// //         onUploadProgress: (progressEvent) => {
// //           const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
// //           setUploadProgress(percent);
// //         },
// //       });

// //       toast.success("Video uploaded successfully");
// //       setNewVideo({ title: "", description: "", order: 1, isFree: false, videoFile: null });
// //       fetchVideos(selectedCourseId);
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Failed to upload video");
// //     } finally {
// //       setUploading(false);
// //       setUploadProgress(0);
// //     }
// //   };

// //   // SELECT VIDEO TO EDIT
// //   const selectVideo = (video) => {
// //     setSelectedVideo(video);
// //     setEditVideo({
// //       title: video.title || "",
// //       isFree: video.isFree || false,
// //     });
// //   };

// //   // UPDATE VIDEO METADATA
// //   const updateVideo = async () => {
// //     if (!selectedCourseId || !selectedVideo?._id) return toast.error("No video selected");
// //     if (!editVideo.title.trim()) return toast.error("Video title is required");

// //     try {
// //       await apiClient.put(
// //         `/api/users/training/courses/${selectedCourseId}/videos/${selectedVideo._id}`,
// //         {
// //           title: editVideo.title,
// //           isFree: editVideo.isFree,
// //         }
// //       );
// //       toast.success("Video updated successfully");
// //       fetchVideos(selectedCourseId);
// //     } catch (err) {
// //       toast.error("Failed to update video");
// //     }
// //   };

// //   // DELETE VIDEO
// //   const deleteVideo = async () => {
// //     if (!selectedCourseId || !selectedVideo?._id) return toast.error("No video selected");
// //     if (!window.confirm("Are you sure you want to delete this video?")) return;

// //     try {
// //       await apiClient.delete(
// //         `/api/users/training/courses/${selectedCourseId}/videos/${selectedVideo._id}`
// //       );
// //       toast.success("Video deleted successfully");
// //       setSelectedVideo(null);
// //       fetchVideos(selectedCourseId);
// //     } catch (err) {
// //       toast.error("Failed to delete video");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen p-6 bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
// //       <h1 className="text-3xl font-bold mb-8">Admin – Course & Video Management</h1>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //         {/* LEFT COLUMN – Forms */}
// //         <div className="space-y-8">
// //           {/* Create Course */}
// //           <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
// //             <h2 className="text-xl font-semibold mb-5">Create New Course</h2>
// //             <form onSubmit={createCourse} className="space-y-4">
// //               <input
// //                 required
// //                 placeholder="Course Title *"
// //                 value={newCourse.title}
// //                 onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
// //                 className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
// //               />
// //               <textarea
// //                 placeholder="Description"
// //                 value={newCourse.description}
// //                 onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
// //                 className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 h-28"
// //               />
// //               <input
// //                 placeholder="Thumbnail URL (optional)"
// //                 value={newCourse.thumbnail}
// //                 onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
// //                 className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600"
// //               />
// //               {newCourse.thumbnail && (
// //                 <img
// //                   src={newCourse.thumbnail}
// //                   alt="Thumbnail preview"
// //                   className="h-32 w-full object-cover rounded mt-2 border dark:border-neutral-600"
// //                   onError={(e) => (e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Thumbnail")}
// //                 />
// //               )}
// //               <button
// //                 type="submit"
// //                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto"
// //               >
// //                 Create Course
// //               </button>
// //             </form>
// //           </div>

// //           {/* Upload Video */}
// //           <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
// //             <h2 className="text-xl font-semibold mb-5">Upload New Video</h2>

// //             <div className="mb-5">
// //               <label className="block font-medium mb-2">Select Course *</label>
// //               {loadingCourses ? (
// //                 <p>Loading courses...</p>
// //               ) : (
// //                 <select
// //                   value={selectedCourseId}
// //                   onChange={(e) => setSelectedCourseId(e.target.value)}
// //                   className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
// //                   required
// //                 >
// //                   <option value="">— Select course —</option>
// //                   {courses.map((course) => (
// //                     <option key={course._id} value={course._id}>
// //                       {course.title} ({course.videos?.length || 0} videos)
// //                     </option>
// //                   ))}
// //                 </select>
// //               )}
// //             </div>

// //             <form onSubmit={uploadVideo} className="space-y-4">
// //               <input
// //                 required
// //                 placeholder="Video Title *"
// //                 value={newVideo.title}
// //                 onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
// //                 className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600"
// //               />
// //               <textarea
// //                 placeholder="Description (optional)"
// //                 value={newVideo.description}
// //                 onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
// //                 className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 h-24"
// //               />
// //               <div>
// //                 <label className="block font-medium mb-2">Video File * (max 600MB)</label>
// //                 <input
// //                   type="file"
// //                   accept="video/*"
// //                   onChange={(e) => setNewVideo({ ...newVideo, videoFile: e.target.files?.[0] || null })}
// //                   className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
// //                   required
// //                 />
// //                 {newVideo.videoFile && (
// //                   <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
// //                     {newVideo.videoFile.name} • {(newVideo.videoFile.size / (1024 * 1024)).toFixed(2)} MB
// //                   </p>
// //                 )}
// //               </div>

// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="checkbox"
// //                   checked={newVideo.isFree}
// //                   onChange={(e) => setNewVideo({ ...newVideo, isFree: e.target.checked })}
// //                 />
// //                 Free preview video
// //               </label>

// //               <button
// //                 type="submit"
// //                 disabled={uploading || !selectedCourseId || !newVideo.videoFile}
// //                 className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-white transition ${
// //                   uploading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
// //                 } disabled:opacity-50`}
// //               >
// //                 {uploading ? `Uploading... ${uploadProgress}%` : "Upload Video"}
// //               </button>

// //               {uploading && (
// //                 <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-neutral-700">
// //                   <div
// //                     className="bg-blue-600 h-2.5 rounded-full transition-all"
// //                     style={{ width: `${uploadProgress}%` }}
// //                   />
// //                 </div>
// //               )}
// //             </form>
// //           </div>
// //         </div>

// //         {/* RIGHT COLUMN – Management */}
// //         <div className="space-y-8">
// //           {/* Courses List */}
// //           <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
// //             <h2 className="text-xl font-semibold mb-5">Existing Courses ({courses.length})</h2>

// //             {loadingCourses ? (
// //               <p className="text-center py-10 text-gray-500">Loading courses...</p>
// //             ) : courses.length === 0 ? (
// //               <p className="text-center py-10 text-gray-500">No courses found</p>
// //             ) : (
// //               <div className="space-y-3 max-h-[600px] overflow-y-auto">
// //                 {courses.map((course) => (
// //                   <div
// //                     key={course._id}
// //                     onClick={() => setSelectedCourseId(course._id)}
// //                     className={`p-4 rounded-lg cursor-pointer border transition ${
// //                       selectedCourseId === course._id
// //                         ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40"
// //                         : "border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700"
// //                     }`}
// //                   >
// //                     <div className="flex justify-between items-start">
// //                       <div>
// //                         <p className="font-medium">{course.title}</p>
// //                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
// //                           {course.videos?.length || 0} videos • Order: {course.order}
// //                         </p>
// //                       </div>
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           deleteCourse(course._id);
// //                         }}
// //                         className="text-red-600 hover:text-red-800 text-sm"
// //                       >
// //                         Delete
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Manage Videos Section */}
// //           <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
// //   <div className="flex justify-between items-center mb-5">
// //     <h2 className="text-xl font-semibold">Manage Videos</h2>
// //     {selectedCourseId && videos.length > 0 && (
// //       <button
// //         onClick={() => fetchVideos(selectedCourseId)}
// //         className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
// //       >
// //         Refresh list
// //       </button>
// //     )}
// //   </div>

// //   {!selectedCourseId ? (
// //     <div className="text-center py-10 text-gray-500 dark:text-gray-400">
// //       Select a course from the list on the left to view and manage its videos
// //     </div>
// //   ) : loadingVideos ? (
// //     <div className="text-center py-10 text-gray-500 dark:text-gray-400">
// //       Loading videos...
// //     </div>
// //   ) : videos.length === 0 ? (
// //     <div className="text-center py-10 text-gray-500 dark:text-gray-400">
// //       <p className="mb-2">No videos found in this course yet.</p>
// //       <p className="text-sm">
// //         Upload a new video using the form on the left — it will appear here automatically.
// //       </p>
// //     </div>
// //   ) : (
// //     <div className="space-y-6">
// //       <div>
// //         <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
// //           Select Video to Edit or Delete
// //         </label>
// //         <select
// //           value={selectedVideo?._id || ""}
// //           onChange={(e) => {
// //             const vid = videos.find((v) => v._id === e.target.value);
// //             if (vid) selectVideo(vid);
// //           }}
// //           className="w-full p-3.5 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //         >
// //           <option value="" disabled>
// //             — Choose a video ({videos.length} available) —
// //           </option>
// //           {videos.map((video) => (
// //             <option key={video._id} value={video._id}>
// //               {video.title || "Untitled Video"}
// //               {video.isFree ? " • (Free Preview)" : ""}
// //               {video.order ? ` • Order ${video.order}` : ""}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {!selectedVideo && videos.length > 0 && (
// //         <div className="text-center py-6 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
// //           Select a video from the dropdown above to edit its title or free status
// //         </div>
// //       )}

// //       {selectedVideo && (
// //         <div className="pt-6 border-t border-gray-200 dark:border-neutral-700 space-y-5">
// //           <div>
// //             <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
// //               Video Title
// //             </label>
// //             <input
// //               value={editVideo.title}
// //               onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
// //               placeholder="Enter video title"
// //               className="w-full p-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           <label className="flex items-center gap-3 cursor-pointer">
// //             <input
// //               type="checkbox"
// //               checked={editVideo.isFree}
// //               onChange={(e) => setEditVideo({ ...editVideo, isFree: e.target.checked })}
// //               className="w-5 h-5 text-blue-600 rounded border-gray-300 dark:border-neutral-600 focus:ring-blue-500"
// //             />
// //             <span className="text-gray-700 dark:text-gray-300">
// //               Mark as free preview video (visible without payment)
// //             </span>
// //           </label>

// //           <div className="flex flex-col sm:flex-row gap-4 pt-4">
// //             <button
// //               onClick={updateVideo}
// //               className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3.5 rounded-lg font-medium transition shadow-sm"
// //             >
// //               Update Video Details
// //             </button>
// //             <button
// //               onClick={deleteVideo}
// //               className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-lg font-medium transition shadow-sm"
// //             >
// //               Delete This Video
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )}
// // </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






// import React, { useEffect, useState, useRef } from "react";
// import { apiClient } from "../../api/apiClient";
// import { toast } from "react-toastify";

// export default function AdminUploadCourse() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState("");
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   const [loadingCourses, setLoadingCourses] = useState(false);
//   const [loadingVideos, setLoadingVideos] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   // New Course Form
//   const [newCourse, setNewCourse] = useState({
//     title: "",
//     description: "",
//     thumbnail: "",
//     order: 1,
//     isActive: true,
//   });

//   // New Video Form + Preview
//   const [newVideo, setNewVideo] = useState({
//     title: "",
//     description: "",
//     order: 1,
//     isFree: false,
//     videoFile: null,
//   });
//   const [videoPreviewUrl, setVideoPreviewUrl] = useState(null); // ← for preview
//   const videoRef = useRef(null); // optional: to control playback if needed

//   // Edit Video Form
//   const [editVideo, setEditVideo] = useState({
//     title: "",
//     isFree: false,
//   });

//   // FETCH COURSES
//   const fetchCourses = async () => {
//     setLoadingCourses(true);
//     try {
//       const res = await apiClient.get("/api/users/training/admin/courses");
//       const coursesList = Array.isArray(res.data) ? res.data : res.data?.data || [];
//       setCourses(coursesList);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//       toast.error("Failed to load courses");
//     } finally {
//       setLoadingCourses(false);
//     }
//   };

//   // FETCH VIDEOS FOR SELECTED COURSE
//   const fetchVideos = async (courseId) => {
//     if (!courseId) {
//       setVideos([]);
//       setSelectedVideo(null);
//       return;
//     }

//     setLoadingVideos(true);
//     try {
//       const res = await apiClient.get(`/api/users/training/courses/${courseId}/videos`);
//       const videoList = Array.isArray(res.data)
//         ? res.data
//         : res.data?.data || res.data?.videos || [];
//       console.log(`Videos loaded (${videoList.length}):`, videoList);
//       setVideos(videoList);
//     } catch (err) {
//       console.error("Videos fetch error:", err.response?.data || err);
//       toast.error("Failed to load videos");
//       setVideos([]);
//     } finally {
//       setLoadingVideos(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     fetchVideos(selectedCourseId);
//   }, [selectedCourseId]);

//   // CLEANUP PREVIEW URL WHEN COMPONENT UNMOUNTS OR FILE CHANGES
//   useEffect(() => {
//     return () => {
//       if (videoPreviewUrl) {
//         URL.revokeObjectURL(videoPreviewUrl);
//       }
//     };
//   }, [videoPreviewUrl]);

//   // CREATE COURSE (unchanged)
//   const createCourse = async (e) => {
//     e.preventDefault();
//     if (!newCourse.title.trim()) return toast.error("Course title is required");

//     try {
//       await apiClient.post("/api/users/training/courses", newCourse);
//       toast.success("Course created successfully");
//       setNewCourse({ title: "", description: "", thumbnail: "", order: 1, isActive: true });
//       fetchCourses();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create course");
//     }
//   };

//   // DELETE COURSE (unchanged)
//   const deleteCourse = async (courseId) => {
//     if (!window.confirm("Delete this course and all its videos?")) return;
//     try {
//       await apiClient.delete(`/api/users/training/courses/${courseId}`);
//       toast.success("Course deleted");
//       fetchCourses();
//       if (selectedCourseId === courseId) setSelectedCourseId("");
//     } catch (err) {
//       toast.error("Failed to delete course");
//     }
//   };

//   // HANDLE VIDEO FILE SELECTION + PREVIEW
//   const handleVideoFileChange = (file) => {
//     if (file) {
//       // Revoke previous URL if exists
//       if (videoPreviewUrl) {
//         URL.revokeObjectURL(videoPreviewUrl);
//       }

//       const preview = URL.createObjectURL(file);
//       setVideoPreviewUrl(preview);
//       setNewVideo({ ...newVideo, videoFile: file });
//     } else {
//       setVideoPreviewUrl(null);
//       setNewVideo({ ...newVideo, videoFile: null });
//     }
//   };

//   // UPLOAD VIDEO (unchanged except file handling moved above)
//   const uploadVideo = async (e) => {
//     e.preventDefault();
//     if (!selectedCourseId) return toast.error("Please select a course first");
//     if (!newVideo.videoFile) return toast.error("Please select a video file");
//     if (!newVideo.title.trim()) return toast.error("Video title is required");

//     if (newVideo.videoFile.size > 600 * 1024 * 1024) {
//       return toast.error("Video file is too large (max 600MB)");
//     }

//     setUploading(true);
//     setUploadProgress(0);

//     try {
//       const formData = new FormData();
//       formData.append("title", newVideo.title);
//       formData.append("description", newVideo.description || "");
//       formData.append("order", newVideo.order);
//       formData.append("isFree", newVideo.isFree);
//       formData.append("video", newVideo.videoFile);

//       await apiClient.post(`/api/users/training/courses/${selectedCourseId}/videos`, formData, {
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress(percent);
//         },
//       });

//       toast.success("Video uploaded successfully");

//       // Clean up preview after success
//       if (videoPreviewUrl) {
//         URL.revokeObjectURL(videoPreviewUrl);
//         setVideoPreviewUrl(null);
//       }

//       setNewVideo({ title: "", description: "", order: 1, isFree: false, videoFile: null });
//       fetchVideos(selectedCourseId);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to upload video");
//     } finally {
//       setUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   // SELECT VIDEO TO EDIT (unchanged)
//   const selectVideo = (video) => {
//     setSelectedVideo(video);
//     setEditVideo({
//       title: video.title || "",
//       isFree: video.isFree || false,
//     });
//   };

//   // UPDATE VIDEO METADATA (unchanged)
//   const updateVideo = async () => {
//     if (!selectedCourseId || !selectedVideo?._id) return toast.error("No video selected");
//     if (!editVideo.title.trim()) return toast.error("Video title is required");

//     try {
//       await apiClient.put(
//         `/api/users/training/courses/${selectedCourseId}/videos/${selectedVideo._id}`,
//         {
//           title: editVideo.title,
//           isFree: editVideo.isFree,
//         }
//       );
//       toast.success("Video updated successfully");
//       fetchVideos(selectedCourseId);
//     } catch (err) {
//       toast.error("Failed to update video");
//     }
//   };

//   // DELETE VIDEO (unchanged)
//   const deleteVideo = async () => {
//     if (!selectedCourseId || !selectedVideo?._id) return toast.error("No video selected");
//     if (!window.confirm("Are you sure you want to delete this video?")) return;

//     try {
//       await apiClient.delete(
//         `/api/users/training/courses/${selectedCourseId}/videos/${selectedVideo._id}`
//       );
//       toast.success("Video deleted successfully");
//       setSelectedVideo(null);
//       fetchVideos(selectedCourseId);
//     } catch (err) {
//       toast.error("Failed to delete video");
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
//       <h1 className="text-3xl font-bold mb-8">Admin – Course & Video Management</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* LEFT COLUMN – Forms */}
//         <div className="space-y-8">
//           {/* Create Course (unchanged) */}
//           <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
//             <h2 className="text-xl font-semibold mb-5">Create New Course</h2>
//             <form onSubmit={createCourse} className="space-y-4">
//               <input
//                 required
//                 placeholder="Course Title *"
//                 value={newCourse.title}
//                 onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
//                 className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={newCourse.description}
//                 onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
//                 className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 h-28"
//               />
//               <input
//                 placeholder="Thumbnail URL (optional)"
//                 value={newCourse.thumbnail}
//                 onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
//                 className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600"
//               />
//               {newCourse.thumbnail && (
//                 <img
//                   src={newCourse.thumbnail}
//                   alt="Thumbnail preview"
//                   className="h-32 w-full object-cover rounded mt-2 border dark:border-neutral-600"
//                   onError={(e) => (e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Thumbnail")}
//                 />
//               )}
//               <button
//                 type="submit"
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto"
//               >
//                 Create Course
//               </button>
//             </form>
//           </div>

//           {/* Upload Video – WITH PREVIEW */}
//           <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
//             <h2 className="text-xl font-semibold mb-5">Upload New Video</h2>

//             <div className="mb-5">
//               <label className="block font-medium mb-2">Select Course *</label>
//               {loadingCourses ? (
//                 <p>Loading courses...</p>
//               ) : (
//                 <select
//                   value={selectedCourseId}
//                   onChange={(e) => setSelectedCourseId(e.target.value)}
//                   className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="">— Select course —</option>
//                   {courses.map((course) => (
//                     <option key={course._id} value={course._id}>
//                       {course.title} ({course.videos?.length || 0} videos)
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>

//             <form onSubmit={uploadVideo} className="space-y-5">
//               <input
//                 required
//                 placeholder="Video Title *"
//                 value={newVideo.title}
//                 onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
//                 className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600"
//               />
//               <textarea
//                 placeholder="Description (optional)"
//                 value={newVideo.description}
//                 onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
//                 className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 h-24"
//               />
//               <div>
//                 <label className="block font-medium mb-2">Video File * (max 600MB)</label>
//                 <input
//                   type="file"
//                   accept="video/mp4,video/webm,video/quicktime,*"
//                   onChange={(e) => handleVideoFileChange(e.target.files?.[0] || null)}
//                   className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                   required
//                 />
//                 {newVideo.videoFile && (
//                   <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                     Selected: {newVideo.videoFile.name} • {(newVideo.videoFile.size / (1024 * 1024)).toFixed(2)} MB
//                   </p>
//                 )}
//               </div>

//               {/* VIDEO PREVIEW – appears immediately after file selection */}
//               {videoPreviewUrl && (
//                 <div className="mt-4">
//                   <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//                     Video Preview (check before upload)
//                   </label>
//                   <video
//                     ref={videoRef}
//                     src={videoPreviewUrl}
//                     controls
//                     width="100%"
//                     height="auto"
//                     className="rounded-lg border border-gray-300 dark:border-neutral-600 shadow-sm max-h-[400px] object-contain bg-black"
//                     onError={() => toast.warn("Cannot preview this video format")}
//                   >
//                     Your browser does not support the video tag.
//                   </video>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
//                     This is a local preview only — the video will be uploaded to the server when you click "Upload Video".
//                   </p>
//                 </div>
//               )}

//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={newVideo.isFree}
//                   onChange={(e) => setNewVideo({ ...newVideo, isFree: e.target.checked })}
//                 />
//                 Free preview video
//               </label>

//               <button
//                 type="submit"
//                 disabled={uploading || !selectedCourseId || !newVideo.videoFile}
//                 className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-white transition ${
//                   uploading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
//                 } disabled:opacity-50`}
//               >
//                 {uploading ? `Uploading... ${uploadProgress}%` : "Upload Video"}
//               </button>

//               {uploading && (
//                 <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-neutral-700">
//                   <div
//                     className="bg-blue-600 h-2.5 rounded-full transition-all"
//                     style={{ width: `${uploadProgress}%` }}
//                   />
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>

//         {/* RIGHT COLUMN – Management (unchanged from your last version) */}
//         <div className="space-y-8">
//           {/* Courses List */}
//           <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
//             <h2 className="text-xl font-semibold mb-5">Existing Courses ({courses.length})</h2>

//             {loadingCourses ? (
//               <p className="text-center py-10 text-gray-500">Loading courses...</p>
//             ) : courses.length === 0 ? (
//               <p className="text-center py-10 text-gray-500">No courses found</p>
//             ) : (
//               <div className="space-y-3 max-h-[600px] overflow-y-auto">
//                 {courses.map((course) => (
//                   <div
//                     key={course._id}
//                     onClick={() => setSelectedCourseId(course._id)}
//                     className={`p-4 rounded-lg cursor-pointer border transition ${
//                       selectedCourseId === course._id
//                         ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40"
//                         : "border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700"
//                     }`}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="font-medium">{course.title}</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                           {course.videos?.length || 0} videos • Order: {course.order}
//                         </p>
//                       </div>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteCourse(course._id);
//                         }}
//                         className="text-red-600 hover:text-red-800 text-sm"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Manage Videos Section (unchanged) */}
//           <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
//             <div className="flex justify-between items-center mb-5">
//               <h2 className="text-xl font-semibold">Manage Videos</h2>
//               {selectedCourseId && videos.length > 0 && (
//                 <button
//                   onClick={() => fetchVideos(selectedCourseId)}
//                   className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
//                 >
//                   Refresh list
//                 </button>
//               )}
//             </div>

//             {!selectedCourseId ? (
//               <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                 Select a course from the list on the left to view and manage its videos
//               </div>
//             ) : loadingVideos ? (
//               <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                 Loading videos...
//               </div>
//             ) : videos.length === 0 ? (
//               <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                 <p className="mb-2">No videos found in this course yet.</p>
//                 <p className="text-sm">
//                   Upload a new video using the form on the left — it will appear here automatically.
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//                     Select Video to Edit or Delete
//                   </label>
//                   <select
//                     value={selectedVideo?._id || ""}
//                     onChange={(e) => {
//                       const vid = videos.find((v) => v._id === e.target.value);
//                       if (vid) selectVideo(vid);
//                     }}
//                     className="w-full p-3.5 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="" disabled>
//                       — Choose a video ({videos.length} available) —
//                     </option>
//                     {videos.map((video) => (
//                       <option key={video._id} value={video._id}>
//                         {video.title || "Untitled Video"}
//                         {video.isFree ? " • (Free Preview)" : ""}
//                         {video.order ? ` • Order ${video.order}` : ""}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {!selectedVideo && videos.length > 0 && (
//                   <div className="text-center py-6 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
//                     Select a video from the dropdown above to edit its title or free status
//                   </div>
//                 )}

//                 {selectedVideo && (
//                   <div className="pt-6 border-t border-gray-200 dark:border-neutral-700 space-y-5">
//                     <div>
//                       <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//                         Video Title
//                       </label>
//                       <input
//                         value={editVideo.title}
//                         onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
//                         placeholder="Enter video title"
//                         className="w-full p-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>

//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={editVideo.isFree}
//                         onChange={(e) => setEditVideo({ ...editVideo, isFree: e.target.checked })}
//                         className="w-5 h-5 text-blue-600 rounded border-gray-300 dark:border-neutral-600 focus:ring-blue-500"
//                       />
//                       <span className="text-gray-700 dark:text-gray-300">
//                         Mark as free preview video (visible without payment)
//                       </span>
//                     </label>

//                     <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                       <button
//                         onClick={updateVideo}
//                         className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3.5 rounded-lg font-medium transition shadow-sm"
//                       >
//                         Update Video Details
//                       </button>
//                       <button
//                         onClick={deleteVideo}
//                         className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-lg font-medium transition shadow-sm"
//                       >
//                         Delete This Video
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState, useRef } from "react";
import { apiClient } from "../../api/apiClient";
import { toast } from "react-toastify";

export default function AdminUploadCourse() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // New Course Form
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    thumbnail: "",
    order: 1,
    isActive: true,
  });

  // New Video Form + Previews
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    order: 1,
    isFree: false,
    videoFile: null,
  });
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);     // playable preview
  const [thumbnailPreview, setThumbnailPreview] = useState(null);   // thumbnail image
  const [showPreviews, setShowPreviews] = useState(true);           // toggle visibility

  const videoRef = useRef(null);  // hidden video element for thumbnail generation

  // Edit Video Form
  const [editVideo, setEditVideo] = useState({
    title: "",
    isFree: false,
  });

  // FETCH COURSES
  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const res = await apiClient.get("/api/users/training/admin/courses");
      const coursesList = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setCourses(coursesList);
    } catch (err) {
      console.error("Error fetching courses:", err);
      toast.error("Failed to load courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  // FETCH VIDEOS FOR SELECTED COURSE
  const fetchVideos = async (courseId) => {
    if (!courseId) {
      setVideos([]);
      setSelectedVideo(null);
      return;
    }

    setLoadingVideos(true);
    try {
      const res = await apiClient.get(`/api/users/training/courses/${courseId}/videos`);
      const videoList = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.videos || [];
      console.log(`Videos loaded (${videoList.length}):`, videoList);
      setVideos(videoList);
    } catch (err) {
      console.error("Videos fetch error:", err.response?.data || err);
      toast.error("Failed to load videos");
      setVideos([]);
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchVideos(selectedCourseId);
  }, [selectedCourseId]);

  // CLEANUP OBJECT URLS
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    };
  }, [videoPreviewUrl, thumbnailPreview]);

  // GENERATE THUMBNAIL FROM VIDEO FILE
  const generateThumbnail = (file) => {
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = url;
    video.muted = true; // avoid sound during thumbnail gen

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(1, video.duration || 1); // first second
    };

    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const thumbnailData = canvas.toDataURL("image/jpeg", 0.85);
      setThumbnailPreview(thumbnailData);

      // Cleanup
      video.remove();
    };

    video.onerror = () => {
      console.warn("Thumbnail generation failed");
      setThumbnailPreview(null);
    };
  };

  // HANDLE VIDEO FILE CHANGE → TRIGGER PREVIEW & THUMBNAIL
  const handleVideoFileChange = (file) => {
    if (file) {
      // Revoke previous previews
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);

      setNewVideo({ ...newVideo, videoFile: file });
      generateThumbnail(file);
    } else {
      setVideoPreviewUrl(null);
      setThumbnailPreview(null);
      setNewVideo({ ...newVideo, videoFile: null });
    }
  };

  // CREATE COURSE
  const createCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return toast.error("Course title is required");

    try {
      await apiClient.post("/api/users/training/courses", newCourse);
      toast.success("Course created successfully");
      setNewCourse({ title: "", description: "", thumbnail: "", order: 1, isActive: true });
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create course");
    }
  };

  // DELETE COURSE
  const deleteCourse = async (courseId) => {
    if (!window.confirm("Delete this course and all its videos?")) return;
    try {
      await apiClient.delete(`/api/users/training/courses/${courseId}`);
      toast.success("Course deleted");
      fetchCourses();
      if (selectedCourseId === courseId) setSelectedCourseId("");
    } catch (err) {
      toast.error("Failed to delete course");
    }
  };

  // UPLOAD VIDEO
  const uploadVideo = async (e) => {
    e.preventDefault();
    if (!selectedCourseId) return toast.error("Please select a course first");
    if (!newVideo.videoFile) return toast.error("Please select a video file");
    if (!newVideo.title.trim()) return toast.error("Video title is required");

    if (newVideo.videoFile.size > 600 * 1024 * 1024) {
      return toast.error("Video file is too large (max 600MB)");
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("title", newVideo.title);
      formData.append("description", newVideo.description || "");
      formData.append("order", newVideo.order);
      formData.append("isFree", newVideo.isFree);
      formData.append("video", newVideo.videoFile);

      await apiClient.post(`/api/users/training/courses/${selectedCourseId}/videos`, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      toast.success("Video uploaded successfully");

      // Clean previews
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      setVideoPreviewUrl(null);
      setThumbnailPreview(null);

      setNewVideo({ title: "", description: "", order: 1, isFree: false, videoFile: null });
      fetchVideos(selectedCourseId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload video");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // SELECT VIDEO FOR EDIT
  const selectVideo = (video) => {
    setSelectedVideo(video);
    setEditVideo({
      title: video.title || "",
      isFree: video.isFree || false,
    });
  };

  // UPDATE VIDEO METADATA
  const updateVideo = async () => {
    if (!selectedCourseId || !selectedVideo?._id) return toast.error("No video selected");
    if (!editVideo.title.trim()) return toast.error("Video title is required");

    try {
      await apiClient.put(
        `/api/users/training/courses/${selectedCourseId}/videos/${selectedVideo._id}`,
        {
          title: editVideo.title,
          isFree: editVideo.isFree,
        }
      );
      toast.success("Video updated successfully");
      fetchVideos(selectedCourseId);
    } catch (err) {
      toast.error("Failed to update video");
    }
  };

  // DELETE VIDEO
  const deleteVideo = async () => {
    if (!selectedCourseId || !selectedVideo?._id) return toast.error("No video selected");
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await apiClient.delete(
        `/api/users/training/courses/${selectedCourseId}/videos/${selectedVideo._id}`
      );
      toast.success("Video deleted successfully");
      setSelectedVideo(null);
      fetchVideos(selectedCourseId);
    } catch (err) {
      toast.error("Failed to delete video");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-8">Admin – Course & Video Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN – Forms */}
        <div className="space-y-8">
          {/* Create Course */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold mb-5">Create New Course</h2>
            <form onSubmit={createCourse} className="space-y-4">
              <input
                required
                placeholder="Course Title *"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 h-28"
              />
              <input
                placeholder="Thumbnail URL (optional)"
                value={newCourse.thumbnail}
                onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600"
              />
              {newCourse.thumbnail && (
                <img
                  src={newCourse.thumbnail}
                  alt="Thumbnail preview"
                  className="h-32 w-full object-cover rounded mt-2 border dark:border-neutral-600"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Thumbnail")}
                />
              )}
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto"
              >
                Create Course
              </button>
            </form>
          </div>

          {/* Upload Video – WITH THUMBNAIL + VIDEO PREVIEW */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold mb-5">Upload New Video</h2>

            <div className="mb-5">
              <label className="block font-medium mb-2">Select Course *</label>
              {loadingCourses ? (
                <p>Loading courses...</p>
              ) : (
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">— Select course —</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title} ({course.videos?.length || 0} videos)
                    </option>
                  ))}
                </select>
              )}
            </div>

            <form onSubmit={uploadVideo} className="space-y-5">
              <input
                required
                placeholder="Video Title *"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600"
              />
              <textarea
                placeholder="Description (optional)"
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-neutral-700 dark:border-neutral-600 h-24"
              />

              <div>
                <label className="block font-medium mb-2">Video File * (max 600MB)</label>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={(e) => handleVideoFileChange(e.target.files?.[0] || null)}
                  className="w-full p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
                {newVideo.videoFile && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Selected: {newVideo.videoFile.name} • {(newVideo.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
              </div>

              {/* PREVIEW & THUMBNAIL SECTION */}
              {(videoPreviewUrl || thumbnailPreview) && (
                <div className="mt-4 border border-gray-300 dark:border-neutral-600 rounded-lg p-4 bg-gray-50 dark:bg-neutral-700">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">
                      Video Preview & Thumbnail
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowPreviews(!showPreviews)}
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 underline"
                    >
                      {showPreviews ? "Hide" : "Show"}
                    </button>
                  </div>

                  {showPreviews && (
                    <div className="space-y-6">
                      {/* Generated Thumbnail */}
                      {thumbnailPreview && (
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                            Thumbnail (first frame)
                          </label>
                          <img
                            src={thumbnailPreview}
                            alt="Video thumbnail preview"
                            className="w-full max-h-[220px] object-cover rounded border dark:border-neutral-600 shadow-sm"
                          />
                        </div>
                      )}

                      {/* Playable Video Preview */}
                      {videoPreviewUrl && (
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                            Playable Preview
                          </label>
                          <video
                            src={videoPreviewUrl}
                            controls
                            width="100%"
                            height="auto"
                            className="rounded-lg shadow-sm bg-black max-h-[400px]"
                            onError={() => toast.warn("Cannot preview this video format")}
                          >
                            Your browser does not support video preview.
                          </video>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newVideo.isFree}
                  onChange={(e) => setNewVideo({ ...newVideo, isFree: e.target.checked })}
                />
                Free preview video
              </label>

              <button
                type="submit"
                disabled={uploading || !selectedCourseId || !newVideo.videoFile}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-white transition ${
                  uploading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
                } disabled:opacity-50`}
              >
                {uploading ? `Uploading... ${uploadProgress}%` : "Upload Video"}
              </button>

              {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-neutral-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN – Management */}
        <div className="space-y-8">
          {/* Courses List */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold mb-5">Existing Courses ({courses.length})</h2>

            {loadingCourses ? (
              <p className="text-center py-10 text-gray-500">Loading courses...</p>
            ) : courses.length === 0 ? (
              <p className="text-center py-10 text-gray-500">No courses found</p>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    onClick={() => setSelectedCourseId(course._id)}
                    className={`p-4 rounded-lg cursor-pointer border transition ${
                      selectedCourseId === course._id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40"
                        : "border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {course.videos?.length || 0} videos • Order: {course.order}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCourse(course._id);
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Manage Videos Section */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow border border-gray-200 dark:border-neutral-700">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Manage Videos</h2>
              {selectedCourseId && videos.length > 0 && (
                <button
                  onClick={() => fetchVideos(selectedCourseId)}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  Refresh list
                </button>
              )}
            </div>

            {!selectedCourseId ? (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                Select a course from the list on the left to view and manage its videos
              </div>
            ) : loadingVideos ? (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                Loading videos...
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                <p className="mb-2">No videos found in this course yet.</p>
                <p className="text-sm">
                  Upload a new video using the form on the left — it will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Select Video to Edit or Delete
                  </label>
                  <select
                    value={selectedVideo?._id || ""}
                    onChange={(e) => {
                      const vid = videos.find((v) => v._id === e.target.value);
                      if (vid) selectVideo(vid);
                    }}
                    className="w-full p-3.5 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      — Choose a video ({videos.length} available) —
                    </option>
                    {videos.map((video) => (
                      <option key={video._id} value={video._id}>
                        {video.title || "Untitled Video"}
                        {video.isFree ? " • (Free Preview)" : ""}
                        {video.order ? ` • Order ${video.order}` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {!selectedVideo && videos.length > 0 && (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                    Select a video from the dropdown above to edit its title or free status
                  </div>
                )}

                {selectedVideo && (
                  <div className="pt-6 border-t border-gray-200 dark:border-neutral-700 space-y-5">
                    <div>
                      <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Video Title
                      </label>
                      <input
                        value={editVideo.title}
                        onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
                        placeholder="Enter video title"
                        className="w-full p-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editVideo.isFree}
                        onChange={(e) => setEditVideo({ ...editVideo, isFree: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 dark:border-neutral-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Mark as free preview video (visible without payment)
                      </span>
                    </label>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        onClick={updateVideo}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3.5 rounded-lg font-medium transition shadow-sm"
                      >
                        Update Video Details
                      </button>
                      <button
                        onClick={deleteVideo}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-lg font-medium transition shadow-sm"
                      >
                        Delete This Video
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}