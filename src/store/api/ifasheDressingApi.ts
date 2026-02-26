import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IfasheDressing {
  id: string;
  [key: string]: any;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IfasheDressing[];
}

export const ifasheDressingApi = createApi({
  reducerPath: "ifasheDressingApi",
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
  tagTypes: ["IfasheDressing", "IfasheDressingItem"],
  endpoints: (builder) => ({
    getIfasheDressings: builder.query<IfasheDressing[], void>({
      query: () => "/ifashe-dressing-distributions/",
      transformResponse: (response: PaginatedResponse | IfasheDressing[]) => {
        if (Array.isArray(response)) return response;
        return response.results || [];
      },
      providesTags: ["IfasheDressing"],
    }),

    getIfasheDressingById: builder.query<IfasheDressing, string>({
      query: (id) => `/ifashe-dressing-distributions/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "IfasheDressingItem", id }],
    }),

    createIfasheDressing: builder.mutation<IfasheDressing, any>({
      query: (data) => ({
        url: "/ifashe-dressing-distributions/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["IfasheDressing"],
    }),

    updateIfasheDressing: builder.mutation<IfasheDressing, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/ifashe-dressing-distributions/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "IfasheDressing",
        { type: "IfasheDressingItem", id },
      ],
    }),

    deleteIfasheDressing: builder.mutation<void, string>({
      query: (id) => ({ url: `/ifashe-dressing-distributions/${id}/`, method: "DELETE" }),
      invalidatesTags: ["IfasheDressing"],
    }),
  }),
});

export const {
  useGetIfasheDressingsQuery,
  useGetIfasheDressingByIdQuery,
  useCreateIfasheDressingMutation,
  useUpdateIfasheDressingMutation,
  useDeleteIfasheDressingMutation,
} = ifasheDressingApi;
