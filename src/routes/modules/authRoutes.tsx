/**
 * Authentication Routes Module
 *
 * Contains routes related to authentication and account recovery
 */

import { Route } from "react-router-dom";
import { LoginPage } from "@/pages/Login";
import { ResetPassword } from "@/pages/ResetPassword";
import { NewPassword } from "@/pages/NewPassword";
import { ChangePassword } from "@/pages/ChangePassword";

export const authRoutes = [
  <Route key="login" path="/login" element={<LoginPage />} />,
  <Route key="reset-pwd" path="/resetPassword" element={<ResetPassword />} />,
  <Route key="new-pwd" path="/newPassword" element={<NewPassword />} />,
  <Route
    key="change-pwd"
    path="/changePassword"
    element={<ChangePassword />}
  />,
];
