import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Caretaker {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  role: string;
  hire_date: string;
  is_active: boolean;
  created_on: string;
  updated_on: string;
}

export interface CreateCaretakerPayload {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  role: string;
  hire_date: string;
  is_active: boolean;
}

export interface BulkAssignPayload {
  caretaker_id: string;
  children_ids: string[];
}

// Updated to match what the API actually returns at runtime
export interface ChildCaretakerAssignmentRead {
  id: string;
  child: string; // child UUID
  child_name: string; // child display name
  caretaker: string; // caretaker UUID (may be missing in some API versions)
  caretaker_name: string; // caretaker display name — always present
  assigned_date: string;
  end_date: string | null;
  is_active: boolean;
  description: string;
}

interface BulkAssignResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ChildCaretakerAssignmentRead[];
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Caretaker[];
}

export const caretakersApi = createApi({
  reducerPath: "caretakersApi",
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
  tagTypes: ["Caretakers", "Caretaker", "Assignments"],
  endpoints: (builder) => ({
    getCaretakers: builder.query<Caretaker[], void>({
      query: () => "/caretakers/",
      transformResponse: (response: PaginatedResponse | Caretaker[]) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["Caretakers"],
    }),

    getCaretakerById: builder.query<Caretaker, string>({
      query: (id) => `/caretakers/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "Caretaker", id }],
    }),

    createCaretaker: builder.mutation<Caretaker, CreateCaretakerPayload>({
      query: (body) => ({
        url: "/caretakers/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Caretakers"],
    }),

    getAssignments: builder.query<ChildCaretakerAssignmentRead[], void>({
      query: () => "/children-caretaker/",
      transformResponse: (
        response:
          | {
              count: number;
              next: string | null;
              previous: string | null;
              results: ChildCaretakerAssignmentRead[];
            }
          | ChildCaretakerAssignmentRead[],
      ) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["Assignments"],
    }),

    bulkAssignChildren: builder.mutation<BulkAssignResponse, BulkAssignPayload>(
      {
        query: (body) => ({
          url: "/children-caretaker/bulk_assign/",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Assignments", "Caretakers"],
      },
    ),
  }),
});

export const {
  useGetCaretakersQuery,
  useGetCaretakerByIdQuery,
  useCreateCaretakerMutation,
  useGetAssignmentsQuery,
  useBulkAssignChildrenMutation,
} = caretakersApi;
