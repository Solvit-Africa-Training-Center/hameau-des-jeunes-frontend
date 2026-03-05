/**
 * Admin and Manager Types
 *
 * Contains all types related to admin users, managers, and their roles.
 */

/* =============== Admin Roles =============== */
export type AdminRole =
  | "Residential Care"
  | "Ifashe Tugufashe"
  | "Internship"
  | "Health Post";

export type SystemAdminRole = "SYSTEM_ADMIN";
export type ResidentialManagerRole = "RESIDENTIAL_MANAGER";
export type InternshipManagerRole = "INTERNSHIPS_MANAGER";
export type IfasheManagerRole = "IFASHE_MANAGER";

export type ManagerRole =
  | SystemAdminRole
  | ResidentialManagerRole
  | InternshipManagerRole
  | IfasheManagerRole;

/* =============== Admin Status =============== */
export type AdminStatus = "Up_to_date" | "Action_Required" | "Pending";

/* =============== Admin/User Models =============== */
export interface Admin {
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  lastLogin: string;
  updates: string;
}

export interface User {
  name: string;
  role: AdminRole;
  status: AdminStatus;
  lastLogin: string;
  updates: string;
}

/* =============== Activity Types =============== */
export type ActivityStatus = "completed" | "pending" | "in_progress";

export interface Activity {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  program: string;
  timestamp: string;
  icon: "document" | "edit" | "upload";
}

/* =============== Settings Types =============== */
export interface OrganizationProfile {
  organizationName: string;
  primaryContactEmail: string;
  address: string;
  phoneNumber: string;
}

export interface PersonalProfile {
  fullName: string;
  email: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  desktopAlerts: boolean;
}

export interface SystemPreferences {
  twoFactorAuth: boolean;
  automaticDataExport: boolean;
}
