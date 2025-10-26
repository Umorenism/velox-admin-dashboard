// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Bold, Italic, Link, List, ListOrdered } from 'lucide-react';

// export default function CompanyInformationForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     currency: '',
//     phone: '',
//     contact: '',
//     address: '',
//     about: '',
//     logo: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
//   };

//   return (
//     <motion.div
//       className="p-8 bg-white dark:bg-neutral-800 dark:text-white rounded-2xl w-full shadow-sm max-w-[1550px] mx-auto"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       <h2 className="text-lg font-semibold mb-6">Company Information</h2>

//       <form className="space-y-5">
//         <div>
//           <label className="block text-sm font-medium mb-1">Company Name<span className="text-red-500">*</span></label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Velox Limited"
//             className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Company Email Address<span className="text-red-500">*</span></label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Velox773@gmail.com"
//             className="w-full border dark:bg-transparent dark:text-white rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Default Currency<span className="text-red-500">*</span></label>
//           <input
//             type="text"
//             name="currency"
//             value={formData.currency}
//             onChange={handleChange}
//             placeholder="USD"
//             className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Company Phone Number<span className="text-red-500">*</span></label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="090123 4556 555"
//             className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Contact Person<span className="text-red-500">*</span></label>
//           <input
//             type="text"
//             name="contact"
//             value={formData.contact}
//             onChange={handleChange}
//             placeholder="Obiora Wilson"
//             className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Company Address<span className="text-red-500">*</span></label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="8726 Building 67 Abuja, Nigeria"
//             className="w-full dark:bg-transparent dark:text-white border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">About Company<span className="text-red-500">*</span></label>
//           <div className="border rounded-lg p-2">
//             <div className="flex space-x-3 mb-2 text-gray-500">
//               <Bold className="w-4 h-4 cursor-pointer" />
//               <Italic className="w-4 h-4 cursor-pointer" />
//               <Link className="w-4 h-4 cursor-pointer" />
//               <List className="w-4 h-4 cursor-pointer" />
//               <ListOrdered className="w-4 h-4 cursor-pointer" />
//             </div>
//             <textarea
//               name="about"
//               value={formData.about}
//               onChange={handleChange}
//               rows="4"
//               placeholder="Enter company description"
//               className="w-full dark:bg-transparent dark:text-white border-none focus:outline-none p-2 resize-none"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Company Logo<span className="text-red-500">*</span></label>
//           <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-emerald-500 transition">
//             <span className="text-4xl text-gray-400 mb-2">+</span>
//             <p className="text-sm text-gray-500">Upload .JPG, .PNG only</p>
//             <input type="file" name="logo" accept="image/*" onChange={handleChange} className="hidden" />
//           </label>
//         </div>
//       </form>
//     </motion.div>
//   );
// }





import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { companyProfileApi } from "../api/companyApi";

export default function CompanyInformationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currency: "",
    phone: "",
    contact: "",
    address: "",
    about: "",
    logo: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [updatedProfile, setUpdatedProfile] = useState(null);

  // Fetch live data on mount
  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      try {
        const { settings } = await companyProfileApi.get();
        setFormData({
          name: settings?.companyName || "Nexlify Solutions",
          email: settings?.companyEmail || "info@nexlifysolutions.com",
          currency: settings?.defaultCurrency || "NGN",
          phone: settings?.companyPhone || "+2348051234567",
          contact: settings?.contactPerson || "Jane Smith",
          address: settings?.companyAddress || "456 Tech Hub, Abuja, Nigeria",
          about: settings?.aboutCompany || "Nexlify Solutions is a technology-driven company specializing in innovative software solutions for businesses across Africa.",
          logo: null,
        });
        setPreview(settings?.companyLogo || "");
      } catch (err) {
        setErrorMsg(err.message.includes("Network Error")
          ? "Failed to fetch company profile. Check CORS configuration or network connectivity."
          : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  // Clean up blob URLs
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Company name is required";
    if (!formData.email.trim()) errors.email = "Company email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
    if (!formData.currency.trim()) errors.currency = "Default currency is required";
    else if (!/^[A-Z]{3}$/.test(formData.currency.trim())) errors.currency = "Currency must be a 3-letter code (e.g., USD)";
    if (!formData.phone.trim()) errors.phone = "Company phone is required";
    else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ""))) errors.phone = "Invalid phone number format";
    if (!formData.contact.trim()) errors.contact = "Contact person is required";
    if (!formData.address.trim()) errors.address = "Company address is required";
    if (!formData.about.trim()) errors.about = "Company description is required";
    if (!formData.logo && !preview) errors.logo = "Company logo is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));

    if (files && files[0]) {
      const file = files[0];
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setValidationErrors((prev) => ({ ...prev, logo: "Only JPG, PNG, or GIF files are allowed" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors((prev) => ({ ...prev, logo: "File size must be less than 5MB" }));
        return;
      }
      setFormData((prev) => ({ ...prev, logo: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMsg("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    setUpdatedProfile(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("companyName", formData.name);
      formDataToSend.append("companyEmail", formData.email);
      formDataToSend.append("defaultCurrency", formData.currency);
      formDataToSend.append("companyPhone", formData.phone);
      formDataToSend.append("contactPerson", formData.contact);
      formDataToSend.append("companyAddress", formData.address);
      formDataToSend.append("aboutCompany", formData.about);
      if (formData.logo) formDataToSend.append("companyLogo", formData.logo);

      const { message, settings } = await companyProfileApi.post(formDataToSend);
      setSuccessMsg(message);
      setUpdatedProfile(settings);
      setPreview(settings?.companyLogo || preview);
      setFormData((prev) => ({ ...prev, logo: null }));
    } catch (err) {
      setErrorMsg(err.message.includes("Network Error")
        ? "Failed to update company profile. Check CORS configuration or network connectivity."
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6 bg-white dark:bg-neutral-800 dark:text-white rounded-xl w-full max-w-7xl  mx-auto shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-4">Company Information</h2>

      {/* Display updated profile on success */}
      {updatedProfile && (
        <div className="mb-6 p-4 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
          <h3 className="text-lg font-medium text-emerald-600 dark:text-emerald-400">Updated Company Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <p><strong>Name:</strong> {updatedProfile.companyName}</p>
            <p><strong>Email:</strong> {updatedProfile.companyEmail}</p>
            <p><strong>Currency:</strong> {updatedProfile.defaultCurrency}</p>
            <p><strong>Phone:</strong> {updatedProfile.companyPhone}</p>
            <p><strong>Contact:</strong> {updatedProfile.contactPerson}</p>
            <p><strong>Address:</strong> {updatedProfile.companyAddress}</p>
            <p className="md:col-span-2"><strong>About:</strong> {updatedProfile.aboutCompany}</p>
            {updatedProfile.companyLogo && (
              <div className="md:col-span-2">
                <strong>Logo:</strong>
                <img
                  src={updatedProfile.companyLogo}
                  alt="Updated Company Logo"
                  className="w-20 h-20 object-cover rounded-md mt-2"
                  onError={() => setUpdatedProfile((prev) => ({ ...prev, companyLogo: "" }))}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success and error messages */}
      {successMsg && !updatedProfile && (
        <p className="text-emerald-600 mb-4 bg-emerald-100 dark:bg-emerald-900 p-2 rounded">{successMsg}</p>
      )}
      {errorMsg && (
        <p className="text-red-500 mb-4 bg-red-100 dark:bg-red-900 p-2 rounded">{errorMsg}</p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">
            Company Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter company name"
            className={`w-full border dark:bg-transparent rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              validationErrors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Company Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter company email"
            className={`w-full border dark:bg-transparent rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              validationErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Default Currency<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            placeholder="e.g., USD"
            className={`w-full border dark:bg-transparent rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              validationErrors.currency ? "border-red-500" : "border-gray-300"
            }`}
          />
          {validationErrors.currency && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.currency}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Company Phone<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., +1234567890"
            className={`w-full border dark:bg-transparent rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              validationErrors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Person<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact person"
            className={`w-full border dark:bg-transparent rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              validationErrors.contact ? "border-red-500" : "border-gray-300"
            }`}
          />
          {validationErrors.contact && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.contact}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Company Address<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter company address"
            className={`w-full border dark:bg-transparent rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              validationErrors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {validationErrors.address && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            About Company<span className="text-red-500">*</span>
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            placeholder="Enter company description"
            className={`w-full border dark:bg-transparent rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
              validationErrors.about ? "border-red-500" : "border-gray-300"
            }`}
          />
          {validationErrors.about && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.about}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Company Logo<span className="text-red-500">*</span>
          </label>
          <label
            className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:border-emerald-500 transition ${
              validationErrors.logo ? "border-red-500" : "border-gray-300"
            }`}
          >
            {preview ? (
              <img
                src={preview}
                alt="Company Logo Preview"
                className="w-20 h-20 object-cover rounded-md mb-2"
                onError={() => setPreview("")}
              />
            ) : (
              <span className="text-3xl text-gray-400 mb-2">+</span>
            )}
            <p className="text-sm text-gray-500">Upload .JPG, .PNG, .GIF (max 5MB)</p>
            <input
              type="file"
              name="logo"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          {validationErrors.logo && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.logo}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center justify-center disabled:opacity-50 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 w-4 h-4" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </motion.div>
  );
}






