import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

export interface WhoWeAre {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface PaginatedWhoWeAreResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: WhoWeAre[];
}

export interface CreateWhoWeArePayload {
  title: string;
  description: string;
}

export interface UpdateWhoWeArePayload {
  id: string;
  title: string;
  description: string;
}

export const whoWeAreApi = createApi({
  reducerPath: "whoWeAreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["WhoWeAre"],
  endpoints: (builder) => ({
    getWhoWeAre: builder.query<WhoWeAre[], void>({
      query: () => "/we-are/",
      transformResponse: (response: PaginatedWhoWeAreResponse | WhoWeAre[]) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["WhoWeAre"],
    }),

    createWhoWeAre: builder.mutation<WhoWeAre, CreateWhoWeArePayload>({
      query: (body) => ({ url: "/we-are/", method: "POST", body }),
      invalidatesTags: ["WhoWeAre"],
    }),

    updateWhoWeAre: builder.mutation<WhoWeAre, UpdateWhoWeArePayload>({
      query: ({ id, ...body }) => ({
        url: `/we-are/${id}/`,
        method: "PATH",
        body,
      }),
      invalidatesTags: ["WhoWeAre"],
    }),

    deleteWhoWeAre: builder.mutation<void, string>({
      query: (id) => ({ url: `/we-are/${id}/`, method: "DELETE" }),
      invalidatesTags: ["WhoWeAre"],
    }),
  }),
});

export const {
  useGetWhoWeAreQuery,
  useCreateWhoWeAreMutation,
  useUpdateWhoWeAreMutation,
  useDeleteWhoWeAreMutation,
} = whoWeAreApi;
