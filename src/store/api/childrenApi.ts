import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";
import type { Child, UpdateChildPayload } from "@/types";

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Child[];
}

export const childrenApi = createApi({
  reducerPath: "childrenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["Children", "Child"],
  endpoints: (builder) => ({
    getChildren: builder.query<Child[], void>({
      query: () => "/children/",
      transformResponse: (response: PaginatedResponse | Child[]) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["Children"],
    }),

    getChildById: builder.query<Child, string>({
      query: (id) => `/children/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "Child", id }],
    }),

    registerChild: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/children/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Children"],
    }),

    updateChild: builder.mutation<Child, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/children/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Children",
        { type: "Child", id },
      ],
    }),

    deleteChild: builder.mutation<void, string>({
      query: (id) => ({ url: `/children/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Children"],
    }),
  }),
});

export const {
  useGetChildrenQuery,
  useGetChildByIdQuery,
  useRegisterChildMutation,
  useUpdateChildMutation,
  useDeleteChildMutation,
} = childrenApi;

// Re-export types for backward compatibility
export type { Child, UpdateChildPayload } from "@/types";
