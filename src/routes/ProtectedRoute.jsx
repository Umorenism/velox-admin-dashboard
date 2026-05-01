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

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    
    // Check expiration
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    // ✅ CHECK: Role must be 'admin' or 'superadmin'
    // Your API res showed "role": "admin"
    const userRole = decoded.role?.toLowerCase();
    const allowedRoles = ["admin", "superadmin"];

    if (!allowedRoles.includes(userRole)) {
      console.error("Access Denied: Invalid Role", userRole);
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

  } catch (err) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};