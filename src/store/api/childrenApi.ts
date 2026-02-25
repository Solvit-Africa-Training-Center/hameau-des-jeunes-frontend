import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Child {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  gender: "MALE" | "FEMALE";
  date_of_birth: string;
  age: number;
  profile_image: string;
  start_date: string;
  end_date: string;
  status: "ACTIVE" | "INACTIVE";
  special_needs: string;
  vigilant_contact_name: string;
  vigilant_contact_phone: string;
  story: string;
  created_on: string;
  updated_on: string;
}

export interface UpdateChildPayload {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: "MALE" | "FEMALE";
  profile_image?: string;
  start_date: string;
  special_needs?: string;
  vigilant_contact_name?: string;
  vigilant_contact_phone?: string;
  story?: string | null;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Child[];
}

export const childrenApi = createApi({
  reducerPath: "childrenApi",
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
