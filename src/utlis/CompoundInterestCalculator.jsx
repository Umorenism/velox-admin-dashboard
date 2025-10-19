import React, { useState } from "react";

const CompoundInterestCalculator = () => {
  const [capital, setCapital] = useState("");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const [reinvest, setReinvest] = useState(100);
  const [result, setResult] = useState(null);

  const calculateCompound = () => {
    let P = parseFloat(capital);
    let r = parseFloat(rate) / 100;
    let t = parseInt(days);
    let reinvestRate = parseFloat(reinvest) / 100;

    if (isNaN(P) || isNaN(r) || isNaN(t)) return;

    for (let i = 0; i < t; i++) {
      let profit = P * r;
      P += profit * reinvestRate;
    }

    setResult(P.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#012B2E] via-[#013B43] to-[#014C5A] flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#00A991]">
          Trading Compound Interest Calculator
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Initial Capital ($)
            </label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 text-gray-900"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Daily Return Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 text-gray-900"
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Trading Days
            </label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 text-gray-900"
              placeholder="e.g. 30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Reinvest Percentage (%)
            </label>
            <input
              type="number"
              value={reinvest}
              onChange={(e) => setReinvest(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 text-gray-900"
              placeholder="e.g. 100"
            />
          </div>

          <button
            onClick={calculateCompound}
            className="w-full mt-4 bg-[#00A991] hover:bg-[#008f7b] text-white py-2 rounded-lg font-medium transition duration-200"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold">Final Capital:</h3>
            <p className="text-2xl font-bold text-[#00FFCC] mt-1">
              ${result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
