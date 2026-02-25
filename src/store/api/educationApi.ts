import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Program {
  id: string; // UUID
  program_name: string;
}

export interface EducationalInstitution {
  id: string; // UUID
  name: string;
  address: string;
  phone: string;
  email: string;
  programs: Program[];
}

export interface CreateInstitutionPayload {
  name: string;
  address: string;
  phone: string;
  email: string;
  programs: Pick<Program, "program_name">[];
}

export const educationApi = createApi({
  reducerPath: "educationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tricky-cyb-matabar-576778bf.koyeb.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
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
