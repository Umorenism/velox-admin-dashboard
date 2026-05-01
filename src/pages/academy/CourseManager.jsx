import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Edit2, Trash2, Video, Loader2, X, CheckCircle2, 
  AlertCircle, Image as ImageIcon, ListOrdered, FileText, Type, Upload, Play, Info
} from "lucide-react";
import { 
  getAdminCourses, createCourse, updateCourse, deleteCourse,
  uploadVideo, updateVideo, deleteVideo 
} from "../../api/trainingApi";

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details"); // "details" or "videos"
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  // Course Form State
  const [formData, setFormData] = useState({
    title: "", description: "", thumbnail: "", order: 1, isActive: true
  });

  // Video Form State
  const [videoData, setVideoData] = useState({
    title: "", description: "", order: 1, isFree: false, video: null
  });

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getAdminCourses();
      setCourses(data);
    } catch (err) { showToast("error", "Sync failed"); } 
    finally { setLoading(false); }
  };

  const showToast = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: "", message: "" }), 3000);
  };

  const handleOpenModal = (course = null) => {
    if (course) {
      setSelectedCourse(course);
      setFormData({ ...course });
      setActiveTab("videos"); // Default to videos if editing
    } else {
      setSelectedCourse(null);
      setFormData({ title: "", description: "", thumbnail: "", order: courses.length + 1, isActive: true });
      setActiveTab("details");
    }
    setIsModalOpen(true);
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (selectedCourse) {
        await updateCourse(selectedCourse._id, formData);
        showToast("success", "Course updated");
      } else {
        await createCourse(formData);
        showToast("success", "Course created");
      }
      fetchCourses();
      setIsModalOpen(false);
    } catch (err) { showToast("error", "Action failed"); }
    finally { setActionLoading(false); }
  };

 const handleVideoUpload = async (e) => {
  e.preventDefault();
  if (!videoData.video) return showToast("error", "Select a video file");

  // Create FormData
  const data = new FormData();
  
  // order matters for some backend parsers: file usually goes LAST
  data.append("title", videoData.title);
  data.append("description", videoData.description || "");
  data.append("order", videoData.order.toString());
  data.append("isFree", String(videoData.isFree)); 
  
  // The key MUST be 'video' based on your previous logs
  data.append("video", videoData.video); 

  setActionLoading(true);
  try {
    // API Call
    await uploadVideo(selectedCourse._id, data);
    
    showToast("success", "Uploaded Successfully");
    setVideoData({ title: "", description: "", order: 1, isFree: false, video: null });
    fetchCourses();
  } catch (err) {
    console.error("Backend Error Details:", err.response?.data);
    
    // If you see "Cannot determine format...", the backend is definitely
    // trying to resize your video as if it were an image.
    const serverErr = err.response?.data?.error || "Format Error";
    showToast("error", `Server Error: ${serverErr}`);
  } finally {
    setActionLoading(false);
  }
};

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Delete this lesson?")) return;
    try {
      await deleteVideo(selectedCourse._id, videoId);
      showToast("success", "Video removed");
      fetchCourses();
    } catch (err) { showToast("error", "Delete failed"); }
  };

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter">Academy Manager</h1>
        <button onClick={() => handleOpenModal()} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex gap-2">
          <Plus size={20} /> New Course
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-slate-50 dark:bg-white/5 border dark:border-white/10 rounded-3xl overflow-hidden group">
            <img src={course.thumbnail} className="h-40 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-lg dark:text-white">{course.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{course.videos?.length || 0} Lessons</p>
              <div className="flex gap-2">
                <button onClick={() => handleOpenModal(course)} className="flex-1 bg-slate-200 dark:bg-white/10 dark:text-white py-2 rounded-xl font-bold text-xs uppercase">Manage</button>
                <button onClick={() => { if(window.confirm("Delete Course?")) deleteCourse(course._id).then(fetchCourses) }} className="p-2 bg-red-500/10 text-red-500 rounded-xl"><Trash2 size={16}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course & Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="bg-white dark:bg-neutral-900 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col">
              
              {/* Modal Tabs */}
              <div className="flex border-b dark:border-white/5">
                <button onClick={() => setActiveTab("details")} className={`flex-1 py-5 font-black uppercase text-xs tracking-widest ${activeTab === 'details' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-slate-400'}`}>Course Details</button>
                {selectedCourse && (
                  <button onClick={() => setActiveTab("videos")} className={`flex-1 py-5 font-black uppercase text-xs tracking-widest ${activeTab === 'videos' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-slate-400'}`}>Manage Lessons ({selectedCourse.videos?.length})</button>
                )}
                <button onClick={() => setIsModalOpen(false)} className="px-6 text-slate-400"><X /></button>
              </div>

              <div className="p-8 overflow-y-auto">
                {activeTab === "details" ? (
                  <form onSubmit={handleCourseSubmit} className="space-y-4">
                    <input className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-black/20 dark:text-white border dark:border-white/5" placeholder="Course Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    <textarea className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-black/20 dark:text-white border dark:border-white/5" placeholder="Description" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm">Save Course</button>
                  </form>
                ) : (
                  <div className="space-y-8">
                    {/* Video Upload Form */}
                    <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-dashed border-slate-300 dark:border-white/20">
                      <h4 className="font-bold dark:text-white mb-4 flex items-center gap-2"><Upload size={18} className="text-emerald-500"/> Upload New Lesson</h4>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <input className="bg-white dark:bg-black/40 p-3 rounded-xl dark:text-white text-sm" placeholder="Video Title" value={videoData.title} onChange={e => setVideoData({...videoData, title: e.target.value})} />
                        <input type="file" accept="video/mp4" className="text-xs dark:text-slate-400" onChange={e => setVideoData({...videoData, video: e.target.files[0]})} />
                      </div>
                      <button onClick={handleVideoUpload} disabled={actionLoading} className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase disabled:opacity-50">
                        {actionLoading ? "Uploading..." : "Start Upload"}
                      </button>
                    </div>

                    {/* Video List */}
                    <div className="space-y-3">
                      <h4 className="font-bold dark:text-white text-sm uppercase tracking-widest opacity-50">Current Lessons</h4>
                      {selectedCourse.videos?.map((vid, idx) => (
                        <div key={vid._id} className="flex items-center justify-between bg-white dark:bg-white/5 p-4 rounded-2xl border dark:border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-500"><Play size={16}/></div>
                            <div>
                              <p className="font-bold dark:text-white text-sm">{vid.title}</p>
                              <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Order: {vid.order} • {vid.isFree ? "Free Preview" : "Premium"}</p>
                            </div>
                          </div>
                          <button onClick={() => handleDeleteVideo(vid._id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"><Trash2 size={18}/></button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white font-bold z-[200] ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseManager;