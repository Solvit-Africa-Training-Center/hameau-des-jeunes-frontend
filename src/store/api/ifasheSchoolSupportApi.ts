import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IfasheSchoolSupport {
  id: string;
  [key: string]: any;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IfasheSchoolSupport[];
}

export const ifasheSchoolSupportApi = createApi({
  reducerPath: "ifasheSchoolSupportApi",
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
  tagTypes: ["IfasheSchoolSupport", "IfasheSchoolSupportItem"],
  endpoints: (builder) => ({
    getIfasheSchoolSupports: builder.query<IfasheSchoolSupport[], void>({
      query: () => "/ifashe-school-support/",
      transformResponse: (response: PaginatedResponse | IfasheSchoolSupport[]) => {
        if (Array.isArray(response)) return response;
        return response.results || [];
      },
      providesTags: ["IfasheSchoolSupport"],
    }),

    getIfasheSchoolSupportById: builder.query<IfasheSchoolSupport, string>({
      query: (id) => `/ifashe-school-support/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "IfasheSchoolSupportItem", id }],
    }),

    createIfasheSchoolSupport: builder.mutation<IfasheSchoolSupport, any>({
      query: (data) => ({
        url: "/ifashe-school-support/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["IfasheSchoolSupport"],
    }),

    updateIfasheSchoolSupport: builder.mutation<IfasheSchoolSupport, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/ifashe-school-support/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "IfasheSchoolSupport",
        { type: "IfasheSchoolSupportItem", id },
      ],
    }),

    deleteIfasheSchoolSupport: builder.mutation<void, string>({
      query: (id) => ({ url: `/ifashe-school-support/${id}/`, method: "DELETE" }),
      invalidatesTags: ["IfasheSchoolSupport"],
    }),

    addPaymentSchoolSupport: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/ifashe-school-support/${id}/add_payment/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "IfasheSchoolSupport",
        { type: "IfasheSchoolSupportItem", id },
      ],
    }),
  }),
});

export const {
  useGetIfasheSchoolSupportsQuery,
  useGetIfasheSchoolSupportByIdQuery,
  useCreateIfasheSchoolSupportMutation,
  useUpdateIfasheSchoolSupportMutation,
  useDeleteIfasheSchoolSupportMutation,
  useAddPaymentSchoolSupportMutation,
} = ifasheSchoolSupportApi;
