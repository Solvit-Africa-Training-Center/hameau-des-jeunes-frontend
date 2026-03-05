/**
 * API and Domain Model Types
 *
 * Contains all types related to API responses and domain models
 * from the backend integration layer.
 */

/* =============== Authentication =============== */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmation {
  email: string;
  code: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  password_confirm: string;
}

/* =============== Children Management =============== */
export interface Child {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  gender: "MALE" | "FEMALE";
  date_of_birth: string;
  age: number;
  profile_image: string;
  start_date: string;
  end_date: string;
  status: "ACTIVE" | "INACTIVE";
  special_needs: string;
  vigilant_contact_name: string;
  vigilant_contact_phone: string;
  story: string;
  created_on: string;
  updated_on: string;
}

export interface UpdateChildPayload {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: "MALE" | "FEMALE";
  profile_image?: string;
  start_date: string;
  special_needs?: string;
  vigilant_contact_name?: string;
  vigilant_contact_phone?: string;
  story?: string | null;
}

/* =============== Caretakers Management =============== */
export interface Caretaker {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  role: string;
  hire_date: string;
  is_active: boolean;
  created_on: string;
  updated_on: string;
}

export interface CreateCaretakerPayload {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  role: string;
  hire_date: string;
  is_active: boolean;
}

export interface BulkAssignPayload {
  caretaker_id: string;
  children_ids: string[];
}

export interface ChildCaretakerAssignmentRead {
  id: string;
  child: string;
  child_name: string;
  caretaker: string;
  caretaker_name: string;
  assigned_date: string;
  end_date: string | null;
  is_active: boolean;
  description: string;
}

/* =============== Health Records =============== */
export interface ChildDetails {
  id: string;
  full_name: string;
  age: number;
  gender: string;
  profile_image: string | null;
}

export interface HealthRecord {
  id: string;
  child: string;
  child_name: string;
  child_details: ChildDetails;
  record_type: "MEDICAL_VISIT" | "VACCINATION" | "ILLNESS";
  visit_date: string;
  hospital_name: string | null;
  diagnosis: string | null;
  treatment: string | null;
  description: string | null;
  cost: string | null;
  cost_formatted: string;
  created_on: string;
  updated_on: string;
}

export interface CreateHealthRecordPayload {
  child: string;
  record_type: "MEDICAL_VISIT" | "VACCINATION" | "ILLNESS";
  visit_date: string;
  hospital_name?: string;
  diagnosis?: string;
  treatment?: string;
  description?: string;
  cost?: string;
}

/* =============== Education & Institutions =============== */
export interface Program {
  id: string;
  program_name: string;
}

export interface EducationalInstitution {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  programs: Program[];
}

export interface CreateInstitutionPayload {
  name: string;
  address: string;
  phone: string;
  email: string;
  programs: Pick<Program, "program_name">[];
}

/* =============== Enrollment =============== */
export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "DISCONTINUED";

export interface EnrollmentChild {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  gender: string;
  age: number;
  profile_image: string;
  status: string;
}

export interface EnrollmentInstitution {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  programs: { id: string; program_name: string }[];
}

export interface EnrollmentProgram {
  id: string;
  program_name: string;
  institution: EnrollmentInstitution;
}

export interface Enrollment {
  id: string;
  child: EnrollmentChild;
  institution: string;
  program: EnrollmentProgram;
  level: string;
  start_date: string;
  end_date: string;
  cost: string;
  cost_formatted?: string;
  status: EnrollmentStatus;
  created_on: string;
  updated_on: string;
}

export interface EnrollmentFilters {
  child_id?: string;
  program_id?: string;
  status?: EnrollmentStatus;
}

export interface CreateEnrollmentPayload {
  child: string;
  institution: string;
  program: string;
  level: string;
  start_date: string;
  end_date: string;
  cost: string;
  status: EnrollmentStatus;
}

export type UpdateEnrollmentPayload = Partial<CreateEnrollmentPayload> & {
  id: string;
};

/* =============== Pagination =============== */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
