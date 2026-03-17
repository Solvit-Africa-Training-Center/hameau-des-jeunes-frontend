import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

export interface WhatWeDo {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedWhatWeDoResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: WhatWeDo[];
}

export interface CreateWhatWeDoPayload {
  title: string;
  description: string;
}

export interface UpdateWhatWeDoPayload {
  id: string;
  title: string;
  description: string;
}

export const whatWeDoApi = createApi({
  reducerPath: "whatWeDoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["WhatWeDo"],
  endpoints: (builder) => ({
    getWhatWeDo: builder.query<WhatWeDo[], void>({
      query: () => "/what-we-do/",
      transformResponse: (response: PaginatedWhatWeDoResponse | WhatWeDo[]) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["WhatWeDo"],
    }),

    createWhatWeDo: builder.mutation<WhatWeDo, CreateWhatWeDoPayload>({
      query: (payload) => {
        const formData = new FormData();
        formData.append("title", payload.title);
        formData.append("description", payload.description);

        return {
          url: "/what-we-do/",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["WhatWeDo"],
    }),

    updateWhatWeDo: builder.mutation<WhatWeDo, UpdateWhatWeDoPayload>({
      query: (payload) => {
        const formData = new FormData();
        formData.append("title", payload.title);
        formData.append("description", payload.description);

        return {
          url: `/what-we-do/${payload.id}/`,
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["WhatWeDo"],
    }),

    deleteWhatWeDo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/what-we-do/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["WhatWeDo"],
    }),
  }),
});

export const {
  useGetWhatWeDoQuery,
  useCreateWhatWeDoMutation,
  useUpdateWhatWeDoMutation,
  useDeleteWhatWeDoMutation,
} = whatWeDoApi;
