import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";
import type {
  Program,
  EducationalInstitution,
  CreateInstitutionPayload,
} from "@/types";

export const educationApi = createApi({
  reducerPath: "educationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["Institution"],
  endpoints: (builder) => ({
    getInstitutions: builder.query<EducationalInstitution[], void>({
      query: () => "/children_educational_institutions/",
      transformResponse: (
        response:
          | { results: EducationalInstitution[] }
          | EducationalInstitution[],
      ) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["Institution"],
    }),

    createInstitution: builder.mutation<
      EducationalInstitution,
      CreateInstitutionPayload
    >({
      query: (body) => ({
        url: "/children_educational_institutions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Institution"],
    }),
  }),
});

export const { useGetInstitutionsQuery, useCreateInstitutionMutation } =
  educationApi;

// Re-export types for backward compatibility
export type {
  Program,
  EducationalInstitution,
  CreateInstitutionPayload,
} from "@/types";
