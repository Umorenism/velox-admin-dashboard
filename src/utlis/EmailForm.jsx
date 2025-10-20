
import React, { useState, useEffect } from "react";
import { Bold, Italic, Link, List, ListOrdered } from "lucide-react";
import pic from '../assets/success.svg'
const EmailForm = () => {
  const [showModal, setShowModal] = useState(false);

  // Function to show modal and auto-close after 3 seconds
  const handleSendEmail = (e) => {
    e.preventDefault();
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000); // close after 3 seconds
  };

  return (
    <div className="relative w-full dark:bg-neutral-800 dark:text-white mx-auto bg-white rounded-lg shadow border border-gray-200 p-6">
      {/* Header */}
      <h2 className="text-gray-800 dark:text-white font-semibold text-lg mb-4">
        Informations
      </h2>

      <form className="space-y-5" onSubmit={handleSendEmail}>
        {/* User Type */}
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
            User Types<span className="text-red-500">*</span>
          </label>
          <select className="w-full border dark:bg-neutral-800 dark:text-white border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
            <option>Paid Users / All Users</option>
          </select>
        </div>

        {/* Rank */}
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
            Rank<span className="text-red-500">*</span>
          </label>
          <select className="w-full border dark:bg-neutral-800 dark:text-white border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
            <option>Select by rank</option>
          </select>
        </div>

        {/* Badges */}
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
            Badges<span className="text-red-500">*</span>
          </label>
          <select className="w-full border dark:bg-neutral-800 dark:text-white border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
            <option>Select by badges</option>
          </select>
        </div>

        {/* Email Content */}
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
            Email Content<span className="text-red-500">*</span>
          </label>

          <div className="border border-gray-300 rounded-md">
            {/* Toolbar */}
            <div className="flex items-center gap-3 border-b border-gray-200 px-3 py-2 dark:bg-neutral-800">
              {[Bold, Italic, Link, List, ListOrdered].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="text-gray-600 dark:text-white hover:text-indigo-600 transition"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              rows={6}
              placeholder="Enter email content"
              className="w-full px-3 py-2 dark:bg-transparent dark:text-white text-sm text-gray-700 rounded-b-md outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end items-center space-x-4 pt-2">
          <button
            type="button"
            disabled
            className="text-gray-400 text-sm font-medium cursor-not-allowed"
          >
            Save draft
          </button>
          <button
            type="submit"
            className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            Send Emails to All Users
          </button>
        </div>
      </form>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 w-80 text-center animate-fadeIn">
            <img
              src={pic}
              alt="Success"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Broadcast Email Sent Successfully
            </h3>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailForm;
