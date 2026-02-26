import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IfasheChild {
  id: string;
  childId?: string;
  name?: string;
  family?: string;
  school?: string;
  educationLevel?: string;
  status?: string;
  linkedFamily?: string;
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  schoolName?: string;
  supportStatus?: string;
  healthConditions?: string;
  [key: string]: any; // To accommodate actual backend structure if different
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IfasheChild[];
}

export const ifasheChildrenApi = createApi({
  reducerPath: "ifasheChildrenApi",
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
  tagTypes: ["IfasheChildren", "IfasheChild"],
  endpoints: (builder) => ({
    getIfasheChildren: builder.query<IfasheChild[], void>({
      query: () => "/ifashe-children/",
      transformResponse: (response: PaginatedResponse | IfasheChild[]) => {
        if (Array.isArray(response)) return response;
        return response.results || [];
      },
      providesTags: ["IfasheChildren"],
    }),

    getIfasheChildById: builder.query<IfasheChild, string>({
      query: (id) => `/ifashe-children/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "IfasheChild", id }],
    }),

    createIfasheChild: builder.mutation<IfasheChild, any>({
      query: (data) => ({
        url: "/ifashe-children/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["IfasheChildren"],
    }),

    updateIfasheChild: builder.mutation<IfasheChild, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/ifashe-children/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "IfasheChildren",
        { type: "IfasheChild", id },
      ],
    }),

    deleteIfasheChild: builder.mutation<void, string>({
      query: (id) => ({ url: `/ifashe-children/${id}/`, method: "DELETE" }),
      invalidatesTags: ["IfasheChildren"],
    }),
  }),
});

export const {
  useGetIfasheChildrenQuery,
  useGetIfasheChildByIdQuery,
  useCreateIfasheChildMutation,
  useUpdateIfasheChildMutation,
  useDeleteIfasheChildMutation,
} = ifasheChildrenApi;
