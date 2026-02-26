import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface InternshipApplication {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  country?: string;
  education_level?: string;
  program?: string;
  availability_hours?: string;
  date_of_birth: string;
  nationality: string;
  is_in_rwanda: boolean;
  school_university: string;
  field_of_study: string;
  cv_url?: string;
  motivation_letter?: string;
  passport_id_url?: string;
  status: "SUBMITTED" | "UNDER_REVIEW" | "MORE_INFO_NEEDED" | "APPROVED" | "REJECTED";
  status_display: string;
  admin_notes?: string;
  applied_on: string;
  reviewed_on?: string;
  reviewed_by?: string;
}

export interface InternshipProgram {
  id: string;
  application: string;
  application_name: string;
  department: string;
  department_name: string;
  supervisor?: string;
  supervisor_name?: string;
  start_date: string;
  end_date: string;
  status: "ACTIVE" | "COMPLETED" | "TERMINATED";
  created_on: string;
  updated_on: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  created_on: string;
  updated_on: string;
}

export interface Supervisor {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  department: string;
  department_name: string;
  is_active: boolean;
  created_on: string;
  updated_on: string;
}

export const internshipApi = createApi({
  reducerPath: "internshipApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tricky-cyb-matabar-576778bf.koyeb.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["InternshipApplication", "InternshipProgram", "Department", "Supervisor"],
  endpoints: (builder) => ({
    // Applications
    getApplications: builder.query<{ count: number; next: string | null; previous: string | null; results: InternshipApplication[] }, { page?: number; page_size?: number; status?: string; search?: string }>({
      query: (params) => ({
        url: "/internship-applications/",
        params,
      }),
      providesTags: ["InternshipApplication"],
    }),
    getApplication: builder.query<InternshipApplication, string>({
      query: (id) => `/internship-applications/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "InternshipApplication", id }],
    }),
    createApplication: builder.mutation<InternshipApplication, FormData>({
      query: (data) => ({
        url: "/internship-applications/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["InternshipApplication"],
    }),
    updateApplication: builder.mutation<InternshipApplication, { id: string; data: Partial<InternshipApplication> }>({
      query: ({ id, data }) => ({
        url: `/internship-applications/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "InternshipApplication", id }, "InternshipApplication"],
    }),
    deleteApplication: builder.mutation<void, string>({
      query: (id) => ({
        url: `/internship-applications/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["InternshipApplication"],
    }),

    // Departments
    getDepartments: builder.query<Department[], void>({
      query: () => "/departments/",
      providesTags: ["Department"],
    }),

    // Supervisors
    getSupervisors: builder.query<Supervisor[], { department?: string }>({
      query: (params) => ({
        url: "/supervisors/",
        params,
      }),
      providesTags: ["Supervisor"],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
  useGetDepartmentsQuery,
  useGetSupervisorsQuery,
} = internshipApi;
