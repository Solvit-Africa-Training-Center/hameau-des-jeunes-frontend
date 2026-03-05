/**
 * Component-Specific Types
 *
 * Contains types and interfaces specific to UI components
 * that are not part of the API layer or admin types.
 */

/* =============== Family & Sponsorship (Ifashe Tugufashe) =============== */
export interface Family {
  id: string;
  familyId: string;
  parentName: string;
  phoneNumber: string;
  children: number;
  vulnerability: string;
  fullName: string;
  gender: string;
  dob: string;
  nationalId: string;
  educationLevel: string;
  address: string;
  previousEmployment: string;
  monthlyIncome: string;
  housingCondition: string;
  vulnerabilityLevel: string;
  assessmentNotes: string;
}

export interface Sponsorship {
  id: string;
  childId: string;
  beneficiaryName: string;
  beneficiaryFamily: string;
  type: "Education-only" | "Partial" | "Full";
  sponsorSource: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Suspended" | "Completed" | "Pending";
  selectFamily: string;
  selectChild: string;
  sponsorshipType: string;
  startDateFull: string;
  expectedEndDate: string;
}

export interface IfasheTugufasheChild {
  id: string;
  childId: string;
  name: string;
  family: string;
  school: string;
  educationLevel: string;
  status: "Active" | "Inactive" | "Graduated" | "Transferred";
  linkedFamily: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  schoolName: string;
  supportStatus: string;
  healthConditions: string;
}

/* =============== Stories & Testimonials =============== */
export interface StoryCardProps {
  image: string;
  name: string;
  story: string;
}

/* =============== Donation & Support =============== */
export interface SupportItem {
  label: string;
  amount: string;
}

export interface DonationChild {
  id: number;
  name: string;
  age: string;
  location: string;
  description: string;
  monthlySupport: string;
  image: string;
  supportBreakdown: SupportItem[];
}

export interface DonationAmount {
  amount: number;
  label: string;
}

/* =============== Top Navigation & Navigation =============== */
export interface ResidentialCareTopNavBarProps {
  onMenuClick?: () => void;
}

/* =============== Dashboard & Activity =============== */
export interface DashboardActivity {
  id: string;
  description: string;
  timestamp: string;
}
