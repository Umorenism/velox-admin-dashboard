
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // ✅ Loader icon
import pic from "../assets/logovelox.svg";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Animate container & form items
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      formRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.3 }
    );
  }, []);

  const handleLogin = () => {
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      localStorage.setItem("token", "demo-token");
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4">
      {/* Loader Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
          <Loader2 className="animate-spin text-[#00A991]" size={50} />
        </div>
      )}

      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row gap-2 w-full max-w-7xl"
      >
        {/* Left Image Card */}
        <div className="hidden lg:flex flex-1 rounded-2xl overflow-hidden shadow-xl relative bg-white">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${pic})`,
            }}
          ></div>
        </div>

        {/* Right Login Card */}
        <div className="flex flex-1 items-center justify-center">
          <div ref={formRef} className="w-full max-w-md bg-white p-8">
            <h2 className="text-3xl font-bold text-black mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-500 mb-8">
              By logging in, you agree to the terms and conditions
            </p>

            {/* Prefix */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#101928] mb-1">
                Enter Prefix
              </label>
              <input
                type="text"
                placeholder="e.g. VELOX"
                className="w-full px-4 py-2 border rounded-[6px] bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none border-[#D0D5DD]"
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#101928] mb-1">
                Enter Username
              </label>
              <input
                type="text"
                placeholder="yourusername"
                className="w-full px-4 py-2 border rounded-[6px] bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none border-[#D0D5DD]"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-[#101928] mb-1">
                Enter Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-[6px] bg-transparent pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none border-[#D0D5DD]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Captcha */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#101928] mb-1">
                CAPTCHA
              </label>
              <div className="flex items-center justify-between p-3 rounded-[6px] border border-[#D0D5DD]">
                <span className="text-gray-600 text-sm">
                  [ CAPTCHA Placeholder ]
                </span>
                <button className="text-blue-500 text-sm font-medium">
                  Refresh
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 rounded-[8px] font-semibold transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#00A991] hover:bg-green-600 text-white"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Forgot password */}
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
