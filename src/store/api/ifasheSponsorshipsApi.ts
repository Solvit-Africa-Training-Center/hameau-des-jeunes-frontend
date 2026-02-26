import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IfasheSponsorship {
  id: string;
  [key: string]: any;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IfasheSponsorship[];
}

export const ifasheSponsorshipsApi = createApi({
  reducerPath: "ifasheSponsorshipsApi",
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
  tagTypes: ["IfasheSponsorships", "IfasheSponsorship"],
  endpoints: (builder) => ({
    getIfasheSponsorships: builder.query<IfasheSponsorship[], void>({
      query: () => "/ifashe-sponsorships/",
      transformResponse: (response: PaginatedResponse | IfasheSponsorship[]) => {
        if (Array.isArray(response)) return response;
        return response.results || [];
      },
      providesTags: ["IfasheSponsorships"],
    }),

    getIfasheSponsorshipById: builder.query<IfasheSponsorship, string>({
      query: (id) => `/ifashe-sponsorships/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "IfasheSponsorship", id }],
    }),

    createIfasheSponsorship: builder.mutation<IfasheSponsorship, any>({
      query: (data) => ({
        url: "/ifashe-sponsorships/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["IfasheSponsorships"],
    }),

    updateIfasheSponsorship: builder.mutation<IfasheSponsorship, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/ifashe-sponsorships/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "IfasheSponsorships",
        { type: "IfasheSponsorship", id },
      ],
    }),

    deleteIfasheSponsorship: builder.mutation<void, string>({
      query: (id) => ({ url: `/ifashe-sponsorships/${id}/`, method: "DELETE" }),
      invalidatesTags: ["IfasheSponsorships"],
    }),
  }),
});

export const {
  useGetIfasheSponsorshipsQuery,
  useGetIfasheSponsorshipByIdQuery,
  useCreateIfasheSponsorshipMutation,
  useUpdateIfasheSponsorshipMutation,
  useDeleteIfasheSponsorshipMutation,
} = ifasheSponsorshipsApi;
