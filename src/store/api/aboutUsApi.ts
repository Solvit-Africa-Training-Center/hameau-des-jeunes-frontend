import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

// ── Types ──────────────────────────────────────────────────────────────────

export interface AboutUsResponse {
  id: string;
  our_story: string;
  our_mission: string;
  our_vision: string;
  banner_image: string;
}

export interface PaginatedAboutUsResponse {
  count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  next: string | null;
  previous: string | null;
  results: AboutUsResponse[];
}

export interface CreateAboutUsPayload {
  our_story: string;
  our_mission: string;
  our_vision: string;
  banner_image: File;
}

export interface UpdateAboutUsPayload {
  id: string;
  our_story: string;
  our_mission: string;
  our_vision: string;
  banner_image?: File;
}

export interface PatchAboutUsPayload {
  id: string;
  our_story?: string;
  our_mission?: string;
  our_vision?: string;
  banner_image?: File;
}

// ── Helper ─────────────────────────────────────────────────────────────────

const multipartFetch = async <T>(
  url: string,
  method: string,
  body: FormData,
): Promise<T> => {
  const token = localStorage.getItem("accessToken");
  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
    method,
    headers,
    body,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw error;
  }

  return res.json();
};

// ── API Slice ──────────────────────────────────────────────────────────────

export const aboutUsApi = createApi({
  reducerPath: "aboutUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["AboutUs"],
  endpoints: (builder) => ({
    // GET - fetch about us data
    getAboutUs: builder.query<PaginatedAboutUsResponse, void>({
      query: () => "/about-us/",
      providesTags: ["AboutUs"],
    }),

    // GET by ID
    getAboutUsById: builder.query<AboutUsResponse, number>({
      query: (id) => `/about-us/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "AboutUs", id }],
    }),

    // POST - create
    createAboutUs: builder.mutation<AboutUsResponse, CreateAboutUsPayload>({
      async queryFn(payload) {
        try {
          const body = new FormData();
          body.append("our_story", payload.our_story);
          body.append("our_mission", payload.our_mission);
          body.append("our_vision", payload.our_vision);
          body.append("banner_image", payload.banner_image);
          const data = await multipartFetch<AboutUsResponse>(
            "/about-us/",
            "POST",
            body,
          );
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: ["AboutUs"],
    }),

    // PUT - full update
    updateAboutUs: builder.mutation<AboutUsResponse, UpdateAboutUsPayload>({
      async queryFn({ id, banner_image, ...rest }) {
        try {
          const body = new FormData();
          Object.entries(rest).forEach(([key, val]) =>
            body.append(key, String(val)),
          );
          if (banner_image instanceof File)
            body.append("banner_image", banner_image);
          const data = await multipartFetch<AboutUsResponse>(
            `/about-us/${id}/`,
            "PUT",
            body,
          );
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AboutUs", id },
        "AboutUs",
      ],
    }),

    // PATCH - partial update
    patchAboutUs: builder.mutation<AboutUsResponse, PatchAboutUsPayload>({
      async queryFn({ id, banner_image, ...rest }) {
        try {
          const body = new FormData();
          Object.entries(rest).forEach(([key, val]) => {
            if (val !== undefined) body.append(key, String(val));
          });
          if (banner_image instanceof File)
            body.append("banner_image", banner_image);
          const data = await multipartFetch<AboutUsResponse>(
            `/about-us/${id}/`,
            "PATCH",
            body,
          );
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AboutUs", id },
        "AboutUs",
      ],
    }),

    // DELETE
    deleteAboutUs: builder.mutation<void, string>({
      query: (id) => ({
        url: `/about-us/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "AboutUs", id },
        "AboutUs",
      ],
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useGetAboutUsByIdQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
  usePatchAboutUsMutation,
  useDeleteAboutUsMutation,
} = aboutUsApi;
