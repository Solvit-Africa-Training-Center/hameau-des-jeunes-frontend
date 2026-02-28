/**
 * Internship Manager Routes Module
 *
 * Contains all routes for INTERNSHIPS_MANAGER role
 * These routes provide management of internship programs
 */

import { Route } from "react-router-dom";
import InternshipDashboard from "@/pages/AdminInternshipPages/InternshipDashboard";
import InternshipApplication from "@/pages/AdminInternshipPages/InternshipApplication";
import InternshipManagement from "@/pages/AdminInternshipPages/InternshipManagement";
import InternshipFeedBack from "@/pages/AdminInternshipPages/InternshipFeedback";
import InternshipSettings from "@/pages/AdminInternshipPages/InternshipSettings";
import { ProtectedRoute } from "../ProtectedRoute";

export const internshipManagerRoutes = [
  <Route
    key="internship-dashboard"
    path="/InternshipsDashboard"
    element={
      <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
        <InternshipDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="internship-applications"
    path="/InternshipApplication"
    element={
      <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
        <InternshipApplication />
      </ProtectedRoute>
    }
  />,
  <Route
    key="internship-management"
    path="/InternshipManagement"
    element={
      <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
        <InternshipManagement />
      </ProtectedRoute>
    }
  />,
  <Route
    key="internship-feedback"
    path="/InternshipFeedbackContent"
    element={
      <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
        <InternshipFeedBack />
      </ProtectedRoute>
    }
  />,
  <Route
    key="internship-settings"
    path="/InternshipSettings"
    element={
      <ProtectedRoute allowedRoles={["INTERNSHIPS_MANAGER"]}>
        <InternshipSettings />
      </ProtectedRoute>
    }
  />,
];
