/**
 * Ifashe Tugufashe Manager Routes Module
 *
 * Contains all routes for IFASHE_MANAGER role
 * These routes provide management of Ifashe Tugufashe program (family support)
 */

import { Route } from "react-router-dom";
import IfasheTugufasheDashboard from "@/pages/AdminIfasheTugufashePages/IfasheTugufasheDashboard";
import IfasheTugufasheFamily from "@/pages/AdminIfasheTugufashePages/IfasheTugufasheFamily";
import IfasheTugufasheChildren from "@/pages/AdminIfasheTugufashePages/IfasheTugufasheChildren";
import IfasheTugufasheSponsorship from "@/pages/AdminIfasheTugufashePages/IfasheTugufasheSponsorship";
import IfasheTugufasheSchool from "@/pages/AdminIfasheTugufashePages/IfasheTugufasheSchool";
import IfasheTugufasheClothes from "@/pages/AdminIfasheTugufashePages/IfasheTugufasheClothes";
import IfasheTugufasheParentWork from "@/pages/AdminIfasheTugufashePages/IfasheTugufasheParentWork";
import IfasheTugufasheReport from "@/pages/AdminIfasheTugufashePages/IfasheTugufasheReport";
import { ProtectedRoute } from "../ProtectedRoute";

export const ifasheManagerRoutes = [
  <Route
    key="ifashe-dashboard"
    path="/ifasheTugufasheDashboard"
    element={
      <ProtectedRoute allowedRoles={["IFASHE_MANAGER"]}>
        <IfasheTugufasheDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="ifashe-family"
    path="/IfasheTugufasheFamily"
    element={
      <ProtectedRoute allowedRoles={["IFASHE_MANAGER"]}>
        <IfasheTugufasheFamily />
      </ProtectedRoute>
    }
  />,
  <Route
    key="ifashe-children"
    path="/IfasheTugufasheChildren"
    element={
      <ProtectedRoute allowedRoles={["IFASHE_MANAGER"]}>
        <IfasheTugufasheChildren />
      </ProtectedRoute>
    }
  />,
  <Route
    key="ifashe-sponsorship"
    path="/IfasheTugufasheSponsorship"
    element={
      <ProtectedRoute allowedRoles={["IFASHE_MANAGER"]}>
        <IfasheTugufasheSponsorship />
      </ProtectedRoute>
    }
  />,
  <Route
    key="ifashe-school"
    path="/IfasheTugufasheSchool"
    element={
      <ProtectedRoute allowedRoles={["IFASHE_MANAGER"]}>
        <IfasheTugufasheSchool />
      </ProtectedRoute>
    }
  />,
  <Route
    key="ifashe-clothes"
    path="/IfasheTugufasheClothes"
    element={
      <ProtectedRoute allowedRoles={["IFASHE_MANAGER"]}>
        <IfasheTugufasheClothes />
      </ProtectedRoute>
    }
  />,
  <Route
    key="ifashe-parent-work"
    path="/IfasheTugufasheParentWork"
    element={
      <ProtectedRoute allowedRoles={["IFASHE_MANAGER"]}>
        <IfasheTugufasheParentWork />
      </ProtectedRoute>
    }
  />,
  <Route
    key="ifashe-report"
    path="/IfasheTugufasheReport"
    element={
      <ProtectedRoute allowedRoles={["IFASHE_MANAGER"]}>
        <IfasheTugufasheReport />
      </ProtectedRoute>
    }
  />,
];
