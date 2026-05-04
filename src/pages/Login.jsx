

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
  
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
  
//   // Visual error flags
//   const [passwordError, setPasswordError] = useState(false);
//   const [identifierError, setIdentifierError] = useState(false);
  
//   const containerRef = useRef(null);
//   const formRef = useRef(null);
//   const sidePanelRef = useRef(null);

//   useEffect(() => {
//     const tl = gsap.timeline();
//     tl.fromTo(sidePanelRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'expo.out' })
//       .fromTo(formRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }, "-=0.7")
//       .fromTo(".input-animate", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, "-=0.5");
//   }, []);

//  const handleLogin = async (e) => {
//   e.preventDefault();
//   setError('');
//   setIsLoading(true);

//   try {
//     const res = await login({ 
//       email: identifier.includes('@') ? identifier : "", 
//       username: !identifier.includes('@') ? identifier : "", 
//       password 
//     });

//     // 1. Extract Role
//     const role = res.user?.role?.toLowerCase();

//     // 2. THE GUARD: Only proceed if role is admin
//     if (role === 'admin' || role === 'superadmin') {
//       localStorage.setItem('access_token', res.token);
//       localStorage.setItem('admin_user', JSON.stringify(res.user));
      
//       // Navigate to dashboard ONLY for admins
//       navigate('/dashboard', { replace: true });
//     } else {
//       // 3. REJECT: If a regular user logs into the admin panel
//       setError('FORBIDDEN: You do not have administrative privileges.');
//       localStorage.clear(); 
//     }
    
//   } catch (err) {
//     const errorMsg = err.response?.data?.error || 'Authentication failed.';
//     setError(errorMsg);
//     // ... your field-specific error flags (passwordError, etc)
//   } finally {
//     setIsLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 lg:p-8 font-sans text-slate-200">
//       <div ref={containerRef} className="flex w-full max-w-[1100px] bg-[#0f172a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 relative">
        
//         {/* Left Branding Panel */}
//         <div ref={sidePanelRef} className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-600/20 to-transparent p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
//           <div className="relative z-10">
//             <img src={pic} alt="Velox" className="h-10 w-auto mb-12" />
//             <h1 className="text-4xl font-bold text-white leading-tight">Secure Access to <br /><span className="text-emerald-400">Velox Admin</span></h1>
//             <p className="text-slate-400 mt-4 max-w-sm">Terminal access for administration and portfolio management.</p>
//           </div>
//           <div className="relative z-10 flex items-center gap-3 text-slate-500 text-sm italic">
//             <ShieldCheck className="text-emerald-500" size={18} /> Encrypted Session Active
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

//             {/* Identity Field */}
//             <div className="mb-5 input-animate">
//               <label className={`block text-xs font-medium uppercase tracking-widest mb-2 ml-1 ${identifierError ? 'text-red-400' : 'text-slate-400'}`}>
//                 Admin ID (Email or Username)
//               </label>
//               <div className="relative group">
//                 {identifier.includes('@') ? (
//                   <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${identifierError ? 'text-red-500' : 'text-slate-600 group-focus-within:text-emerald-400'}`} size={18} />
//                 ) : (
//                   <User className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${identifierError ? 'text-red-500' : 'text-slate-600 group-focus-within:text-emerald-400'}`} size={18} />
//                 )}
//                 <input
//                   type="text"
//                   value={identifier}
//                   onChange={(e) => {
//                     setIdentifier(e.target.value);
//                     if (identifierError) setIdentifierError(false);
//                   }}
//                   placeholder="admin@velox.ng or superadmin"
//                   className={`w-full bg-slate-900/50 border text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-all placeholder:text-slate-700 ${
//                     identifierError ? 'border-red-500/50 ring-1 ring-red-500/10' : 'border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50'
//                   }`}
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="mb-8 input-animate">
//               <label className={`block text-xs font-medium uppercase tracking-widest mb-2 ml-1 ${passwordError ? 'text-red-400' : 'text-slate-400'}`}>
//                 Secret Key
//               </label>
//               <div className="relative group">
//                 <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${passwordError ? 'text-red-500' : 'text-slate-600 group-focus-within:text-emerald-400'}`} size={18} />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     if (passwordError) setPasswordError(false);
//                   }}
//                   placeholder="••••••••"
//                   className={`w-full bg-slate-900/50 border text-white pl-10 pr-12 py-3 rounded-xl focus:outline-none transition-all placeholder:text-slate-700 ${
//                     passwordError ? 'border-red-500/50 ring-1 ring-red-500/10' : 'border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50'
//                   }`}
//                 />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400">
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="group relative w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white py-4 rounded-xl font-bold tracking-wide transition-all overflow-hidden active:scale-[0.98]"
//             >
//               <div className="relative z-10 flex items-center justify-center gap-2">
//                 {isLoading ? <><Loader2 className="animate-spin" size={20} /><span>Verifying...</span></> : <span>Access Terminal</span>}
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
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from 'gsap';
import { Eye, EyeOff, Loader2, ShieldCheck, User, Lock, Mail, Terminal } from 'lucide-react';
import pic from '../assets/logovelox.svg';
import { login } from '../api/authApi';

// Reusing the BackgroundSwitcher for consistent branding
import bg1 from "../assets/hero.svg";
import bg2 from "../assets/vid1.mp4";
const backgroundMedia = [{ type: "image", src: bg1 }, { type: "video", src: bg2 }];

function BackgroundSwitcher() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % backgroundMedia.length), 8000);
    return () => clearInterval(interval);
  }, []);
  const current = backgroundMedia[index];
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <AnimatePresence mode="wait">
        <motion.div key={current.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="w-full h-full">
          {current.type === "image" ? <img src={current.src} className="w-full h-full object-cover" /> : <video src={current.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[#07112b]/90 backdrop-blur-[2px]" />
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(formRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await login({ 
        email: identifier.includes('@') ? identifier : "", 
        username: !identifier.includes('@') ? identifier : "", 
        password 
      });

      // 1. Log response to console to debug if it still fails
      console.log("Login Response:", res);

      // 2. Extract admin data (Handling both 'admin' and 'user' keys just in case)
      const adminData = res.admin || res.user;
      const token = res.token;

      if (token && adminData) {
        const normalizeRole = (value) => `${value || ''}`.toLowerCase().replace(/[_\s-]+/g, '');
        const userRole = normalizeRole(adminData.role || adminData.adminType || '');
        console.log('User Role:', userRole, 'Admin Type:', adminData.adminType);

        if (!['admin', 'superadmin', 'network'].includes(userRole)) {
          setError('ACCESS DENIED: Insufficient privileges for admin panel.');
          localStorage.clear();
          return;
        }

        const storedAdmin = {
          ...adminData,
          role: userRole,
        };

        // 4. Save to storage
        localStorage.setItem('access_token', token);
        localStorage.setItem('admin_user', JSON.stringify(storedAdmin));
        
        // 5. Force a small delay for state to settle, then navigate
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 100);
      } else {
        setError('ACCESS DENIED: Invalid Administrative Credentials.');
        localStorage.clear(); 
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || err.response?.data?.error || 'Terminal Authentication Failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden p-4">
      <BackgroundSwitcher />

      <motion.div 
        ref={formRef}
        className="relative z-10 w-full max-w-md bg-[#0e1f45]/70 border border-white/10 rounded-[1.5rem] shadow-2xl p-8 backdrop-blur-xl"
      >
        {/* Branding Header */}
        <div className="text-center mb-8">
          <img src={pic} alt="Velox" className="h-8 mx-auto mb-6 opacity-90" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Terminal size={12} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Admin Terminal</span>
          </div>
          <h2 className="text-xl font-black uppercase tracking-widest text-white">System <span className="text-[#D4A843]">Login</span></h2>
          <div className="h-0.5 w-8 bg-[#00A991] mx-auto mt-2 rounded-full" />
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 mb-6 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 justify-center">
             {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Identity Field */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4A843] transition-colors">
              {identifier.includes('@') ? <Mail size={16} /> : <User size={16} />}
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Admin Email or Username"
              className="w-full pl-11 pr-4 py-3 text-[13px] rounded-xl bg-white/5 border border-white/10 focus:border-[#D4A843]/50 outline-none text-white placeholder-gray-600 transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4A843] transition-colors">
              <Lock size={16} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Secret Key"
              className="w-full pl-11 pr-12 py-3 text-[13px] rounded-xl bg-white/5 border border-white/10 focus:border-[#D4A843]/50 outline-none text-white placeholder-gray-600 transition-all"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-[#D4A843] to-[#e3b874] text-[#07112b] font-black uppercase tracking-[0.15em] rounded-xl text-[11px] shadow-lg shadow-[#D4A843]/10 flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <><Loader2 className="animate-spin" size={16} /> Verifying Credentials...</>
            ) : (
              "Initialize Secure Session"
            )}
          </motion.button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
          <ShieldCheck size={14} className="text-[#00A991]" />
          <span className="text-[9px] font-bold uppercase tracking-widest">AES-256 Encrypted Connection</span>
        </div>
      </motion.div>
    </div>
  );
}