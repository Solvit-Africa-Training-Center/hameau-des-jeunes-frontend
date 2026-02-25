import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IfasheParent {
  id: string;
  [key: string]: any;
}

export interface IfasheParentAttendance {
  id: string;
  [key: string]: any;
}

export interface IfasheParentContract {
  id: string;
  [key: string]: any;
}

export interface IfasheParentPerformance {
  id: string;
  [key: string]: any;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const ifasheParentsApi = createApi({
  reducerPath: "ifasheParentsApi",
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
  tagTypes: ["IfasheParents", "IfasheParent", "ParentAttendance", "ParentContract", "ParentPerformance"],
  endpoints: (builder) => ({
    // Parents
    getIfasheParents: builder.query<IfasheParent[], void>({
      query: () => "/ifashe-parents/",
      transformResponse: (response: PaginatedResponse<IfasheParent> | IfasheParent[]) => {
        if (Array.isArray(response)) return response;
        return response.results || [];
      },
      providesTags: ["IfasheParents"],
    }),
    getIfasheParentById: builder.query<IfasheParent, string>({
      query: (id) => `/ifashe-parents/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "IfasheParent", id }],
    }),
    createIfasheParent: builder.mutation<IfasheParent, any>({
      query: (data) => ({ url: "/ifashe-parents/", method: "POST", body: data }),
      invalidatesTags: ["IfasheParents"],
    }),
    updateIfasheParent: builder.mutation<IfasheParent, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/ifashe-parents/${id}/`, method: "PATCH", body: data }),
      invalidatesTags: (_result, _error, { id }) => ["IfasheParents", { type: "IfasheParent", id }],
    }),
    deleteIfasheParent: builder.mutation<void, string>({
      query: (id) => ({ url: `/ifashe-parents/${id}/`, method: "DELETE" }),
      invalidatesTags: ["IfasheParents"],
    }),

    // Attendance
    getIfasheParentAttendances: builder.query<IfasheParentAttendance[], void>({
      query: () => "/ifashe-parent-attendance/",
      providesTags: ["ParentAttendance"],
      transformResponse: (response: PaginatedResponse<IfasheParentAttendance> | IfasheParentAttendance[]) => {
        if (Array.isArray(response)) return response;
        return response.results || [];
      },
    }),
    createIfasheParentAttendance: builder.mutation<IfasheParentAttendance, any>({
      query: (data) => ({ url: "/ifashe-parent-attendance/", method: "POST", body: data }),
      invalidatesTags: ["ParentAttendance"],
    }),

    // Contracts
    getIfasheParentContracts: builder.query<IfasheParentContract[], void>({
      query: () => "/ifashe-parent-contracts/",
      providesTags: ["ParentContract"],
      transformResponse: (response: PaginatedResponse<IfasheParentContract> | IfasheParentContract[]) => {
        if (Array.isArray(response)) return response;
        return response.results || [];
      },
    }),
    createIfasheParentContract: builder.mutation<IfasheParentContract, any>({
      query: (data) => ({ url: "/ifashe-parent-contracts/", method: "POST", body: data }),
      invalidatesTags: ["ParentContract"],
    }),
    updateIfasheParentContract: builder.mutation<IfasheParentContract, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/ifashe-parent-contracts/${id}/`, method: "PATCH", body: data }),
      invalidatesTags: ["ParentContract"],
    }),
    deleteIfasheParentContract: builder.mutation<void, string>({
      query: (id) => ({ url: `/ifashe-parent-contracts/${id}/`, method: "DELETE" }),
      invalidatesTags: ["ParentContract"],
    }),

    // Performance
    getIfasheParentPerformances: builder.query<IfasheParentPerformance[], void>({
      query: () => "/ifashe-parent-performance/",
      providesTags: ["ParentPerformance"],
      transformResponse: (response: PaginatedResponse<IfasheParentPerformance> | IfasheParentPerformance[]) => {
        if (Array.isArray(response)) return response;
        return response.results || [];
      },
    }),
    createIfasheParentPerformance: builder.mutation<IfasheParentPerformance, any>({
      query: (data) => ({ url: "/ifashe-parent-performance/", method: "POST", body: data }),
      invalidatesTags: ["ParentPerformance"],
    }),
  }),
});

export const {
  useGetIfasheParentsQuery,
  useGetIfasheParentByIdQuery,
  useCreateIfasheParentMutation,
  useUpdateIfasheParentMutation,
  useDeleteIfasheParentMutation,
  useGetIfasheParentAttendancesQuery,
  useCreateIfasheParentAttendanceMutation,
  useGetIfasheParentContractsQuery,
  useCreateIfasheParentContractMutation,
  useUpdateIfasheParentContractMutation,
  useDeleteIfasheParentContractMutation,
  useGetIfasheParentPerformancesQuery,
  useCreateIfasheParentPerformanceMutation,
} = ifasheParentsApi;
