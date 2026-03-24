import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

export interface SuccessStory {
  id: string;
  title: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedSuccessStoriesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SuccessStory[];
}

export interface CreateSuccessStoryPayload {
  title: string;
  image: File;
  description: string;
}

export interface UpdateSuccessStoryPayload {
  id: string;
  title: string;
  description: string;
  image?: File;
}

export const successStoryApi = createApi({
  reducerPath: "successStoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["SuccessStories"],
  endpoints: (builder) => ({
    getSuccessStories: builder.query<SuccessStory[], void>({
      query: () => "/success-stories/?limit=4",
      transformResponse: (
        response: PaginatedSuccessStoriesResponse | SuccessStory[],
      ) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["SuccessStories"],
    }),

    getAllSuccessStories: builder.query<SuccessStory[], void>({
      query: () => "/success-stories/",
      transformResponse: (
        response: PaginatedSuccessStoriesResponse | SuccessStory[],
      ) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["SuccessStories"],
    }),

    createSuccessStory: builder.mutation<SuccessStory, CreateSuccessStoryPayload>({
      query: (payload) => {
        const formData = new FormData();

        formData.append("title", payload.title);
        formData.append("description", payload.description);
        formData.append("image", payload.image);

        return {
          url: "/success-stories/",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["SuccessStories"],
    }),

    updateSuccessStory: builder.mutation<SuccessStory, UpdateSuccessStoryPayload>({
      query: (payload) => {
        const formData = new FormData();
        formData.append("title", payload.title);
        formData.append("description", payload.description);
        if (payload.image) formData.append("image", payload.image);
        return {
          url: `/success-stories/${payload.id}/`,
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["SuccessStories"],
    }),

    deleteSuccessStory: builder.mutation<void, string>({
      query: (id) => ({ url: `/success-stories/${id}/`, method: "DELETE" }),
      invalidatesTags: ["SuccessStories"],
    }),
  }),
});

export const {
  useGetAllSuccessStoriesQuery,
  useCreateSuccessStoryMutation,
  useGetSuccessStoriesQuery,
  useDeleteSuccessStoryMutation,
  useUpdateSuccessStoryMutation,
} = successStoryApi;
