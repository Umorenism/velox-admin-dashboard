




import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Eye, EyeOff, Loader2, RefreshCw } from 'lucide-react';
import pic from '../assets/logovelox.svg';
import { login } from '../api/authApi';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prefix, setPrefix] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const captchaRef = useRef(null);

  // Animate entry
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      formRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.4, ease: 'power2.out' }
    );
  }, []);

  // Generate CAPTCHA
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randomCode = '';
    for (let i = 0; i < 5; i++) {
      randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(randomCode);
    setCaptchaInput('');
    // Animate CAPTCHA refresh
    gsap.fromTo(
      captchaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle Login Logic
  const handleLogin = async () => {
    setError('');

    // Frontend validations
    if (!prefix.trim()) return setError('Please enter a valid prefix.');
    if (!email.trim() || !password.trim()) return setError('Email and password are required.');
    if (captchaInput.toUpperCase() !== captcha) return setError('CAPTCHA verification failed.');

    setIsLoading(true);

    try {
      const res = await login({ prefix, email, password });
      localStorage.setItem('access_token', res.token);
      console.log('Login successful:', res);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#020617] to-[#0a1a42] px-4">
      {/* Loader Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader2 className="animate-spin text-[#00A991]" size={50} />
        </div>
      )}

      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl"
      >
        {/* Left Side Image */}
        <div className="hidden lg:flex flex-1 rounded-2xl overflow-hidden shadow-xl relative bg-white">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${pic})` }}
          ></div>
        </div>

        {/* Right Login Card */}
        <div className="flex flex-1 items-center justify-center">
          <div
            ref={formRef}
            className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-[#101928] mb-2">Welcome Back!</h2>
            <p className="text-gray-500 mb-6">Log in to access your Velox account.</p>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-600 p-3 mb-4 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Prefix */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#101928] mb-1">
                Prefix
              </label>
              <input
                type="text"
                placeholder="e.g. admincontrol20x25"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD] text-[#101928]"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#101928] mb-1">
                Email / Username
              </label>
              <input
                type="text"
                placeholder="admin@veloxcapital.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD] text-[#101928]"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-[#101928] mb-1">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD] text-[#101928]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* CAPTCHA */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#101928] mb-1">
                CAPTCHA
              </label>
              <div
                ref={captchaRef}
                className="flex items-center justify-between p-3 rounded-lg border border-[#D0D5DD] bg-gray-50"
              >
                <span className="text-gray-700 font-mono text-lg tracking-widest">
                  {captcha}
                </span>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-[#00A991] hover:text-[#008775] transition"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter CAPTCHA"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD] text-[#101928]"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#00A991] hover:bg-[#008775] text-white'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>

            {/* Forgot Password */}
            <div className="mt-4 text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-[#00A991] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}