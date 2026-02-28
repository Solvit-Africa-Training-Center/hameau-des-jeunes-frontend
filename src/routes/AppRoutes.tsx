import { Routes } from "react-router-dom";
import {
  publicRoutes,
  authRoutes,
  systemAdminRoutes,
  residentialManagerRoutes,
  internshipManagerRoutes,
  ifasheManagerRoutes,
} from "./modules";

/**
 * Main Application Routes
 *
 * Organizes all routes by role and functionality for better maintainability.
 * Routes are imported from modular files in the ./modules directory.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      {publicRoutes}

      {/* ================= AUTH ROUTES ================= */}
      {authRoutes}

      {/* ================= SYSTEM ADMIN ROUTES ================= */}
      {systemAdminRoutes}

      {/* ================= RESIDENTIAL MANAGER ROUTES ================= */}
      {residentialManagerRoutes}

      {/* ================= INTERNSHIP MANAGER ROUTES ================= */}
      {internshipManagerRoutes}

      {/* ================= IFASHE TUGUFASHE MANAGER ROUTES ================= */}
      {ifasheManagerRoutes}
    </Routes>
  );
};
