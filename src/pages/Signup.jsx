import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { signup } from "../api/authApi";
import pic from "../assets/logovelox.svg";

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const containerRef = useRef(null);
  const formRef = useRef(null);

  // ✅ Animate entry
  useEffect(() => {
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

  // ✅ Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle signup
  const handleSignup = async () => {
    setError("");
    setSuccess("");

    const { name, email, phone, password } = formData;
    if (!name || !email || !phone || !password) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await signup(formData);
      localStorage.setItem("token", res.token);
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4">
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
            style={{ backgroundImage: `url(${pic})` }}
          ></div>
        </div>

        {/* Right Signup Form */}
        <div className="flex flex-1 items-center justify-center">
          <div ref={formRef} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-black mb-2">Create Account</h2>
            <p className="text-gray-500 mb-8">Sign up to access your admin dashboard.</p>

            {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm">{error}</div>}
            {success && <div className="bg-green-100 text-green-600 p-2 mb-4 rounded text-sm">{success}</div>}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1234567890"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD]"
              />
            </div>

            <div className="mb-6 relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              onClick={handleSignup}
              disabled={isLoading}
              className={`w-full py-3 rounded-[8px] font-semibold transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#00A991] hover:bg-green-600 text-white"
              }`}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:underline font-medium"
              >
                Login here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
