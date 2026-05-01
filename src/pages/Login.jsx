




// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { gsap } from 'gsap';
// import { Eye, EyeOff, Loader2, RefreshCw } from 'lucide-react';
// import pic from '../assets/logovelox.svg';
// import { login } from '../api/authApi';

// export default function Login() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [prefix, setPrefix] = useState('');
//   const [captcha, setCaptcha] = useState('');
//   const [captchaInput, setCaptchaInput] = useState('');
//   const [error, setError] = useState('');
//   const containerRef = useRef(null);
//   const formRef = useRef(null);
//   const captchaRef = useRef(null);

//   // Animate entry
//   useEffect(() => {
//     gsap.fromTo(
//       containerRef.current,
//       { opacity: 0, y: 50 },
//       { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
//     );

//     gsap.fromTo(
//       formRef.current.children,
//       { y: 20, opacity: 0 },
//       { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.4, ease: 'power2.out' }
//     );
//   }, []);

//   // Generate CAPTCHA
//   const generateCaptcha = () => {
//     const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
//     let randomCode = '';
//     for (let i = 0; i < 5; i++) {
//       randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setCaptcha(randomCode);
//     setCaptchaInput('');
//     // Animate CAPTCHA refresh
//     gsap.fromTo(
//       captchaRef.current,
//       { scale: 0.8, opacity: 0 },
//       { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
//     );
//   };

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   // Handle Login Logic
//   const handleLogin = async () => {
//     setError('');

//     // Frontend validations
//     if (!prefix.trim()) return setError('Please enter a valid prefix.');
//     if (!email.trim() || !password.trim()) return setError('Email and password are required.');
//     if (captchaInput.toUpperCase() !== captcha) return setError('CAPTCHA verification failed.');

//     setIsLoading(true);

//     try {
//       const res = await login({ prefix, email, password });
//       localStorage.setItem('access_token', res.token);
//       console.log('Login successful:', res);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Login error:', err.response?.data || err.message);
//       const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials.';
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#020617] to-[#0a1a42] px-4">
//       {/* Loader Overlay */}
//       {isLoading && (
//         <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
//           <Loader2 className="animate-spin text-[#00A991]" size={50} />
//         </div>
//       )}

//       <div
//         ref={containerRef}
//         className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl"
//       >
//         {/* Left Side Image */}
//         <div className="hidden lg:flex flex-1 rounded-2xl overflow-hidden shadow-xl relative bg-white">
//           <div
//             className="w-full h-full bg-cover bg-center"
//             style={{ backgroundImage: `url(${pic})` }}
//           ></div>
//         </div>

//         {/* Right Login Card */}
//         <div className="flex flex-1 items-center justify-center">
//           <div
//             ref={formRef}
//             className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
//           >
//             <h2 className="text-3xl font-bold text-[#101928] mb-2">Welcome Back!</h2>
//             <p className="text-gray-500 mb-6">Log in to access your Velox account.</p>

//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-100 text-red-600 p-3 mb-4 rounded-lg text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Prefix */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-[#101928] mb-1">
//                 Prefix
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. admincontrol20x25"
//                 value={prefix}
//                 onChange={(e) => setPrefix(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD] text-[#101928]"
//               />
//             </div>

//             {/* Email */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-[#101928] mb-1">
//                 Email / Username
//               </label>
//               <input
//                 type="text"
//                 placeholder="admin@veloxcapital.ng"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD] text-[#101928]"
//               />
//             </div>

//             {/* Password */}
//             <div className="mb-4 relative">
//               <label className="block text-sm font-medium text-[#101928] mb-1">
//                 Password
//               </label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD] text-[#101928]"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-9 text-gray-500"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             {/* CAPTCHA */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-[#101928] mb-1">
//                 CAPTCHA
//               </label>
//               <div
//                 ref={captchaRef}
//                 className="flex items-center justify-between p-3 rounded-lg border border-[#D0D5DD] bg-gray-50"
//               >
//                 <span className="text-gray-700 font-mono text-lg tracking-widest">
//                   {captcha}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={generateCaptcha}
//                   className="text-[#00A991] hover:text-[#008775] transition"
//                 >
//                   <RefreshCw size={18} />
//                 </button>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Enter CAPTCHA"
//                 value={captchaInput}
//                 onChange={(e) => setCaptchaInput(e.target.value)}
//                 className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00A991] border-[#D0D5DD] text-[#101928]"
//               />
//             </div>

//             {/* Login Button */}
//             <button
//               onClick={handleLogin}
//               disabled={isLoading}
//               className={`w-full py-3 rounded-lg font-semibold transition-all ${
//                 isLoading
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-[#00A991] hover:bg-[#008775] text-white'
//               }`}
//             >
//               {isLoading ? 'Logging in...' : 'Log In'}
//             </button>

//             {/* Forgot Password */}
//             {/* <div className="mt-4 text-center">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-[#00A991] hover:underline"
//               >
//                 Forgot password?
//               </Link>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { gsap } from 'gsap';
// import { Eye, EyeOff, Loader2, ShieldCheck, Mail, Lock } from 'lucide-react';
// import pic from '../assets/logovelox.svg';
// import { login } from '../api/authApi';

// export default function Login() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
  
//   const containerRef = useRef(null);
//   const formRef = useRef(null);
//   const sidePanelRef = useRef(null);

//   // Animate entry
//   useEffect(() => {
//     const tl = gsap.timeline();
//     tl.fromTo(sidePanelRef.current, 
//       { x: -100, opacity: 0 }, 
//       { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }
//     )
//     .fromTo(formRef.current, 
//       { x: 50, opacity: 0 }, 
//       { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }, 
//       "-=0.7"
//     )
//     .fromTo(".input-animate", 
//       { y: 20, opacity: 0 }, 
//       { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
//       "-=0.5"
//     );
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email.trim() || !password.trim()) {
//       return setError('Please enter your credentials.');
//     }

//     setIsLoading(true);
//     try {
//       const res = await login({ email, password });
      
//       // ✅ Role Validation Logic
//       const userRole = res.user?.role;
      
//       if (userRole === 'admin' || userRole === 'superadmin') {
//         localStorage.setItem('access_token', res.token);
//         // Optional: Store user info for display in dashboard
//         localStorage.setItem('admin_user', JSON.stringify(res.user));
        
//         navigate('/dashboard');
//       } else {
//         // ❌ Unauthorized Role
//         setError('Access Denied: High-level clearance required for this terminal.');
//         // Don't store the token if they aren't an admin
//       }

//     } catch (err) {
//       setError(err.response?.data?.error || 'Authentication failed. Please retry.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 lg:p-8 font-sans">
//       <div ref={containerRef} className="flex w-full max-w-[1100px] bg-[#0f172a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 relative">
        
//         {/* Left Branding Panel */}
//         <div ref={sidePanelRef} className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-600/20 to-transparent p-12 flex-col justify-between relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          
//           <div className="relative z-10">
//             <img src={pic} alt="Velox" className="h-10 w-auto mb-12" />
//             <h1 className="text-4xl font-bold text-white leading-tight">
//               Secure Access to <br />
//               <span className="text-emerald-400">Velox Admin</span>
//             </h1>
//             <p className="text-slate-400 mt-4 max-w-sm">
//               Terminal access for Velox Capital Markets administration and portfolio management.
//             </p>
//           </div>

//           <div className="relative z-10 flex items-center gap-3 text-slate-500 text-sm italic">
//             <ShieldCheck className="text-emerald-500" size={18} />
//             Encrypted Session Active
//           </div>
//         </div>

//         {/* Right Login Section */}
//         <div className="flex-[1.2] p-8 lg:p-16 bg-[#0f172a] flex flex-col justify-center">
//           <form ref={formRef} onSubmit={handleLogin} className="w-full max-w-sm mx-auto">
//             <div className="mb-8">
//               <h2 className="text-2xl font-semibold text-white">Administrator Login</h2>
//               <p className="text-slate-500 text-sm mt-1">Direct terminal entry</p>
//             </div>

//             {error && (
//               <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 mb-6 rounded-xl text-xs flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
//                 {error}
//               </div>
//             )}

//             {/* Email Field */}
//             <div className="mb-5 input-animate">
//               <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
//               <div className="relative group">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="admin@velox.ng"
//                   className="w-full bg-slate-900/50 border border-slate-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="mb-8 input-animate">
//               <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2 ml-1">Secret Key</label>
//               <div className="relative group">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full bg-slate-900/50 border border-slate-800 text-white pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="group relative w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white py-4 rounded-xl font-bold tracking-wide transition-all overflow-hidden"
//             >
//               <div className="relative z-10 flex items-center justify-center gap-2">
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="animate-spin" size={20} />
//                     <span>Verifying...</span>
//                   </>
//                 ) : (
//                   <span>Access Terminal</span>
//                 )}
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }






// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { gsap } from 'gsap';
// import { Eye, EyeOff, Loader2, ShieldCheck, User, Lock, Mail } from 'lucide-react';
// import pic from '../assets/logovelox.svg';
// import { login } from '../api/authApi';

// export default function Login() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
  
//   // 'identifier' handles both Email and Username input
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
  
//   const containerRef = useRef(null);
//   const formRef = useRef(null);
//   const sidePanelRef = useRef(null);

//   // Animate entry
//   useEffect(() => {
//     const tl = gsap.timeline();
//     tl.fromTo(sidePanelRef.current, 
//       { x: -100, opacity: 0 }, 
//       { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }
//     )
//     .fromTo(formRef.current, 
//       { x: 50, opacity: 0 }, 
//       { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }, 
//       "-=0.7"
//     )
//     .fromTo(".input-animate", 
//       { y: 20, opacity: 0 }, 
//       { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
//       "-=0.5"
//     );
//   }, []);

 

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   setError('');
//   setIsLoading(true);

//   try {
//     const res = await login({ 
//       email: identifier.includes('@') ? identifier : "", 
//       username: !identifier.includes('@') ? identifier : "", 
//       password 
//     });

//     // 1. Save strictly
//     localStorage.setItem('access_token', res.token);
//     localStorage.setItem('admin_user', JSON.stringify(res.user));

//     // 2. Validate Role from the USER object (not just token)
//     const role = res.user?.role?.toLowerCase();
    
//     if (role === 'admin' || role === 'superadmin') {
//       // ✅ Use replace: true to clear the login page from history
//       navigate('/dashboard', { replace: true });
//     } else {
//       setError('Access Denied: Administrator clearance required.');
//       localStorage.clear();
//     }
//   } catch (err) {
//     setError(err.response?.data?.error || 'Authentication failed.');
//   } finally {
//     setIsLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 lg:p-8 font-sans">
//       <div ref={containerRef} className="flex w-full max-w-[1100px] bg-[#0f172a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 relative">
        
//         {/* Left Branding Panel */}
//         <div ref={sidePanelRef} className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-600/20 to-transparent p-12 flex-col justify-between relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          
//           <div className="relative z-10">
//             <img src={pic} alt="Velox" className="h-10 w-auto mb-12" />
//             <h1 className="text-4xl font-bold text-white leading-tight">
//               Secure Access to <br />
//               <span className="text-emerald-400">Velox Admin</span>
//             </h1>
//             <p className="text-slate-400 mt-4 max-w-sm">
//               Terminal access for Velox Capital Markets administration and portfolio management.
//             </p>
//           </div>

//           <div className="relative z-10 flex items-center gap-3 text-slate-500 text-sm italic">
//             <ShieldCheck className="text-emerald-500" size={18} />
//             Encrypted Session Active
//           </div>
//         </div>

//         {/* Right Login Section */}
//         <div className="flex-[1.2] p-8 lg:p-16 bg-[#0f172a] flex flex-col justify-center">
//           <form ref={formRef} onSubmit={handleLogin} className="w-full max-w-sm mx-auto">
//             <div className="mb-8">
//               <h2 className="text-2xl font-semibold text-white">Administrator Login</h2>
//               <p className="text-slate-500 text-sm mt-1">Direct terminal entry</p>
//             </div>

//             {error && (
//               <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 mb-6 rounded-xl text-xs flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
//                 {error}
//               </div>
//             )}

//             {/* Identity Field (Email or Username) */}
//             <div className="mb-5 input-animate">
//               <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2 ml-1">
//                 Admin ID (Email or Username)
//               </label>
//               <div className="relative group">
//                 {identifier.includes('@') ? (
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 ) : (
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 )}
//                 <input
//                   type="text"
//                   value={identifier}
//                   onChange={(e) => setIdentifier(e.target.value)}
//                   placeholder="admin@velox.ng or superadmin"
//                   className="w-full bg-slate-900/50 border border-slate-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="mb-8 input-animate">
//               <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2 ml-1">Secret Key</label>
//               <div className="relative group">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full bg-slate-900/50 border border-slate-800 text-white pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-700"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="group relative w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white py-4 rounded-xl font-bold tracking-wide transition-all overflow-hidden active:scale-[0.98]"
//             >
//               <div className="relative z-10 flex items-center justify-center gap-2">
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="animate-spin" size={20} />
//                     <span>Establishing Connection...</span>
//                   </>
//                 ) : (
//                   <span>Access Terminal</span>
//                 )}
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Eye, EyeOff, Loader2, ShieldCheck, User, Lock, Mail } from 'lucide-react';
import pic from '../assets/logovelox.svg';
import { login } from '../api/authApi';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Visual error flags
  const [passwordError, setPasswordError] = useState(false);
  const [identifierError, setIdentifierError] = useState(false);
  
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const sidePanelRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(sidePanelRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'expo.out' })
      .fromTo(formRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }, "-=0.7")
      .fromTo(".input-animate", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, "-=0.5");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError(false);
    setIdentifierError(false);
    setIsLoading(true);

    try {
      const isEmail = identifier.includes('@');
      const res = await login({ 
        email: isEmail ? identifier : "", 
        username: !isEmail ? identifier : "", 
        password 
      });

      localStorage.setItem('access_token', res.token);
      localStorage.setItem('admin_user', JSON.stringify(res.user));

      const role = res.user?.role?.toLowerCase();
      if (role === 'admin' || role === 'superadmin') {
        navigate('/dashboard', { replace: true });
      } else {
        setError('Access Denied: Administrator clearance required.');
        localStorage.clear();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Authentication failed.';
      setError(errorMsg);

      // ✅ Specific Field Error Handling
      if (errorMsg === "Password is incorrect") {
        setPasswordError(true);
      } else if (errorMsg === "Email not found" || errorMsg.toLowerCase().includes("username not found") || errorMsg.toLowerCase().includes("user not found")) {
        setIdentifierError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 lg:p-8 font-sans text-slate-200">
      <div ref={containerRef} className="flex w-full max-w-[1100px] bg-[#0f172a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 relative">
        
        {/* Left Branding Panel */}
        <div ref={sidePanelRef} className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-600/20 to-transparent p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10">
            <img src={pic} alt="Velox" className="h-10 w-auto mb-12" />
            <h1 className="text-4xl font-bold text-white leading-tight">Secure Access to <br /><span className="text-emerald-400">Velox Admin</span></h1>
            <p className="text-slate-400 mt-4 max-w-sm">Terminal access for administration and portfolio management.</p>
          </div>
          <div className="relative z-10 flex items-center gap-3 text-slate-500 text-sm italic">
            <ShieldCheck className="text-emerald-500" size={18} /> Encrypted Session Active
          </div>
        </div>

        {/* Right Login Section */}
        <div className="flex-[1.2] p-8 lg:p-16 bg-[#0f172a] flex flex-col justify-center">
          <form ref={formRef} onSubmit={handleLogin} className="w-full max-w-sm mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white">Administrator Login</h2>
              <p className="text-slate-500 text-sm mt-1">Direct terminal entry</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 mb-6 rounded-xl text-xs flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}

            {/* Identity Field */}
            <div className="mb-5 input-animate">
              <label className={`block text-xs font-medium uppercase tracking-widest mb-2 ml-1 ${identifierError ? 'text-red-400' : 'text-slate-400'}`}>
                Admin ID (Email or Username)
              </label>
              <div className="relative group">
                {identifier.includes('@') ? (
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${identifierError ? 'text-red-500' : 'text-slate-600 group-focus-within:text-emerald-400'}`} size={18} />
                ) : (
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${identifierError ? 'text-red-500' : 'text-slate-600 group-focus-within:text-emerald-400'}`} size={18} />
                )}
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (identifierError) setIdentifierError(false);
                  }}
                  placeholder="admin@velox.ng or superadmin"
                  className={`w-full bg-slate-900/50 border text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all placeholder:text-slate-700 ${
                    identifierError ? 'border-red-500/50 ring-1 ring-red-500/10' : 'border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-8 input-animate">
              <label className={`block text-xs font-medium uppercase tracking-widest mb-2 ml-1 ${passwordError ? 'text-red-400' : 'text-slate-400'}`}>
                Secret Key
              </label>
              <div className="relative group">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${passwordError ? 'text-red-500' : 'text-slate-600 group-focus-within:text-emerald-400'}`} size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError(false);
                  }}
                  placeholder="••••••••"
                  className={`w-full bg-slate-900/50 border text-white pl-10 pr-12 py-3 rounded-xl focus:outline-none transition-all placeholder:text-slate-700 ${
                    passwordError ? 'border-red-500/50 ring-1 ring-red-500/10' : 'border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50'
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white py-4 rounded-xl font-bold tracking-wide transition-all overflow-hidden active:scale-[0.98]"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? <><Loader2 className="animate-spin" size={20} /><span>Verifying...</span></> : <span>Access Terminal</span>}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}