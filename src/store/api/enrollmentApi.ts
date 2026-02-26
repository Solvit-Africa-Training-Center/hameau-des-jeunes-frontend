import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "DISCONTINUED";

// ─── Nested shapes exactly as the API returns them ────────────────────────────

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
  id: string; // UUID
  child: EnrollmentChild; // nested object
  institution: string; // UUID string (flat)
  program: EnrollmentProgram; // nested object
  level: string;
  start_date: string;
  end_date: string;
  cost: string;
  cost_formatted?: string;
  status: EnrollmentStatus;
  created_on: string;
  updated_on: string;
}

export interface PaginatedEnrollments {
  count: number;
  next: string | null;
  previous: string | null;
  results: Enrollment[];
}

export interface EnrollmentFilters {
  child?: string;
  child_name?: string;
  status?: EnrollmentStatus;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface CreateEnrollmentPayload {
  child: string; // UUID — Child.id
  institution: string; // UUID
  program: string; // UUID
  level: string;
  start_date: string;
  end_date: string;
  cost: string | number;
  status?: EnrollmentStatus;
}

export type UpdateEnrollmentPayload = Partial<CreateEnrollmentPayload> & {
  id: string; // UUID
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toQueryString(filters: EnrollmentFilters): string {
  const params = new URLSearchParams();
  (Object.keys(filters) as Array<keyof EnrollmentFilters>).forEach((key) => {
    const value = filters[key];
    if (value === undefined || value === null || value === "") return;
    params.set(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function normaliseToPaginated(raw: unknown): PaginatedEnrollments {
  if (Array.isArray(raw)) {
    return { count: raw.length, next: null, previous: null, results: raw };
  }
  const obj = raw as Record<string, unknown>;
  if (obj && Array.isArray(obj["results"])) {
    return {
      count: (obj["count"] as number) ?? 0,
      next: (obj["next"] as string | null) ?? null,
      previous: (obj["previous"] as string | null) ?? null,
      results: obj["results"] as Enrollment[],
    };
  }
  return { count: 0, next: null, previous: null, results: [] };
}

// ─── API Slice ────────────────────────────────────────────────────────────────

export const enrollmentApi = createApi({
  reducerPath: "enrollmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tricky-cyb-matabar-576778bf.koyeb.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Enrollment"],
  endpoints: (builder) => ({
    getEnrollments: builder.query<
      PaginatedEnrollments,
      EnrollmentFilters | void
    >({
      query: (filters = {}) =>
        `/children_programs_enrollments/${toQueryString(filters as EnrollmentFilters)}`,
      transformResponse: (raw: unknown) => normaliseToPaginated(raw),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "Enrollment" as const,
                id,
              })),
              { type: "Enrollment", id: "LIST" },
            ]
          : [{ type: "Enrollment", id: "LIST" }],
    }),

    getEnrollmentById: builder.query<Enrollment, string>({
      query: (id) => `/children_programs_enrollments/${id}/`,
      providesTags: (_r, _e, id) => [{ type: "Enrollment", id }],
    }),

    createEnrollment: builder.mutation<Enrollment, CreateEnrollmentPayload>({
      query: (body) => ({
        url: "/children_programs_enrollments/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Enrollment", id: "LIST" }],
    }),

    updateEnrollment: builder.mutation<Enrollment, UpdateEnrollmentPayload>({
      query: ({ id, ...body }) => ({
        url: `/children_programs_enrollments/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: "Enrollment", id },
        { type: "Enrollment", id: "LIST" },
      ],
    }),

    deleteEnrollment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/children_programs_enrollments/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: "Enrollment", id },
        { type: "Enrollment", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetEnrollmentsQuery,
  useGetEnrollmentByIdQuery,
  useCreateEnrollmentMutation,
  useUpdateEnrollmentMutation,
  useDeleteEnrollmentMutation,
} = enrollmentApi;
