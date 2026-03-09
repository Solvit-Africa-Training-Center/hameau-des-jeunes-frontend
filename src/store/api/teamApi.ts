import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

// ── Types ──────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  full_name: string;
  position: string;
  image: string;
  linkedin_url: string;
  created_at?: string;
  updated_at?: string;
}

interface PaginatedTeamResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TeamMember[];
}

export interface CreateTeamMemberPayload {
  full_name: string;
  position: string;
  image: File;
  linkedin_url: string;
}

export interface UpdateTeamMemberPayload {
  id: string;
  full_name: string;
  position: string;
  image?: File | string;
  linkedin_url: string;
}

// ── API slice ──────────────────────────────────────────────────────────────

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    getTeam: builder.query<TeamMember[], void>({
      query: () => "/team/",
      transformResponse: (response: PaginatedTeamResponse | TeamMember[]) => {
        if (Array.isArray(response)) return response;
        if ("results" in response) return response.results;
        return [response];
      },
      providesTags: ["Team"],
    }),

    createTeamMember: builder.mutation<TeamMember, CreateTeamMemberPayload>({
      query: ({ full_name, position, image, linkedin_url }) => {
        const body = new FormData();
        body.append("full_name", full_name);
        body.append("position", position);
        body.append("image", image);
        body.append("linkedin_url", linkedin_url);
        return {
          url: "/team/",
          method: "POST",
          body,
          formData: true,
        };
      },
      invalidatesTags: ["Team"],
    }),

    updateTeamMember: builder.mutation<TeamMember, UpdateTeamMemberPayload>({
      query: ({ id, full_name, position, image, linkedin_url }) => {
        const body = new FormData();
        body.append("full_name", full_name);
        body.append("position", position);
        body.append("linkedin_url", linkedin_url);
        if (image instanceof File) body.append("image", image);
        return {
          url: `/team/${id}/`,
          method: "PATCH",
          body,
          formData: true,
        };
      },
      invalidatesTags: ["Team"],
    }),

    deleteTeamMember: builder.mutation<void, string>({
      query: (id) => ({ url: `/team/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetTeamQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamApi;
