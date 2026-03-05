import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";
import type {
  // EnrollmentStatus,
  // EnrollmentChild,
  // EnrollmentInstitution,
  // EnrollmentProgram,
  Enrollment,
  EnrollmentFilters,
  CreateEnrollmentPayload,
  UpdateEnrollmentPayload,
} from "@/types";

interface PaginatedEnrollments {
  count: number;
  next: string | null;
  previous: string | null;
  results: Enrollment[];
}
//   end_date: string;
//   cost: string | number;
//   status?: EnrollmentStatus;
// }

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
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
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

// Re-export types for backward compatibility
export type {
  EnrollmentStatus,
  EnrollmentChild,
  EnrollmentInstitution,
  EnrollmentProgram,
  Enrollment,
  EnrollmentFilters,
  CreateEnrollmentPayload,
  UpdateEnrollmentPayload,
} from "@/types";
