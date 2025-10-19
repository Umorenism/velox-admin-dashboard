import React from "react";
import { Bold, Italic, Link, List, ListOrdered } from "lucide-react";

const EmailForm = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow border border-gray-200 p-6">
      {/* Header */}
      <h2 className="text-gray-800 font-semibold text-lg mb-4">
        Informations
      </h2>

      <form className="space-y-5">
        {/* User Type */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            User Types<span className="text-red-500">*</span>
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
            <option>Paid Users / All Users</option>
          </select>
        </div>

        {/* Rank */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Rank<span className="text-red-500">*</span>
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
            <option>Select by rank</option>
          </select>
        </div>

        {/* Badges */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Badges<span className="text-red-500">*</span>
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
            <option>Select by badges</option>
          </select>
        </div>

        {/* Email Content */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email Content<span className="text-red-500">*</span>
          </label>

          <div className="border border-gray-300 rounded-md">
            {/* Toolbar */}
            <div className="flex items-center gap-3 border-b border-gray-200 px-3 py-2">
              <button
                type="button"
                className="text-gray-600 hover:text-indigo-600"
              >
                <Bold size={18} />
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-indigo-600"
              >
                <Italic size={18} />
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-indigo-600"
              >
                <Link size={18} />
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-indigo-600"
              >
                <List size={18} />
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-indigo-600"
              >
                <ListOrdered size={18} />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              rows={6}
              placeholder="Enter email content"
              className="w-full px-3 py-2 text-sm text-gray-700 rounded-b-md outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
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
    </div>
  );
};

export default EmailForm;
