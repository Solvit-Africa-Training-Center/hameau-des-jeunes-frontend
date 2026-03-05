/**
 * Residential Care Manager Routes Module
 *
 * Contains all routes for RESIDENTIAL_MANAGER role
 * These routes provide management of residential care programs
 */

import { Route } from "react-router-dom";
import Education from "@/pages/AdminResidentialCarePages/Education";
import Financials from "@/pages/AdminResidentialCarePages/Financials";
import HealthRecords from "@/pages/AdminResidentialCarePages/HealthRecords";
import Reports from "@/pages/AdminResidentialCarePages/Reports";
import ResidentialCareCareTakers from "@/pages/AdminResidentialCarePages/ResidentialCareCareTakers";
import ResidentialCareChildren from "@/pages/AdminResidentialCarePages/ResidentialCareChildren";
import ResidentialCareDashboard from "@/pages/AdminResidentialCarePages/ResidentialCareDashboard";
import ResidentialCareSettings from "@/pages/AdminResidentialCarePages/ResidentialCareSettings";
import Institutions from "@/pages/AdminResidentialCarePages/Institutions";
import { ProtectedRoute } from "../ProtectedRoute";

export const residentialManagerRoutes = [
  <Route
    key="rc-dashboard"
    path="/residentialCareDashboard"
    element={
      <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
        <ResidentialCareDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="rc-children"
    path="/residentialCareChildren"
    element={
      <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
        <ResidentialCareChildren />
      </ProtectedRoute>
    }
  />,
  <Route
    key="rc-caretakers"
    path="/residentialCareCareTakers"
    element={
      <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
        <ResidentialCareCareTakers />
      </ProtectedRoute>
    }
  />,
  <Route
    key="rc-settings"
    path="/residentialCareSettings"
    element={
      <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
        <ResidentialCareSettings />
      </ProtectedRoute>
    }
  />,
  <Route
    key="education"
    path="/education"
    element={
      <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
        <Education />
      </ProtectedRoute>
    }
  />,
  <Route
    key="rc-financials"
    path="/financials"
    element={
      <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
        <Financials />
      </ProtectedRoute>
    }
  />,
  <Route
    key="reports"
    path="/reports"
    element={
      <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
        <Reports />
      </ProtectedRoute>
    }
  />,
  <Route
    key="health-records"
    path="/healthRecords"
    element={
      <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
        <HealthRecords />
      </ProtectedRoute>
    }
  />,
  <Route
    key="institutions"
    path="/educationalInstitutions"
    element={
      <ProtectedRoute allowedRoles={["RESIDENTIAL_MANAGER"]}>
        <Institutions />
      </ProtectedRoute>
    }
  />,
];
