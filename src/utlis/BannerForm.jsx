import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiCalendar } from "react-icons/fi";

const BannerForm = () => {
  const [banner, setBanner] = useState({
    title: "",
    link: "",
    status: "",
    startDate: "",
    endDate: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanner({ ...banner, [name]: value });
  };

  const handleFileChange = (e) => {
    setBanner({ ...banner, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Banner uploaded successfully!");
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-[1500px] dark:bg-neutral-800 dark:text-white mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-100"
    >
      <h2 className="text-2xl dark:text-white font-semibold text-gray-800 mb-6">
        Banner Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 dark:text-white">
        {/* Banner Title */}
        <div>
          <label className="block dark:text-white text-gray-700 font-medium mb-2">
            Banner Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={banner.title}
            onChange={handleChange}
            placeholder="Enter banner title"
            className="w-full dark:bg-transparent border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
        </div>

        {/* Banner Link */}
        <div>
          <label className="block dark:text-white text-gray-700 font-medium mb-2">
            Banner Link / URL (Optional)
          </label>
          <input
            type="url"
            name="link"
            value={banner.link}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full border border-gray-300 rounded-lg p-2.5 dark:bg-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {/* Display Status */}
        <div>
          <label className="block dark:text-white text-gray-700 font-medium mb-2">
            Display Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={banner.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 dark:bg-transparent focus:outline-none"
            required
          >
            <option value="">Select...</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Start & End Dates */}
        <div className="grid grid-cols-1 dark:text-white md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="startDate"
                value={banner.startDate}
                onChange={handleChange}
                className="w-full dark:bg-transparent border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block dark:text-white text-gray-700 font-medium mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="endDate"
                value={banner.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-teal-500 dark:bg-transparent focus:outline-none"
                required
              />
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block dark:text-white text-gray-700 font-medium mb-2">
            Banner Description (Optional)
          </label>
          <textarea
            name="description"
            value={banner.description}
            onChange={handleChange}
            placeholder="Enter banner description..."
            rows={4}
            className="w-full border dark:bg-transparent border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 dark:text-white">
            Banner Image Upload <span className="text-red-500">*</span>
          </label>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-teal-400 transition"
            onClick={() => document.getElementById("banner-image").click()}
          >
            <FiUpload size={28} className="mb-2 text-teal-600" />
            <p className="dark:text-white">Upload JPG, PNG only</p>
            <input
              type="file"
              id="banner-image"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="hidden"
              required
            />
            {banner.image && (
              <p className="mt-3 text-sm dark:text-white text-teal-600">
                ✅ {banner.image.name} uploaded
              </p>
            )}
          </motion.div>
        </div>

       
      </form>
    </motion.div>
     {/* Buttons */}
        <div className="flex max-w-[1550px] mb-10 w-full justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-5 py-2 underline text-gray-600"
          >
            Save Draft
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 shadow"
          >
            Upload Banner
          </motion.button>
        </div>
    </>
  );
};

export default BannerForm;
