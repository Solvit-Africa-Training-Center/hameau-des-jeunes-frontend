import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

// Types

export interface CompanyImpact {
  id: string;
  children_supported: string;
  years_of_service: string;
  families_strengthened: string;
  communities_impacted: string;
  schools_supported: string;
  youth_trained: string;
  success_rate: string;
  created_at?: string;
  updated_at?: string;
}

interface PaginatedCompanyImpactResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CompanyImpact[];
}

export interface CreateCompanyImpactPayload {
  children_supported: string;
  years_of_service: string;
  families_strengthened: string;
  communities_impacted: string;
  schools_supported: string;
  youth_trained: string;
  success_rate: string;
}

export interface UpdateCompanyImpactPayload extends CreateCompanyImpactPayload {
  id: string;
}

// API slice

export const companyImpactApi = createApi({
  reducerPath: "companyImpactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["CompanyImpact"],
  endpoints: (builder) => ({
    getCompanyImpact: builder.query<CompanyImpact[], void>({
      query: () => "/company-impact/",
      transformResponse: (
        response: PaginatedCompanyImpactResponse | CompanyImpact[],
      ) => {
        if (Array.isArray(response)) return response;
        if ("results" in response) return response.results;
        return [response];
      },
      providesTags: ["CompanyImpact"],
    }),

    createCompanyImpact: builder.mutation<
      CompanyImpact,
      CreateCompanyImpactPayload
    >({
      query: (body) => ({
        url: "/company-impact/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CompanyImpact"],
    }),

    updateCompanyImpact: builder.mutation<
      CompanyImpact,
      UpdateCompanyImpactPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/company-impact/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["CompanyImpact"],
    }),

    deleteCompanyImpact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/company-impact/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["CompanyImpact"],
    }),
  }),
});

export const {
  useGetCompanyImpactQuery,
  useCreateCompanyImpactMutation,
  useUpdateCompanyImpactMutation,
  useDeleteCompanyImpactMutation,
} = companyImpactApi;
