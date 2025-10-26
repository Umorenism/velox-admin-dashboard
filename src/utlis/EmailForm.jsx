
// import React, { useState, useEffect } from "react";
// import { Bold, Italic, Link, List, ListOrdered } from "lucide-react";
// import pic from '../assets/success.svg'
// const EmailForm = () => {
//   const [showModal, setShowModal] = useState(false);

//   // Function to show modal and auto-close after 3 seconds
//   const handleSendEmail = (e) => {
//     e.preventDefault();
//     setShowModal(true);
//     setTimeout(() => {
//       setShowModal(false);
//     }, 3000); // close after 3 seconds
//   };

//   return (
//     <div className="relative w-full dark:bg-neutral-800 dark:text-white mx-auto bg-white rounded-lg shadow border border-gray-200 p-6">
//       {/* Header */}
//       <h2 className="text-gray-800 dark:text-white font-semibold text-lg mb-4">
//         Informations
//       </h2>

//       <form className="space-y-5" onSubmit={handleSendEmail}>
//         {/* User Type */}
//         <div>
//           <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
//             User Types<span className="text-red-500">*</span>
//           </label>
//           <select className="w-full border dark:bg-neutral-800 dark:text-white border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
//             <option>Paid Users / All Users</option>
//           </select>
//         </div>

//         {/* Rank */}
//         <div>
//           <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
//             Rank<span className="text-red-500">*</span>
//           </label>
//           <select className="w-full border dark:bg-neutral-800 dark:text-white border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
//             <option>Select by rank</option>
//           </select>
//         </div>

//         {/* Badges */}
//         <div>
//           <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
//             Badges<span className="text-red-500">*</span>
//           </label>
//           <select className="w-full border dark:bg-neutral-800 dark:text-white border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
//             <option>Select by badges</option>
//           </select>
//         </div>

//         {/* Email Content */}
//         <div>
//           <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">
//             Email Content<span className="text-red-500">*</span>
//           </label>

//           <div className="border border-gray-300 rounded-md">
//             {/* Toolbar */}
//             <div className="flex items-center gap-3 border-b border-gray-200 px-3 py-2 dark:bg-neutral-800">
//               {[Bold, Italic, Link, List, ListOrdered].map((Icon, i) => (
//                 <button
//                   key={i}
//                   type="button"
//                   className="text-gray-600 dark:text-white hover:text-indigo-600 transition"
//                 >
//                   <Icon size={18} />
//                 </button>
//               ))}
//             </div>

//             {/* Textarea */}
//             <textarea
//               rows={6}
//               placeholder="Enter email content"
//               className="w-full px-3 py-2 dark:bg-transparent dark:text-white text-sm text-gray-700 rounded-b-md outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
//             ></textarea>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end items-center space-x-4 pt-2">
//           <button
//             type="button"
//             disabled
//             className="text-gray-400 text-sm font-medium cursor-not-allowed"
//           >
//             Save draft
//           </button>
//           <button
//             type="submit"
//             className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-emerald-700 transition"
//           >
//             Send Emails to All Users
//           </button>
//         </div>
//       </form>

//       {/* Popup Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 w-80 text-center animate-fadeIn">
//             <img
//               src={pic}
//               alt="Success"
//               className="w-16 h-16 mx-auto mb-4"
//             />
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//               Broadcast Email Sent Successfully
//             </h3>
            
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmailForm;





import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bold, Italic, Link as LinkIcon, List, ListOrdered, Loader2,
  CheckCircle, XCircle, Clock, ChevronDown, ChevronUp
} from "lucide-react";
import { getleaderAllUsers, sendBulkEmail } from "../api/leaderApi";
import pic from "../assets/success.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ userType: "all", rank: "all", badges: "all" });
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState([]);
  const [openAccordions, setOpenAccordions] = useState({});
  const messageRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getleaderAllUsers();
        const sorted = [...usersData].sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        setUsers(sorted);
        setFilteredUsers(sorted);
      } catch {
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const userTypeOptions = [
    { value: "all", label: "All User Types" },
    ...[...new Set(users.map((u) => u.role))].map((r) => ({ value: r, label: r })),
  ];

  const rankOptions = [
    { value: "all", label: "All Ranks" },
    ...[...new Set(users.map((u) => u.rank))].map((r) => ({ value: r, label: r })),
  ];

  const badgeOptions = [
    { value: "all", label: "All Badges" },
    ...[...new Set(
      users.map((u) => (u.referrals >= 10 ? "Premium" : u.referrals >= 5 ? "Standard" : u.referrals >= 1 ? "Basic" : "None"))
    )].map((b) => ({ value: b, label: b })),
  ];

  useEffect(() => {
    let filtered = users;
    if (filters.userType !== "all") filtered = filtered.filter((u) => u.role === filters.userType);
    if (filters.rank !== "all") filtered = filtered.filter((u) => u.rank === filters.rank);
    if (filters.badges !== "all")
      filtered = filtered.filter((u) => {
        const badge = u.referrals >= 10 ? "Premium" : u.referrals >= 5 ? "Standard" : u.referrals >= 1 ? "Basic" : "None";
        return badge === filters.badges;
      });
    if (searchQuery)
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredUsers(filtered.sort((a, b) => a.name.localeCompare(b.name)));
  }, [filters, searchQuery, users]);

  const handleFilterChange = (e, type) => setFilters((prev) => ({ ...prev, [type]: e.target.value }));
  const handleSelectAll = () =>
    setSelectedUserIds(
      selectedUserIds.length === filteredUsers.length ? [] : filteredUsers.map((u) => u._id)
    );
  const handleCheckboxChange = (id) =>
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleAccordion = (id) => setOpenAccordions((p) => ({ ...p, [id]: !p[id] }));
  const handleCloseAllAccordions = () => setOpenAccordions({});

  const applyFormatting = (type) => {
    const textarea = messageRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = message.slice(start, end);
    if (!selected) return toast.warn("Please select text to format");

    let newText = message;
    switch (type) {
      case "bold":
        newText = message.slice(0, start) + `**${selected}**` + message.slice(end);
        break;
      case "italic":
        newText = message.slice(0, start) + `_${selected}_` + message.slice(end);
        break;
      case "link":
        const url = prompt("Enter URL:");
        if (url) newText = message.slice(0, start) + `[${selected}](${url})` + message.slice(end);
        else return toast.warn("URL is required for link");
        break;
      case "list":
        newText = message.slice(0, start) + selected.split("\n").map((i) => `* ${i}`).join("\n") + message.slice(end);
        break;
      case "orderedList":
        newText = message.slice(0, start) + selected.split("\n").map((i, idx) => `${idx + 1}. ${i}`).join("\n") + message.slice(end);
        break;
    }
    setMessage(newText);
  };

  const sendEmailsInBatches = async (userIds, subject, message, batchSize = 20) => {
    const results = [];
    setProgress(userIds.map((id) => {
      const u = users.find((x) => x._id === id);
      return { id, email: u?.email, status: "pending" };
    }));

    for (let i = 0; i < userIds.length; i += batchSize) {
      const batch = userIds.slice(i, i + batchSize);
      try {
        await sendBulkEmail({ userIds: batch, subject, message });
        setProgress((prev) =>
          prev.map((p) =>
            batch.includes(p.id) ? { ...p, status: "success" } : p
          )
        );
        results.push({ success: true });
      } catch {
        setProgress((prev) =>
          prev.map((p) =>
            batch.includes(p.id) ? { ...p, status: "failed" } : p
          )
        );
        results.push({ success: false });
      }
    }
    progressRef.current?.scrollIntoView({ behavior: "smooth" });
    return results;
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!subject || !message) return toast.error("Subject and message are required");
    if (!selectedUserIds.length) return toast.error("Select at least one user");

    setIsLoading(true);
    try {
      const results = await sendEmailsInBatches(selectedUserIds, subject, message);
      const success = results.every((r) => r.success);
      if (success) {
        toast.success(`Emails sent to ${selectedUserIds.length} users`);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2500);
        setSubject("");
        setMessage("");
        setSelectedUserIds([]);
      } else toast.warn("Some emails failed to send");
    } catch {
      toast.error("Failed to send bulk email");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (s) =>
    s === "success" ? <CheckCircle className="text-green-500" size={16} /> :
    s === "failed" ? <XCircle className="text-red-500" size={16} /> :
    <Clock className="text-gray-400" size={16} />;

  return (
    <div className="relative w-full mx-auto bg-white dark:bg-neutral-800 dark:text-white rounded-lg shadow-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">📧 Send Bulk Email</h2>
      <form className="space-y-5" onSubmit={handleSendEmail}>
        {/* Filters */}
        {["userType", "rank", "badges"].map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1 capitalize">{key}</label>
            <select
              value={filters[key]}
              onChange={(e) => handleFilterChange(e, key)}
              className="w-full border dark:bg-neutral-800 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {(key === "userType" ? userTypeOptions : key === "rank" ? rankOptions : badgeOptions).map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        ))}

        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email"
          className="w-full border dark:bg-neutral-800 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
        />

        {/* Accordion with Close All */}
        <div className="max-h-72 overflow-y-auto border rounded-md">
          <div className="bg-gray-100 dark:bg-neutral-700 sticky top-0 p-3 flex items-center justify-between">
            <span className="text-sm font-medium">Select Users</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCloseAllAccordions}
                className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-200 dark:hover:bg-neutral-600"
              >
                Close All
              </button>
              <input
                type="checkbox"
                checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                onChange={handleSelectAll}
              />
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <p className="p-3 text-sm text-center text-gray-500">No users found</p>
          ) : (
            filteredUsers.map((user) => (
              <div key={user._id} className="border-b">
                <button
                  type="button"
                  onClick={() => toggleAccordion(user._id)}
                  className="w-full flex justify-between items-center p-3 text-sm hover:bg-gray-50 dark:hover:bg-neutral-700"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedUserIds.includes(user._id)}
                      onChange={() => handleCheckboxChange(user._id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>{user.name}</span>
                  </div>
                  {openAccordions[user._id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <AnimatePresence>
                  {openAccordions[user._id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-3 bg-gray-50 dark:bg-neutral-800 text-xs"
                    >
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Role:</strong> {user.role}</p>
                      <p><strong>Rank:</strong> {user.rank}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>

        {/* Subject + Message */}
        <div>
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border dark:bg-neutral-800 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter email subject"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Content *</label>
          <div className="border rounded-md">
            <div className="flex gap-3 border-b px-3 py-2 dark:bg-neutral-800">
              {[["bold", Bold], ["italic", Italic], ["link", LinkIcon], ["list", List], ["orderedList", ListOrdered]].map(([t, Icon]) => (
                <button key={t} type="button" onClick={() => applyFormatting(t)} className="text-gray-600 hover:text-indigo-600">
                  <Icon size={18} />
                </button>
              ))}
            </div>
            <textarea
              ref={messageRef}
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 text-sm focus:ring-2 focus:ring-indigo-500 rounded-b-md dark:bg-transparent"
              placeholder="Enter message content..."
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end items-center gap-4 pt-2">
          <button type="button" disabled className="text-gray-400 text-sm cursor-not-allowed">Save Draft</button>
          <button
            type="submit"
            disabled={isLoading || !selectedUserIds.length}
            className={`text-white text-sm px-4 py-2 rounded-md transition ${
              isLoading || !selectedUserIds.length ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {isLoading ? <><Loader2 className="animate-spin inline mr-2" size={16} />Sending...</> : `Send Emails (${selectedUserIds.length})`}
          </button>
        </div>
      </form>

      {/* Progress Table */}
      {progress.length > 0 && (
        <div className="mt-6 border-t pt-4 max-h-64 overflow-y-auto">
          <h3 className="font-semibold text-sm mb-3">Delivery Progress</h3>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {progress.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                  <td className="py-2 px-3">{p.email}</td>
                  <td className="py-2 px-3 flex items-center gap-2">
                    {getStatusIcon(p.status)}
                    <span className={`capitalize ${p.status === "failed" ? "text-red-600" : p.status === "success" ? "text-green-600" : "text-gray-400"}`}>
                      {p.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
              <tr ref={progressRef}></tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-80 text-center"
            >
              <img src={pic} alt="Success" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Broadcast Sent!</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EmailForm;





