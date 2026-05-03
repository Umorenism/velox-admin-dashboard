// // ProtectedRoute.tsx  (rename suggestion: AuthRequired.tsx or PrivateOutlet.tsx)
// import { Navigate, Outlet } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// export const ProtectedRoute = () => {
//   const token = localStorage.getItem("access_token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   try {
//     const decoded = jwtDecode(token);
//     const isExpired = decoded.exp * 1000 < Date.now();

//     if (isExpired) {
//       localStorage.removeItem("access_token");
//       return <Navigate to="/login" replace />;
//     }
//   } catch (err) {
//     localStorage.removeItem("access_token");
//     return <Navigate to="/login" replace />;
//   }

//   // All good → render child route(s)
//   return <Outlet />;
// };




// import { Navigate, Outlet } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";



// export const ProtectedRoute = () => {
//   const token = localStorage.getItem("access_token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   try {
//     const decoded = jwtDecode<DecodedToken>(token);
    
//     // 1. Check Expiration
//     const isExpired = decoded.exp * 1000 < Date.now();
//     if (isExpired) {
//       console.warn("Session expired");
//       localStorage.removeItem("access_token");
//       return <Navigate to="/login" replace />;
//     }

//     /**
//      * 2. Role Validation
//      * Only allow 'admin' or 'superadmin'
//      */
//     const allowedRoles = ["admin", "superadmin"];
//     if (!allowedRoles.includes(decoded.role)) {
//       console.error("Insufficient permissions:", decoded.role);
//       localStorage.clear(); // Wipe everything if a non-admin tries to sneak in
//       return <Navigate to="/login" replace />;
//     }

//   } catch (err) {
//     console.error("Invalid Token Structure");
//     localStorage.removeItem("access_token");
//     return <Navigate to="/login" replace />;
//   }

//   // All good → render child route(s)
//   return <Outlet />;
// };





import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("access_token");

  // 1. No token? Direct bounce to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    
    // 2. Check Expiration
    // (exp is in seconds, Date.now() is in milliseconds)
    const currentTime = Date.now();
    const tokenExp = decoded.exp * 1000;

    if (tokenExp < currentTime) {
      console.warn("Access Token Expired");
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    const normalizeRole = (value) => `${value || ''}`.toLowerCase().replace(/[_\s-]+/g, '');
    const savedUser = (() => {
      try {
        return JSON.parse(localStorage.getItem('admin_user') || '{}');
      } catch {
        return {};
      }
    })();

    const userRole = normalizeRole(
      decoded.role || decoded.adminType || savedUser.role || savedUser.adminType || ''
    );
    const allowedRoles = ['admin', 'superadmin', 'network'];

    if (!allowedRoles.includes(userRole)) {
      console.error('Access Denied: Role', userRole, 'is not authorized.');
      localStorage.clear(); 
      return <Navigate to="/login" replace />;
    }

    // If we passed all checks, proceed to the dashboard
    return <Outlet />;

  } catch (err) {
    // This catches malformed tokens or decoding errors
    console.error("Security Token Error:", err);
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
};