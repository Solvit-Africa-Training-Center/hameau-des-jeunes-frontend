import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ifasheReportsApi = createApi({
  reducerPath: "ifasheReportsApi",
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
  tagTypes: ["IfasheReports"],
  endpoints: (builder) => ({
    getIfasheFamiliesReport: builder.query<Blob, { format: "pdf" | "excel" }>({
      query: ({ format }) => ({
        url: `/ifashe/reports/families/${format}/`,
        responseHandler: (response) => response.blob(),
      }),
    }),
    getIfasheParentWorkReport: builder.query<Blob, { format: "pdf" | "excel" }>({
      query: ({ format }) => ({
        url: `/ifashe/reports/parent-work/${format}/`,
        responseHandler: (response) => response.blob(),
      }),
    }),
    getIfasheSummaryReport: builder.query<Blob, { format: "pdf" | "excel" }>({
      query: ({ format }) => ({
        url: `/ifashe/reports/summary/${format}/`,
        responseHandler: (response) => response.blob(),
      }),
    }),
    getIfasheSupportReport: builder.query<Blob, { format: "pdf" | "excel" }>({
      query: ({ format }) => ({
        url: `/ifashe/reports/support/${format}/`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useLazyGetIfasheFamiliesReportQuery,
  useLazyGetIfasheParentWorkReportQuery,
  useLazyGetIfasheSummaryReportQuery,
  useLazyGetIfasheSupportReportQuery,
} = ifasheReportsApi;
