import React, { useState } from "react";
import { creditDailyRebate } from "../../api/transactionApi";

const RebateManagement = () => {
  const [formData, setFormData] = useState({
    amount: "",
    rebateType: "daily_gain", // Default matches backend
    description: "Daily Rebate Distribution", // Default matches backend
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // EXACT values required by your backend logic
  const rebateTypeOptions = [
    { value: "daily_gain", label: "Daily Gain" },
    { value: "daily_loss", label: "Daily Loss" }, 
    { value: "weekly_gain", label: "Weekly Gain" },
    { value: "weekly_loss", label: "Weekly Loss" },
  ];

  const descriptionOptions = [
    "Daily Rebate Distribution",
    "Weekly Rebate Distribution"
  ];

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    // Auto-sync description based on the type chosen
    const autoDesc = selectedType.includes("weekly") 
      ? "Weekly Rebate Distribution" 
      : "Daily Rebate Distribution";
      
    setFormData({ 
      ...formData, 
      rebateType: selectedType,
      description: autoDesc 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety Confirmation
    const confirmMsg = `CONFIRM DISTRIBUTION\n\nType: ${formData.rebateType}\nAmount: $${formData.amount}\nFrequency: ${formData.description}`;
    if (!window.confirm(confirmMsg)) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Send the exact structure the backend requires
      const payload = {
        amount: Number(formData.amount),
        rebateType: formData.rebateType,
        description: formData.description
      };

      const data = await creditDailyRebate(payload);
      setResult(data);
      setFormData({ ...formData, amount: "" }); 
    } catch (err) {
      // Catch specific backend error message
      setError(err?.error || err?.message || "Distribution failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Rebate Administration</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Distribute earnings or losses to the investment pool.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FORM PANEL */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* AMOUNT */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1.5">Total Pool Amount ($)</label>
                <input
                  type="number"
                  required
                  placeholder="1000"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl outline-none text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* REBATE TYPE */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1.5">Rebate Type</label>
                <select
                  value={formData.rebateType}
                  onChange={handleTypeChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl outline-none text-slate-900 dark:text-white cursor-pointer"
                >
                  {rebateTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="dark:bg-gray-900">{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1.5">Description String</label>
                <select
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl outline-none text-slate-900 dark:text-white cursor-pointer"
                >
                  {descriptionOptions.map((desc) => (
                    <option key={desc} value={desc} className="dark:bg-gray-900">{desc}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.amount}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all disabled:opacity-40"
              >
                {loading ? "Processing Distribution..." : "Execute Global Credit"}
              </button>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-bold text-center">
                  Error: {error}
                </div>
              )}
            </form>
          </div>

          {/* RECEIPT PANEL */}
          <div>
            {!result ? (
              <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 dark:border-gray-800 rounded-2xl flex items-center justify-center p-8 bg-white/30 dark:bg-gray-900/30">
                <p className="text-slate-400 text-sm font-medium">Ready for next batch execution.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 transition-all">
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Distribution Successful
                </h3>
                
                <div className="space-y-3">
                  <ResultRow label="Total Distributed" value={`$${result.distributed.totalDistributed.toLocaleString()}`} />
                  <ResultRow label="Calculated Ratio" value={`${(result.distributed.rebateRatio * 100).toFixed(4)}%`} />
                  <ResultRow label="Users Credited" value={result.distributed.usersCredited} />
                  <ResultRow label="Packages Impacted" value={result.distributed.packagesCredited} />
                </div>

                <div className="mt-6 pt-4 border-t dark:border-gray-800 text-[10px] text-slate-400 text-center font-mono uppercase">
                  Batch ID: {Math.random().toString(36).substring(2, 10)} | {new Date().toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for layout
const ResultRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-gray-800/50 rounded-xl border border-slate-100 dark:border-gray-800">
    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{label}</span>
    <span className="text-sm font-black text-slate-900 dark:text-white">{value}</span>
  </div>
);

export default RebateManagement;