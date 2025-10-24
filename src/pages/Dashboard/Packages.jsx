

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import { Upload } from "lucide-react";
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

  const packageOptions = [
    "Starter",
    "Basic",
    "Standard",
    "Gold",
    "Premium",
    "Platinum",
    "Diamond",
  ];

  // ✅ CREATE PACKAGE FUNCTION
  const createPackage = async (payload) => {
    try {
      console.log("Sending payload to /api/admin/packages/create:");
      for (let [key, value] of payload.entries()) {
        console.log(key, value);
      }

      const response = await apiClient.post("/api/admin/packages/create", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Package creation error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
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
        console.log("Selected file:", file);
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

      // ✅ Determine isFree based on name or amount
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

  // ✅ SUCCESS MODAL AUTO CLOSE
  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => setShowSuccess(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 dark:text-white mt-10 px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={fadeUp} className="w-full max-w-[1500px]">
        {/* HEADER */}
        <div className="space-y-5">
          <RiMenuFoldLine size={30} className="text-gray-700 dark:text-white" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-[20px] sm:text-[24px] font-[700] text-[#000000] dark:text-white">
              Packages and Wallet Activity
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#00A991] text-white px-6 sm:px-10 py-3 rounded-[10px] text-sm sm:text-base hover:bg-[#00957F] transition"
            >
              Create New Package
            </button>
          </div>
        </div>

        {/* PACKAGE GRID */}
        <div className="mt-10">
          <PackageGrid refreshKey={refreshKey} />
        </div>
      </motion.div>

      {/* CREATE PACKAGE MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg w-full max-w-[500px] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
              Create New Package
            </h2>

            {/* ERROR MESSAGE */}
            {errorMessage && (
              <p className="text-red-500 dark:text-red-400 text-sm mb-4 text-center">
                {errorMessage}
              </p>
            )}

            {/* PACKAGE NAME SELECT */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Package Name</label>
              <select
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:border-neutral-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00A991]"
              >
                <option value="">Select package</option>
                {packageOptions.map((pkg) => (
                  <option key={pkg} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>

            {/* AMOUNT */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount (0 for free)"
                value={formData.amount}
                onChange={handleInputChange}
                disabled={formData.name === "Starter"}
                className={`w-full border border-gray-300 dark:border-neutral-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00A991] ${
                  formData.name === "Starter" ? "opacity-70 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Upload Image (Optional)</label>
              <div
                className={`border-2 border-dashed ${
                  formData.image ? "border-[#00A991]" : "border-gray-300 dark:border-neutral-700"
                } rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#00A991] transition relative`}
              >
                {formData.image ? (
                  <div className="relative w-full flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-0 right-0 bg-black/60 text-white text-sm py-1 text-center rounded-b-lg">
                      {formData.image.name}
                    </div>
                    <button
                      onClick={() => setFormData({ ...formData, image: null })}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="text-gray-500 mb-2" />
                    <label
                      htmlFor="imageUpload"
                      className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
                    >
                      Click to upload or drag and drop (PNG or JPEG, max 5MB)
                    </label>
                  </>
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/png,image/jpeg"
                  onChange={handleInputChange}
                  className="hidden"
                  id="imageUpload"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row w-full sm:space-x-3 gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setErrorMessage(null);
                }}
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 w-full hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg bg-[#00A991] text-white w-full hover:bg-green-700 transition"
              >
                Create Package
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg w-full max-w-[400px] p-6 sm:p-8 flex flex-col items-center justify-center text-center"
          >
            <img src={pic} alt="success" className="w-20 h-20 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Package Created Successfully!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
              The new package has been added successfully.
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
