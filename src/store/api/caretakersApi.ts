import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";
import type {
  Caretaker,
  CreateCaretakerPayload,
  BulkAssignPayload,
  ChildCaretakerAssignmentRead,
} from "@/types";

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
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
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

// Re-export types for backward compatibility
export type {
  Caretaker,
  CreateCaretakerPayload,
  BulkAssignPayload,
  ChildCaretakerAssignmentRead,
} from "@/types";
