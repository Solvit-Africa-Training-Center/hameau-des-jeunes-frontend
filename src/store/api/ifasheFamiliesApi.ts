import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IfasheFamily {
  id: string;
  familyId?: string;
  parentName?: string;
  phoneNumber?: string;
  children?: number;
  vulnerability?: string;
  fullName?: string;
  gender?: string;
  dob?: string;
  nationalId?: string;
  educationLevel?: string;
  maritalStatus?: string;
  address?: string;
  previousEmployment?: string;
  monthlyIncome?: string;
  housingCondition?: string;
  vulnerabilityLevel?: string;
  assessmentNotes?: string;
  [key: string]: any; // To accommodate actual backend structure if different
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IfasheFamily[];
}

export const ifasheFamiliesApi = createApi({
  reducerPath: "ifasheFamiliesApi",
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
  tagTypes: ["IfasheFamilies", "IfasheFamily"],
  endpoints: (builder) => ({
    getIfasheFamilies: builder.query<IfasheFamily[], void>({
      query: () => "/ifashe-families/",
      transformResponse: (response: PaginatedResponse | IfasheFamily[]) => {
        if (Array.isArray(response)) return response;
        return response.results || [];
      },
      providesTags: ["IfasheFamilies"],
    }),

    getIfasheFamilyById: builder.query<IfasheFamily, string>({
      query: (id) => `/ifashe-families/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "IfasheFamily", id }],
    }),

    createIfasheFamily: builder.mutation<IfasheFamily, any>({
      query: (data) => ({
        url: "/ifashe-families/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["IfasheFamilies"],
    }),

    updateIfasheFamily: builder.mutation<IfasheFamily, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/ifashe-families/${id}/`,
        method: "PATCH", // using PATCH for partial updates typically
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "IfasheFamilies",
        { type: "IfasheFamily", id },
      ],
    }),

    deleteIfasheFamily: builder.mutation<void, string>({
      query: (id) => ({ url: `/ifashe-families/${id}/`, method: "DELETE" }),
      invalidatesTags: ["IfasheFamilies"],
    }),
  }),
});

export const {
  useGetIfasheFamiliesQuery,
  useGetIfasheFamilyByIdQuery,
  useCreateIfasheFamilyMutation,
  useUpdateIfasheFamilyMutation,
  useDeleteIfasheFamilyMutation,
} = ifasheFamiliesApi;
