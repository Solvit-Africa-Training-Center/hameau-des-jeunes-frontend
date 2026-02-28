import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";
import type {
  ChildDetails,
  HealthRecord,
  CreateHealthRecordPayload,
} from "@/types";

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: HealthRecord[];
}

export const healthRecordsApi = createApi({
  reducerPath: "healthRecordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["HealthRecords"],
  endpoints: (builder) => ({
    getHealthRecords: builder.query<HealthRecord[], void>({
      query: () => "/health-records/",
      transformResponse: (response: PaginatedResponse | HealthRecord[]) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["HealthRecords"],
    }),

    getHealthRecordsByChild: builder.query<HealthRecord[], string>({
      query: (childId) => `/health-records/?child=${childId}`,
      transformResponse: (response: PaginatedResponse | HealthRecord[]) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["HealthRecords"],
    }),

    createHealthRecord: builder.mutation<
      HealthRecord,
      CreateHealthRecordPayload
    >({
      query: (body) => ({
        url: "/health-records/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["HealthRecords"],
    }),

    deleteHealthRecord: builder.mutation<void, string>({
      query: (id) => ({
        url: `/health-records/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["HealthRecords"],
    }),
  }),
});

export const {
  useGetHealthRecordsQuery,
  useGetHealthRecordsByChildQuery,
  useCreateHealthRecordMutation,
  useDeleteHealthRecordMutation,
} = healthRecordsApi;

// Re-export types for backward compatibility
export type {
  ChildDetails,
  HealthRecord,
  CreateHealthRecordPayload,
} from "@/types";
