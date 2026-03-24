import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

// ── Types ──────────────────────────────────────────────────────────────────

export interface OutcomeDescription {
  id: string;
  description: string;
}

export interface Outcome {
  id: string;
  title: string;
  descriptions?: OutcomeDescription[];
}

interface PaginatedOutcomeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Outcome[];
}

export interface CreateOutcomePayload {
  title: string;
}

export interface CreateOutcomeDescriptionPayload {
  description: string;
  outcome: string; // FK — required by the backend (outcome_id column)
}

// ── API slice ──────────────────────────────────────────────────────────────

export const outcomesApi = createApi({
  reducerPath: "outcomesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["Outcomes", "OutcomeDescriptions"],
  endpoints: (builder) => ({
    // GET all outcomes
    getOutcomes: builder.query<Outcome[], void>({
      query: () => "/out-comes/",
      transformResponse: (response: PaginatedOutcomeResponse | Outcome[]) => {
        if (Array.isArray(response)) return response;
        if ("results" in response) return response.results;
        return [response as Outcome];
      },
      providesTags: ["Outcomes"],
    }),

    // POST /api/out-comes/
    createOutcome: builder.mutation<Outcome, CreateOutcomePayload>({
      query: (body) => ({
        url: "/out-comes/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Outcomes"],
    }),

    // DELETE /api/out-comes/{id}/
    deleteOutcome: builder.mutation<void, string>({
      query: (id) => ({
        url: `/out-comes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Outcomes"],
    }),

    // GET all outcome descriptions
    getOutcomeDescriptions: builder.query<OutcomeDescription[], void>({
      query: () => "/out-comes-descriptions/",
      transformResponse: (
        response:
          | { count: number; results: OutcomeDescription[] }
          | OutcomeDescription[],
      ) => {
        if (Array.isArray(response)) return response;
        if ("results" in response) return response.results;
        return [response as OutcomeDescription];
      },
      providesTags: ["OutcomeDescriptions"],
    }),

    // POST /api/out-comes-descriptions/
    createOutcomeDescription: builder.mutation<
      OutcomeDescription,
      CreateOutcomeDescriptionPayload
    >({
      query: (body) => ({
        url: "/out-comes-descriptions/",
        method: "POST",
        body, // sends { description, outcome } — outcome is the FK id
      }),
      invalidatesTags: ["OutcomeDescriptions", "Outcomes"],
    }),

    // DELETE /api/out-comes-descriptions/{id}/
    deleteOutcomeDescription: builder.mutation<void, string>({
      query: (id) => ({
        url: `/out-comes-descriptions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["OutcomeDescriptions"],
    }),
  }),
});

export const {
  useGetOutcomesQuery,
  useCreateOutcomeMutation,
  useDeleteOutcomeMutation,
  useGetOutcomeDescriptionsQuery,
  useCreateOutcomeDescriptionMutation,
  useDeleteOutcomeDescriptionMutation,
} = outcomesApi;
