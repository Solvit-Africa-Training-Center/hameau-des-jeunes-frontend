import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: HealthRecord[];
}

export const healthRecordsApi = createApi({
  reducerPath: "healthRecordsApi",
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
