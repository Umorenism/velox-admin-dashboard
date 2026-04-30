import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { Upload, X, Package as PackageIcon, CheckCircle2 } from "lucide-react";
import pic from "../../assets/success.svg";
import PackageGrid from "../../utlis/PackageGrid";
import { apiClient } from "../../api/apiClient";

export default function Package() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    image: null,
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const packageOptions = ["Starter", "Basic", "Standard", "Gold", "Premium", "Platinum", "Diamond"];

  // ✅ CREATE PACKAGE FUNCTION
  const createPackage = async (payload) => {
    try {
      const response = await apiClient.post("/api/admin/packages/create", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || "Unknown error");
    }
  };

  // ✅ HANDLE INPUTS
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        const validTypes = ["image/png", "image/jpeg"];
        if (!validTypes.includes(file.type)) {
          setErrorMessage("Please upload a PNG or JPEG image.");
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setErrorMessage("Image size must be less than 5MB.");
          return;
        }
        setFormData({ ...formData, image: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrorMessage(null);
  };

  // ✅ HANDLE SUBMIT
  const handleSubmit = async () => {
    try {
      if (!formData.name) {
        setErrorMessage("Please select a package name.");
        return;
      }
      if (!formData.amount && formData.name !== "Starter") {
        setErrorMessage("Please enter an amount for paid packages.");
        return;
      }

      const isFree = formData.amount === "0" || formData.name === "Starter";
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("price", isFree ? 0 : formData.amount);
      payload.append("description", `Access to ${formData.name} features`);
      payload.append("isFree", isFree);
      if (formData.image) payload.append("image", formData.image);

      await createPackage(payload);

      setShowModal(false);
      setShowSuccess(true);
      setFormData({ name: "", amount: "", image: null });
      setRefreshKey((prev) => prev + 1);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(`Failed to create package: ${error.message}`);
    }
  };

  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => setShowSuccess(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 sm:p-8 max-w-[1600px] mx-auto min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300"
    >
      {/* HEADER SECTION */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Packages</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Manage investment tiers and platform access</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
        >
          <PackageIcon size={18} />
          <span>Create New Package</span>
        </button>
      </div>

      {/* PACKAGE GRID AREA */}
      <div className="bg-white/50 dark:bg-slate-900/40 rounded-[2.5rem] p-1 sm:p-4 border border-slate-200 dark:border-white/5">
        <PackageGrid refreshKey={refreshKey} />
      </div>

      {/* CREATE PACKAGE MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm z-50 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-[550px] overflow-hidden border border-slate-200 dark:border-white/10"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">New Package</h2>
                    <p className="text-slate-500 text-sm">Fill in the details to launch a new tier</p>
                  </div>
                  <button 
                    onClick={() => { setShowModal(false); setErrorMessage(null); }}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-400"
                  >
                    <X size={20} />
                  </button>
                </div>

                {errorMessage && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-rose-50 dark:bg-rose-500/10 rounded-2xl border border-rose-100 dark:border-rose-500/20">
                    <p className="text-rose-600 dark:text-rose-400 text-xs font-bold text-center uppercase tracking-wider">{errorMessage}</p>
                  </motion.div>
                )}

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Package Name</label>
                    <select
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-semibold"
                    >
                      <option value="">Select a tier...</option>
                      {packageOptions.map((pkg) => <option key={pkg} value={pkg}>{pkg}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Price (USD)</label>
                    <input
                      type="number"
                      name="amount"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={handleInputChange}
                      disabled={formData.name === "Starter"}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-semibold disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Cover Image</label>
                    <div 
                      className={`group relative border-2 border-dashed rounded-[2rem] p-6 transition-all flex flex-col items-center justify-center min-h-[160px] cursor-pointer
                        ${formData.image ? "border-emerald-500 bg-emerald-50/5 dark:bg-emerald-500/5" : "border-slate-200 dark:border-slate-700 hover:border-emerald-500"}`}
                    >
                      {formData.image ? (
                        <div className="w-full h-full text-center">
                          <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-full h-32 object-cover rounded-2xl mb-3 shadow-lg" />
                          <p className="text-emerald-500 text-xs font-bold truncate px-4">{formData.image.name}</p>
                          <button onClick={() => setFormData({ ...formData, image: null })} className="absolute top-3 right-3 p-1.5 bg-rose-500 text-white rounded-full shadow-lg"><X size={14} /></button>
                        </div>
                      ) : (
                        <label htmlFor="imageUpload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-3 text-slate-400 group-hover:text-emerald-500 transition-colors">
                            <Upload size={24} />
                          </div>
                          <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Click to upload brand asset</span>
                          <span className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">PNG or JPEG • Max 5MB</span>
                        </label>
                      )}
                      <input type="file" id="imageUpload" name="image" accept="image/*" onChange={handleInputChange} className="hidden" />
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button
                    onClick={() => { setShowModal(false); setErrorMessage(null); }}
                    className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-[2] px-6 py-4 rounded-2xl bg-slate-900 dark:bg-emerald-600 text-white font-bold hover:bg-slate-800 dark:hover:bg-emerald-500 shadow-xl shadow-emerald-900/20 transition-all active:scale-95"
                  >
                    Launch Package
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm z-[60] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-[400px] p-10 flex flex-col items-center text-center border border-emerald-500/20"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
                <img src={pic} alt="success" className="w-24 h-24 relative z-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Package Created!</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">The new investment tier is now live on the platform.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}